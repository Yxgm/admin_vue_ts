<template>
  <div class="xy-table">
    <div class="hander">
      <slot name="title"></slot>
      <slot name="header"></slot>
    </div>
    <el-table
      :data="listData"
      border
      stripe
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        label="序号"
        align="center"
        type="index"
        width="80"
      ></el-table-column>
      <template v-for="item in propList" :key="item.prop">
        <el-table-column v-bind="item" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">{{
              scope.row[item.prop]
            }}</slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30]"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataCount"
        background
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    listData: {
      type: Array,
      required: true
    },
    dataCount: {
      type: Number,
      default: 0
    },
    propList: {
      type: Array,
      required: true
    },
    showIndexColumn: {
      type: Boolean,
      default: true
    },
    showSelectColumn: {
      type: Boolean,
      default: true
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 })
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    showFooter: { type: Boolean, default: true }
  },
  emits: ["seclectionChange", "update:page"],
  //校验参数功能
  setup(props, { emit }) {
    const handleSelectionChange = (value: any) => {
      emit("seclectionChange", value);
    };
    const handleSizeChange = (pageSize: number) => {
      emit("update:page", { ...props.page, pageSize });
      console.log(pageSize);
    };
    const handleCurrentChange = (currentPage: number) => {
      emit("update:page", { ...props.page, currentPage });
    };
    return { handleSelectionChange, handleSizeChange, handleCurrentChange };
  }
});
</script>

<style scoped>
.hander {
  display: flex;
  justify-content: space-between;
  margin: 0 20px;
  margin-bottom: 15px;
}
.footer {
  margin-top: 20px;
}
</style>
