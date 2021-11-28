export interface ILoginState {
  token: string;
  userInfo: any;
  userMenus: any;
  permissions: string[];
}

export interface ILoginResult {
  id: number;
  name: string;
  token: string;
}
