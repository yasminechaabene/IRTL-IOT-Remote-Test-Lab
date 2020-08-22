import Page from 'components/Page';
import jwt_decode from 'jwt-decode';
import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Form,
  FormGroup,
  Input,
  Label,
  CardText,
  Container
} from 'reactstrap';
import {
  MdAccountBox,
} from 'react-icons/md';
import { getColor } from 'utils/colors';
import moment from 'moment';
import { addRec,} from 'components/UserFunctions';
import {IconWidget } from 'components/Widget';
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7,
);

class DashboardPage extends React.Component {
  constructor() {
    super()
    this.state = {
      reservation: [],
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


  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'objet':
        errors.objet =
          value.length > 3
            ? ''
            : 'Vérifier votre Objet !';
        break;
      case 'rec':
        errors.rec =
          value.length > 5
            ? ''
            : 'Contenu Réclamation ne doit pas être vide !';
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  }
  isEmpty() {
    if (this.state.objet !== '' && this.state.rec !== '')
      return true
    else
      return false
  }

  handleSubmit = event => {
    event.preventDefault();
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    const newRec = {
      user: decoded._id,
      name: this.state.objet,
      description: this.state.rec,

    }
    if (validateForm(this.state.errors) && this.isEmpty()) {
      addRec(newRec).then(res => {
        window.location.reload();
      })
    }

  };
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      email: decoded.email
    })
    window.scrollTo(0, 0);
    let user = decoded._id
    axios.get(`/reservations/getMyReservation/${user}`)
      .then(res => {
        const reservation = res.data;
        this.setState({ reservation: res.data.reservation });
      })
    // this.checkForReservationDate()
    // this.checkForReservation()
    // this.checkForLength()
  }
  checkForReservation(card) {
    let check = false
    if (this.state.reservation.length != 0) {
      //  this.state.reservation.forEach(card => {
      if (moment(card.dateEnd).isAfter(new Date()))
        check = true
      //   })
    }
    console.log(check)
    return check;
  }
  checkForLength() {
    let check = false
    if (this.state.reservation.length != 0) {
      //  this.state.reservation.forEach(card => {
      //  if (moment(card.dateEnd).isAfter(new Date()))
      check = true
      //   })
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
  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    this.props.history.push(`/login`)

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

          {this.checkForLength() ?
            this.state.reservation.map(card => (
              this.checkForReservation(card) &&
              <Col lg={4} md={6} sm={6} xs={12} className="mb-3">
                <IconWidget
                  icon={MdAccountBox}
                  bgColor="primary"
                  title={'Vous Avez Une  Réservation le ' + moment(card.dateBeg).format('DD/MM/YYYY ') + ' de ' + moment(card.dateBeg).format(' h:mm a') + ' jusqu\'à' + moment(card.dateEnd).format(' h:mm a')}
                  button="Commencer"
                  //href={this.checkForReservationDate(card)&&`http://${card.card.ip}`}
                  href={this.checkForReservationDate(card)&&`http://localhost:3000/iot_test/${card._id}`}

                />
              </Col>
            )
            ) : <Col lg={4} md={6} sm={6} xs={12} className="mb-3">
              <IconWidget
                bgColor="primary"
                title="Vous n'avez pas aucune réservation "
                button="Réservez mainetenant"
                href={`http://localhost:3000/reservation`}

              />
            </Col>}


        </Row>

        <div
          className="page-header section-dark"
          style={{
            backgroundImage:
              "url(" + require("assets/img/bg/wallpaper20.jpg") + ")"
          }}
        >

       
            <Card  style={{height:500,width:800
          }}>
              <CardHeader>Réclamation </CardHeader>
              <CardBody>
                <CardText>
                  Ici vous pouvez faire une réclamation concernant , le fonctionnement des cartes IOT, une panne quelconque , ou même
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
        </div>

      </Page>
    );
  }
}
export default withRouter(DashboardPage);
