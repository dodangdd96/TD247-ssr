import { Component } from 'react';
import { Input, Button, Table, DatePicker } from 'antd';
import levera from 'hocs/whoami';
import ContainerLayout from 'layout/ContainerLayout';
import moment from 'moment';
import { connect } from 'react-redux';
import { fetchListSavedJob } from 'actions';
import { formatDateTime } from 'tools';

const { RangePicker } = DatePicker;

const defaultParams = {
  startDate: undefined,
  endDate: undefined,
}
class Saved extends Component {
  static async getInitialProps(ctx, accessToken) {
    let { isServer, store: { dispatch }, query } = ctx;
    if (isServer) {
      await dispatch(fetchListSavedJob(accessToken, query.userId, {}));
    } else {
      await dispatch(fetchListSavedJob(accessToken, query.userId, {}));
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      params: {...defaultParams }
    }
  }

  static pageInfo = {
    title: 'Việc làm đã lưu',
  };

  column = [
    {
      title: 'Vị trí/Công ty',
      dataIndex: 'company',
      width: '45%',
      className: 'align-center-column'
    },
    {
      title: 'Ngày lưu',
      dataIndex: 'inserted_at',
      width: '20%',
      className: 'align-center-column'
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
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
      title: 'Ngày hết hạn',
      dataIndex: 'period',
      width: '15%',
      className: 'align-center-column'
    },
    {
      title: 'Xóa',
      dataIndex: 'delete',
      width: '5%',
      className: 'align-center-column'
    }
  ]

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

  data = () => {
    const { listApplied } = this.props;
    let data = [];
    data = (listApplied || []).map((item, index) => {
      return {
        key: item.id,
        index: index + 1,
        company: "kaka",
        position: item.position,
        period: formatDateTime(7, item.period, true),
        note: item.note,
        inserted_at: formatDateTime(7, item.inserted_at, true),
      }
    })
    return data;
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
		// this.fetchListCustomerCredit(params);
  }

  onRowClick = (record) => {
    Router.push(`/recruitment/info?jobId=${record.key}`)
  }

  render() {
    const { isLoading } = this.state;

    return (
      <ContainerLayout>
        {this.renderFilterDate()}
        <div style={{ paddingTop: 20 }}>
          <Table
            columns={this.column}
            className="customer-table"
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

const mapStateToProps = ({ user }) => ({
  user: user.user,
  accessToken: user.accessToken
});

export default connect(mapStateToProps, { fetchListSavedJob })(levera(Saved));