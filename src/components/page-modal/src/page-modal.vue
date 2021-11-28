<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      title="新建"
      width="30%"
      center
      destroy-on-close
    >
      <xy-form v-bind="modalConfig" v-model="formData"></xy-form>
      <slot></slot>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirmClick">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import XyForm from "@/base-ui/form";
import { useStore } from "@/store";
export default defineComponent({
  props: {
    modalConfig: {
      type: Object,
      require: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      require: true
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },

  components: { XyForm },
  emits: [],
  setup(props) {
    const formData = ref<any>({});
    const dialogVisible = ref(false);
    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig?.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`];
        }
      }
    );
    const store = useStore();
    const handleConfirmClick = () => {
      dialogVisible.value = false;
      // 如果defaultInfo有值的情况下，说明是编辑，因为有回现
      if (Object.keys(props.defaultInfo).length) {
        store.dispatch("system/editPageInfoAction", {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        });
      } else {
        store.dispatch("system/createNewPageAction", {
          pageName: props.pageName,
          newPageInfo: { ...formData.value, ...props.otherInfo }
        });
      }
    };
    return { dialogVisible, formData, handleConfirmClick };
  }
});
</script>

<style scoped></style>
