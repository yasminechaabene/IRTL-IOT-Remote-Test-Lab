import Page from 'components/Page';
import logo200Image from 'assets/img/logo/logo_200.png';
import carte from 'assets/img/products/raspberry pi.PNG';
import PropTypes from 'prop-types';
import React from 'react';
import * as moment from 'moment'
import { addPattern, getPatterns,deletePattern } from 'components/UserFunctions';
import { withRouter, Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  CardText,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
} from 'reactstrap';
const nameRegex = RegExp(/^[a-zA-Z]+[.]{1}[a-zA-Z]+$/i);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}
class PatternPage extends React.Component {
  constructor() {
    super()
    this.state = {
      patterns: [],
      name: '',
      errors: { name: '', },
      modal: false,
      modal_backdrop: false,
      modal_nested_parent: false,
      modal_nested: false,
    }

    //this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'name':
        errors.name =
          nameRegex.test(value) && this.state.value !== ''
            ? ''
            : 'Vérifier votre Pattern !';
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  }
  isEmpty() {
    if (this.state.name !== '')
      return true
    else
      return false
  }
  componentDidMount() {
    getPatterns()
      .then(res => {
        const patterns = res;
        this.setState({ patterns });
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

  handleSubmit = event => {
    event.preventDefault();
    const newPattern = {
      name: this.state.name,
    }
    if (validateForm(this.state.errors) && this.isEmpty()) {
      addPattern(newPattern).then(res => {
        window.location.reload();
      })
    }
  };
  onDelete(id) {
    const patId = id
    deletePattern(patId).then(res => {
        window.location.reload();
    })
}
  redirect(e) {
    e.preventDefault()
    this.props.history.push(`/home`)
  }

  render() {

    const {
      showLogo,
      onLogoClick,
    } = this.props;
    return (
      <Page title="Utilisateurs" breadcrumbs={[{ name: 'Email Pattern', active: true }]}>


        <Row>
          <Col md={6} sm={6} xs={12} className="mb-3">
            <Card>
              <CardHeader>Mes Email Patterns</CardHeader>
              <CardBody>
                <Table dark>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Pattern</th>
                      <th>Date d'Ajout</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>

                    {this.state.patterns.map(user => {

                      return (
                        <tr>
                          <th scope="row"></th>
                          <td>{user.name}</td>
                          <td>{moment(user.date).format('DD/MM/YYYY h:mm a')}</td>
                          <td><Button color="danger" onClick={e =>
                            window.confirm("Êtes vous sûr de supprimer cet élement ? Cette action est irréversible") &&
                            this.onDelete(user._id)
                          }>Supprimer</Button></td>
                          <td><Button color="info">Bloquer l'accés</Button></td>
                        </tr>);
                    })}

                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col md={6} sm={6} xs={12} className="mb-3">
            <Card>
              <CardHeader>Ajouter un nouveau Pattern

                <Form onSubmit={this.handleSubmit} noValidate >
                  {showLogo && (
                    <div className="text-center pb-4">
                      <img
                        src={logo200Image}
                        className="rounded"
                        style={{ width: 80, height: 80, cursor: 'pointer' }}
                        alt="logo"
                        onClick={onLogoClick}
                      />
                    </div>
                  )}
                  <FormGroup row style={{ marginTop: 20 }}>
                    <Label for="exampleEmail" sm={2}>
                      Pattern
                      </Label>
                    <Col sm={10}>
                      <Input
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        noValidate
                      />
                      {this.state.errors.name.length > 0 &&
                        <span style={{ fontSize: 12, color: "red" }}>{this.state.errors.name}</span>}
                    </Col>
                  </FormGroup>

                  <FormGroup check row>
                    <Col sm={{ size: 10, offset: 2 }}>
                      <Button color="primary">Enregister</Button>
                    </Col>
                  </FormGroup>
                </Form>

              </CardHeader>
              <CardBody>

              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>

    );
  }
}



export default withRouter(PatternPage);
