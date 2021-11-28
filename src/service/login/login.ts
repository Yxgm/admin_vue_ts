import xyRequest from "../index";

import { IAccount, ILoginResult } from "./type";
import { IDataType } from "../types";

enum LoginAPI {
  AccountLogin = "/login",
  LoginUserInfo = "/users/", // 用法: /users/1
  UserMenus = "/role/" // 用法: role/1/menu
}

export function accountLoginRequest(account: IAccount) {
  return xyRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  });
}

export function requestUserInfoById(id: number) {
  return xyRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id
  });
}

export function requestUserMenusByRoleId(id: number) {
  return xyRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + "/menu"
  });
}
