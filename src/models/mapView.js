import { baseUrl } from 'config';
import { Toast } from 'antd-mobile';

export default {
  namespace: 'mapView',

  state: {
    demoUrl: 'https://ipalmap.com/statics/public/docs/online-demo/mapDrawing',
    demoTitle: '地图显示',
    openDrawer: false,
  },

  reducers: {
    toggleDrawer(state) {
      const { openDrawer } = state;

      return { ...state, openDrawer: !openDrawer };
    },

    changeDemo(state, { payload }) {
      const { title, url } = payload;

      Toast.loading('正在加载');

      return { ...state,
        demoUrl: `${baseUrl}${url}`,
        demoTitle: title,
        openDrawer: false,
      };
    },
  },

  effects: {},

  subscriptions: {},
};
