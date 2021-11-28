const contentTableConfig = {
  propList: [
    { prop: "name", label: "角色名", minWidth: "60" },
    { prop: "intro", label: "权限", minWidth: "100" },
    {
      prop: "createAt",
      label: "创建时间",
      minWidth: "200",
      slotName: "createAt"
    },
    {
      prop: "updateAt",
      label: "更新时间",
      minWidth: "200",
      slotName: "updateAt"
    },
    {
      label: "操作",
      minWidth: "120",
      slotName: "handle"
    }
  ],
  showIndexColumn: false,
  showSelectColumn: true
};
export default contentTableConfig;
