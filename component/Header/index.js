import { Component } from 'react';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserSwitchOutlined,
  SolutionOutlined,
  GlobalOutlined,
  HomeOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import { connect } from 'react-redux';
import { collapseMenu } from 'actions';
import Link from 'next/link';

const MenuItem = Menu.Item;
class Header extends Component {
  constructor(props) {
    super(props);
	}

  render() {
		const { style, collapsed, collapseMenu, title } = this.props;
    return (
      <div className="header-container" style={style}>
        <div style={{ display: 'flex' }}>
          <div className="header-button" onClick={collapseMenu}>
            {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
          </div>
          <div className="header-title">
            <div style={{ display: 'flex', alignItems: 'center' }}>{title}</div>
          </div>
        </div>
        <div>
          <div style={{ display: 'flex' }}>
            <div className="sub-nav">
              <Link href={`/`}>
                <a>
                  <HomeOutlined className="icon-nav" />
                  Trang chủ
                </a>
              </Link>
            </div>
            <div className="sub-nav">
              <Link href="/candidate">
                <a>
                  <UserSwitchOutlined className="icon-nav" />
                  Ứng viên
                </a>
              </Link>
            </div>
            <div className="sub-nav">
              <Link href="/recruitment">
                <a>
                  <SolutionOutlined className="icon-nav" />
                  Tuyển dụng
                </a>
              </Link>
            </div>
            <div className="sub-nav">
              <Link href={`/company`}>
                <a>
                  <GlobalOutlined className="icon-nav" />
                  Công ty
                </a>
              </Link>
            </div>
            <div className="sub-nav" style={{ marginLeft: 10, marginTop: 2 }}>
              <a href="/logout">
                <LogoutOutlined style={{ fontSize: 18 }} />
              </a> 
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(null, { collapseMenu })(Header);