import { useStore } from "@/store";

export default function userPermisson(pageName: any, handleName: string) {
  const store = useStore();
  const permissions = store.state.login.permissions;
  const verifyPermission = `system:${pageName}:${handleName}`;
  return !!permissions.find((item) => item === verifyPermission);
}
