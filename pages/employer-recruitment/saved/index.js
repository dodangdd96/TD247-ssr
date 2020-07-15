import { Component } from 'react';
import { Table, DatePicker } from 'antd';
import levera from 'hocs/whoami';
import { SearchOutlined, RocketOutlined } from '@ant-design/icons';
import ContainerLayout from 'layout/ContainerLayout';
import moment from 'moment';
import { connect } from 'react-redux';
import { fetchListJobPost } from 'actions';
import { formatDateTime } from 'tools';
import Router from 'next/router';

const { RangePicker } = DatePicker;

const defaultParams = {
  startDate: undefined,
  endDate: undefined,
}
class JobPosts extends Component {

  static async getInitialProps(ctx, accessToken) {
    let { isServer, store: { dispatch } } = ctx;
    if (isServer) {
      await dispatch(fetchListJobPost(accessToken, defaultParams));
    } else {
      await dispatch(fetchListJobPost(accessToken, defaultParams));
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      params: {}
    }
  }

  static pageInfo = {
    title: 'Tin đã đăng tuyển',
  };

  columns = [
    {
      title: 'Vị trí tuyển dụng',
      dataIndex: 'position',
      width: '50%',
      className: 'align-center-column'
    },
    {
      title: 'Địa điểm làm việc',
      dataIndex: 'province',
      width: '20%',
      className: 'align-center-column'
    },
    {
      title: 'Mức lương',
      dataIndex: 'salary',
      width: '15%',
      className: 'align-center-column'
    },
    {
      title: 'Thời hạn nộp',
      dataIndex: 'period',
      width: '15%',
      className: 'align-center-column'
    }
  ]

  fetchListJobPost = async (filter = {}) => {
    this.setState({ isLoading: true })
    const { accessToken, fetchListJobPost } = this.props
    const params = filter ? { ...this.state.params, ...filter } : defaultParams;
    await fetchListJobPost(accessToken, params)
    this.setState({ params, isLoading: false })
  }

  data = () => {
    const { listJobs } = this.props;
    let data = [];
    data = (listJobs || []).map(item => {
      return {
        key: item.id,
        id: item.id,
        position: item.position,
        province: item.province,
        salary: item.wage,
        period: formatDateTime(7, item.period, true)
      }
    })
    return data;
  }

  renderFilterDate = () => {
		const { params: { endDate, startDate }} = this.state;
		return (
			<div>
				<RangePicker
					ranges={{
						["Hôm qua"]: [moment().add(-1, 'days'), moment().add(-1, 'days')],
						["Hôm nay"]: [moment().startOf('day'), moment().endOf('day')],
						["Tuần trước"]: [moment().add(-7, 'days'), moment()],
						["Tháng trước"]: [moment().add(-30, 'days'), moment()],
						["Tháng này"]: [moment().startOf('month'), moment().endOf('month')]
					}}
					format="DD/MM/YYYY"
					value={(endDate && startDate) ? [moment(startDate, 'X'), moment(endDate, 'X')] : []}
					onChange={dates => this.onChangeFilterDate(dates)}
          style={{ width: 350, borderRadius: 4 }}
          placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
				/>
			</div>
		)
  }

  onChangeFilterDate = dates => {
    const { params } = this.state;
    if (dates) {
      params.startDate = dates[0] ? dates[0].unix() : defaultParams.startDate;
      params.endDate = dates[1] ? dates[1].unix() : defaultParams.endDate;
    } else {
      params.startDate = undefined;
      params.endDate = undefined;
    }
		this.fetchListJobPost(params);
  }

  onRowClick = (record) => {
    Router.push(`/employer-recruitment/post?jobId=${record.key}`)
  }

  render() {
    const { isLoading } = this.state;
    return (
      <ContainerLayout>
        <div style= {{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex' }}>
            {this.renderFilterDate()}
          </div>
        </div>
        <div style={{ paddingTop: 20 }}>
          <Table
            columns={this.columns}
            className="job-post-table"
            bordered
            dataSource={this.data()}
            onRow={(record, rowIndex) => ({
              onClick: () => this.onRowClick(record)
            })}
            pagination={{ size: 'small', pageSize: 50 }}
            loading={isLoading}
          />
        </div>
      </ContainerLayout>
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
  { fetchListJobPost })(levera(JobPosts));