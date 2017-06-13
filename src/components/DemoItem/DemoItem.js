import React from 'react';
import { List } from 'antd-mobile';
import styles from './styles.less';

const { Item } = List;
const { Brief } = Item;

const DemoItem = (props) => {
  const { dispatch, category, title, url } = props;
  const onItemClick = () => {
    dispatch({
      type: 'mapView/changeDemo',
      payload: { url, title },
    });
  };

  if (category) {
    return (
      <Item
        className={styles.category}
      >
        <h3>{category}</h3>
      </Item>
    );
  } else {
    return (
      <Item
        arrow="horizontal"
        multipleLine
        className={styles.demo}
        onClick={onItemClick}
      >
        {title}
        <Brief>{url}</Brief>
      </Item>
    );
  }
};

export default DemoItem;
