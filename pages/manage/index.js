import { Component } from 'react';
import levera from 'hocs/whoami';
import ContainerLayout from 'layout/ContainerLayout';

class Manage extends Component {
  constructor(props) {
    super(props);

    this.state ={
      visible: false
    }
  }

  static pageInfo = {
    title: 'Quản lý chung',
  };

  render() {
    return (
      <ContainerLayout>
        <div className="box" style={{ minHeight: 300, marginTop: 15 }}>
          <div className="title">Việc làm đã ứng tuyển mới nhất</div>
        </div>
          <div className="box" style={{  minHeight: 300, marginTop: 15 }}>
          <div className="title">Việc làm đã lưu mới nhất</div>
        </div>
      </ContainerLayout>
    );
  }
}
export default levera(Manage);