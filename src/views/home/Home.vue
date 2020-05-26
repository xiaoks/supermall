<template>
  <div id="home">
    <!--导航-->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control @tabClick="tabClick" class="tab-control" :titles="['流行','新款','精选']" v-show="isTabFixed"  ref="tabControl2"></tab-control>

    <scroll class="content" ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="contentPullingUp" >
      <!--轮播图-->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <!--推荐-->
      <recommendView :recommends="recommends"></recommendView>
      <feature-view></feature-view>
      <tab-control @tabClick="tabClick" :titles="['流行','新款','精选']" ref="tabControl"></tab-control>
      <goods-list :goods="goods[currentType]['list']"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isBackTopShow"></back-top>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import Scroll from "@/components/common/scroll/Scroll";
  import TabControl from "@/components/content/tabControl/TabControl";
  import BackTop from "@/components/content/backTop/BackTop";

  import HomeSwiper from "@/views/home/childComps/HomeSwiper";
  import RecommendView from "@/views/home/childComps/RecommendView";
  import FeatureView from "@/views/home/childComps/FeatureView";
  import GoodsList from "@/components/content/goods/GoodsList";

  import {getHomeMultidata, getHomeGoods} from "@/network/home";
  import {debounce} from "../../common/utils";


  export default {
    name      : "Home",
    components: {
      NavBar,
      Scroll,
      TabControl,
      BackTop,
      HomeSwiper,
      RecommendView,
      FeatureView,
      GoodsList,
    },
    data() {
      return {
        banners    : [],
        recommends : [],
        goods      : {
          'pop' : {page: 0, list: []},
          'news': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isBackTopShow: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
      }
    },
    created() {
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('news')
      this.getHomeGoods('sell')
    },
    mounted() {
      //监听Item中图片加载完成
      const refresh = debounce(this.$refs.scroll.refresh, 20)
      this.$bus.$on('imageLoad', () => {
        refresh()
      })
    },
    activated() {
      console.log(this.saveY);
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      console.log(this.$refs.scroll.scroll.y);
      this.saveY = this.$refs.scroll.scroll ? this.$refs.scroll.scroll.y : 0
    },
    methods   : {
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.data.banner.list
          this.recommends = res.data.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.result.wall.docs)
          this.goods[type].page = page
          this.$refs.scroll.finishPullUp()
        })
      },
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'news'
            break;
          case 2:
            this.currentType = 'sell'
        }
        this.$refs.tabControl.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      backClick() {
        this.$refs.scroll.scrollTo()
      },
      contentScroll(position) {
        this.isBackTopShow = -position.y > 1000

        this.isTabFixed = -position.y > this.tabOffsetTop
      },
      contentPullingUp() {
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
        //获取tabControl的offsetTop
        //所有的组件都有一个$el属性
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    position: relative;
    height: 100vh;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;

    /*position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;*/
  }

  .tab-control {
    /*position: sticky;/
    /*top: 44px;*/
    position: relative;
    z-index: 9;
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

</style>
