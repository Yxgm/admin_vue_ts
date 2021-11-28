import { Module } from "vuex";

import { ILoginState } from "./types";
import { IRootState } from "../types";
import { IAccount } from "@/service/login/type";

import localCache from "@/utils/cache";
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from "../../service/login/login";
import { mapMenusToRoute, mapMenusToPermissions } from "@/utils/map.menus";
import router from "@/router";
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {},
      userMenus: [],
      permissions: []
    };
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo;
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus;

      const routes = mapMenusToRoute(userMenus);
      // 动态获得的路由，全部压入main中
      routes.forEach((item) => router.addRoute("main", item));
      // 获得用户按钮的权限
      const permissions = mapMenusToPermissions(userMenus);
      state.permissions = permissions;
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // 1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload);
      const { id, token } = loginResult.data;
      commit("changeToken", token);
      localCache.setCache("token", token);

      // 发送初始化的请求(完整的role/department)

      // 在模块中调用根的state需要加上{root:true }
      dispatch("getInitialDataAction", null, { root: true });

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id);
      const userInfo = userInfoResult.data;
      commit("changeUserInfo", userInfo);
      localCache.setCache("userInfo", userInfo);

      // 3.请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id);
      const userMenus = userMenusResult.data;
      commit("changeUserMenus", userMenus);
      localCache.setCache("userMenus", userMenus);

      // 4.跳到首页
      router.push("/main");
    },
    // 刷新的时候加载初始化state
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache("token");
      if (token) {
        commit("changeToken", token);
      }
      dispatch("getInitialDataAction", null, { root: true });

      const userInfo = localCache.getCache("userInfo");
      if (userInfo) {
        commit("changeUserInfo", userInfo);
      }
      const userMenus = localCache.getCache("userMenus");
      if (userMenus) {
        commit("changeUserMenus", userMenus);
      }
    }
  }
};

export default loginModule;
