import { Component } from 'react';
import { Input, Button, Select, Tag, Row, Col } from 'antd';
import levera from 'hocs/whoami';
import { HeartOutlined, ThunderboltOutlined, DollarCircleOutlined, FieldTimeOutlined } from '@ant-design/icons';
import Footer from 'component/Footer';

const Option = Select.Option
class CandidateInfo extends Component {
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
      <div className="landing-page-container" style={{ marginTop: 60 }}>
        <div className="content-landing" style={{ marginBottom: 30 }}>
          <div className="box" style={{ height: 200, marginTop: 80 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ padding: 20, display: 'flex', width: '70%' }}>
                <img src="/img/Thiet ke hinh anh san pham chuan.png" width={150} height={160}></img>
                <div style={{ marginLeft: 20 }}>
                  <div style={{ fontSize: 22, fontWeight: 600 }}>Nhân viên bán hàng</div>
                  <span style={{ fontSize: 20, fontWeight: 500, color: '#1890ff' }}>Pancake</span>
                  <div className="highlight">Địa điểm tuyển dụng: <Tag color="#108ee9">Hà nội</Tag></div>
                  <div className="highlight"><DollarCircleOutlined style={{ marginRight: 3 }} />Mức lương: <span style={{ color: "#fc205c" }} >14- 20 triệu</span></div>
                  <div className="highlight"><FieldTimeOutlined style={{ marginRight: 3 }} />Hạn nộp hồ sơ: 14/2/2016</div>
                </div>
              </div>
              <div style={{ display: 'grid', marginRight: 20, height: 'fit-content' }}>
                <Button style={{ marginBottom: 10, background: "#f7ba2a" }} icon={<HeartOutlined />}>Lưu công việc</Button>
                <Button icon={<ThunderboltOutlined />}>Ứng tuyển ngay</Button>
              </div>
            </div>
          </div>
          <div className="box" style={{ height: "fit-content", marginTop: 10 }}>
            <div style={{ padding: "0px 20px 20px 20px" }}>
              <h3 className="heading-title">Thông tin tuyển dụng</h3>
              <div>
                <Row>
                  <Col span={12}>
                    <div className="highlight">Kinh nghiệm: 14/2/2016</div>
                    <div className="highlight">Yêu cầu bằng cấp: 14/2/2016</div>
                    <div className="highlight">Số lượng cần tuyển: 14/2/2016</div>
                    <div className="highlight">Ngành nghề: 14/2/2016</div>
                  </Col>
                  <Col span={12}>
                    <div className="highlight">Hình thức làm việc: 14/2/2016</div>
                    <div className="highlight">Chức vụ: 14/2/2016</div>
                    <div className="highlight">Giới tính: 14/2/2016</div>
                  </Col>
                </Row>
              </div>
              <h3 className="heading-title">Mô tả công việc</h3>
              <div>Địa điểm tuyển dụng</div>
              <h3 className="heading-title">Quyền lợi được hưởng</h3>
              <div>Mức lương</div>
              <h3 className="heading-title">Yêu cầu công việc</h3>
              <div>Hạn nộp hồ sơ</div>
              <h3 className="heading-title">Yêu cầu hồ sơ</h3>
              <div>Hạn nộp hồ sơ</div>
            </div>
          </div>
          <div className="box" style={{ height: 'fit-content', marginTop: 10 }}>
            <div style={{ padding: "0px 20px 20px 20px" }}>
              <h3 className="heading-title">Thông tin liên hệ</h3>
              <div className="highlight">Người liên hệ:</div>
              <div className="highlight">Email liên hệ:</div>
              <div className="highlight">Số điện thoại liên hệ:</div>
              <div className="highlight">Địa chỉ công ty:</div>
              <div className="highlight">Hạn nộp hồ sơ</div>
              <div className="highlight">Ngôn ngữ hồ sơ</div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}
export default levera(CandidateInfo);