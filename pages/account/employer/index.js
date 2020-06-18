import { Component } from 'react';
import { Form, Input, Button, message, Select } from 'antd';
import levera from 'hocs/whoami';
import axios from 'axios';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';
import { listWork, listPosition } from 'tools';

const FormItem = Form.Item;
const Option = Select.Option;

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      form: 'login'
    }
  }

  static pageInfo = {
    title: 'Đăng nhập nhà tuyển dụng',
  };

  handleRes = (res) => {
    if (res.data.success) {
      Cookies.set('login_jwt', res.data.token);
      let user = {
        accessToken: res.data.token,
        name: res.data.account.user_name,
        uid: res.data.account.id
      }
      const dataToSave = JSON.stringify(user);
      localStorage.setItem('current_user', dataToSave);
      window.location.replace('/manage');
    } else {
      this.setState({ loading: false });
      message.error(res.data.message || 'Lỗi không xác định');
    }
  };

  handleErr = (err) => {
    this.setState({ loading: false });
    message.error('Lỗi không xác định');
    console.log(err)
  };

  request = (url, values) => {
    this.setState({ loading: true })
    axios
      .post(url, values)
      .then(this.handleRes)
      .catch(this.handleErr);
  };

  onLogin = (values) => {
    values.role = 'employer'
    const url = `${API_URL}/users/sign_in`;
    this.request(url, values);
  };

  onRegister = (values) => {
    values.role = 'employer'
    const url = `${API_URL}/users/sign_up`;
    this.request(url, values);
  };

  render() {
    const { loading, form } = this.state;
    const listPersonnelScale = ["Dưới 20 người", "20-100 người", "100-200 người", "Trên 200 người"];

    return (
      <div className="container">
        <div style={{ paddingTop: 150 }}>
        {form == "login" ? (
          <div className="login-form-box">
            <span style={{ fontSize: 26, fontWeight: 600 }}>Đăng nhập nhà tuyển dụng</span>
            <Form
              name="basic"
              style={{ paddingTop: 30, textAlign: 'initial' }}
              onFinish={this.onLogin}
            >
              <FormItem
                name="email"
                rules={[{ required: true, message: 'Tên đăng nhập không thể để trống' }]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Nhập địa chỉ email"/>
              </FormItem>
              <FormItem
                name="password"
                rules={[{ required: true, message: 'Mật khẩu không được để trống' }]}
              >
                <Input
                  type="password"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Mật khẩu" />
              </FormItem>
              <FormItem style={{ textAlign: 'center' }}>
                <Button style={{ width: '100%', marginBottom: 5 }} loading={loading} type="primary" htmlType="submit" >
                  Đăng nhập
                </Button>
                <div style={{ marginTop: 10 }}>
                  Chưa có tải khoản? <a onClick={() => this.setState({ form: 'register' })}>Đăng ký ngay!</a>
                </div>
              </FormItem>
            </Form>
        </div>) :
        <div className="register-employer-form-box">
          <span style={{ fontSize: 26, fontWeight: 600 }}>Đăng ký nhà tuyển dụng</span>
          <Form
            style={{ paddingTop: 30, textAlign: 'initial' }}
            onFinish={this.onRegister}
          >
            <div>Thông tin tài khoản</div>
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Email không được để trống!' }, { type: 'email', message: 'Email không hợp lệ!' }]}>
              <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Mật khẩu không được để trống!' },
                () => ({
                  validator(rule, value) {
                    if (value?.length < 8) return Promise.reject('Mật khẩu phải từ 8 ký tự trở lên!');
                    return Promise.resolve();
                  },
                }),
              ]}
              hasFeedback>
              <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Mật khẩu" />
            </Form.Item>
            <Form.Item
              name="confirm"
              rules={[{ required: true, message: 'Xác nhận mật khẩu không được để trống!' }]}
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Vui lòng xác nhận mật khẩu!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) return Promise.resolve();
                    return Promise.reject('Mật khẩu không khớp!');
                  },
                }),
              ]}>
              <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Xác nhận mật khẩu" />
            </Form.Item>
            <div>Thông tin công ty</div>
            <Form.Item name="user_name" rules={[{ required: true, message: 'Tên người liên hệ không được để trống!' }]}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Tên người liên hệ" />
            </Form.Item>
            <Form.Item name="phone_number" rules={[{ required: true, message: 'Số điện thoại người liên hệ không được để trống!' }]}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Số điện thoại người liên hệ" />
            </Form.Item>
            <Form.Item name="company_name" rules={[{ required: true, message: 'Tên công ty không được để trống!' }]}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Tên công ty" />
            </Form.Item>
            <Form.Item name="personnel_scale" rules={[{ required: true, message: 'Quy mô nhân sự không được để trống!' }]}>
              <Select placeholder="Tỉnh/thành phố">
                {listPersonnelScale.map(item => (
                  <Option value={item}>{item}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="company_address" rules={[{ required: true, message: 'Địa chỉ công ty không được để trống!' }]}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Địa chỉ công ty" />
            </Form.Item>            
            <Form.Item name="province" rules={[{ required: true, message: 'Tỉnh/Thành phố không được để trống!' }]}>
              <Select placeholder="Tỉnh/thành phố">
              {listPosition.map(item => (
                <Option value={item}>{item}</Option>
              ))}
              </Select>
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }}>
              <Button style={{ width: "100%", marginBottom: 5 }} loading={loading} type="primary" htmlType="submit" className="login-form-button">
                Đăng ký
              </Button>
              <div style={{ marginTop: 10 }}>
                Bạn đã có tài khoản? <a onClick={() => this.setState({ form: 'login' }) }>Đăng nhập ngay!</a>
              </div>
            </Form.Item>
          </Form>
        </div>
        }
        </div>
      </div>
    );
  }
}
export default levera(Account);