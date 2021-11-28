<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <strong>{{ title }}</strong>
      </div>
    </template>
    <div class="item">
      <slot></slot>
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  components: {},
  props: {
    title: {
      type: String,
      default: "Title"
    }
  },
  setup() {
    return {};
  }
});
</script>

<style lang="less" scoped>
.box-card {
  &:deep(.el-card__header) {
    padding: 10px 20px !important;
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
}

.item {
  margin-bottom: 10px;
}
.box-card:hover {
  box-shadow: 2px 2px 8px rgba(12, 23, 45, 0.5);
}
</style>
