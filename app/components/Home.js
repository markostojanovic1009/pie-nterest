import React from 'react';
import { connect } from 'react-redux'
import Messages from './Messages';

class Home extends React.Component {
  render() {
    return (
      <div className="expanded row">
        <Messages messages={this.props.messages}/>
        <div className="row">
          <div className="small-12 columns">
            <h1 className="intro-text">
              Welcome to Pie-nterest. Like Pinterest, but with more Pies.
            </h1>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Home);
