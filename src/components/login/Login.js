import React, { Component } from 'react';
import Backdrop from '../backdrop/Backdrop';
import Heading from '../heading/Heading';
import './Login.css';
import { COMETCHAT_CONSTANTS } from '../../../src/consts';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/action';
import { connect } from 'react-redux';

class Login extends Component {

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  login = (uid) => {

    let loginId = uid;

    if (!loginId) {
      loginId = this.myRef.current.value;
    }

    if(!loginId) {
      this.myRef.current.focus();
      return;
    }

    this.uid = loginId;
    this.props.onLogin(this.uid, COMETCHAT_CONSTANTS.AUTH_KEY);
  }
  render() {
    let loader = null;
    if (this.props.loading) {
      loader = <Backdrop />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (<p style={{ color: "orangered", textAlign: 'center'}}>{this.props.error.message}</p>);
    }

    let authRedirect = null;
    if (this.props.isLoggedIn) {
      authRedirect = <Redirect to='/' />
    }
    return (
      <div>
        {authRedirect}
        {loader}
        <Heading text='React Push Notifications Sample App' />
        {errorMessage}
        <div className="loginWrapper">
          <div className='center'>Login with one of our Sample Users</div>
          <div className="loginUsers">
            <div className="superhero pointer" onClick={() => this.login('superhero1')}>
              <div className="superheroAvatar">
                <img src="https://data-us.cometchat.io/assets/images/avatars/ironman.png" alt="ironman"></img>
              </div>
              <div className='superheroId'>
                superhero1
              </div>
            </div>
            <div className="superhero pointer" onClick={() => this.login('superhero2')}>
              <div className="superheroAvatar">
                <img src="https://data-us.cometchat.io/assets/images/avatars/captainamerica.png" alt="captainamerica"></img>
              </div>
              <div className='superheroId'>
                superhero2
              </div>
            </div>
            <div className="superhero pointer" onClick={() => this.login('superhero3')}>
              <div className="superheroAvatar">
                <img src="https://data-us.cometchat.io/assets/images/avatars/spiderman.png" alt="spiderman"></img>
              </div>
              <div className='superheroId'>
                superhero3
              </div>
            </div>
            <div className="superhero pointer" onClick={() => this.login('superhero4')}>
              <div className="superheroAvatar">
                <img src="https://data-us.cometchat.io/assets/images/avatars/wolverine.png" alt="wolverine"></img>
              </div>
              <div className='superheroId'>
                superhero4
              </div>
            </div>
            <div className="superhero pointer" onClick={() => this.login('superhero5')}>
              <div className="superheroAvatar">
                <img src="https://data-us.cometchat.io/assets/images/avatars/cyclops.png" alt="cyclops"></img>
              </div>
              <div className='superheroId'>
                superhero5
              </div>
            </div>
          </div>
          <div className="formElement">
            <div className='center'>OR</div>
            <input ref={this.myRef} type="text" placeholder="Enter your UID here"></input>
          </div>
          <div className="formElement">
            <button onClick={() => this.login()} className="pointer">Login</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error,
    isLoggedIn: state.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (uid, authKey) => dispatch(actions.auth(uid, authKey))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
