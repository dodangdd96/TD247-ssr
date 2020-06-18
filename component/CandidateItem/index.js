import { Component } from 'react';
import { Tooltip } from 'antd';
import { DollarCircleOutlined, FieldTimeOutlined, GlobalOutlined, UserOutlined } from '@ant-design/icons';

class CandidateItem extends Component {
  constructor(props) {
    super(props);

    this.state ={
      visible: false
    }
  }

  render() {
    return (
      <div style={{ display: 'flex', borderBottom: "1px solid #e9e9e9", paddingBottom: 10  }}>
				<div className="candidate-content" style={{ display: 'flex', justifyContent: 'space-between', width: "100%" }}>
          <div style={{ width: '50%' }}>
            <div style={{ fontWeight: 500, color: "#1790d4"}}>
              <Tooltip title="Worker cho công ty">
                Worker cho công ty xxxxx
              </Tooltip>
            </div>
            <div className="candidate-note">
              <UserOutlined style={{ marginRight: 5 }} />
              Đỗ Huỳnh Đăng
            </div>
            <div>
              <FieldTimeOutlined style={{ marginRight: 5 }} />
              15/06/2020
            </div>
          </div>
          <div style={{ width: '50%' }}>
            <div style={{ textAlign: 'end'}}>
              <DollarCircleOutlined style={{ marginRight: 5 }} />
              Kinh nghiệm: <span style={{ color: "#db4b55" }}>13 năm</span>
            </div>
            <div style={{ textAlign: 'end'}}>
              <GlobalOutlined style={{ marginRight: 5 }} />
              <strong>Hà Nội</strong>
            </div>
          </div>
				</div>
      </div>
    );
  }
}
export default CandidateItem;