<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
  </div>
</template>

<script>
  import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
  import DetailSwiper from "@/views/detail/childComps/DetailSwiper";

  import {request3} from "@/network/request"

  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topImages: [],
        detailData: {}
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper
    },
    created() {
      this.iid = this.$route.params.id
      this.getDetail()
    },
    methods: {
      getDetail() {
        const data = request3()
        console.log(data);
        this.topImages = data.topImages
      }
    }
  }
</script>

<style scoped>

</style>
