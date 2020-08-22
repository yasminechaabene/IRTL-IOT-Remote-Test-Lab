import { AnnouncementCard, TodosCard } from 'components/Card';
import Page from 'components/Page';
import jwt_decode from 'jwt-decode';
import React from 'react';
import { Route, Link, withRouter, Redirect } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Form,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
  Label,
  CardText,
} from 'reactstrap';
import {
  MdBubbleChart,
  MdInsertChart,
  MdPersonPin,
  MdPieChart,
  MdRateReview,
  MdShare,
  MdShowChart,
  MdThumbUp,
  MdError,
  MdHistory,
  MdAccountBox,
} from 'react-icons/md';
import { getColor } from 'utils/colors';
import Image from 'assets/img/bg/IoT.jpeg';
import moment from 'moment';
import { addRec, getMyReservation } from 'components/UserFunctions';
import { NumberWidget, IconWidget } from 'components/Widget';

class DashboardPageModel extends React.Component {
  constructor() {
    super()
    this.state = {
      id: '',
      modal: false,
      modal_backdrop: false,
      modal_nested_parent: false,
      modal_nested: false,
      backdrop: true,
      reservation: [],
      data:{},
      objet: '',
      rec: '',
      email: '',
      date: '',
      errors: {
        objet: '',
        rec: '',
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }



  handleSubmit = event => {
    event.preventDefault();


  };
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
  checkForReservation() {
    let check = false
    if (this.state.reservation.length != 0) {
      this.state.reservation.forEach(card => {
        if (moment(card.dateEnd).isAfter(new Date()))
          check = true
      })
    }
    console.log(check)
    return check;
  }
  checkForReservationDate(card) {
    let check = false
    if (moment(new Date()).isBetween(card.dateBeg, card.dateEnd))
      check = true

    console.log(check)
    return check;
  }
  componentDidMount() {
    const { match: { params } } = this.props;
    this.setState({ id: params.responseId })
    axios.get(`/responses/getResponse/${params.responseId}`)
      .then(res => {
        const data = res.data.responses;
        this.setState({ data: res.data.responses });
        console.log(this.state.data)
      })
    // console.log(params.responseId)
    this.openModal(params.responseId)
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      email: decoded.email
    })

  }



  render() {
    const primaryColor = getColor('primary');
    const secondaryColor = getColor('secondary');


    return (

      <Page>
          <Container className="tim-container">
          <div className="title">

            <h4>
              <span className="note">La seule plateforme existante , qui vous donne l'opportunité de manipuler des cartes à distance</span>
            </h4>
          </div>
          <hr></hr>
        </Container>

        <Row>

          {this.checkForReservation() ?
            this.state.reservation.map(card => (
              <Col lg={4} md={6} sm={6} xs={12} className="mb-3">
                <IconWidget
                  icon={MdAccountBox}
                  bgColor="primary"
                  title={'Vous Avez Une  Réservation le ' + moment(card.dateBeg).format('DD/MM/YYYY ') + ' de ' + moment(card.dateBeg).format(' h:mm a') + ' jusqu\'à' + moment(card.dateEnd).format(' h:mm a')}
                  button="Commencer"
                  link={this.checkForReservationDate(card) ? `/iot_test/${card._id}` : '/home'}

                />
              </Col>
            )
            ) : <Col lg={4} md={6} sm={6} xs={12} className="mb-3">
              <IconWidget
                bgColor="primary"
                title="Vous n'avez pas aucune réservation "
                button="Réservez Maintenant"
                link="/reservation"

              />
            </Col>}


        </Row>

        <Row>
          <Col md="6" sm="12" xs="12">
            <TodosCard image={Image} title="Cartes" to="/cards"
            />
          </Col>



          <Col lg="6" md="12" sm="12" xs="12">
            <TodosCard />
          </Col>
        </Row>
        <Row>



          <Col lg="10" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>Réclamation </CardHeader>
              <CardBody>
                <CardText>
                  Ici vous pouvez faire une réclamation concernant , le fonctionnement des cartes , une panne quelconque , ou même
                  une remarque afin d'améliorer la plateforme
                </CardText>
                <Form onSubmit={this.handleSubmit} noValidate >

                  <FormGroup row>
                    <Label for="exampleEmail" sm={2}>
                      Objet
                      </Label>
                    <Col sm={10}>
                      <Input
                        type="text"
                        name="objet"
                        value={this.state.objet}
                        onChange={this.handleChange}
                        noValidate
                      />
                      {this.state.errors.objet.length > 0 &&
                        <span style={{ fontSize: 12, color: "red" }}>{this.state.errors.bjet}</span>}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="exampleEmail" sm={2}>
                      Votre Réclamation
                      </Label>
                    <Col sm={10}>
                      <textarea style={{ width: 600, height: 200 }}
                        type="text"
                        name="rec"
                        value={this.state.rec}
                        onChange={this.handleChange}
                        noValidate
                      />
                      {this.state.errors.rec.length > 0 &&
                        <span style={{ fontSize: 12, color: "red" }}>{this.state.errors.rec}</span>}
                    </Col>
                  </FormGroup>
                  <FormGroup check row>
                    <Col sm={{ size: 10, offset: 2 }}>
                      <Button>Envoyer</Button>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal
          isOpen={this.state.modal[this.state.id]}
          toggle={this.openModal.bind(this, this.state.id)}
          className={this.props.className}
          zIndex="1060">
          <ModalHeader>{this.state.data.name}</ModalHeader>
          <ModalBody>
          {this.state.data.description} <hr></hr>
          <span style={{ fontSize: 16, color: "grey" }}> {moment(this.state.data.date).format("DD/MM/YYYY   h:mm a")}</span>
        
          </ModalBody>
          <ModalFooter>
            <Link to="/home">
              <Button color="primary">
                Fermer
            </Button>
            </Link>
          </ModalFooter>
        </Modal>
      </Page>
    );
  }
}
export default withRouter(DashboardPageModel);
