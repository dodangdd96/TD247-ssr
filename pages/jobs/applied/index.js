import { Component } from 'react';
import { Input, Button, Select } from 'antd';
import levera from 'hocs/whoami';
import ContainerLayout from 'layout/ContainerLayout';

const Option = Select.Option
class Applied extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  static pageInfo = {
    title: 'Việc làm đã ứng tuyển',
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
      title: 'date',
      dataIndex: 'Ngày ứng tuyển',
      width: '15%',
      className: 'align-center-column'
    },
    {
      title: 'date',
      dataIndex: 'Trạng thái',
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
export default levera(Applied);