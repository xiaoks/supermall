<template>
  <div id="home">
    <!--导航-->
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <!--轮播图-->
    <home-swiper :banners="banners"></home-swiper>
    <!--推荐-->
    <recommendView :recommends="recommends"></recommendView>
    <feature-view></feature-view>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import HomeSwiper from "@/views/home/childComps/HomeSwiper";
  import RecommendView from "@/views/home/childComps/RecommendView";
  import FeatureView from "@/views/home/childComps/FeatureView";

  import {getHomeMultidata} from "@/network/home";

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView
    },
    data() {
      return {
        banners: [],
        recommends: [],
      }
    },
    created() {
      getHomeMultidata().then(res => {
        this.banners = res.data.data.banner.list
        this.recommends = res.data.data.recommend.list
      })
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;

    position: fixed;
    left: 0;
    right: 0;
  }

</style>
