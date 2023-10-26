import { Node, Project, SyntaxKind } from 'ts-morph';

const removedFeatureName = process.argv[2] // name
const featureState = process.argv[3] // fn witch should remove 

if(!removedFeatureName) {
    throw new Error('write feature-name')
}

if(!featureState) {
    throw new Error('write feature state (on/off)')
}

if(featureState !=='on' && featureState !=='off')  {
    throw new Error('Feature state must be only on or off')
}
const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

function isToggleFunc(node: Node) {
  let isToggleFeature = false;
  node.forEachChild((child) => {
    if (child.isKind(SyntaxKind.Identifier) && child.getText() === 'toggleFeatures') {
      isToggleFeature = true;
    }
  });
  return isToggleFeature;
}
files.forEach((sourceFile) => {
  sourceFile.forEachDescendant((node) => {
    if (node.asKind(SyntaxKind.CallExpression) && isToggleFunc(node)) {
      const objectOptions = node.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression);

      if (!objectOptions) return;
      const featureNameProperty = objectOptions.getProperty('name');
      const onFunctionProperty = objectOptions.getProperty('on');
      const offFunctionProperty = objectOptions.getProperty('off');

      const offFunction = offFunctionProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
      const onFunction = onFunctionProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
      const featureName = featureNameProperty?.getFirstDescendantByKind(SyntaxKind.StringLiteral)?.getText().slice(1,-1);
      console.log(offFunction?.getText());
      console.log(onFunction?.getText());
      console.log(featureName);

      if(featureName !== removedFeatureName)return
      if(featureState === 'on'){
        node.replaceWithText(onFunction?.getBody().getText() ?? '')
      }
      if(featureState === 'off'){
        node.replaceWithText(offFunction?.getBody().getText() ?? '')
      }
    }
  });
});

project.save();
