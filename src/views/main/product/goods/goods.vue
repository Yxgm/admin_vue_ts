<template>
  <div class="goods">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content :contentTableConfig="contentTableConfig" pageName="goods">
      <template #image="scope">
        <el-image
          style="width: 60px; height: 80px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        >
        </el-image>
      </template>
      <template #oldPrice="scope"> {{ "¥" + scope.row.oldPrice }}</template>
      <template #newPrice="scope"
        ><strong>{{ "¥" + scope.row.newPrice }}</strong></template
      >
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";

import searchFormConfig from "./config/search.config";
import contentTableConfig from "./config/content.config";
export default defineComponent({
  name: "goods",
  components: { PageSearch, PageContent },
  setup() {
    return { contentTableConfig, searchFormConfig };
  }
});
</script>

<style scoped></style>
