<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @newBtnClick="handleNewClick"
      @editBtnClick="handleEditClick"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfig"
      :otherInfo="otherInfo"
      pageName="role"
    >
      <template #default>
        <el-tree
          ref="elTreeRef"
          :data="menu"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        >
        </el-tree>
      </template>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from "vue";

import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import PageModal from "@/components/page-modal";

import searchFormConfig from "./config/search.config";
import contentTableConfig from "./config/content.config";
import modalConfig from "./config/modal.config";

import { usePageModal } from "@/hooks/use-page-modal";
import { useStore } from "@/store";
import { getMenuLeafKeys } from "@/utils/map.menus";

import { ElTree } from "element-plus";
export default defineComponent({
  name: "role",
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const elTreeRef = ref<InstanceType<typeof ElTree>>();
    const editCallback = (item: any) => {
      const leafKeys = getMenuLeafKeys(item.menuList);
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false);
      });
    };
    const [handleEditClick, handleNewClick, pageModalRef, defaultInfo] =
      usePageModal(undefined, editCallback);
    const store = useStore();
    const menu = computed(() => store.state.menuList);
    const otherInfo = ref({});
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys;
      const halfCheckedKeys = data2.halfCheckedKeys;
      const menuList = [...checkedKeys, ...halfCheckedKeys];
      otherInfo.value = { menuList };
    };
    return {
      contentTableConfig,
      searchFormConfig,
      modalConfig,
      handleEditClick,
      handleNewClick,
      pageModalRef,
      defaultInfo,
      menu,
      otherInfo,
      elTreeRef,
      handleCheckChange,
      getMenuLeafKeys
    };
  }
});
</script>

<style scoped></style>
