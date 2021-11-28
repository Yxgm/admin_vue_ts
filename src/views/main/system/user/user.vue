<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @queryBtnClick="handleQueryClick"
      @resetBtnClick="handleResetClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      @editBtnClick="handleEditClick"
      @newBtnClick="handleNewClick"
    ></page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="users"
      :modalConfig="modalConfigRef"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import searchFormConfig from "./config/search.config";
import contentTableConfig from "./config/content.config";
import modalConfig from "./config/modal.config";

import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import PageModal from "@/components/page-modal";

import { usePageSearch } from "@/hooks/use-page-search";
import { usePageModal } from "@/hooks/use-page-modal";
export default defineComponent({
  name: "user",
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] =
      usePageSearch();
    // 新建用户控制密码框的显示函数
    const newCallback = () => {
      const passwordItem = modalConfig?.formItems.find(
        (item) => item.field === "password"
      );
      passwordItem!.isHidden = false;
    };
    // 编辑按钮控制密码框的显示函数
    const editCallback = () => {
      const passwordItem = modalConfig?.formItems.find(
        (item) => item.field === "password"
      );
      passwordItem!.isHidden = true;
    };
    const store = useStore();
    const modalConfigRef = computed(() => {
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === "departmentId"
      );
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id };
      });
      const roleItem = modalConfig.formItems.find(
        (item) => item.field === "roleId"
      );
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id };
      });
      return modalConfig;
    });
    const [handleEditClick, handleNewClick, pageModalRef, defaultInfo] =
      usePageModal(newCallback, editCallback);
    return {
      searchFormConfig,
      contentTableConfig,
      handleQueryClick,
      pageContentRef,
      handleResetClick,
      handleEditClick,
      handleNewClick,
      pageModalRef,
      defaultInfo,
      modalConfigRef
    };
  }
});
</script>

<style scoped>
.page-search {
  border-bottom: 20px solid rgb(240, 242, 245);
}
.page-content {
  padding-top: 20px;
}
</style>
