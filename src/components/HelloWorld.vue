<template>
  <div class="wrapper">
    <t-gd-custom-map
      ref="map"
      class="t-gd-custom-map"
      :mapProp="mapProp"
      :infoProp="infoProp"
      :polylines="polylines"
      :customMarkers="customMarkers"
    >
      <div slot="t-amap-info-window" class="t-amap-info-window">
        <p>
          <span>类型：</span>
          <span>{{infoData.ltype}}</span>
        </p>
        <p>
          <span>状态：</span>
          <span>{{infoData.state}}</span>
        </p>
        <p>
          <span>性质：</span>
          <span>{{infoData.nature}}</span>
        </p>
        <p>
          <span>终端材质：</span>
          <span>{{infoData.caizhi}}</span>
        </p>
        <p>
          <span>投运时间：</span>
          <span>{{infoData.lnglat}}</span>
        </p>
        <p>
          <span>经纬度：</span>
          <span>{{infoData.deep}}</span>
        </p>
        <p>
          <span>埋深：</span>
          <span>{{infoData.ltype}}</span>
        </p>
      </div>
    </t-gd-custom-map>

    <input type="button" @click="look" value="look" />
    <input type="button" @click="line1" value="line1" />
    <input type="button" @click="line2" value="line2" />
  </div>
</template>


