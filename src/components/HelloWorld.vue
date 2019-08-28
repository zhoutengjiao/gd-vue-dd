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

    <input type="button" @click="add" />
  </div>
</template>


<script>
import TGdCustomMap from "./TGdCustomMap";
import { constants } from "crypto";
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
      infoData: {},
      infoProp: {
        autoMove: false,
        position: [121.6873285, 31.22515044],
        visible: false
      },
      map: null,
      mapProp: {
        center: [121.59996, 31.197646],
        zoom: 12,
        events: {
          //地图初始化完成 并加载完子图层
          complete: e => {
            this.map.setFitView();
          },
          init: e => {
            this.map = e;
          },
          click: e => {
            if(this.infoProp.visible){
              this.infoProp.visible = false
              return
            }
            const center = [e.lnglat.lng, e.lnglat.lat];
            this.mapProp = {
              center
            };
          }
        }
      },
      customMarkers: [],
      polylines: [
        {
          lineJoin: "round",
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
                ltype: "高压",
                state: "运行",
                nature: "自闭",
                caizhi: "热缩",
                time: "2016-08-25",
                lnglat: "116.350658,39.938285",
                deep: "-175cm"
              });
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
              this.infoData = e.target.getExtData();
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
    customMarkers.push(
      {
        position: [121.5389385, 31.21515],
        normalMarker: {
          icon: "/point_start.png",
          label: { content: "施工", offset: [25, 38] },
          offset: [-12, -38],
          zIndex:10
        },
        rippleMarker: {
          radius: 33,
          offset: [-33, -33],
          fillOpacity: 0.1,
          fillColor: "#FF4739",
          zIndex: 1
        }
      },
      {
        position: [121.6873285, 31.22515044],
        normalMarker: {
          icon: "/point_end.png",
          offset: [-12, -38]
        },
        rippleMarker: {
          radius: 33,
          strokeColor: "#FF4739",
          strokeWeight: 1,
          strokeOpacity: 0.3,
          offset: [-33, -33],
          fillOpacity: 0.1,
          fillColor: "#FF4739"
        }
      }
    );
    this.customMarkers = customMarkers;
  },
  methods: {
    add() {
      this.customMarkers.push({
        position: [121.5673285, 31.23515044],
        normalMarker: {
          icon: "/point.png",
          offset: [-16, -22]
        },
        rippleMarker: {
          radius: 32,
          strokeColor: "#FF4739",
          strokeWeight: 1,
          strokeOpacity: 0.3,
          offset: [-32, -33],
          fillOpacity: 0.1,
          fillColor: "#FF4739"
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.t-gd-custom-map {
  height: 100vh!important;
  width: 70%;
  margin-left: 30%;

  .amap-marker-label {
    color: #FF4739!important;
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
