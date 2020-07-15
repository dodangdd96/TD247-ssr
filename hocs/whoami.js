import Head from 'next/head';
import { withRouter } from 'next/router';
import { Component } from 'react';
import { connect } from 'react-redux';
import Header from 'component/Header';
import NavigationMenu from 'component/NavigationMenu';
import { getUserFromRequest } from 'tools';
import Navbar from 'component/Navbar';

const whoami = ChildComponent => {
  let pageInfo = ChildComponent.pageInfo ? ChildComponent.pageInfo : { title: 'Levera' };

  @withRouter
  class HigherOrderComponent extends Component {

    render() {
      const { router, collapsed, user_name, role } = this.props;
      let url = router;
      let checkNav = typeof url !== 'undefined'
                    && (url.pathname !== '/' 
                    && url.pathname !== '/account/employer'
                    && url.pathname !== '/account/candidate'  
                    && url.pathname !== '/recruitment' 
                    && url.pathname !== '/candidate'
                    && url.pathname !== '/company'
                    && url.pathname !== '/login'
                    && url.pathname !== '/candidate/info'
                    && url.pathname !== '/recruitment/info'
                    );
      return (
        <div className="app-container">
          <Head>
            <title>{pageInfo.title}</title>
            <meta property="og:title" content="Levera Pancake" />
            <link href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.1.1/antd.min.css" rel="stylesheet"></link>
          </Head>
            {!checkNav && <Navbar pathname={url.pathname} user_name={user_name} role={role}/>}
            {checkNav && <NavigationMenu  pathname={url.pathname}/>}
            {checkNav && <Header
              style={{ left: collapsed ? 80 : 240, width: collapsed ? 'calc(100% - 80px)' : 'calc(100% - 240px)', height: 50 }}
              collapsed={collapsed}
              title={pageInfo.title}
            />}
            <div
              className="content-container"
              style={{
                left: !checkNav ? 0 : collapsed ? 80 : 240,
                width: !checkNav ? '100%' : collapsed ? 'calc(100% - 80px)' : 'calc(100% - 240px)'
              }}
            >
              <ChildComponent {...this.props} />
            </div>
          <style dangerouslySetInnerHTML={{ __html: pageInfo.sassStyle }} />
        </div>
      );
    }
  }

	const mapStateToProps = ({ navigation }) => ({
    collapsed: navigation.collapsed,
  });

  const Extended = connect(
		mapStateToProps,
		null
  )(HigherOrderComponent);
  
  Extended.getInitialProps = async ctx => {
    const { store, req, isServer, query } = ctx;
    let user = getUserFromRequest(req);
    const childProps = ChildComponent.getInitialProps ? await ChildComponent.getInitialProps(ctx, user && user.accessToken) : {};

    return { ...childProps, isServer, ...user, ...query  };
  };

	return Extended;
};

export default whoami;
