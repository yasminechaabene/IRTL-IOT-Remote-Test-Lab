import logo200Image from 'assets/img/logo/logo_200.png';
import carte from 'assets/img/products/raspberry pi.PNG';
import PropTypes from 'prop-types';
import React from 'react';
import jwt_decode from 'jwt-decode';
import { withRouter,Link } from "react-router-dom";
import { quit } from 'components/UserFunctions';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  CardText,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
class IotTest extends React.Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      errors: {},
      modal: false,
      modal_backdrop: false,
      modal_nested_parent: false,
      modal_nested: false,
    }

    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
 
  componentDidMount() {
  
  }
  toggle = modalType => () => {
    if (!modalType) {
      return this.setState({
        modal: !this.state.modal,
      });
    }
    this.setState({
      [`modal_${modalType}`]: !this.state[`modal_${modalType}`],
    });
  };

  handleSubmit = event => {
    event.preventDefault();
 

  };

  redirect(e) {
    const { match: { params } } = this.props;
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    const newRes = {
      _id: params.reservation,
      name:"Projet N° "+params.reservation,
      index:"FILE",
      user:decoded._id

    }
    console.log(params.reservation)
    quit(newRes)

    e.preventDefault()
    this.props.history.push(`/home`)
  }

  render() {
    

    return (
        
          <Row allowFullScreen>
             <Card  style={{ width:1550, height: 1000 }}>
                <CardHeader>Test Lab</CardHeader>
                <CardBody>
                  <Row>
            <Col md={6} sm={6} xs={12} className="mb-3">
              <Card>
                <CardHeader> Streaming Carte</CardHeader>
                <CardBody>
              Affichage Carte
                </CardBody>
              </Card>
            </Col>
            <Col md={6} sm={6} xs={12} className="mb-3">
              <Card>
                <CardHeader>Index.js
               
                          
                          
                </CardHeader>
                <CardBody>
               <textarea style={{ width:650, height: 700, cursor: 'pointer' }}></textarea>
                    <Row cellPadding={12}>
                        <Link to="/home">
                             <Button color="primary">Tester</Button>
                     
                          </Link>
                         
                  </Row>
                </CardBody>
              </Card>
            </Col>
            </Row>
            
              <Button color="primary" onClick={this.toggle()}>Quitter</Button>
              <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle()}
                    className={this.props.className}>
                    <ModalHeader toggle={this.toggle()}>Avertissement</ModalHeader>
                    <ModalBody>
                      Vous êtes sur le point d'abandonner votre session , vous n'aurez plus d'accès vers cette réservation .<br></br>
                      <hr></hr>
                      NB : Vous Allez trouver votre fichier de test dans la rubrique "Mes Projets"
                  </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={this.redirect.bind(this)}>
                        Quitter quand même
                    </Button>
                    <Button color="secondary" onClick={this.toggle()}>
                        Annuler
                    </Button>
                    </ModalFooter>
                  </Modal>
            
            </CardBody>
            </Card>
          </Row>
  
      );
  }
}



export default withRouter(IotTest);
