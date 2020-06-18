import { Component } from 'react';
import { Tooltip } from 'antd';
import { DollarCircleOutlined, FieldTimeOutlined } from '@ant-design/icons';

class Analytic extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ height: 130, background: "#123", textAlign: 'center', display: 'flex', alignItems: 'center', display: 'grid', padding: 10 }}>
				<div style={{ color: "#FFF", fontSize: 24, fontWeight: 600 }}>Trang tuyển dụng</div>
				<div style={{ color: "#FFF", fontSize: 24, fontWeight: 600 }}>Tìm việc nhanh, tìm việc hiệu quả</div>
				<div style={{ color: "#FFF", fontSize: 24, fontWeight: 600 }}>Create by dodang</div>
			</div>
    );
  }
}
export default Analytic;