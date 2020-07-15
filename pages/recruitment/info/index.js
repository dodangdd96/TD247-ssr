import { Component } from 'react';
import { Input, Button, Select, Tag, Row, Col, Modal, message } from 'antd';
import levera from 'hocs/whoami';
import { HeartOutlined, ThunderboltOutlined, DollarCircleOutlined, FieldTimeOutlined } from '@ant-design/icons';
import Footer from 'component/Footer';
import { fetchJobPost, createApplied, createSavedJob } from 'actions';
import { connect } from 'react-redux';
import Notification from 'component/common/Notification.js';

const { TextArea } = Input;
class RecruitmentInfo extends Component {
  static async getInitialProps(ctx, accessToken) {
    let { isServer, store: { dispatch }, query } = ctx;
    if (isServer) {
      await dispatch(fetchJobPost(accessToken, query.id));
    } else {
      await dispatch(fetchJobPost(accessToken, query.id));
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      visibleSave: false,
      applied: {
        name: props.user.user_name,
        email: props.user.email,
        phone_number: props.user.phone_number,
        note: '',
        job_id: props.job.id,
        account_id: props.user.id,
        status: "Mới"
      },
      saved_job:{
        note: '',
        job_id: props.job.id,
        account_id: props.user.id
      } 
    }
  }

  static pageInfo = {
    title: 'Tìm việc làm, tìm việc nhanh',
  };

  showModal = (type) => {
    const { user } = this.props;
    if (user.id) {
      if (user.role != "employer") {
        if (type == "save") {
          this.setState({
            visibleSave: true,
          });
        } else {
          this.setState({
            visible: true,
          });
        }
      } else {
        Notification.error("Bạn cần đăng nhập với tư cách ứng viên để sử dụng tính năng này")
      }
    } else {
      Notification.error("Bạn cần đăng nhập với tư cách ứng viên để sử dụng tính năng này")
    }
  };

  handleOk = type => {
    const { createApplied, createSavedJob, accessToken } = this.props;
    const { applied, saved_job } = this.state;
    if (type == "save") {
      createSavedJob(accessToken, saved_job)
      this.setState({
        visibleSave: false,
      });
    } else {
      createApplied(accessToken, applied)
      this.setState({
        visible: false,
      });
    }
  };

  handleCancel = type => {
    if (type == "save") {
      this.setState({
        visibleSave: false,
      });
    } else {
      this.setState({
        visible: false,
      });
    }
  };

  onHandleChangeNote = (value, which) => {
    const { applied, saved_job } = this.state;
    if(which == "applied") {
      let cloneApplied = {...applied};
      cloneApplied.note = value;
      this.setState({ applied: cloneApplied })
    } else {
      let clone = {...saved_job};
      clone.note = value;
      this.setState({ saved_job: clone })
    }
  }

