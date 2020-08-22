import bg11Image from 'assets/img/bg/background_1920-11.jpg';
import bg18Image from 'assets/img/bg/background_1920-18.jpg';
import bg1Image from 'assets/img/bg/background_640-1.jpg';
import bg3Image from 'assets/img/bg/background_640-3.jpg';
import raspImage from 'assets/img/products/rasp.jpg';
import { UserCard } from 'components/Card';
import Page from 'components/Page';
import { bgCards, gradientCards, overlayCards } from 'demos/cardPage';
import { getStackLineChart, stackLineChartOptions } from 'demos/chartjs';
import React from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom'
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardImgOverlay,
  CardLink,
  CardText,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap';
import { getAllModels } from 'components/UserFunctions';
class CardPage extends React.Component {
  constructor() {
    super()
    this.state = {
      models: [],
      modal: false,
      modal_backdrop: false,
      modal_nested_parent: false,
      modal_nested: false,
      backdrop: true,
    }
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
  openModal(id) {
    this.setState({
      modal: {
        [id]: true
      }
    });
  }
  componentDidMount() {
    /*  let models = [...this.state.model]
      getAllModels().then(data =>  models.push(data),
      this.setState({
        model: models
      }))*/
    getAllModels()
      .then(res => {
        const models = res;
        this.setState({ models });
      })
  }

  render() {
    return (
      <Page>
        <h2 className="presentation-subtitle text-center">
             Les modéles disponibles sur notre plateforme
            </h2>
            <hr></hr>
        <Row>
          {this.state.models.map(model => {

            return (
              <Col md={5} key={model._id} >
                <UserCard
                  avatar={raspImage}
                  title={model.name}
                  text={model.name}
                  style={{
                    height: 300,
                  }}

                >
                  <Button outline color="light" onClick={this.openModal.bind(this, model._id)}>
                    Voir Plus
                </Button>
                  <Modal
                    isOpen={this.state.modal[model._id]}
                    toggle={this.openModal.bind(this, model._id)}
                    className={this.props.className}>
                    <ModalHeader toggle={this.toggle()}>{model.name}</ModalHeader>
                    <ModalBody>
                      {model.description}
                    </ModalBody>
                    <ModalFooter>
                      <Link to="/reservation">
                        <Button color="primary" onClick={this.toggle()}>
                          Réserver
                    </Button></Link>
                      <Button color="secondary" onClick={this.toggle()}>
                        OK
                    </Button>
                    </ModalFooter>
                  </Modal>
                </UserCard>
              </Col>
            );
          })}

        </Row>

      </Page>
    );
  }
}

export default CardPage;
