import { createStore, Store, useStore as useVuexStore } from "vuex";

import { IRootState, IStoreType } from "./types";

import login from "./login/login";
import system from "./main/system/system";
import dashboard from "./main/analysis/dashboard/dashboard";
import { getPageListData } from "@/service/main/system/system";
const store = createStore<IRootState>({
  state() {
    return {
      entireDepartment: [],
      entireRole: [],
      menuList: []
    };
  },
  getters: {},
  mutations: {
    changeEntireDepartment(state, list: any[]) {
      state.entireDepartment = list;
    },
    changeEntireRole(state, list: any[]) {
      state.entireRole = list;
    },
    changeMenuList(state, list: any[]) {
      state.menuList = list;
    }
  },
  actions: {
    // 请求初始化的部门菜单 initial ：初始化
    async getInitialDataAction({ commit }) {
      const departmentResult = await getPageListData("/department/list", {
        offset: 0,
        size: 1000
      });
      const { list: departmentList } = departmentResult.data;
      commit("changeEntireDepartment", departmentList);
      const roleResult = await getPageListData("/role/list", {
        offset: 0,
        size: 1000
      });
      const { list: roleList } = roleResult.data;
      commit("changeEntireRole", roleList);
      const menuResult = await getPageListData("/menu/list", {});
      const { list: menuList } = menuResult.data;
      commit("changeMenuList", menuList);
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
});

// 初始化store，在用户刷新网页的时候，vuex中的数据将会消失
export function setupStore() {
  store.dispatch("login/loadLocalLogin");
}
export function useStore(): Store<IStoreType> {
  return useVuexStore();
}

export default store;
