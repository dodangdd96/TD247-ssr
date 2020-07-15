import { Component } from 'react';
import {Avatar, Menu, Popover } from 'antd';
import { UserSwitchOutlined, SolutionOutlined, GlobalOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import Link from 'next/link';
import { getUserFromRequest } from 'tools';

const MenuItem = Menu.Item;

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  handleMenuSelect = ({ selectedKeys }) => {
    switch (selectedKeys[0]) {
      case '/logout':
        localStorage.removeItem('current_user');
        window.location.replace('/');
        break;
    }
  };
	
	popoverContent = () => {
    const { user } = this.props;
		return user.id ?
		(
			<Menu className="dropdown-container" onSelect={this.handleMenuSelect} style={{ zIndex: 10000 }}>
				<MenuItem key={user.role == "candidate" ? `/manage` : `employer-manage`}>
          <Link href={user.role == "candidate" ? `/manage` : `employer-manage`}>
            <a>
              Trang quản lý
            </a>
          </Link>
				</MenuItem>
				<MenuItem key="/logout">
          <Link href={`/logout`}>
            <a>
              Thoát
            </a>
            </Link>
				</MenuItem>
			</Menu>
		):
		(
			<Menu className="dropdown-container" style={{ zIndex: 10000 }}>
				<MenuItem key="/account/employer">
          <Link href={`/account/employer`}>
            <a>
              Nhà tuyển dụng
            </a>
          </Link>
				</MenuItem>
				<MenuItem key="/account/candidate">
          <Link href={`/account/candidate`}>
            <a>
              Ứng viên
            </a>
          </Link>
				</MenuItem>
			</Menu>
		)
	}

  render() {
    const { pathname, user } = this.props;

    return (	
			<div className="menu-nabar">
				<div style={{ color: "#fff", fontSize: 26, fontWeight: 600, paddingLeft: 10 }}>TD247</div>
				<div style={{ marginRight: 10 }}>
				<Menu 
					style={{ fontWeight: 500, fontSize: 16 }}
					mode="horizontal"
					defaultSelectedKeys={[pathname]}
          theme="dark"
				>
					<MenuItem key="/">
						<Link href={`/`}>
							<a>
								<HomeOutlined />
								Trang chủ
							</a>
						</Link>
					</MenuItem>
					<MenuItem key="/candidate">
						<Link href="/candidate">
              <a>
								<UserSwitchOutlined />
								Ứng viên
							</a>
						</Link>
					</MenuItem>
					<MenuItem key="/recruitment">
						<Link href="/recruitment">
              <a>
								<SolutionOutlined />
								Tuyển dụng
							</a>
						</Link>
					</MenuItem>
					<MenuItem key="/company">
						<Link href={`/company`}>
							<a>
								<GlobalOutlined />
								Công ty
							</a>
						</Link>
					</MenuItem>
      	</Menu>
				</div>
        <Popover content={this.popoverContent()} placement="bottom" overlayClassName="action-list" trigger="click">
					{user.id ?
					<div style={{ display: 'flex', padding: 10, cursor: 'pointer' }}>
						<Avatar
							size={30}
							style={{ backgroundColor: '#87d068', marginBottom: 5 }}
							icon={<UserOutlined />}
						/>
						<div style={{ fontSize: 18, marginLeft: 5, color: '#fff', fontWeight: 600 }}>{user.user_name}</div>
					</div>
						:
					<div
						style={{ marginRight: 20, fontSize: 16, fontWeight: 500, color: "#fff", cursor: 'pointer' }}> 
						<UserOutlined style={{ marginRight: 5 }} />
						Tài khoản
					</div>
					}
			  </Popover>
		</div>    
		);
  }
}

const mapStateToProps = ({ navigation, user }) => ({
  collapsed: navigation.collapsed,
  user: user.user
});

export default connect(mapStateToProps, null)(Navbar);