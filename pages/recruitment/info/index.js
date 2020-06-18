import { Component } from 'react';
import { Input, Button, Select, Tag, Row, Col } from 'antd';
import levera from 'hocs/whoami';
import { HeartOutlined, ThunderboltOutlined, DollarCircleOutlined, FieldTimeOutlined } from '@ant-design/icons';
import Footer from 'component/Footer';

const Option = Select.Option
class RecruitmentInfo extends Component {
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
            <div style={{ display: 'flex', position: 'relative', padding: 15 }}>
              <div style={{ display: 'flex', zIndex: 1000 }}>
                <img src="/img/Thiet ke hinh anh san pham chuan.png" width={160} height={160} style={{ borderRadius: '50%' }}/>
                <div style={{ marginLeft: 20 }}>
                  <div style={{ marginTop: 5 }}>
                    <div style={{ fontSize: 22, fontWeight: 600, color: "#fff" }}>Đỗ Huỳnh Đăng</div>
                    <span style={{ fontSize: 20, color: '#ffe14f' }}>Nhân viên phần mềm</span>
                  </div>
                  <div style={{ marginTop: 20, display: 'flex' }}>
                    <div style={{ flex: 1, marginRight: 30 }}>
                      <div> <span className="highlight">Ngày sinh: </span> 10/08/1997 </div>
                      <div><span className="highlight"> Địa chỉ: </span>160-Lương thế vinh-Từ liêm-Hà nội</div>
                    </div>
                    <div>
                      <div> <span className="highlight">Giới tính: </span> Nam</div>
                      <div> <span className="highlight">Tình trạng hôn nhân: </span>Độc thân</div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ zIndex: 1000, position: 'absolute', right: 15, top: 26 }}>
                <Button style={{ marginBottom: 10, background: "#f7ba2a" }} icon={<HeartOutlined />}>Lưu công việc</Button>
              </div>
              <div className="bg-half"></div>
            </div>
          </div>
          <div className="box" style={{ height: "fit-content", marginTop: 10 }}>
            <div style={{ padding: "0px 20px 20px 20px" }}>
              <h3 className="candidate-header">Thông tin hồ sơ</h3>
              <div>
                <Row>
                  <Col span={12}>
                    <div className="highlight">Ngành nghề: 14/2/2016</div>
                    <div className="highlight">Trình độ học vấn: 14/2/2016</div>
                    <div className="highlight">Loại hình công việc: 14/2/2016</div>
                    <div className="highlight">Cấp bậc mong muốn: 14/2/2016</div>
                    <div className="highlight">Mức lương mong muốn: 14/2/2016</div>
                  </Col>
                  <Col span={12}>
                    <div className="highlight">Số năm kinh nghiệm: 14/2/2016</div>
                    <div className="highlight">Nơi làm việc: 14/2/2016</div>
                    <div className="highlight">Mã hồ sơ: 14/2/2016</div>
                    <div className="highlight">Ngày cập nhật: 14/2/2016</div>
                  </Col>
                </Row>
              </div>
              <h3 className="candidate-header">Mục tiên nghề nghiệp</h3>
              <div>Địa điểm tuyển dụng</div>
              <h3 className="candidate-header">Kỹ năng bản thân</h3>
              <div>Mức lương</div>
              <h3 className="candidate-header">Trình độ ngoại ngữ</h3>
              <div>Hạn nộp hồ sơ</div>
              <h3 className="candidate-header">Học vấn/bằng cấp</h3>
              <div>Hạn nộp hồ sơ</div>
              <h3 className="candidate-header">Kinh nghiệm làm việc</h3>
              <div>Hạn nộp hồ sơ</div>
            </div>
          </div>
          <div className="box" style={{ height: 'fit-content', marginTop: 10 }}>
            <div style={{ padding: "0px 20px 20px 20px" }}>
              <h3 className="candidate-header">Thông tin liên hệ</h3>
              <div className="highlight">Người liên hệ:</div>
              <div className="highlight">Email liên hệ:</div>
              <div className="highlight">Số điện thoại liên hệ:</div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}
export default levera(RecruitmentInfo);