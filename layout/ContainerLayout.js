import { Component } from 'react';

class ContainerLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { className, children, onScroll, style } = this.props;

    return (
      <div
        id="container-layout"
        onScroll={onScroll}
        style={{ ...rootStyle, ...style, top: 49, height: 'calc(100% - 49px)' }}
        className={`__container-layout ${className ? className: ''}`}
      >
        {children}
      </div>
    );
  }
}

const rootStyle = {
  overflowY: 'overlay',
  overflowX: 'hidden',
  position: 'absolute',
  height: 'calc(100% - 49px)',
  width: '100%',
  padding: '30px 25px',
  top: 49,
  left: 0,
}

export default ContainerLayout;
