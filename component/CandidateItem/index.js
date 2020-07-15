import { Component } from 'react';
import { Tooltip } from 'antd';
import { DollarCircleOutlined, FieldTimeOutlined, GlobalOutlined, UserOutlined } from '@ant-design/icons';
import Router from 'next/router';
import { formatDateTime } from 'tools';

class CandidateItem extends Component {
  constructor(props) {
    super(props);

    this.state ={
      visible: false
    }
  }

  onRowClick = (id) => {
    Router.push(`/candidate/info?id=${id}`)
  }

  render() {
    const { file } = this.props;
    return (
      <div style={{ display: 'flex', borderBottom: "1px solid #e9e9e9", paddingBottom: 10  }}>
				<div className="candidate-content" style={{ display: 'flex', justifyContent: 'space-between', width: "100%", cursor: 'pointer' }}>
          <div style={{ width: '50%' }}>
            <div style={{ fontWeight: 500, color: "#1790d4"}} onClick={() => this.onRowClick(file.id)}>
              <Tooltip title={file.position}>
                {file.position}
              </Tooltip>
            </div>
            <div className="candidate-note">
              <UserOutlined style={{ marginRight: 5 }} />
              {file.full_name}
            </div>
            <div>
              <FieldTimeOutlined style={{ marginRight: 5 }} />
              {formatDateTime(7, file.date_of_birth, true)}
            </div>
          </div>
          <div style={{ width: '50%' }}>
            <div style={{ textAlign: 'end'}}>
              <DollarCircleOutlined style={{ marginRight: 5 }} />
              Kinh nghiệm: <span style={{ color: "#db4b55" }}>{file.years_of_experience}</span>
            </div>
            <div style={{ textAlign: 'end'}}>
              <GlobalOutlined style={{ marginRight: 5 }} />
              <strong>{file.workplace}</strong>
            </div>
          </div>
				</div>
      </div>
    );
  }
}
export default CandidateItem;