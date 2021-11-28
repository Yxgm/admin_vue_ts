<template>
  <div class="page-search">
    <xy-form v-bind="searchFormConfig" v-model="formData" ref="XyFormRef">
      <template #header> <h1>高级检索</h1> </template>
      <template #footer>
        <div class="btn">
          <el-button
            type="primary"
            @click="handleResetClick"
            icon="el-icon-refresh"
            >重置</el-button
          ><el-button
            type="primary"
            @click="handleQueryClick"
            icon="el-icon-search"
          >
            搜索</el-button
          >
        </div>
      </template>
    </xy-form>
  </div>
</template>

<script lang="ts">
// 38_125
import { defineComponent, ref } from "vue";
import { XyForm } from "@/base-ui";

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      reuqired: true
    }
  },
  components: { XyForm },
  emits: ["resetBtnClick", "queryBtnClick"],
  setup(props, { emit }) {
    const formItems = props.searchFormConfig?.formItems ?? [];
    const formOriginData: any = {};
    for (const item of formItems) {
      formOriginData[item.field] = "";
    }

    const formData = ref(formOriginData);
    // 当前用户点击重置
    const handleResetClick = () => {
      formData.value = formOriginData;
      emit("resetBtnClick");
    };
    // 搜素按钮逻辑
    const handleQueryClick = () => {
      emit("queryBtnClick", formData.value);
    };

    return { formData, handleResetClick, handleQueryClick };
  }
});
</script>

<style scoped>
.page-search {
  border-bottom: 20px solid rgb(240, 242, 245);
}
</style>
