import { Module } from "vuex";
import { ISystemState } from "./types";
import { IRootState } from "@/store/types";
import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from "@/service/main/system/system";
const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    };
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => (state as any)[`${pageName}List`];
    },
    pageListCount(state) {
      return (pageName: string) => (state as any)[`${pageName}Count`];
    }
  },
  mutations: {
    changeUsersList(state, usersList: any[]) {
      state.usersList = usersList;
    },
    changeUsersCount(state, usersCount: number) {
      state.usersCount = usersCount;
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList;
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount;
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount;
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList;
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount;
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList;
    }
  },
  actions: {
    // 条件检索请求用户信息
    async getPageListAction({ commit }, payload: any) {
      // 1.获取配置的url
      const pageName = payload.pageName;

      // 2.动态对页面发送请求，根据pageurl的不同请求数据。
      const pageResult = await getPageListData(
        `/${pageName}/list`,
        payload.queryInfo
      );
      const { list, totalCount } = pageResult.data;
      commit(
        `change${pageName.replace(pageName[0], pageName[0].toUpperCase())}List`,
        list
      );
      commit(
        `change${pageName.replace(
          pageName[0],
          pageName[0].toUpperCase()
        )}Count`,
        totalCount
      );
    },
    async deletePageDataAction({ dispatch }, payload: any) {
      // 1.获取pageName和id
      // pageName -> /users
      // id -> /users/id
      const { pageName, id } = payload;
      const pageUrl = `/${pageName}/${id}`;

      // 2.调用删除网络请求
      await deletePageData(pageUrl);

      // 3.重新请求最新的数据
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    },
    async createNewPageAction({ dispatch }, payload: any) {
      // 创建数据的请求
      const { pageName, newPageInfo } = payload;
      const pageUrl = `/${pageName}`;
      await createPageData(pageUrl, newPageInfo);
      // 重新请求最新的数据
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    },
    async editPageInfoAction({ dispatch }, payload: any) {
      const { pageName, editData, id } = payload;
      const pageUrl = `/${pageName}/${id}`;
      await editPageData(pageUrl, editData);
      // 重新请求最新的数据
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    }
  }
};
export default systemModule;
