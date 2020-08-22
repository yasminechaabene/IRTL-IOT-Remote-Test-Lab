import logo200Image from 'assets/img/logo/logo_200.png';
import React from 'react';
import {
  Button, Card,
  CardBody,
  CardImg,
  CardImgOverlay,
  CardLink,
  CardText,
  Media,
  Col,
  Row,
} from 'reactstrap';
import { withRouter, Link } from "react-router-dom";

class BlankPage extends React.Component {
  constructor() {
    super()
    this.state = {
      modal: true,
      modal_backdrop: false,
      modal_nested_parent: false,
      modal_nested: false,
      backdrop: true,
    }

  }

  render() {


    return (
   
        <div style={{ textAlign: "center" }}>
          <h1>Votre demande d'adhésion est en cours de traitement</h1>

          <Link to="/login">
            <Media style={{ textAlign: "center" }}>Reconnectez Vous </Media></Link>
        </div>

    );
  }
}



export default withRouter(BlankPage);
