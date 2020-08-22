import logo200Image from 'assets/img/logo/logo_200.png';
import React from 'react';
import { Button,   Card,
  CardBody,
  CardImg,
  CardImgOverlay,
  CardLink,
  CardText,
  CardTitle,
  Media,
  Col,
  Row, } from 'reactstrap';
import { withRouter, Link } from "react-router-dom";

class RefusePage extends React.Component {
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
   
           <div style={{ textAlign:"center"}}>
            
                <h1>Votre demande d'adhésion a été refusée .Contactez l'administration pour plus de détails ou connectez vous Avec un autre compte</h1>
                <Link to="/login">
            <Media>Connexion </Media></Link>
            </div>
    );
  }
}



export default withRouter(RefusePage);
