// import { buildSelector } from '@/shared/lib/store';
// import { JsonSettings } from '../../types/jsonSettings';

import { buildSelector } from "@/shared/lib/store";
import { JsonSettings } from "../../types/jsonSettings";

// export const [useJsonSettings, getJsonSettings] = buildSelector(
//   (state) => state.user?.authData?.jsonSettings,
// );

export const [useJsonSettingsByKey, getJsonSettingsByKey] = buildSelector(
  (state, key: keyof JsonSettings) => state.user?.authData?.jsonSettings?.[key],
);


const defaultJsonSettings: JsonSettings = {};

export const [useJsonSettings, getJsonSettings] = buildSelector(
    (state) => state.user?.authData?.jsonSettings ?? defaultJsonSettings,
);
