import { Component } from 'react';
import { Tooltip } from 'antd';
import { DollarCircleOutlined, FieldTimeOutlined } from '@ant-design/icons';
import Router from 'next/router';

class WorkItem extends Component {
  constructor(props) {
    super(props);

    this.state ={
      visible: false
    }
  }

  onRowClick = (id) => {
    Router.push(`/recruitment/info?id=${id}`)
  }

  render() {
    return (
      <div className="job-item">
        <div className="job-logo">
					<img src="/img/Thiet ke hinh anh san pham chuan.png" width={65} height={65}></img>
				</div>
				<div className="job-content">
					<div className="job-title" onClick={() => this.onRowClick(this.props.jobId)}>
						<Tooltip title="Hot job cho ngày mới năng động">
							Hot job cho ngày mới năng động
						</Tooltip>
					</div>
					<div className="job-company">
						Công ty Pancake	
					</div>
					<div className="job-salary">
						<DollarCircleOutlined className="icon" />
						12 triệu - 15 triệu
					</div>
					<div className="job-time">
						<FieldTimeOutlined className="icon" />
						15/06/2020
					</div>
				</div>
      </div>
    );
  }
}
export default WorkItem;