import React from 'react';
import { connect } from 'dva';
import { Drawer, NavBar, List, Toast } from 'antd-mobile';
import DemoItem from 'components/DemoItem';
import styles from './IndexPage.less';

const demoDesc = [{
  category: '地图显示',
  list: [{
    title: '地图显示',
    url: 'mapDrawing',
  }, {
    title: '地图初始化',
    url: 'mapInitialization',
  }, {
    title: '样式切换',
    url: 'stylesSwitcher',
  }, {
    title: '相机操作',
    url: 'cameraOperation',
  }],
}, {
  category: '控件',
  list: [{
    title: '指南针控件',
    url: 'compassControl',
  }, {
    title: '2D/3D切换控件',
    url: 'dimensionControl',
  }, {
    title: '楼层控件',
    url: 'floorControl',
  }, {
    title: '多楼层控件',
    url: 'multiFloorControl',
  }, {
    title: '比例尺控件',
    url: 'scaleControl',
  }, {
    title: '缩放控件',
    url: 'zoomControl',
  }],
}, {
  category: '覆盖物与标记',
  list: [{
    title: '图片覆盖物',
    url: 'iconOverlay',
  }, {
    title: '普通覆盖物',
    url: 'trivialOverlay',
  }, {
    title: '自定义多边形',
    url: 'polygon',
  }, {
    title: '自定义球体',
    url: 'sphere',
  }, {
    title: '自定义线',
    url: 'lineString',
  }, {
    title: '模型',
    url: 'model',
  }, {
    title: '添加标注',
    url: 'markerAdding',
  }, {
    title: '标注动画',
    url: 'markerAnimation',
  }],
}, {
  category: '事件',
  list: [{
    title: '点选POI',
    url: 'pick',
  }],
}, {
  category: '搜索',
  list: [{
    title: '搜索POI',
    url: 'search',
  }, {
    title: '类别过滤',
    url: 'categoryFilter',
  }, {
    title: '坐标搜索',
    url: 'coordSearch',
  }],
}, {
  category: '路径规划',
  list: [{
    title: '路径规划',
    url: 'pickNavigation',
  }, {
    title: '路径总长度',
    url: 'navigationDistance',
  }, {
    title: '路径分楼层长度',
    url: 'navigationSegmentDistance',
  }, {
    title: '路径吸附',
    url: 'locationConstraint',
  }, {
    title: '偏航重新规划路径',
    url: 'yaw',
  }],
}, {
  category: '动态导航',
  list: [{
    title: '导航提示',
    url: 'navigationPrompt',
  }, {
    title: '导航分段提示',
    url: 'navigationSegmentPrompt',
  }, {
    title: '模拟动态导航',
    url: 'mockDynamicNavigation',
  }],
}];

const getNaviHeight = () => {
  // height of navBar in ./IndexPage.less
  const originHeight = 96;
  // root value of pxtorem plugin defined in /.roadhogrc.js
  const rootValue = 100;
  const regexp = /(\d*)px/i;
  const fontSize = Number(regexp.exec(window.document.documentElement.style.fontSize)[1]);

  return originHeight * (fontSize / rootValue);
};

const IndexPage = (props) => {
  const { dispatch, demoUrl, demoTitle, openDrawer } = props;
  const iframeHeight = window.innerHeight - getNaviHeight();
  const sidebar = (<List>
    {demoDesc.reduce((acc, val) => {
      const { category, list } = val;

      acc.push(<DemoItem
        category={category}
        key={`${category}`}
        dispatch={dispatch}
      />);
      return acc.concat(list.map((item, index) => {
        return (<DemoItem
          {...item}
          dispatch={dispatch}
          key={`${category}${index}`}
        />);
      }));
    }, [])}
  </List>);
  const onOpenChange = () => {
    dispatch({
      type: 'mapView/toggleDrawer',
    });
  };
  const onIframeLoad = () => {
    document.querySelector('iframe').contentWindow.postMessage(window.document.documentElement.style.fontSize, 'https://ipalmap.com');
    window.setTimeout(() => {
      Toast.hide();
    }, 500);
  };

  return (
    <div>
      <NavBar
        className={styles.navBar}
        iconName="ellipsis"
        onLeftClick={onOpenChange}
      >
        {demoTitle}
      </NavBar>
      <Drawer
        style={{ minHeight: iframeHeight }}
        className="demo-drawer"
        dragHandleStyle={{ display: 'none' }}
        sidebar={sidebar}
        onOpenChange={onOpenChange}
        position="left"
        open={openDrawer}
      >
        <iframe
          style={{
            height: `${iframeHeight}px`,
            width: '100%',
          }}
          id="testFrame"
          src={demoUrl}
          frameBorder="0"
          onLoad={onIframeLoad}
        />
      </Drawer>
    </div>
  );
};

const mapStateToProps = ({ mapView }) => ({ ...mapView });

export default connect(mapStateToProps)(IndexPage);
