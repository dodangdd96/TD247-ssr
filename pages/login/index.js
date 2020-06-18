import { Component } from 'react';
import { Form, Input, Button, Select } from 'antd';
import levera from 'hocs/whoami';
import { SearchOutlined, RocketOutlined } from '@ant-design/icons';
import Footer from 'component/Footer';
import Analytic from 'component/Analytic';
import { listWork, listPosition } from 'Tools';

const Option = Select.Option
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  static pageInfo = {
    title: 'Tìm việc làm, tìm việc nhanh',
  };

  render() {
    return (
      <div className="landing-page-container">
        <div className="filter">
          <Input placeholder="Tìm kiếm..."/>
          <Select
            style={{ width: 350, margin: "0px 5px" }}
            placeholder="Chọn ngành nghề"
          >
            {listWork.map(item => (
              <Option value={item}>{item}</Option>
            ))}
          </Select>
          <Select
            style={{ width: 350, marginRight: 5 }}
            placeholder="Chọn địa điểm"
          >
            {listPosition.map(item => (
              <Option value={item}>{item}</Option>
            ))}
          </Select>
          <Button icon={<SearchOutlined />}>Tìm kiếm</Button>
        </div>
        <div className="content-landing">
          <div style={{height: 300, marginTop: 10, display: "flex" }}>
            <div style={{background: "#fff", width: "50%", padding: 10 }}>
              Đăng nhập ứng viên
              <Button>Đăng nhập ứng viên</Button>
            </div>
            <div style={{background: "#fff", width: "50%", marginLeft: 10, padding: 10 }}>
              Đăng nhập nhà tuyển dụng
              <Button>Đăng nhập nhà tuyển dụng</Button>
            </div>
          </div>
          <div style={{height: 300, marginTop: 10, display: "flex", background: "#fff" }}>
          </div>
					<Analytic/>
        </div>
        <Footer/>
      </div>
    );
  }
}
export default levera(Login);