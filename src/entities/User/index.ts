export { getJsonSettings } from './model/selectors/getJsonSettings/getJsonSettings';

export { saveJsonSettings } from './model/services/saveJsonSettings';

export { UserRole } from './model/consts/consts';

export {
  isUserAdmin,
  isUserManager,
  getUserRoles,
} from './model/selectors/getUserRole/getUserRole';

export { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';

export { getUserInited } from './model/selectors/getUserInited/getUserInited';

export { userReducer, userActions } from './model/slice/userSlice';
export type { UserSchema, User } from './model/types/user';
