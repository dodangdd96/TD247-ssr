import { Component } from 'react';
import { Input, Button, Tag, Row, Col, Modal } from 'antd';
import levera from 'hocs/whoami';
import { HeartOutlined, ThunderboltOutlined, DollarCircleOutlined, FieldTimeOutlined } from '@ant-design/icons';
import Footer from 'component/Footer';
import { fetchFile, createSavedFile } from 'actions';
import { connect } from 'react-redux';
import Notification from 'component/common/Notification.js';
import { formatDateTime } from 'tools';

const { TextArea } = Input;
class CandidateItem extends Component {
  static async getInitialProps(ctx, accessToken) {
    let { isServer, store: { dispatch }, query } = ctx;
    if (isServer) {
      await dispatch(fetchFile(accessToken, query.id));
    } else {
      await dispatch(fetchFile(accessToken, query.id));
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      saved_file: {}
    }
  }

  static pageInfo = {
    title: 'Tìm việc làm, tìm việc nhanh',
  };

  showModal = () => {
    const { user } = this.props
    if(user.id && user.role == "employer") {
      this.setState({
        visible: true,
      });
    } else {
      Notification.error("Bạn cần đăng nhập với tư cách nhà tuyển dụng để sử dụng tính năng này")
    }
  };

  handleOk = e => {
    const { createSavedFile, accessToken } = this.props;
    const { saved_file } = this.state;
    createSavedFile(accessToken, saved_file)
    this.setState({
      visible: false,
    });
  };

  handleSavedFileChange = (value) => {
    const { saved_file } = this.state;
    const { user, file } = this.props;
    saved_file.account_id = user.id;
    saved_file.note = value;
    saved_file.file_id = file.id;
    this.setState({ saved_file })
  }

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { file } = this.props;
    return (
      <div className="landing-page-container" style={{ marginTop: 60 }}>
        <div className="content-landing" style={{ marginBottom: 30 }}>
          <div className="box" style={{ height: 200, marginTop: 80 }}>
            <div style={{ display: 'flex', position: 'relative', padding: 15 }}>
              <div style={{ display: 'flex', zIndex: 1000 }}>
                <img src="/img/Thiet ke hinh anh san pham chuan.png" width={160} height={160} style={{ borderRadius: '50%' }}/>
                <div style={{ marginLeft: 20 }}>
                  <div style={{ marginTop: 5 }}>
                    <div style={{ fontSize: 22, fontWeight: 600, color: "#fff" }}>{file.full_name}</div>
                    <span style={{ fontSize: 20, color: '#ffe14f' }}>{file.position}</span>
                  </div>
                  <div style={{ marginTop: 20, display: 'flex' }}>
                    <div style={{ flex: 1, marginRight: 30 }}>
                      <div> <span className="highlight">Ngày sinh: </span> {formatDateTime(7, file.date_of_birth, "DD/MM/YYYY")} </div>
                      <div><span className="highlight"> Địa chỉ: </span>{file.address}</div>
                    </div>
                    <div>
                      <div> <span className="highlight">Giới tính: </span> {file.sex}</div>
                      <div> <span className="highlight">Tình trạng hôn nhân: </span>{file.marital_status}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ zIndex: 1000, position: 'absolute', right: 15, top: 26 }}>
                <Button style={{ marginBottom: 10, background: "#f7ba2a" }} icon={<HeartOutlined />} onClick={this.showModal}>Lưu hồ sơ</Button>
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
                    <div className="highlight">Ngành nghề: {file.career}</div>
                    <div className="highlight">Trình độ học vấn: {file.academic_level}</div>
                    <div className="highlight">Loại hình công việc: {file.type_of_work}</div>
                    <div className="highlight">Cấp bậc mong muốn: {file.level}</div>
                    <div className="highlight">Mức lương mong muốn: {file.salary}</div>
                  </Col>
                  <Col span={12}>
                    <div className="highlight">Số năm kinh nghiệm: {file.years_of_experience}</div>
                    <div className="highlight">Nơi làm việc: {file.workplace}</div>
                    <div className="highlight">Mã hồ sơ: {file.index || "001"}</div>
                    <div className="highlight">Ngày cập nhật: {formatDateTime(7, file.updated_at, true)}</div>
                  </Col>
                </Row>
              </div>
              <h3 className="candidate-header">Mục tiêu nghề nghiệp</h3>
              <div>Chưa có dữ liệu</div>
              <h3 className="candidate-header">Kỹ năng bản thân</h3>
              <div>Chưa có dữ liệu</div>
              <h3 className="candidate-header">Trình độ ngoại ngữ</h3>
              <div>Tiếng việt</div>
              <h3 className="candidate-header">Học vấn/bằng cấp</h3>
              <div>Trường, cơ sở, trung tâm đào tạo: <span style={{ fontWeight: 500 }}>{file.training_places}</span></div>
              <div>Khoa đào tạo: <span style={{ fontWeight: 500 }}>{file.training_department}</span></div>
              <div>Bằng cấp / Chứng chỉ: <span style={{ fontWeight: 500 }}>{file.degree}</span></div>
              <div>Chuyên ngành đào tạo: <span style={{ fontWeight: 500 }}>{file.specialized}</span></div>
              <div>Xếp loại: <span style={{ fontWeight: 500 }}>{file.classification}</span></div>
              <div>Thời gian bắt đầu: <span style={{ fontWeight: 500 }}>{formatDateTime(7, file.time_to_start_learning, true)}</span></div>
              <div>Thời gian kết thúc: <span style={{ fontWeight: 500 }}>{formatDateTime(7, file.time_to_end_learning, true)}</span></div>
              <h3 className="candidate-header">Kinh nghiệm làm việc</h3>
              <div>Chức danh/ vị trí: <span style={{ fontWeight: 500 }}>{file.comapny_position}</span></div>
              <div>Công ty: <span style={{ fontWeight: 500 }}>{file.comapny}</span></div>
              <div>Thời gian bắt đầu: <span style={{ fontWeight: 500 }}>{formatDateTime(7, file.time_to_start_work, true)}</span></div>
              <div>Thời gian kết thúc: <span style={{ fontWeight: 500 }}>{formatDateTime(7, file.time_to_end_work, true)}</span></div>
            </div>
          </div>
          <div className="box" style={{ height: 'fit-content', marginTop: 10 }}>
            <div style={{ padding: "0px 20px 20px 20px" }}>
              <h3 className="candidate-header">Thông tin liên hệ</h3>
              <div className="highlight">Người liên hệ: {file.full_name}</div>
              <div className="highlight">Email liên hệ: {file.email}</div>
              <div className="highlight">Số điện thoại liên hệ: {file.phone_number}</div>
            </div>
          </div>
        </div>
        <Footer/>
        <Modal
          title="Lưu hồ sơ"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="Lưu"
          cancelText="Hủy"
        >
          <div>
            <div style={{ fontWeight: 500, marginBottom: 5 }}>Ghi chú:</div>
            <TextArea
              placeholder="Nhập ghi chú"
              onChange={e => this.handleSavedFileChange(e.target.value)}
            />
          </div>        
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ user, file }) => ({
  user: user.user,
  accessToken: user.accessToken,
  file: file.file
});

export default connect(
  mapStateToProps,
  { fetchFile, createSavedFile })(levera(CandidateItem));