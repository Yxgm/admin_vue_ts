<template>
  <div class="page-content">
    <xy-table
      :listData="dataList"
      :dataCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- 公共部分的插槽 -->
      <template #title>
        <h2>列表</h2>
      </template>
      <template #header>
        <el-button v-if="isCreate" type="success" @click="handleNewClick"
          >新建</el-button
        >
      </template>
      <template #status="scope">
        <el-tag plain :type="scope.row.enable ? 'success' : 'danger'">{{
          scope.row.enable ? "启用" : "禁用"
        }}</el-tag>
      </template>
      <template #createAt="scope">
        <i class="el-icon-time"></i>
        <strong>{{ $filters.formatTime(scope.row.createAt) }}</strong>
      </template>
      <template #updateAt="scope">
        <i class="el-icon-time"></i>
        <strong>{{ $filters.formatTime(scope.row.updateAt) }}</strong>
      </template>
      <template #handle="scope">
        <div class="handle">
          <el-button
            v-if="isUpdate"
            icon="el-icon-edit"
            size="mini"
            type="text"
            @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            v-if="isDelete"
            icon="el-icon-delete"
            size="mini"
            type="text"
            @click="handleDeleteClick(scope.row)"
            :plain="true"
            >删除</el-button
          >
        </div>
      </template>
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </xy-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { useStore } from "@/store";
import { XyTable } from "@/base-ui";
import userPermisson from "@/hooks/use-permission";
import { ElMessage } from "element-plus";
export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      require: true
    }
  },
  components: {
    XyTable
  },
  emits: ["newBtnClick", "editBtnClick"],
  setup(props, { emit }) {
    const store = useStore();
    const isCreate = userPermisson(props.pageName, "create");
    const isUpdate = userPermisson(props.pageName, "update");
    const isDelete = userPermisson(props.pageName, "delete");
    const isQuery = userPermisson(props.pageName, "query");

    const pageInfo = ref({ currentPage: 1, pageSize: 10 });
    // 页码改变发出网络请求
    watch(pageInfo, () => getPageData());
    // 筛选出特有的插槽，由外层页面决定
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === "status") return false;
        if (item.slotName === "createAt") return false;
        if (item.slotName === "updateAt") return false;
        if (item.slotName === "handle") return false;
        return true;
      }
    );
    // 删除逻辑
    const handleDeleteClick = (item: any) => {
      store.dispatch("system/deletePageDataAction", {
        pageName: props.pageName,
        id: item.id
      });
      ElMessage("删除成功");
    };
    const handleNewClick = () => {
      emit("newBtnClick");
    };
    const handleEditClick = (item: any) => {
      emit("editBtnClick", item);
    };
    // 发出网络请求
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return;
      store.dispatch("system/getPageListAction", {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      });
    };
    getPageData();
    // 根据不同的pageName返回不同的列表数据，使用getter
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    );
    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    );

    return {
      handleDeleteClick,
      handleNewClick,
      handleEditClick,
      dataList,
      getPageData,
      dataCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isDelete,
      isUpdate
    };
  }
});
</script>

<style scoped>
.page-content {
  padding-top: 20px;
}
</style>
