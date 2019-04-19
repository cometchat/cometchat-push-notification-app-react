import React, { Component } from "react";
import { connect } from "react-redux";

import { Row, Col, Button} from "react-bootstrap";
import * as actionCreator from "./../../store/actions/cc_action";

import './style.sass';
import { array } from "prop-types";
import * as PushNotification from './../../lib/fcm/PushNotification';
import CCManager from './../../lib/cometchat/ccManager';
import {CometChat} from '@cometchat-pro/chat';


var captainAmerica = require("./../../../public/img/captainamerica.png");
var ironMan = require("./../../../public/img/ironman.png");
var spiderman = require("./../../../public/img/spiderman.png");
var wolverine = require("./../../../public/img/wolverine.png");


class PushNotificationLayout extends Component {
  constructor(props) {
    super(props);

    this.state={
      user:[
        {
          id:"superhero1",
          name:"Ironman"
        },
        {
          id:"superhero2",
          name:"Captain America"
        },
        {
          id:"superhero3",
          name:"Spiderman"
        },
        {
          id:"superhero4",
          name:"Wolverine"
        }
      ],
      btnDisable:false,
      submitText:"Send Push Notification",
      messageText:""
    }
    
  }

  handleChange = event => {
    this.setState({
      messageText: event.target.value
    });
  }
  
  componentDidMount(){
    PushNotification.init(this.props.loggedInUser.uid);
  }

  handleSendMessage=()=>{
    let val = document.getElementById("selectUser").value;
    let msgText = document.getElementById("messageArea").value;
 
    this.sendTextMessage(val, msgText,"user");

  }

  sendTextMessage = (uid, text, msgType) => {

    this.setState({
      btnDisable:true,
      submitText:"Sending Push Notification"
    });
  
    let textMessage = CCManager.getTextMessage(uid, text, msgType);
    
    CometChat.sendMessage(textMessage)
    .then( message => {
        this.setState({
          btnDisable:false,
          submitText:"Send Push Notification",
          messageText:""
        });
      },
      error => {
          console.log("mesage callback error : " + JSON.stringify(error));
      }
    );
  };


  render() {
 
    return (
    <Row className="border-radius-top pushnotificationContainer" >
  
      <Col md={8}>
      
        <Row className="m-10">
            <Col md={12}>
            <h1 style={{textAlign:"center"}}>Push Notification Sample </h1>
            </Col >
        </Row>

        <Row className="m-42">
            <Col md={12}>

            <label className="pnLable">Select User</label>

            <select id="selectUser" className="selectUser">
              {
                 this.state.user.map((option)=>{
                  if(this.props.loggedInUser.uid != option.id){
                    return (<OptionList name={option.name} id={option.id}/>);
                  }
                })
              }
            </select>
            
            </Col>
        </Row>

        <Row className="m-42">
            <Col md={12}>
                <label className="pnLable">Enter Text Message</label>
                <textarea id="messageArea" 
                  className="messageArea" 
                  placeholder="Enter message here" 
                  value={this.state.messageText} 
                  onChange={this.handleChange} ></textarea>
            </Col>
        </Row>      

        <Row>
            <Col md={12} className="btnSendMessageContainer">
            <Button
                  className="btnSendMessage"
                  block
                  disabled={this.state.btnDisable}
                  onClick={this.handleSendMessage.bind(this)}
                  bsSize="large"                
                  type="submit" > 
                    {this.state.submitText}
                  </Button>
            </Col>
        </Row>            
      </Col>
    </Row>
    );
  }
}

function OptionList(props){
   return(
    <option value={props.id}> {props.name}</option>
  )
}



const mapStateToProps = state => {
  return {
    loggedInUser : state.users.loggedInUser
  };
};

const mapDispachToProps = dispatch => {
return {
    sendMessage: (content, uid, msgType) =>  dispatch(actionCreator.sendTextMessage(uid, content, msgType)),
  };
};

export default connect(mapStateToProps,mapDispachToProps)(PushNotificationLayout);
