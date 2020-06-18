import { Component } from 'react';
import { Input, Button, Select } from 'antd';
import levera from 'hocs/whoami';
import { SearchOutlined, RocketOutlined } from '@ant-design/icons';
import CandidateItem from 'component/CandidateItem';
import Analytic from 'component/Analytic';
import Footer from 'component/Footer';
import { listWork, listPosition } from 'tools';

const Option = Select.Option
class Candidate extends Component {
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
              <CandidateItem/>
            </div>
          </div>
          <Analytic/>
        </div>
        <Footer/>
      </div>
    );
  }
}
export default levera(Candidate);