<template>
  <!-- 水波纹圆形动画 -->
  <div class="ripple-content" :style="contentStyle">
    <!-- 大头针icon -->
    <div class="ripple-needle" v-if="tr_showIcon">
      <img :style="needleStyle" :src="tr_icon" />
    </div>
    <!-- 波纹动画元素 -->
    <template v-if="tr_showRipple">
      <div v-for="(_, index) in rippleCount" :key="index" :style="innerRippleStyle(index)"></div>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    /**
     * 是否显示图标
     */
    tr_showIcon: {
      type: Boolean,
      default: true,
    },
    /**
     * 图标
     */
    tr_icon: {
      type: String,
      default: require("@/assets/point.png")
    },
    /**
     * 图标偏移 默认图标中心点在中心  分别调整 left 和 top margin 可为负数 单位px
     */
    tr_iconOffset: {
      type: Array,
      default: () => [0, -16]
    },
    /**
     * 容器背景颜色
     */
    tr_fillColor: {
      type: String,
      default: "transparent"
    },
    /**
     * 半径
     */
    tr_radius: {
      type: Number,
      default: 16
    },
    /**
     * 是否显示水波纹动画
     */
    tr_showRipple: {
      type: Boolean,
      default: false
    },
    /**
     * 波纹外固定边框
     */
    tr_strokeStyle: {
      type: String,
      default: "none"
    },
    /**
     * 水波纹颜色
     */
    tr_rippleColor: {
      type: String,
      default: "#ff4739"
    },
    /**
     * 动画时间 最好能被rippleRate整除 默认除以rippleRate向上取整
     */
    tr_rippleDuration: {
      type: Number,
      default: 6
    },
    /**
     * 动画速率 就是元素的动画时间差
     */
    tr_rippleRate: {
      type: Number,
      default: 3
    }
  },
  computed: {
    //波纹个数
    rippleCount() {
      const count = Math.ceil(this.tr_rippleDuration / this.tr_rippleRate);
      return count;
    },
    //波纹样式
    innerRippleStyle(index) {
      return index => {
        const c = {
          "-webkit-animation": `wateranimate ${this.tr_rippleDuration}s ${this
            .tr_rippleRate * index}s ease-out infinite`,
          animation: `wateranimate ${this.tr_rippleDuration}s ${this
            .tr_rippleRate * index}s ease-out infinite`,
          padding: "50%",
          position: "absolute",
          "box-shadow": `0 0 120px 64px ${this.tr_rippleColor} inset`,
          "border-radius": "100%",
          "z-index": 1,
          opacity: 0
        };
        return c;
      };
    },
    //大头针偏移
    needleStyle() {
      return {
        "margin-left": this.tr_iconOffset[0] + "px",
        "margin-top": this.tr_iconOffset[1] + "px"
      };
    }
  },
  data() {
    return {
      contentStyle: "",
      innerRippleStyles: []
    };
  },
  mounted() {
    //处理样式
    this.contentStyle = {
      width: this.tr_radius * 2 + "px",
      height: this.tr_radius * 2 + "px",
      border: this.tr_strokeStyle,
      "border-radius": "50%",
      "background-color": this.tr_fillColor
    };
  }
};
</script>
<style lang="scss" scoped>
@import "./TRippleAnimation.css";
.ripple-content {
  position: relative;
  .ripple-needle {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    z-index: 10;
    justify-content: center;
    align-items: center;
  }
}
</style>