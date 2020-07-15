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
    const { job } = this.props;
    return (
      <div className="job-item">
        <div className="job-logo">
					<img src="/img/Thiet ke hinh anh san pham chuan.png" width={65} height={65}></img>
				</div>
				<div className="job-content">
					<div className="job-title" onClick={() => this.onRowClick(job.id)}>
						<Tooltip title={job.position}>
							{job.position}
						</Tooltip>
					</div>
					<div className="job-company">
						{"Pancake"}
					</div>
					<div className="job-salary">
						<DollarCircleOutlined className="icon" />
						{job.wage}
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