import { Component } from 'react';
import { Input, Button, Select, DatePicker } from 'antd';
import levera from 'hocs/whoami';
import ContainerLayout from 'layout/ContainerLayout';
import { connect } from 'react-redux';
import {
  FileDoneOutlined,
  SaveOutlined,
  StarOutlined
} from '@ant-design/icons';

const Option = Select.Option;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

class EmployerManage extends Component {
  constructor(props) {
    super(props);

    this.state ={
      visible: false
    }
  }

  static pageInfo = {
    title: 'Quản lý chung',
  };

  render() {
    return (
      <ContainerLayout>
        <div className="box" style={{ minHeight: 70, marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
          <RangePicker 
            style={{ minWidth: 350 }}
            placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
          />
					<Button icon={<FileDoneOutlined style={{ marginRight: 4 }} />} type="primary">Đăng tin tuyển dụng mới</Button>
        </div>
				<div style={{ marginTop: 10, display: 'flex' }}>
          <div 
            className="box" 
            style={{ height: 120, width: "33%", marginRight: 10, padding: 20 }} 
          >
            <div style={{ display: 'flex' }}>
              <FileDoneOutlined style={{ fontSize: 40 }} />
              <div style={{ width: '100%', fontSize: 22, textAlign: 'center', fontWeight: 500, color: "#1790d4" }}>100</div>
            </div>
            <div style={{ fontSize: 18, fontWeight: 500, textAlign: 'center' }}>Việc làm đã đăng</div>
          </div>
          <div 
            className="box"
            style={{ height: 120, width: "33%", marginRight: 10, padding: 20 }} 
          >
            <div style={{ display: 'flex' }}>
              <StarOutlined style={{ fontSize: 40 }} />
                <span style={{ width: '100%', fontSize: 22, textAlign: 'center', fontWeight: 500, color: "#1790d4" }}>100</span>
              </div>
            <div style={{ fontSize: 18, fontWeight: 500, textAlign: 'center' }}>Hồ sơ ứng tuyển</div>
          </div>
					<div
            className="box"
            style={{ height: 120,  width: "33%", padding: 20 }}
          >
            <div style={{ display: 'flex' }}>
              <SaveOutlined style={{ fontSize: 40 }} /> 
              <span style={{ width: '100%', fontSize: 22, textAlign: 'center', fontWeight: 500, color: "#1790d4" }}>100</span>
            </div>
            <div style={{ fontSize: 18, fontWeight: 500, textAlign: 'center' }}>Hồ sơ đã lưu</div>
          </div>
				</div>
				<div style={{ marginTop: 10, display: 'flex' }}>
					<div className="box"  style={{ height: 400, width: "50%", marginRight: 10 }} span={8}>
          	<div  className="title">Danh sách tin tuyển dụng mới nhất</div>
					</div>
					<div className="box" style={{ height: 400, width: "50%" }} span={8}>
						<div className="title">Hồ sơ ứng tuyển mới nhất</div>
					</div>
				</div>
      </ContainerLayout>
    );
  }
}

export default levera(EmployerManage);