<script>
import TGdCustomMap from "./TGdCustomMap";
import { getUUID } from "./TUtils.js";

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  components: {
    TGdCustomMap
  },
  data: function() {
    return {
      //声明自定义窗体数据
      infoData: {},
      //窗体属性
      infoProp: {
        autoMove: false,
        position: [121.6873285, 31.22515044],
        visible: false
      },
      //声明地图容器引用
      map: null,
      //地图属性
      mapProp: {
        center: [121.59996, 31.197646],
        zoom: 12,
        events: {
          //地图初始化完成 并加载完子图层
          complete: () => {
            this.map.setFitView();
          },
          init: e => {
            this.map = e;
          },
          click: e => {
            if (this.infoProp.visible) {
              this.infoProp.visible = false;
              return;
            }
            const center = [e.lnglat.lng, e.lnglat.lat];
            this.mapProp = {
              center
            };
            this.add(...center);
          }
        }
      },
      //仅用于产生customMarker 必须提供uukey作为唯一键区分
      customMarkers: [],
      polylines: [
        {
          lineJoin: "round",
          uukey: getUUID(),
          path: [
            [121.5389385, 31.21515],
            [121.5389385, 31.22615044],
            [121.5473285, 31.21515044],
            [121.5573285, 31.22515044],
            [121.5673285, 31.23515044],
            [121.5773285, 31.21515044],
            [121.5873285, 31.22515044],
            [121.5973285, 31.21515044],
            [121.6773285, 31.22515044],
            [121.6873285, 31.22515044]
          ],
          strokeColor: "#f1b123",
          strokeWeight: 6,
          events: {
            init: e => {
              e.setExtData({
                ltype: "搞搞",
                state: "跑一跑",
                nature: "selfclose",
                caizhi: "hot缩",
                time: "2016-08-25",
                lnglat: "116.350658,39.938285",
                deep: "-175cm"
              });
            },
            click: e => {
              const position = [e.lnglat.lng, e.lnglat.lat];
              this.infoProp.position = position;
              this.infoProp.visible = true;
              this.infoData = { ...e.target.getExtData(), lnglat: position };
            },
            mouseover: e => {
              e.target.setOptions({
                strokeColor: "#26C6DA",
                strokeWeight: 8
              });
            },
            mouseout: e => {
              e.target.setOptions({
                strokeColor: "#f1b123",
                strokeWeight: 6
              });
            }
          }
        },
        {
          lineJoin: "round",
          uukey: getUUID(),
          path: [
            [121.5389385, 31.31515],
            [121.5389385, 31.32615044],
            [121.5473285, 31.31515044],
            [121.5573285, 31.32515044],
            [121.5673285, 31.33515044],
            [121.5773285, 31.31515044],
            [121.5873285, 31.32515044],
            [121.5973285, 31.31515044],
            [121.6773285, 31.32515044],
            [121.6873285, 31.32515044]
          ],
          strokeColor: "#f1b123",
          strokeWeight: 6,
          events: {
            click: e => {
              console.log(e);
            },
            mouseover: e => {
              e.target.setOptions({
                strokeColor: "#26C6DA",
                strokeWeight: 8
              });
              const position = [e.lnglat.lng, e.lnglat.lat];
              this.infoProp.position = position;
              this.infoProp.visible = true;
              this.mapProp = {
                center: position
              };
            },
            mouseout: e => {
              e.target.setOptions({
                strokeColor: "#f1b123",
                strokeWeight: 6
              });
            }
          }
        }
      ]
    };
  },
  created() {
    //大头针
    let customMarkers = [];
    const uukey = getUUID();
    const uukey2 = getUUID();
    customMarkers.push(
      {
        position: [121.5389385, 31.21515],
        uukey,
        offset: [-32, -32],
        tr_iconOffset: [0, -36],
        tr_icon: require("@/assets/point_start.png"),
        label: { content: "开始", offset: [25, 38] },
        zIndex: 50,
        tr_radius: 32,
        events: {
          init: e => {
            e.setExtData({
              uukey
            });
          }
        }
      },
      {
        position: [121.6873285, 31.22515044],
        offset: [-32, -32],
        uukey: uukey2,
        tr_iconOffset: [0, -36],
        tr_icon: require("@/assets/point_end.png"),
        label: { content: "终点", offset: [25, 38] },
        zIndex: 50,
        tr_radius: 32,
        events: {
          init: e => {
            e.setExtData({
              uukey: uukey2
            });
          }
        }
      }
    );
    this.customMarkers = customMarkers;
  },
  methods: {
    add(lng, lat) {
      let uukey = getUUID();
      this.customMarkers.push({
        position: [lng, lat],
        uukey,
        draggable: true,
        raiseOnDrag: true,
        events: {
          init: e => {
            e.setExtData({
              uukey
            });
          },
          rightclick: e => {
            let uukey = e.target.getExtData().uukey;
            this.reduce(uukey);
          },
          dragend: e => {
            console.log(e)
          }
        },
        offset: [-32, -32],
        tr_iconOffset: [0, -36],
        tr_icon: require("@/assets/point_end.png"),
        label: { content: "挖坑", offset: [25, 38] },
        zIndex: 10,
        tr_strokeStyle: "1px solid red",
        tr_rippleColor: "green",
        tr_radius: 32,
        tr_showRipple: true
      });
    },
    look() {
      let mm = this.map.getAllOverlays("marker");
      mm.forEach(item => {
        console.log("look" + item.getExtData().uukey);
      });
    },
    reduce(uukey) {
      let i = 0;

      const len = this.customMarkers.length;
      for (; i < len; i++) {
        const item = this.customMarkers[i];
        const item_uukey = item.uukey;
        if (uukey === item_uukey) {
          return this.customMarkers.splice(i, 1);
        }
      }
    },
    line1() {
      this.polylines = [
        {
          lineJoin: "round",
          uukey: getUUID(),
          path: [
            [121.5389385, 31.21515],
            [121.5389385, 31.22615044],
            [121.5473285, 31.21515044],
            [121.5573285, 31.22515044],
            [121.5673285, 31.23515044],
            [121.5773285, 31.21515044],
            [121.5873285, 31.22515044],
            [121.5973285, 31.21515044],
            [121.6773285, 31.22515044],
            [121.6873285, 31.22515044]
          ],
          strokeColor: "#f1b123",
          strokeWeight: 6,
          events: {
            init: e => {
              e.setExtData({
                ltype: "搞搞",
                state: "跑一跑",
                nature: "selfclose",
                caizhi: "hot缩",
                time: "2016-08-25",
                lnglat: "116.350658,39.938285",
                deep: "-175cm"
              });
              this.map.setFitView([e]);
            },
            click: e => {
              const position = [e.lnglat.lng, e.lnglat.lat];
              this.infoProp.position = position;
              this.infoProp.visible = true;
              this.infoData = { ...e.target.getExtData(), lnglat: position };
            },
            mouseover: e => {
              e.target.setOptions({
                strokeColor: "#26C6DA",
                strokeWeight: 8
              });
            },
            mouseout: e => {
              e.target.setOptions({
                strokeColor: "#f1b123",
                strokeWeight: 6
              });
            }
          }
        }
      ];
    },
    line2() {
      this.polylines = [
        {
          lineJoin: "round",
          uukey: getUUID(),
          path: [
            [121.5389385, 31.31515],
            [121.5389385, 31.32615044],
            [121.5473285, 31.31515044],
            [121.5573285, 31.32515044],
            [121.5673285, 31.33515044],
            [121.5773285, 31.31515044],
            [121.5873285, 31.32515044],
            [121.5973285, 31.31515044],
            [121.6773285, 31.32515044],
            [121.6873285, 31.32515044]
          ],
          strokeColor: "#f1b123",
          strokeWeight: 6,
          events: {
            init: e => {
              this.map.setFitView([e]);
            },
            click: e => {
              console.log(e);
            },
            mouseover: e => {
              e.target.setOptions({
                strokeColor: "#26C6DA",
                strokeWeight: 8
              });
              const position = [e.lnglat.lng, e.lnglat.lat];
              this.infoProp.position = position;
              this.infoProp.visible = true;
              this.mapProp = {
                center: position
              };
            },
            mouseout: e => {
              e.target.setOptions({
                strokeColor: "#f1b123",
                strokeWeight: 6
              });
            }
          }
        }
      ];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.t-gd-custom-map {
  height: 100vh !important;
  width: 70%;
  margin-left: 30%;

  .amap-marker-label {
    color: #ff4739 !important;
    border: none;
    background-color: transparent;
    font-size: 0.8em;
  }
  .t-amap-info-window {
    background-color: white;

    p {
      margin: 0;
      color: #adadad;

      span:first-child {
      }
      span:last-child {
        font-size: 0.8em;
      }
    }
  }
}
</style>
