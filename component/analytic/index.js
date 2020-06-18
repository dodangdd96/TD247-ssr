import { Component } from 'react';
import { Tooltip } from 'antd';
import { DollarCircleOutlined, FieldTimeOutlined } from '@ant-design/icons';

class Analytic extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div 
      style={{
        background: "#123",
        height: 120,
        marginTop: 15,
        marginBottom: 15,
        borderRadius: 4,
        display: 'flex',
        color: "#fff",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0px 60px"
        }}
      >
        <div>
          <div style={{ fontSize: 24, fontWeight: 500 }}>
            100
          </div>
          <div>
            Ứng viên
          </div>
        </div>
        <div>
          <div style={{ fontSize: 24, fontWeight: 500 }} >
            100
          </div>
          <div>
            Việc làm
          </div>
        </div>
        <div>
          <div style={{ fontSize: 24, fontWeight: 500 }}>
            200
          </div>
          <div>
            Nhà tuyển dụng
          </div>
        </div>
        <div>
          <div style={{ fontSize: 24, fontWeight: 500 }}>
            1000
          </div>
          <div>
            Lượt ứng tuyển
          </div>
        </div>
      </div>
    );
  }
}
export default Analytic;