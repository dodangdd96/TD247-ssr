import { Component } from 'react';
import { Input, Button, Select } from 'antd';
import levera from 'hocs/whoami';
import { SearchOutlined, RocketOutlined } from '@ant-design/icons';
import CandidateItem from 'component/CandidateItem';
import Analytic from 'component/Analytic';
import Footer from 'component/Footer';
import { fetchListFile } from 'actions';
import { connect } from 'react-redux';
import { listWork, listPosition } from 'tools';

const Option = Select.Option
class Candidate extends Component {
  static async getInitialProps(ctx, accessToken) {
    let { isServer, store: { dispatch } } = ctx;
    if (isServer) {
      await dispatch(fetchListFile(accessToken, {}));
    } else {
      await dispatch(fetchListFile(accessToken, {}));
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
    const { listFile } = this.props;
    return (
      <div className="landing-page-container">
        <div className="filter-adv">
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
          <div className="box" style={{ height: 600, marginTop: 15 }}>
            <div className="title"><RocketOutlined style={{ marginRight: 5}} />HỒ SƠ ỨNG TUYỂN MỚI NHẤT</div>
            <div style={{ padding: 20 }}>
              {listFile.map((file, index) => (
                <CandidateItem file={file} key={index}/>
              ))}
            </div>
          </div>
          <Analytic/>
        </div>
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = ({ user, file }) => ({
  user: user.user,
  accessToken: user.accessToken,
  listFile: file.list_file
});

export default connect(
  mapStateToProps,
  { fetchListFile })(levera(Candidate));