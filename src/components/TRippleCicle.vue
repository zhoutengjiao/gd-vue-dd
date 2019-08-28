<template>
  <!-- 水波纹圆形动画 -->
  <div class="ripple-content" :style="contentStyle">
    <div v-for="(_, index) in rippleCount" :key="index" :style="innerRippleStyle(index)"></div>
  </div>
</template>
<script>
export default {
  props: {
    /**
     * 半径
     */
    radius: {
      type: Number,
      default: 5
    },
    /**
     * 边框
     */
    strokeStyle: {
      type: String,
      default: "none"
    },
    /**
     * 波纹颜色
     */
    rippleColor: {
      type: String,
      default: "#ff4739"
    },
    /**
     * 动画时间 最好能被rippleRate整除 默认除以rippleRate向上取整
     */
    rippleDuration: {
      type: Number,
      default: 6
    },
    /**
     * 动画速率 就是元素的动画时间差
     */
    rippleRate: {
      type: Number,
      default: 3
    }
  },
  computed: {
    rippleCount() {
      const count = Math.ceil(this.rippleDuration / this.rippleRate);
      return count;
    },
    innerRippleStyle(index) {
      return index => {
        const c = {
          "-webkit-animation": `wateranimate ${this.rippleDuration}s ${this
            .rippleRate * index}s ease-out infinite`,
          animation: `wateranimate ${this.rippleDuration}s ${this.rippleRate *
            index}s ease-out infinite`,
          padding: "50%",
          position: "absolute",
          "box-shadow": `0 0 120px 64px ${this.rippleColor} inset`,
          "border-radius": "100%",
          "z-index": 1,
          opacity: 0
        };
        return c;
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
      width: this.radius * 2 + "px",
      height: this.radius * 2 + "px",
      border: this.strokeStyle,
      "border-radius": "50%"
    };
  }
};
</script>
<style lang="scss" scoped>
@import "./TRipple.css";
.ripple-content {
  position: relative;
}
</style>