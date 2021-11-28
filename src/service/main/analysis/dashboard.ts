import xyRequest from "../../index";

enum DashboardAPI {
  categoryGoodsCount = "/goods/category/count",
  categoryGoodsSale = "/goods/category/sale",
  categoryGoodsFavor = "/goods/category/favor",
  addressGoodsSale = "/goods/address/sale"
}

export function getCategoryGoodsCount() {
  return xyRequest.get({
    url: DashboardAPI.categoryGoodsCount
  });
}

export function getCategoryGoodsSale() {
  return xyRequest.get({
    url: DashboardAPI.categoryGoodsSale
  });
}

export function getCategoryGoodsFavor() {
  return xyRequest.get({
    url: DashboardAPI.categoryGoodsFavor
  });
}

export function getAddressGoodsSale() {
  return xyRequest.get({
    url: DashboardAPI.addressGoodsSale
  });
}
