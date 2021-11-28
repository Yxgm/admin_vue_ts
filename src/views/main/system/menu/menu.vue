<template>
  <div class="menu">
    <page-content :contentTableConfig="contentTableConfig" pageName="menu">
      <template #type="scope">
        <el-tag
          :type="
            scope.row.type === 1
              ? 'success'
              : scope.row.type === 2
              ? 'warning'
              : 'info'
          "
          >{{
            scope.row.type === 1
              ? "一级权限"
              : scope.row.type === 2
              ? "二级权限"
              : "三级权限"
          }}</el-tag
        >
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageContent from "@/components/page-content";

import contentTableConfig from "./config/content.config";

export default defineComponent({
  name: "xy-menu",
  components: { PageContent },
  setup() {
    return { contentTableConfig };
  }
});
</script>

<style scoped></style>
