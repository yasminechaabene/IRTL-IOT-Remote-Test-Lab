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
import { update } from './UserFunctions';
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
class Profile extends React.Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      profileImg: '',
      errors: {
        email: '',
        password: '',
        first_name: '',
        last_name: '',
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
      case 'first_name':
        errors.first_name =
          nameRegex.test(value) && this.state.value !== ''
            ? ''
            : 'Vérifier votre Prénom !';
        break;
      case 'last_name':
        errors.last_name =
          nameRegex.test(value)
            ? ''
            : 'Vérifier votre Nom !';
        break;
      case 'email':
        errors.email =
          validEmailRegex.test(value)
            ? ''
            : 'Email Non valide !';
        break;
      case 'password':
        errors.password =
          value.length < 6
            ? 'Mot de passe doit contenir au moins 6 caractéres !'
            : '';
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  }
  isEmpty() {
    if (this.state.first_name !== '' && this.state.last_name !== '' && this.state.email !== '' && this.state.password !== '')
      return true
    else
      return false
  }
  onFileChange(e) {
    this.setState({ profileImg:e.target.files[0] })
    console.log(this.state.profileImg)
    //this.setState({ profileImg:URL.createObjectURL (e.target.files[0]) })
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
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    axios.get(`/users/getImage/${decoded._id}`)
    .then(res => {
      //const reservation = res.data;
      console.log(res.data)
      this.setState({ profileImg: res.data });
    })
   // let image = decoded.profileImg.substring(decoded.profileImg.indexOf('public') );
    this.setState({
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      email: decoded.email,
      //password: decoded.password,
     // profileImg:decoded.profileImg,


    })
    console.log(this.state.profileImg)
   
  }

  handleSubmit = event => {
    event.preventDefault();
    const { match: { params } } = this.props;
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    const newUser = {
      _id: decoded._id,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      profileImg: this.state.profileImg
    }
   
    if (validateForm(this.state.errors) && this.isEmpty()) {
      update(newUser).then(res => {
        const formData = new FormData()
        formData.append('profileImg', newUser.profileImg)
        axios.post(`/users/user-profile/${newUser._id}`, formData, {
        })
        localStorage.clear()
        this.props.history.push(`/login`)
      })
    }
    else
    {
      window.confirm("Formulaire Invalide")
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
        <Col md={6} lg={4}>
          <Card body>
            <Form onSubmit={this.handleSubmit} noValidate >
              {showLogo && (
                <div className="text-center pb-4">
                  <img
                    src={this.state.profileImg}
                    className="rounded"
                    style={{ width: 80, height: 80, cursor: 'pointer' }}
                    alt="Profile Image"
                    onClick={onLogoClick}
                  />
                </div>
              )}
              <FormGroup row>
                <Label for="exampleEmail" sm={2}>
                  Nom
                      </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="last_name"
                    value={this.state.last_name}
                    onChange={this.handleChange}
                    noValidate
                  />
                  {this.state.errors.last_name.length > 0 &&
                    <span style={{ fontSize: 12, color: "red" }}>{this.state.errors.last_name}</span>}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleEmail" sm={2}>
                  Prénom
                      </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="first_name"
                    value={this.state.first_name}
                    onChange={this.handleChange}
                    noValidate
                  />
                  {this.state.errors.first_name.length > 0 &&
                    <span style={{ fontSize: 12, color: "red" }}>{this.state.errors.first_name}</span>}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleEmail" sm={2}>
                  Adresse mail
                      </Label>
                <Col sm={10}>
                  <Input
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    noValidate
                  />
                  {this.state.errors.email.length > 0 &&
                    <span style={{ fontSize: 12, color: "red" }}>{this.state.errors.email}</span>}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="examplePassword" sm={2}>
                  Mot de passe
                      </Label>
                <Col sm={10}>
                  <Input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    noValidate
                  />
                  {this.state.errors.password.length > 0 &&
                    <span style={{ fontSize: 12, color: "red" }}>{this.state.errors.password}</span>}
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleFile" sm={2}>
                  Changer Image
                      </Label>
                <Col sm={10}>
                  <Input type="file" name="file" onChange={this.onFileChange} />
                  <FormText color="muted">
                    Vous pouvez importer un fichier de format .jpg ou .png comme étant
                    une photo de profil
                        </FormText>
                </Col>
              </FormGroup>


              <FormGroup check row>
                <Col sm={{ size: 10, offset: 2 }}>
                  <Button>Enregister Modifications</Button>
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
        </Col>
      </Row>



    );
  }
}

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';

Profile.propTypes = {
  authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]).isRequired,
  showLogo: PropTypes.bool,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  firstnameLabel: PropTypes.string,
  firstnameInputProps: PropTypes.object,
  lastnameLabel: PropTypes.string,
  lastnameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  classLabel: PropTypes.string,
  classInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
};

Profile.defaultProps = {
  authState: 'LOGIN',
  showLogo: true,
  firstnameLabel: 'Prénom',
  firstnameInputProps: {
    type: 'text',
    placeholder: 'Votre Prénom',

  },
  lastnameLabel: 'Nom',
  lastnameInputProps: {
    type: 'text',
    placeholder: 'Votre Nom',
  },
  usernameLabel: 'Email',
  usernameInputProps: {
    type: 'email',
    placeholder: 'your@email.com',
  },
  passwordLabel: 'Mot de passe',
  passwordInputProps: {
    type: 'password',
    placeholder: 'Votre mot de passe',
  },
  confirmPasswordLabel: 'Confirmer Mot de passe',
  confirmPasswordInputProps: {
    type: 'password',
    placeholder: 'Confirmer Votre mot de passe',
  },
  classLabel: 'Classe',
  classInputProps: {
    type: 'text',
    placeholder: 'Votre Classe (exp 1A1)',
  },
  onLogoClick: () => { },
};

export default withRouter(Profile);
