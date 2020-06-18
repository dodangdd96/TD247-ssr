import { Component } from 'react';
import { Table } from 'antd';
import levera from 'hocs/whoami';
import { SearchOutlined, RocketOutlined } from '@ant-design/icons';
import ContainerLayout from 'layout/ContainerLayout';

const Option = Select.Option
class Suitable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  static pageInfo = {
    title: 'Công việc phù hợp',
  };

  column = [
    {
      title: 'company',
      dataIndex: 'Vị trí/Công ty',
      width: '50%',
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
    }
  ]

  render() {
    return (
      <ContainerLayout>
        haha
      </ContainerLayout>
    );
  }
}
export default levera(Suitable);