import { LOCAL_STORAGE_LAST_DESIGN_KEY } from "@/shared/const/localstorage";
import { FeatureFlags } from "@/shared/types/featureFlags";

const defaultFeatures:FeatureFlags = {
 isAppRedesigned:localStorage.getItem(LOCAL_STORAGE_LAST_DESIGN_KEY) === 'new' ? true : false
}

let featureFlags:FeatureFlags ={
   ...defaultFeatures
}

export function setFeatureFlags (newFeatureFlags?:FeatureFlags) {
    if(newFeatureFlags){
        featureFlags = newFeatureFlags
    }
}

export function getFeatureFlag(flag: keyof FeatureFlags) {
    //tmp
    return  featureFlags?.[flag] 
}

export function getAllFeatureFlags() {
    return featureFlags;
}
