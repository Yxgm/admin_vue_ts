<template>
  <div class="nav-header">
    <i
      class="fold-menu"
      @click="handleFoldClick"
      :class="isFold ? 'el-icon-document-add' : 'el-icon-document-remove'"
    ></i>
    <div class="content">
      <xy-bread-crumb :breadcrumb="breadcrumb"></xy-bread-crumb>
      <user-info></user-info>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import UserInfo from "./user-info.vue";
import XyBreadCrumb from "@/base-ui/breadcrumb";

import { pathMapBreadcrumbs } from "@/utils/map.menus";
import { useStore } from "@/store";
import { useRoute } from "vue-router";
export default defineComponent({
  components: { UserInfo, XyBreadCrumb },
  emits: ["foldChange"],
  setup(props, { emit }) {
    const isFold = ref(false);
    const handleFoldClick = () => {
      isFold.value = !isFold.value;
      emit("foldChange", isFold.value);
    };
    const store = useStore();
    const breadcrumb = computed(() => {
      const userMenus = store.state.login.userMenus;
      const route = useRoute();
      const currentPath = route.path;
      return pathMapBreadcrumbs(userMenus, currentPath);
    });

    return { isFold, handleFoldClick, breadcrumb };
  }
});
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  align-items: center;
  background: rgba(255, 255, 255);

  .fold-menu {
    font-size: 23px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
