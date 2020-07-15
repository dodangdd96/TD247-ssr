import { Component } from 'react';
import { Form, Input, Button, Select } from 'antd';
import levera from 'hocs/whoami';
import { SearchOutlined, RocketOutlined } from '@ant-design/icons';
import WorkItem from 'component/WorkItem';
import Analytic from 'component/Analytic';
import Footer from 'component/Footer';
import { listWork, listPosition } from 'tools';
import { fetchListJobPost, createSavedJob, createApplied } from 'actions';
import { connect } from 'react-redux';

const Option = Select.Option
class Recruitment extends Component {
  static async getInitialProps(ctx, accessToken) {
    let { isServer, store: { dispatch } } = ctx;
    if (isServer) {
      await dispatch(fetchListJobPost(accessToken));
    } else {
      await dispatch(fetchListJobPost(accessToken));
    }
  }
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
    const { listJobs } = this.props; 
    return (
      <div className="landing-page-container">
        <div className="filter-adv">
          <Input placeholder="Tiêu đề công việc, địa điểm"/>
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
          <div className="box" style={{ height: 300, marginTop: 15 }}>
            <div className="title"><RocketOutlined style={{ marginRight: 5}} />TUYỂN DỤNG NHANH</div>
            {listJobs.map((job, index) => (
              <div style={{ padding: 8}}>
                <WorkItem job={job} key={index}/>
              </div>
            ))}
          </div>
          <div className="box" style={{ height: 600, marginTop: 15 }}>
          <div className="title"><RocketOutlined style={{ marginRight: 5}} />TUYỂN DỤNG HẤP DẪN</div>
          </div>
          <div style={{height: 600, marginTop: 10, display: "flex" }}>
            <div className="box" style={{ width: "60%" }}>
            <div className="title"><RocketOutlined style={{ marginRight: 5}} />VIỆC LÀM MỚI</div>
            </div>
            <div className="box" style={{ width: "40%", marginLeft: 15 }}>
            <div className="title"><RocketOutlined style={{ marginRight: 5}} />CÔNG TY</div>
            </div>
          </div>
					<Analytic/>
        </div>
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = ({ user, jobs }) => ({
  user: user.user,
  accessToken: user.accessToken,
  listJobs: jobs.list_jobs
});

export default connect(
  mapStateToProps,
  { fetchListJobPost, createSavedJob, createApplied })(levera(Recruitment));