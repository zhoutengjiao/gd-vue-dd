<template>
  <el-amap ref="map" vid="t-amap" v-bind="innerMapProp" class="t-amap-map">
    <!-- ******************线路****************** -->
    <template v-if="polylines != null">
      <!-- 线路路径 -->
      <el-amap-polyline
        v-for="polyline in polylines"
        v-bind="polyline"
        :key="polyline.uukey"
      ></el-amap-polyline>
      <!-- 线路拐点markersGroup -->
      <template v-for="polylineCircleMarker in innerPolylineCircleMarker">
        <!-- 线路拐点markers -->
        <el-amap-marker v-bind="marker" v-for="marker in polylineCircleMarker" :key="marker.uukey">
          <t-ripple-cicle v-bind="marker"></t-ripple-cicle>
        </el-amap-marker>
      </template>
    </template>

    <!-- ******************地图标记点****************** -->
    <template v-if="customMarkers != null">
      <template v-for="marker in customMarkers">
        <!-- 简单的水波纹marker -->
        <el-amap-marker v-bind="marker" :key="marker.uukey">
          <t-ripple-cicle v-bind="marker"></t-ripple-cicle>
        </el-amap-marker>
      </template>
    </template>
    <!-- ******************信息窗体****************** -->
    <el-amap-info-window v-if="infoProp != null" v-bind="infoProp">
      <slot name="t-amap-info-window">please custom you info window!</slot>
    </el-amap-info-window>
  </el-amap>
</template>

<script>
/**
 * 因为用到了循环 所有marker 必须提供uukey作为唯一键key的值
 */
import TRippleCicle from "./TRippleCicle";
export default {
  name: "TGdCustomMap",
  components: {
    TRippleCicle
  },
  props: {
    //信息窗口
    infoProp: {
      type: Object,
      default: () => null
    },
    //地图属性
    mapProp: {
      type: Object,
      default: () => {}
    },
    //线路 数组每一项代表一条线
    polylines: {
      type: Array,
      default: () => null
    },
    //线路拐点 每一项认为是一条线的所有拐点 如果不填 则根据polylines里每条线的坐标、颜色默认显示 innerPolylineCircleMarker
    //和普通点用的组件一样 但是拐点的语义让我把他们的结构分开
    polylineCircleMarkers: {
      type: Array,
      default: () => []
    },
    //地图标记点 支持icon 轮廓  水波纹动画
    /**
     * marker属性和官网文档一样
     * 水波纹属性看 RippleCicle
     */
    customMarkers: {
      type: Array,
      default: () => null
    }
  },
  computed: {
    //计算线路拐点marker
    innerPolylineCircleMarker() {
      if (this.polylineCircleMarkers.length > 0) {
        return this.polylineCircleMarkers;
      }
      if (this.polylines.length > 0) {
        //线路拐点
        let markersGroup = [];
        this.polylines.forEach(polyline => {
          let markers = [];
          polyline.path.forEach((value,index,arr) => {
            //地图线路应该是直接引用了 这里value值由数组变成了 对象类型 center需要数组类型
            const center =
              value instanceof Array ? value : [value.lng, value.lat];
            markers.push({
              position: center,
              tr_showIcon: false,
              tr_radius: value.strokeWeight ? value.strokeWeight : 4,
              zIndex: (index==0 || index == arr.length-1) ?100:1,
              uukey: value.uukey,
              tr_strokeStyle: "2px solid blue",
              strokeColor: "blue",
              //   events: polyline.events,
            offset: [-5, -5],
              fillColor: "#fff",
              tr_fillColor: "#fff"
            });

          });
          
          markersGroup.push(markers);
          
        });
        return markersGroup;
      }
    }
  },
  data: function() {
    return {
      innerMapProp: {}
    };
  },
  watch: {
    mapProp() {
      this.refreshMapData();
    }
  },
  created() {
    this.refreshMapData();
  },
  methods: {
    //整理地图属性 默认数据
    refreshMapData() {
      this.innerMapProp = Object.assign(
        {},
        {
          zooms: [3, 18],
          zoom: 12,
          mapStyle: "amap://styles/whitesmoke",
          lang: "zh_cn",
          plugin: [
            {
              pName: "Scale",
              position: "RB"
            },
            {
              pName: "ToolBar",
              position: "RT"
            }
          ]
        },
        this.innerMapProp,
        this.mapProp
      );
    }
  }
};
</script>

<style scoped>
.t-amap-map {
}
</style>
