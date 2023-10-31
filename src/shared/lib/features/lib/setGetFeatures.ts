import { FeatureFlags } from "@/shared/types/featureFlags";

let featureFlags:FeatureFlags ={}

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
