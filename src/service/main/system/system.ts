import xyRequest from "@/service";
import { IDataType } from "@/service/types";
export function getPageListData(url: string, queryInfo: any) {
  return xyRequest.post<IDataType>({
    url: url,
    data: queryInfo
  });
}
// url:/users/id
export function deletePageData(url: string) {
  return xyRequest.delete<IDataType>({
    url: url
  });
}
// 创建新的用户或者角色等，发送网络请求
export function createPageData(url: string, createNewInfo: any) {
  return xyRequest.post<IDataType>({
    url: url,
    data: createNewInfo
  });
}

export function editPageData(url: string, editInfo: any) {
  return xyRequest.patch<IDataType>({
    url: url,
    data: editInfo
  });
}
