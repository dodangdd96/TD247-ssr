import { Component } from 'react';
import { Input, Button, Select } from 'antd';
import levera from 'hocs/whoami';
import { listPosition } from 'tools';
import ContainerLayout from 'layout/ContainerLayout';
import { fetchCompany, updateCompany } from 'actions';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';

const Option = Select.Option;
const { TextArea } = Input;

class CompanyProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currCompany: {}
    }
  }

  static pageInfo = {
    title: 'Thông tin công ty',
  };

  componentDidMount () {
    const { fetchCompany, user, accessToken } = this.props;
    if(user && accessToken) fetchCompany(accessToken, user.id).then(res => this.setState({ currCompany: res }))
  }

  onHandleCompany = (which, value) => {
    const { currCompany } = this.state;
    let cloneCompany = cloneDeep(currCompany);
    cloneCompany[which] = value;
    this.setState({ currCompany: cloneCompany });
  }

  onHadleUpdate = () => {
    const { updateCompany, accessToken } = this.props;
    updateCompany(accessToken, this.state.currCompany);
  }

  render() {
    const listPersonnelScale = ["Dưới 20 người", "20-100 người", "100-200 người", "Trên 200 người"];
    const { user } = this.props;
    const { currCompany } = this.state;
    return (
      <ContainerLayout>
        <div className="box" style={{ padding: "20px 10px 10px 20px", marginBottom: 20 }}>
        <div style={{ fontSize: 18, fontWeight: 500, borderBottom: '1px solid #dddfe2', paddingBottom: 5 }}>Thông tin tài khoản</div>
        <div style={{ marginTop: 10, borderBottom: '1px solid #dddfe2', marginBottom: 20, paddingBottom: 15 }}>
          <div className="input-element">
            <div className="title-element">Địa chỉ email:</div>
            <Input placeholder={"Nhập email"} value={user.email} disabled={true}/>
          </div>
        </div>
        <div style={{ fontSize: 18, fontWeight: 500, paddingBottom: 5 }}>Thông tin công ty</div>
        <div style={{ borderBottom: '1px solid #dddfe2', marginBottom: 20, paddingBottom: 15 }}>
          <div className="input-element">
            <div className="title-element">Tên công ty:</div>
            <Input
              placeholder={"Nhập tên công ty"} 
              value={currCompany.company_name || undefined}
              onChange={e => this.onHandleCompany('company_name', e.target.value)}
            />
          </div>
          <div className="input-element">
            <div className="title-element">Địa chỉ công ty:</div>
            <Input placeholder={"Nhập địa chỉ"}
              value={currCompany.company_address || undefined}
              onChange={e => this.onHandleCompany('company_address', e.target.value)}
            />
          </div>
          <div className="input-element">
            <div className="title-element">Tỉnh/thành phố:</div>
            <Select
              placeholder="Tỉnh/thành phố"
              value={currCompany.province || undefined} 
              style={{ width: "100%" }}
              onChange={e => this.onHandleCompany('province', e)}
            >
              {listPosition.map(item => (
                <Option value={item}>{item}</Option>
              ))}
            </Select>
          </div>
          <div className="input-element">
            <div className="title-element">Qui mô nhân sự:</div>
            <Select 
              placeholder="Chọn qui mô"
              value={currCompany.personnel_scale || undefined}
              style={{ width: "100%" }} 
              onChange={e => this.onHandleCompany('personnel_scale', e)}
            >
              {listPersonnelScale.map(item => (
                <Option value={item}>{item}</Option>
              ))}
            </Select>
          </div>
          <div className="input-element" >
            <div className="title-element">Lĩnh vực hoạt động:</div>
            <TextArea 
              placeholder="Lĩnh vực"
              value={currCompany.field_of_activity || undefined}
              onChange={e => this.onHandleCompany('field_of_activity', e.target.value)}
            />
          </div> 
          <div className="input-element">
            <div className="title-element">Mô tả sơ lược về công ty:</div>
            <TextArea 
              placeholder="Mô tả"
              value={currCompany.description || undefined}
              onChange={e => this.onHandleCompany('description', e.target.value)}
            />
          </div>
          <div style={{ display: 'flex' }}>
            <div className="input-element" style={{ width: "33%" }}>
              <div className="title-element">Website:</div>
              <Input 
                placeholder={"Website"} 
                value={currCompany.website || undefined} 
                onChange={e => this.onHandleCompany('website', e.target.value)}
              />
            </div>
            <div className="input-element" style={{ width: "33%" }}>
              <div className="title-element">Số điện thoại công ty:</div>
              <Input 
                placeholder={"Nhập SĐT"} 
                value={currCompany.company_phone_number || undefined} 
                onChange={e => this.onHandleCompany('company_phone_number', e.target.value)}
              />
            </div> 
            <div className="input-element" style={{ width: "33%" }}>
              <div className="title-element" >Fax công ty:</div>
              <Input 
                placeholder={"Nhập"} 
                value={currCompany.fax || undefined} 
                onChange={e => this.onHandleCompany('fax', e.target.value)}
              />
            </div> 
          </div>
        </div>
        <div style={{ fontSize: 18, fontWeight: 500, paddingBottom: 5 }}>Thông tin liên hệ</div>
        <div>
        <div className="input-element">
          <div className="title-element">Người liên hệ:</div>
            <Input 
              placeholder={"Nhập tên"}
              value={user.user_name || undefined} 
              // onChange={e => this.onHandleCompany('company_name', e.target.value)}
            />
          </div>
          <div style={{ display: 'flex' }}>
            <div className="input-element" style={{ flex: 1 }}>
              <div className="title-element">Email liên hệ:</div>
              <Input
                placeholder={"Nhập email"}
                value={user.email || undefined} 
                // onChange={e => this.onHandleCompany('company_name', e.target.value)}
              />
            </div>
            <div className="input-element" style={{ flex: 1 }}>
              <div className="title-element">Số điện thoại liên hệ:</div>
              <Input 
                placeholder={"Nhập SDT"}
                value={user.phone_number || undefined} 
                // onChange={e => this.onHandleCompany('company_name', e.target.value)}
              />
            </div>
          </div>
        </div>
        <div style={{ marginTop: 15, marginBottom: 15, display: 'flex', justifyContent: 'flex-end', marginRight: 10 }}>
          <Button type="primary" onClick={this.onHadleUpdate}>Cập nhật thông tin</Button>
        </div>
        </div>
      </ContainerLayout>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user: user.user,
  accessToken: user.accessToken
});

export default connect(mapStateToProps, { updateCompany, fetchCompany })(levera(CompanyProfile));