import { Component } from 'react';
import { Menu, Avatar } from 'antd';
import { HomeOutlined, DesktopOutlined, SolutionOutlined, AppstoreOutlined, LaptopOutlined, UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import Link from 'next/link';
import { loginSuccess } from 'actions';
import Cookies from 'js-cookie';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

class NavigationMenu extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount () {
    const { loginSuccess } = this.props;
    const accessToken = Cookies.get('login_jwt');
    if (accessToken) loginSuccess(accessToken);
  }

  render() {
    const { collapsed, pathname, user } = this.props;
    return (
			<div className="menu-container" style={{ width: collapsed ? 80 : 240 }}>
        <div style={{ marginBottom: 15 }}>
          <div
            style={{
              height: 50,
              color: "#fff",
              fontWeight: 600,
              fontSize: collapsed ? 18 : 24,
              paddingTop: 12,
              marginBottom: collapsed ? 5 : 15,
              textAlign: 'center'
            }}
          >
            TD247
          </div>
          <div style={{ textAlign: 'center' }}>
            <Avatar
              size={collapsed ? 50 : 80}
              style={{ backgroundColor: '#87d068', marginBottom: 5 }}
              icon={<UserOutlined />}
            />
            {!collapsed && <div style={{ fontSize: 18, color: '#fff', fontWeight: 600 }}>{user.user_name}</div>}
          </div>
        </div>
				{user.role === 'candidate' && <Menu
					mode="inline"
					theme="dark"
					inlineCollapsed={collapsed}
					defaultSelectedKeys={[pathname]}
				>
					<MenuItem key="/manage">
            <Link href={"/manage"}>
              <a>
                <DesktopOutlined />
						    <span>Quản lý chung</span>
              </a>
            </Link>
					</MenuItem>
          <MenuItem key="/files">
            <Link href={"/files"}>
              <a>
                <SolutionOutlined />
						    <span>Quản lý hồ sơ</span>
              </a>
            </Link>
					</MenuItem>
          <SubMenu
            key="/jobs"
            title={
              <span>
                <AppstoreOutlined/>
                <span>Quản lý công việc</span>
              </span>
            }
          >
            <MenuItem key="/jobs/applied">
              <Link href={`/jobs/applied?userId=${user.id}`}>
                <a>Việc làm đã ứng tuyển</a>
              </Link>
            </MenuItem>
            <MenuItem key="/jobs/saved">
              <Link href={`/jobs/saved?userId=${user.id}`}>
                <a>Việc làm đã lưu</a>
              </Link>
            </MenuItem>
            <MenuItem key="/jobs/suitable">
              <Link href={"/jobs/suitable"}>
                <a>Công việc phù hợp</a>
              </Link>
            </MenuItem>
          </SubMenu>
				</Menu>}
        {user.role === 'employer' && <Menu
					mode="inline"
					theme="dark"
					inlineCollapsed={collapsed}
					defaultSelectedKeys={[pathname]}
				>
					<MenuItem key="/employer-manage">
            <Link href={"/employer-manage"}>
              <a>
                <DesktopOutlined />
						    <span>Quản lý chung</span>
              </a>
            </Link>
					</MenuItem>
          <SubMenu
            key="/employer-recruitment"
            title={
              <span>
                <LaptopOutlined />
                <span>Tuyển dụng</span>
              </span>
            }
          >
            <MenuItem key="/employer-recruitment/post">
              <Link href={"/employer-recruitment/post"}>
                <a>Đăng tin tuyển dụng</a>
              </Link>
            </MenuItem>
            <MenuItem key="/employer-recruitment/saved">
              <Link href={`/employer-recruitment/saved?userId=${user.id}`}>
                <a>Tất cả tin tuyển dụng</a>
              </Link>
            </MenuItem>
          </SubMenu>
          <SubMenu
            key="/files-manage"
            title={
              <span>
                <SolutionOutlined />
                <span>Quản lý hồ sơ</span>
              </span>
            }
          >
            <MenuItem key="/files-manage/saved">
              <Link href={`/files-manage/saved?userId=${user.id}`}>
                <a>Hồ sơ đã lưu</a>
              </Link>
            </MenuItem>
            <MenuItem key="/files-manage/recruitment">
              <Link href={`/files-manage/recruitment?userId=${user.id}`}>
                <a>Hồ sơ ứng tuyển</a>
              </Link>
            </MenuItem>
          </SubMenu>
          <MenuItem key="/company-profile">
            <Link href={`/company-profile?userId=${user.id}`}>
              <a>
              <HomeOutlined />
  				    <span>Thông tin công ty</span>
              </a>
            </Link>
					</MenuItem>
				</Menu>}
			</div>
    );
  }
}

const mapStateToProps = ({ navigation, user }) => ({
  collapsed: navigation.collapsed,
  user: user.user
});

export default connect(mapStateToProps, { loginSuccess })(NavigationMenu);