  render() {
    const { job } = this.props;
    const { applied } = this.state;
    return (
      <div className="landing-page-container" style={{ marginTop: 60 }}>
        <div className="content-landing" style={{ marginBottom: 30 }}>
          <div className="box" style={{ height: 200, marginTop: 80 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ padding: 20, display: 'flex', width: '70%' }}>
                <img src="/img/Thiet ke hinh anh san pham chuan.png" width={150} height={160}></img>
                <div style={{ marginLeft: 20 }}>
                  <div style={{ fontSize: 22, fontWeight: 600 }}>{job.position}</div>
                  <span style={{ fontSize: 20, fontWeight: 500, color: '#1890ff' }}>Pancake</span>
                  <div className="highlight">Địa điểm tuyển dụng: <Tag color="#108ee9">{job.province}</Tag></div>
                  <div className="highlight"><DollarCircleOutlined style={{ marginRight: 3 }} />Mức lương: <span style={{ color: "#fc205c" }} >{job.wage}</span></div>
                  <div className="highlight"><FieldTimeOutlined style={{ marginRight: 3 }} />Hạn nộp hồ sơ: 14/2/2016</div>
                </div>
              </div>
              <div style={{ display: 'grid', marginRight: 20, height: 'fit-content' }}>
                <Button style={{ marginBottom: 10, background: "#f7ba2a" }} icon={<HeartOutlined />} onClick={() => this.showModal("save")}>Lưu công việc</Button>
                <Button icon={<ThunderboltOutlined />} onClick={() => this.showModal("applied")}>Ứng tuyển ngay</Button>
              </div>
            </div>
          </div>
          <div className="box" style={{ height: "fit-content", marginTop: 10 }}>
            <div style={{ padding: "0px 20px 20px 20px" }}>
              <h3 className="heading-title">Thông tin tuyển dụng</h3>
              <div>
                <Row>
                  <Col span={12}>
                    <div className="highlight">Kinh nghiệm: {job.experience}</div>
                    <div className="highlight">Yêu cầu bằng cấp: {job.degree}</div>
                    <div className="highlight">Số lượng cần tuyển: {job.number_of_recruitment}</div>
                    <div className="highlight">Ngành nghề: {job.career}</div>
                  </Col>
                  <Col span={12}>
                    <div className="highlight">Hình thức làm việc: {job.type_of_work}</div>
                    <div className="highlight">Chức vụ: {job.level}</div>
                    <div className="highlight">Giới tính: {job.sex}</div>
                  </Col>
                </Row>
              </div>
              <h3 className="heading-title">Mô tả công việc</h3>
              <div>{job.description}</div>
              <h3 className="heading-title">Quyền lợi được hưởng</h3>
              <div>{job.description}</div>
              <h3 className="heading-title">Yêu cầu công việc</h3>
              <div>{job.job_requirements}</div>
              <h3 className="heading-title">Yêu cầu hồ sơ</h3>
              <div>{job.profile_required}</div>
            </div>
          </div>
          <div className="box" style={{ height: 'fit-content', marginTop: 10 }}>
            <div style={{ padding: "0px 20px 20px 20px" }}>
              <h3 className="heading-title">Thông tin liên hệ</h3>
              <div className="highlight">Người liên hệ:{job.contact}</div>
              <div className="highlight">Email liên hệ:{job.email_contact}</div>
              <div className="highlight">Số điện thoại liên hệ:{job.phone_number_contact}</div>
              <div className="highlight">Địa chỉ công ty:{job.period}</div>
              <div className="highlight">Hạn nộp hồ sơ: {job.period}</div>
              <div className="highlight">Ngôn ngữ hồ sơ: {job.language}</div>
            </div>
          </div>
        </div>
        <Footer/>
        <Modal
          title="Lưu công việc"
          visible={this.state.visibleSave}
          onOk={() => this.handleOk("save")}
          onCancel={() => this.handleCancel("save")}
          okText="Lưu"
          cancelText="Hủy"
        >
          <div>
            <div style={{ fontWeight: 500, marginBottom: 5 }}>Ghi chú:</div>
            <TextArea
              placeholder="Nhập ghi chú"
              onChange={e => this.onHandleChangeNote(e.target.value, 'save')}
            />
          </div>        
        </Modal>
        <Modal
          title="Ứng tuyển công việc"
          visible={this.state.visible}
          onOk={() => this.handleOk("applied")}
          onCancel={() => this.handleCancel("applied")}
          okText="Ứng tuyển"
          cancelText="Hủy"
        >
          <div>
            <div style={{ fontWeight: 500, marginTop: 5 }}>Ghi chú:</div>
            <TextArea
              placeholder="Nhập ghi chú"
              onChange={e => this.onHandleChangeNote(e.target.value, "applied")}
            />
            <div style={{ fontWeight: 500, marginTop: 5 }}>Họ tên:</div>
            <Input value={applied.name}/>
            <div style={{ fontWeight: 500, marginTop: 5 }}>Số điện thoại liên hệ:</div>
            <Input value={applied.phone_number}/>
            <div style={{ fontWeight: 500, marginTop: 5 }}>Email liên hệ:</div>
            <Input value={applied.email}/>
          </div> 
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ user, jobs }) => ({
  user: user.user,
  accessToken: user.accessToken,
  job: jobs.job
});

export default connect(
  mapStateToProps,
  { fetchJobPost, createApplied, createSavedJob })(levera(RecruitmentInfo));