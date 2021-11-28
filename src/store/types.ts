import { ILoginState } from "./login/types";
import { ISystemState } from "./main/system/types";
import { IDashboardState } from "./main/analysis/dashboard/type";
export interface IRootState {
  entireDepartment: any[];
  entireRole: any[];
  menuList: any[];
}
export interface IRootWithModule {
  login: ILoginState;
  system: ISystemState;
  dashboard: IDashboardState;
}
export type IStoreType = IRootState & IRootWithModule;
