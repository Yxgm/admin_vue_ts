const contentTableConfig = {
  propList: [
    { prop: "name", label: "用户名", minWidth: "100" },
    { prop: "realname", label: "真实姓名", minWidth: "100" },
    { prop: "cellphone", label: "手机号码", minWidth: "130" },
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
    { prop: "enable", label: "状态", minWidth: "100", slotName: "status" },
    {
      label: "操作",
      minWidth: "120",
      slotName: "handle"
    }
  ],
  showIndexColumn: true,
  showSelection: true
};
export default contentTableConfig;
