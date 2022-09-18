import React, { memo, useState } from 'react';
import styles from './index.less';
import classnames from 'classnames';
import { DatabaseType } from '../../utils/constants';
import { formatNaturalDate } from '../../utils/index';
import Iconfont from '../Iconfont';
import AppHeader from '../AppHeader';
import i18n from '@/i18n';
import { history } from 'umi';
import {
  Dropdown,
  Menu,
  Space,
  Button,
  Modal,
  Form,
  Input,
  Checkbox,
} from 'antd';

interface IProps {
  className?: any;
}

const menuList = [
  {
    code: 'edit',
    icon: '\ue60f',
    text: '修改名称',
  },
  {
    code: 'delete',
    icon: '\ue604',
    text: '断开链接',
  },
];

export default memo<IProps>(function DatabaseList(props) {
  const { className } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const databaseList = [
    {
      name: '连接X号',
      id: 1,
      type: DatabaseType.DB2,
      visitedTime: 1662520397843,
    },
    {
      name: '实例数据库2号',
      id: 2,
      type: DatabaseType.MONGODB,
      visitedTime: 1662520397843,
    },
    {
      name: '实例数据库3号',
      id: 3,
      type: DatabaseType.MYSQL,
      visitedTime: 1662461348043,
    },
    {
      name: '实例数据库4号',
      id: 4,
      type: DatabaseType.ORACLE,
      visitedTime: 1662461348043,
    },
    {
      name: '实例数据库5号',
      id: 5,
      type: DatabaseType.REDIS,
      visitedTime: 1652081517035,
    },
  ];

  const jumpPage = (item) => {
    console.log(item.path);
    history.push({
      pathname: `/database/${item.id}`,
    });
  };

  const renderMenu = () => {
    return (
      <ul className={styles.menu}>
        {menuList.map((item) => {
          return (
            <li className={styles.menuItem}>
              <Iconfont code={item.icon}></Iconfont>
              {item.text}
            </li>
          );
        })}
      </ul>
    );
  };

  const linkDatabase = () => {};

  const showLinkModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    setIsModalVisible(true);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onChange = () => {};

  return (
    <div className={classnames(className, styles.box)}>
      <AppHeader></AppHeader>
      <div className={styles.header}>
        <div className={styles.title}>{i18n('home.nav.database')}</div>
        <Button
          className={styles.linkButton}
          type="primary"
          onClick={showLinkModal}
        >
          <Iconfont code="&#xe631;"></Iconfont>
          {i18n('database.input.newLink')}
        </Button>
      </div>
      <div className={styles.databaseList}>
        {databaseList.map((item) => {
          return (
            <div className={styles.databaseItem}>
              <div className={styles.left} onClick={jumpPage.bind(null, item)}>
                <div
                  className={styles.logo}
                  style={{
                    backgroundImage: `url(https://cdn.apifox.cn/app/project-icon/builtin/9.jpg)`,
                  }}
                ></div>
                <div>
                  <div className={styles.name}>{item.name}</div>
                  <div className={styles.visitedTime}>
                    {i18n('home.text.visitedTime')}
                    {formatNaturalDate(item.visitedTime)}
                  </div>
                </div>
              </div>
              <div className={styles.right}>
                <Dropdown overlay={renderMenu()} trigger={['hover']}>
                  <a onClick={(e) => e.preventDefault()}>
                    <div className={styles.moreActions}>
                      <Iconfont code="&#xe601;" />
                    </div>
                  </a>
                </Dropdown>
              </div>
            </div>
          );
        })}
      </div>
      <Modal
        title="连接数据库"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          // wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="连接名"
            name="linkName"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="主机"
            name="linkName"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="端口"
            name="linkName"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{ offset: 5 }}
            label={false}
            name="savePassword"
          >
            <Checkbox onChange={onChange}>保存密码</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 0 }}>
            <div className={styles.formFooter}>
              <div className={styles.ceshi}></div>
              <div>
                <Button className={styles.cancel}>测试连接</Button>
                <Button type="primary" htmlType="submit">
                  连接
                </Button>
              </div>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
});