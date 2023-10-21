import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Popover } from './Popover';
import { Button } from '@/shared/ui/Button';

export default {
  title: 'shared/Popover',
  component: Popover,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '100px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Popover>;
//@ts-ignore
const Template: ComponentStory<typeof Popover> = (args) => <Popover {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    trigger:<Button>Open</Button>,
  children: 'dsfsdfsddsfsd'

};
Normal.decorators =[ StoreDecorator({})]
// export const TopLeft = Template.bind({});
// TopLeft.args = {
//   items: [
//     {
//       content: '12324384792837492',
//       value: 'first',
//     },
//     {
//       content: '123',
//       value: 'second',
//     },
//     {
//       content: 'lskfsdf',
//       value: 'third',
//     },
//   ],
//   value: 'first',
//   direction: 'top left',
// };

// export const TopRight = Template.bind({});
// TopRight.args = {
//   items: [
//     {
//       content: '12324384792837492',
//       value: 'first',
//     },
//     {
//       content: '123',
//       value: 'second',
//     },
//     {
//       content: 'lskfsdf',
//       value: 'third',
//     },
//   ],
//   value: 'first',
//   direction: 'top right',
// };
// export const BottomLeft = Template.bind({});
// BottomLeft.args = {
//   items: [
//     {
//       content: '12324384792837492',
//       value: 'first',
//     },
//     {
//       content: '123',
//       value: 'second',
//     },
//     {
//       content: 'lskfsdf',
//       value: 'third',
//     },
//   ],
//   value: 'first',
//   direction: 'bottom left',
// };
// export const BottomRight = Template.bind({});
// BottomRight.args = {
//   items: [
//     {
//       content: '12324384792837492',
//       value: 'first',
//     },
//     {
//       content: '123',
//       value: 'second',
//     },
//     {
//       content: 'lskfsdf',
//       value: 'third',
//     },
//   ],
//   value: 'first',
//   direction: 'bottom right',
// };
