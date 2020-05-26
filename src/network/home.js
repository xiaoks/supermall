import {request, request2} from "@/network/request";

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(sort, page) {
  return request2({
    url: 'search',
    params: {
      cKey: 46,
      sort,
      page
    }
  })
}
