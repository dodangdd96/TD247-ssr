import { Component } from 'react';
import { Button, Menu, Popover } from 'antd';
import { UserSwitchOutlined, SolutionOutlined, GlobalOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import Link from 'next/link';

const MenuItem = Menu.Item;

class Navbar extends Component {
  constructor(props) {
    super(props);
	}
	
	popoverContent = () => {
		return (
			<Menu className="dropdown-container" onClick={this.onClick} style={{ zIndex: 10000 }}>
				<MenuItem key="account/employer">
          <Link href={`account/employer`}>
            <a>
              Nhà tuyển dụng
            </a>
          </Link>
				</MenuItem>
				<MenuItem key="account/candidate">
          <Link href={`account/candidate`}>
            <a>
              Ứng viên
            </a>
          </Link>
				</MenuItem>
			</Menu>
		)
	}

  render() {
		const { pathname } = this.props;
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
				  <div style={{ marginRight: 20, fontSize: 16, fontWeight: 500, color: "#fff", cursor: 'pointer' }}> <UserOutlined style={{ marginRight: 5 }} />Tài khoản</div>
			  </Popover>
		</div>    
		);
  }
}

const mapStateToProps = ({ navigation }) => ({
	collapsed: navigation.collapsed
});

export default connect(mapStateToProps, null)(Navbar);