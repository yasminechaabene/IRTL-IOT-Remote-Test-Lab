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
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
  Row,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  UncontrolledButtonDropdown,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,

} from 'reactstrap';
import jwt_decode from 'jwt-decode';
import { reserve, getCards, getReservations, getAllModels } from 'components/UserFunctions';
import { mongoose } from 'mongoose';
import fr from 'date-fns/locale/fr';
class ReservationPage extends React.Component {
  constructor() {
    super()
    this.state = {
      startDate: '',
      models: [],
      cards: [],
      reser: [],
      cardDispo: [],
      card: 0,
      hours: 0,
      model: 0,
      card2: 0,
      showCard2: false,
      modal: false,
      modal_backdrop: false,
      modal_nested_parent: false,
      modal_nested: false,
      backdrop: true,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  }
  handleChange(event) {
    // this.setState({ value: event.target.value });
    // this.setState({ val: event.target.val });
    this.setState({ [event.target.name]: event.target.value })
  }
  onChange = date => this.setState({ startDate: date })

  componentDidMount() {
    getAllModels()
      .then(res => {
        const models = res;
        this.setState({ models });
      })

    getCards().then(res => {
      const cards = res;
      this.setState({ cards: res });
      //this.setState({ cardDispo: res });
    })
    getReservations().then(res => {
      const reser = res;
      this.setState({ reser: res });
    })

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
  findValue(value, date) {
    let found = false;

    this.state.reser.forEach(e => {
      // console.log(card.card._id)
      if (value._id === e.card._id && moment(e.dateEnd).isSameOrAfter(date, 'day') && moment(e.dateEnd).isSameOrBefore(date, 'day') && e.status == false)
        // console.log(card.card._id)
        found = true
    })
    return found;
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.model !== this.state.model || prevState.startDate !== this.state.startDate) {
      this.state.cards = []
      axios.get(`/cards/getCardsByModel/${this.state.model}`)
        .then(res => {
          //const data = res.data.responses;
          this.setState({ cards: res.data.cards });
         // console.log(this.state.cards)
          this.state.cardDispo = []
          this.state.cards.forEach(card => {
            //console.log(card._id)
            // console.log(this.findValue(card._id))
            if (!this.findValue(card, this.state.startDate)) {
              this.state.cardDispo.push(card)
            }
          })
          console.log(this.state.cardDispo)
          this.forceUpdate();
        })

    }

  }
  handleSubmit = event => {
    event.preventDefault();
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    console.log(this.state.startDate)
    const newRev = {
      user: decoded._id,
      card: this.state.card,
      hours: this.state.hours,
      dateBeg: this.state.startDate,
      dateEnd: moment(this.state.startDate).add(this.state.hours, 'hours').toDate(),
      status: false,
    }
    if (this.state.Card != 0 && this.state.hours != 0 && this.state.startDate !== "") {
      reserve(newRev).then(res => {
        this.props.history.push(`/home`)
      })
    }
    else {
      window.confirm("Choisir Date et carte avant de confirmer")
    }
  }

  render() {
    return (
      <Page>
        <h2 className="presentation-subtitle text-center">
            Réservez la carte adéquate
            </h2>
            <hr></hr>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col md={6} sm={6} xs={12} className="mb-3">

              <Card>
                <CardBody>
                  <CardTitle>Choisir Le modéle de la carte</CardTitle>
                  <FormGroup row>
                    <Label for="exampleSelect" sm={2}>
                      Modéle
                  </Label>

                    <Col sm={10}>
                      <Input type="select" name="model" value={this.state.model} onChange={this.handleChange} >
                        <option value="0"></option>
                        {this.state.models.map(card => {

                          return (
                            <option value={card._id}>{card.name}</option>
                          );
                        })}
                      </Input>
                    </Col>
                  </FormGroup>

                </CardBody>
              </Card>
            </Col>
            <Col md={6} sm={6} xs={12} className="mb-3">

              <Card>
                <CardBody>
                  <CardTitle>Choisir La date</CardTitle>
                  <CardText>
                    <FormGroup row>
                      <DatePicker
                        selected={this.state.startDate}
                        onChange={this.onChange}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        timeCaption="Heure"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        minDate={new Date()}
                      />
                    </FormGroup>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Card>
            <CardBody>

              <Row>

                <Col md={6} sm={6} xs={12} className="mb-3">
                  <Card>
                    <CardBody>
                      <CardTitle>Choisir Une Carte</CardTitle>
                      <FormGroup row>
                        <Label for="exampleSelect" sm={2}>
                          Cartes
                  </Label>

                        <Col sm={10}>
                          <Input type="select" name="card" value={this.state.card} onChange={this.handleChange} >
                            <option value="0"></option>
                            {this.state.cardDispo.map(card => {

                              return (
                                <option value={card._id} disabled={card.status ? false : true}>{card.name} {card.status ? ' (Disponible)' : ' (Indisponible)'}</option>
                              );
                            })}
                          </Input>
                        </Col>
                      </FormGroup>
                    </CardBody>
                  </Card>
                </Col>
                <Col md={6} sm={6} xs={12} className="mb-3">
                  <Card>
                    <CardBody>
                      <CardTitle>Choisir La durée de réservation </CardTitle>
                      <FormGroup row>
                        <Label for="exampleSelect" sm={2}>
                          Durée
                  </Label>
                        <Col sm={10}>
                          <Input type="select" name="hours" color="primary" value={this.state.hours}
                            onChange={this.handleChange} >
                            <option value="0"></option>
                            <option value="1">1 heure </option>
                            <option value="2">2 heures</option>
                            <option value="3">3 heures</option>
                            <option value="4">4 heures</option>
                            <option value="5">5 heures</option>
                            <option value="6">6 heures</option>
                            <option value="7">7 heures</option>
                            <option value="8">8 heures</option>
                            <option value="9">9 heures</option>
                            <option value="10">10 heures</option>
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup check row>
                        <Col sm={{ size: 10, offset: 2 }}>

                        </Col>
                      </FormGroup>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row>

              </Row>


              <Button color="primary">Confirmer</Button>
            </CardBody>
          </Card>
        </Form>
      </Page>
    );
  }
}

export default withRouter(ReservationPage);
