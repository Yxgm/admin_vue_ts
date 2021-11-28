import PageModal from "@/components/page-modal";
import { ref } from "vue";
type Callback = (item?: any) => void;
export function usePageModal(newCallFn?: Callback, editCallFn?: Callback) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>();
  const defaultInfo = ref({});
  // 新建按钮
  const handleNewClick = () => {
    defaultInfo.value = {};
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true;
    }
    newCallFn && newCallFn();
  };
  // 编辑按钮
  const handleEditClick = (item: any) => {
    defaultInfo.value = { ...item };
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true;
    }
    editCallFn && editCallFn(item);
  };

  return [handleEditClick, handleNewClick, pageModalRef, defaultInfo];
}
