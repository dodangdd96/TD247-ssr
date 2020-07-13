import { Component } from 'react';
import { Input, Button, Select, Row, Col } from 'antd';
import levera from '../hocs/whoami';
import { SearchOutlined, RocketOutlined } from '@ant-design/icons';
import WorkItem from 'component/WorkItem';
import Analytic from 'component/Analytic';
import Footer from 'component/Footer';
import { listWork, listPosition } from 'tools';
import { fetchListJobPost } from 'actions';
import { connect } from 'react-redux';

const Option = Select.Option
class Home extends Component {
  static async getInitialProps(ctx, accessToken) {
    let { isServer, store: { dispatch } } = ctx;
    if (isServer) {
      await dispatch(fetchListJobPost(accessToken, {}));
    } else {
      await dispatch(fetchListJobPost(accessToken, {}));
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
          <div className="box" style={{background: "#fafafa", height: 50, display: 'flex', alignItems: 'center', marginTop: 20, padding: "0px 10px" }}>
            <div style={{ display: 'inline-flex', fontSize: 16, fontWeight: 500, cursor: 'pointer', width: "100%", justifyContent: 'space-between' }}>
              <div style={{ marginRight: 20 }}>Bán hàng</div>
              <div style={{ marginRight: 20 }}>IT phần mềm</div>
              <div style={{ marginRight: 20 }}>Điện tử viễn thông</div>
              <div style={{ marginRight: 20 }}>Bất động sản</div>
              <div style={{ marginRight: 20 }}>Nhân viên kinh doanh</div>
              <div style={{ marginRight: 20 }}>Kế toán-kiểm toán</div>
            </div>
          </div>
          <div className="box" style={{ height: 300, marginTop: 15 }}>
            <div className="title"><RocketOutlined style={{ marginRight: 5 }} />VIỆC LÀM CẦN TUYỂN GẤP</div>
            <div style={{ padding: 8}}>
              <Row>
                <Col span={8}>
                  <WorkItem/>
                </Col>
                <Col span={8}>
                  <WorkItem/>
                </Col>
                <Col span={8}>
                  <WorkItem/>
                </Col>
              </Row>
            </div>
          </div>
          <div className="box" style={{ height: 600, marginTop: 15 }}>
            <div className="title"><RocketOutlined style={{ marginRight: 5}} />CÔNG VIỆC LƯƠNG CAO</div>
          </div>
          <div style={{height: 600, marginTop: 10, display: "flex" }}>
            <div className="box" style={{ width: "60%" }}>
            <div className="title"><RocketOutlined style={{ marginRight: 5}} />CÔNG VIỆC HOT</div>
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

const mapStateToProps = ({ user }) => ({
  user: user.user,
  accessToken: user.accessToken
});

export default connect(mapStateToProps, { fetchListJobPost })(levera(Home));