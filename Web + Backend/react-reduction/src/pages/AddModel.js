import logo200Image from 'assets/img/users/user.png';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import jwt_decode from 'jwt-decode';
import { addModel } from 'components/UserFunctions';
import axios from 'axios';
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const nameRegex = RegExp(/^[a-zA-Z]+$/i);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}
class AddModel extends React.Component {
  constructor() {
    super()
    this.state = {
      model: {},
      name: '',
      description: '',
      profileImg: '',
      errors: {
        description: '',
        name: '',
      },
      modal: false,
      modal_backdrop: false,
      modal_nested_parent: false,
      modal_nested: false,
      backdrop: true,
    }
    this.onFileChange = this.onFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'name':
        errors.name =
          value.length > 4
            ? ''
            : 'Vérifier le nom !';
        break;
      case 'description':
        errors.description =
          value.length < 4
            ? 'Une description est nécessaire'
            : '';
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  }
  isEmpty() {
    if (this.state.name !== '' && this.state.description !== '')
      return true
    else
      return false
  }
  onFileChange(e) {
    this.setState({ profileImg: e.target.files[0] })
  }
  redirect(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    this.props.history.push(`/login`)
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

  componentDidMount() {
    const { match: { params } } = this.props;
    ///this.setState({ id: params.responseId })
    if ( typeof params.model !== "undefined") {
      axios.get(`/models/getModel/${params.model}`)
      .then(res => {
        // const data = res.data.responses;
        this.setState({ model: res.data.cardModel });
        console.log(this.state.model)
        this.setState({ name: this.state.model.name })
        this.setState({ description: this.state.model.description })
      })
    }
  }

  handleSubmit = event => {
    const { match: { params } } = this.props;
    event.preventDefault();
    const newModel = {
      // _id: decoded._id,
      name: this.state.name,
      description: this.state.description,
    }
    console.log(newModel._id)
    if (validateForm(this.state.errors) && this.isEmpty()) {
      if ( typeof params.model === "undefined")
      addModel(newModel).then(res => {
        //localStorage.removeItem('usertoken')
        this.props.history.push(`/models`)
      })
      else{
        axios.post(`/models/editModel/${params.model}`, {
          name: newModel.name,
          description: newModel.description,
        })
        .then(response => {
          console.log('Model edited')
          this.props.history.push(`/models`)
        }).catch(err => {
          console.log(err)
        })
      }
    }
    /* const formData = new FormData()
     formData.append('profileImg', this.state.profileImg)
     axios.post("http://localhost:5000/users/user-profile", formData, {
       first_name:this.state.first_name,
       last_name:this.state.last_name,
       email:this.state.email,
       password:this.state.password
     }).then(res => {
       localStorage.removeItem('usertoken')
       this.props.history.push(`/login`)
          
     }) */


  };

  renderButtonText() {
    const { buttonText } = this.props;

    if (!buttonText && this.isLogin) {
      return 'Connexion';
    }

    if (!buttonText && this.isSignup) {
      return 'Inscription';
    }

    return buttonText;
  }

  render() {
    const {
      showLogo,
      onLogoClick,
    } = this.props;

    return (
      <Row
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Card style={{ width: 800, height: 600, marginTop: 75 }}>
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
                Nom
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
            <FormGroup row>
              <Label for="exampleEmail" sm={2}>
                description
                      </Label>
              <Col sm={10}>
                <textarea
                  type="text"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  style={{ width: 300, height: 300, cursor: 'pointer' }}
                  noValidate
                />
                {this.state.errors.description.length > 0 &&
                  <span style={{ fontSize: 12, color: "red" }}>{this.state.errors.description}</span>}
              </Col>
            </FormGroup>


            <FormGroup check row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button>Enregister</Button>
                <Modal
                  isOpen={this.state.modal}
                  toggle={this.toggle()}
                  className={this.props.className}>
                  <ModalHeader toggle={this.toggle()}>Modifications avec succés</ModalHeader>
                  <ModalBody>
                    Votre compte a été mis à jour , il faut reconnecter avec les nouveaux creds
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.redirect.bind(this)}>
                      OK
                    </Button>
                  </ModalFooter>
                </Modal>
              </Col>
            </FormGroup>
          </Form>
        </Card>

      </Row>



    );
  }
}

AddModel.propTypes = {

  onLogoClick: PropTypes.func,
};

AddModel.defaultProps = {

  onLogoClick: () => { },
};

export default withRouter(AddModel);
