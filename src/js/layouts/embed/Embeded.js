import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from 'react-bootstrap';
import SplashLoader from "../../components/SplashLoader";
import PushNotificationLayout from "../../components/push/PushNotificationLayout";



class Embeded extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
      
    }
    componentDidMount() {
        
        
    }
    
    render() {
             
        console.log("showloader : " + this.props.showLoader);

        if (this.props.showLoader) {

            return (
                <Grid fluid={true} className="border-radius-top bg-white h-100pr">
                    <Row className="ccShowGrid bg-white border-radius-top ">
                        <SplashLoader/>
                    </Row>
                </Grid>
            );

        } else {
            return (
                <Grid fluid={true} className="border-radius-top bg-white h-100pr">
                    <Row className="ccShowGrid">
                        <Col style={{ height: "100%" }}>
                            <PushNotificationLayout />
                        </Col>
                    </Row>
                </Grid>
            );
        }



    };


}






const mapStateToProps = (store) => {
    return {
        showLoader: store.app.splashHandler.showLoader, 
    };
};

const mapDispachToProps = dispatch => {
    return {
                    
    };
};

export default connect(mapStateToProps, mapDispachToProps)(Embeded);
