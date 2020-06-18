import { Component } from 'react';
import { Input, Button } from 'antd';
import levera from 'hocs/whoami';
import { SearchOutlined, RocketOutlined } from '@ant-design/icons';
import Analytic from 'component/Analytic';
import Footer from 'component/Footer';
import { fetchListCompany } from 'actions';
import { connect } from 'react-redux';

class Comapny extends Component {
  static async getInitialProps(ctx, accessToken) {
    let { isServer, store: { dispatch } } = ctx;
    if (isServer) {
      await dispatch(fetchListCompany(accessToken));
    } else {
      await dispatch(fetchListCompany(accessToken));
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      search: ''
    }
  }

  static pageInfo = {
    title: 'Tìm việc làm, tìm việc nhanh',
  };

  onSearch = () => {
    const { accessToken, fetchListCompany } = this.props;
    const params = {};
    params.search = this.state.search;
    fetchListCompany(accessToken, params);
  }

  render() {
    const { listCompany } = this.props;
    console.log(listCompany)
    return (
      <div className="landing-page-container">
        <div className="filter-adv">
          <Input 
            style={{ marginRight: 5 }}
            placeholder="Nhập tên công ty"
            onChange={e => this.setState({ search: e.target.value })}
          />
          <Button icon={<SearchOutlined />} onClick={() => this.onSearch()}>Tìm kiếm</Button>
        </div>
        <div className="content-landing">
          <div className="box" style={{ height: 600, marginTop: 15 }}>
            <div className="title"><RocketOutlined style={{ marginRight: 5}} />DANH SÁCH CÔNG TY</div>
            <div style={{ padding: 8 }}>
              {listCompany.map(item => (
                <div style={{ border: '1px solid #dddfe2', borderRadius: 4, display: 'flex', padding: 5 }}>
                  <div>
                    <img src="/img/Thiet ke hinh anh san pham chuan.png" width={90} height={90} />
                  </div>
                  <div style={{ paddingLeft: 10 }}>
                    <div>{item.company_name}</div>
                    <div>{item.company_address}</div>
                    <div>{item.province}</div>
                  </div>
                </div>
              ))
              }
            </div>
          </div>
          <Analytic/>
        </div>
       <Footer/>
      </div>
    );
  }
}

const mapStateToProps = ({ user, company }) => ({
  user: user.user,
  accessToken: user.accessToken,
  listCompany: company.list_company
});

export default connect(
  mapStateToProps,
  { fetchListCompany })(levera(Comapny));