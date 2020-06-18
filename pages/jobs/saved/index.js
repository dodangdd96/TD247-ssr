import { Component } from 'react';
import { Input, Button, Select } from 'antd';
import levera from 'hocs/whoami';
import ContainerLayout from 'layout/ContainerLayout';

const Option = Select.Option
class Saved extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  static pageInfo = {
    title: 'Việc làm đã lưu',
  };

  column = [
    {
      title: 'company',
      dataIndex: 'Vị trí/Công ty',
      width: '45%',
      className: 'align-center-column'
    },
    {
      title: 'position',
      dataIndex: 'Địa điểm làm việc',
      width: '20%',
      className: 'align-center-column'
    },
    {
      title: 'salary',
      dataIndex: 'Mức lương',
      width: '15%',
      className: 'align-center-column'
    },
    {
      title: 'date',
      dataIndex: 'Ngày hết hạn',
      width: '15%',
      className: 'align-center-column'
    },
    {
      title: 'delete',
      dataIndex: 'Xóa',
      width: '5%',
      className: 'align-center-column'
    }
  ]

  render() {
    return (
      <ContainerLayout>
        lala
      </ContainerLayout>
    );
  }
}
export default levera(Saved);