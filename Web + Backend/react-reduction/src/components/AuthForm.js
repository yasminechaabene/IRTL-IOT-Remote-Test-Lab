import logo200Image from 'assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Button, Form, FormGroup, Input, Label, Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import { register } from './UserFunctions';
import { login, getRole, getState, getPatterns } from './UserFunctions';
import { withRouter } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import axios from 'axios';
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const classRegex = RegExp(/^[1-5]{1}[a-zA-Z]+[1-9]*$/i);
const nameRegex = RegExp(/^[a-zA-Z]+$/i);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}
class AuthForm extends React.Component {
  constructor() {
    super()
    this.state = {
      patterns: [],
      state: '',
      role: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmPassword: '',
      class: '',
      emailValid: false,
      passwordValid: false,
      formValid: false,
      classValid: false,
      modal: false,
      modal_backdrop: false,
      modal_nested_parent: false,
      modal_nested: false,
      backdrop: true,
      errors: {
        email: '',
        password: '',
        class: '',
        first_name: '',
        last_name: '',
        confirmPassword: '',
      },
    }

    //this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  get isLogin() {
    return this.props.authState === STATE_LOGIN;
  }

  get isSignup() {
    return this.props.authState === STATE_SIGNUP;
  }


  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
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
    getPatterns()
      .then(res => {
        const patterns = res;
        this.setState({ patterns });
      })


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
        /* errors.email =
           validEmailRegex.test(value) && (this.isPattern())
             ? ''
             : 'Email Non valide ou Email Pattern non valable!';*/
        if (validEmailRegex.test(value)) {
          //errors.email='';
          if (!this.isPattern())
            errors.email = 'Email Pattern ne fait pas partie de notre plateforme'
          else
            errors.email = ''

        }
        else
          errors.email = 'Email non Valide'
        break;
      case 'password':
        errors.password =
          (value.length < 6) && (typeof value !== "undefined")
            ? 'Mot de passe doit contenir au moins 6 caractéres !'
            : '';
        break;
      case 'confirmPassword':
        errors.confirmPassword =
          (value === this.state.password)
            ? ''
            : 'mot de passe n\'est pas identique ';
        break;
      case 'class':
        errors.class =
          classRegex.test(value)
            ? ''
            : 'Calsse Non Valide : EXP 3A2';
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  }
  changeAuthState = authState => event => {
    event.preventDefault();

    this.props.onChangeAuthState(authState);
  };
  isEmpty() {
    if (this.state.first_name !== '' && this.state.last_name !== '' && this.state.email !== '' && this.state.password !== ''
      && this.state.confirmPassword !== '' && this.state.class !== '')
      return true
    else
      return false
  }
  isPattern() {
    let valid = false;
    let pattern = this.state.email.substring(this.state.email.indexOf('@') + 1);
    console.log(pattern)
    this.state.patterns.forEach(pat => {
      if (pat.name.indexOf(pattern) != -1)
        valid = true
    }
    )
    return valid
    //valid?this.state.errors.email="":this.state.errors.email="Email Pattern Non Valide"
  }
  isEmptyLogin() {
    if (this.state.email !== '' && this.state.password !== '')
      return true
    else
      return false
  }

  handleSubmit = event => {
    event.preventDefault();
    const newUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      class: this.state.class
    }
    const user = {
      email: this.state.email,
      password: this.state.password
    }

    if (validateForm(this.state.errors) && (this.isSignup ? this.isEmpty() : this.isEmptyLogin)) {
      axios.get(`/users/getState/${this.state.email}`)
        .then(res => {
          //const reservation = res.data;
          console.log(res.data)
          this.setState({ state: res.data });
        })
      axios.get(`/users/getRole/${this.state.email}`)
        .then(res => {
          //const reservation = res.data;
          console.log(res.data)
          this.setState({ role: res.data });
          localStorage.setItem('role', res.data)
        })
      this.isSignup ? register(newUser).then(res => {
        //this.changeAuthState(STATE_LOGIN)
        this.props.history.push(`/login`)
      }) : login(user).then(res => {


        if (res==="1") {

          // console.log(localStorage.getItem('admin'))
          // this.isAdmin ? this.props.history.push(`/administration`) : this.props.history.push(`/home`)
       
          window.confirm("Email ou mot de passe erroné")
        }
        else 
         {
          if (this.state.role === 'user') {
            if (this.state.state == 1) {
              this.props.history.push(`/home`)
               window.location.reload();
               console.log(res)
            }
            else if (this.state.state == 0)
              this.props.history.push(`/redirect`)
            else
              this.props.history.push(`/refuseaccess`)

          }
          else   if (this.state.role === 'admin') {
           this.props.history.push(`/administration`)
           window.location.reload();
          }
         }
      })
    }
    else {
      console.error('Invalid Form')
      //this.state.modal = true
      //this.toggle(this.state.modal)
      window.confirm("Formulaire Invalide")


    }

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
      firstnameLabel,
      firstnameInputProps,
      lastnameLabel,
      lastnameInputProps,
      usernameLabel,
      usernameInputProps,
      passwordLabel,
      passwordInputProps,
      confirmPasswordLabel,
      confirmPasswordInputProps,
      classLabel,
      classInputProps,
      children,
      onLogoClick,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit} noValidate>
        {showLogo && (
          <div className="text-center pb-4">
            <img
              src={logo200Image}
              className="rounded"
              style={{ width: 60, height: 60, cursor: 'pointer' }}
              alt="logo"
              //onClick={onLogoClick}
            />
          </div>
        )}

        <FormGroup>
          <Label for={usernameLabel}>{usernameLabel}</Label>
          <Input
            type="email"
            name="email"
            placeholder="Exp@email.com"
            value={this.state.email}
            onChange={this.handleChange}
            noValidate />
          {this.state.errors.email.length > 0 &&
            <span style={{ fontSize: 12, color: "red" }}>{this.state.errors.email}</span>}
        </FormGroup>
        <FormGroup>
          <Label for={passwordLabel}>{passwordLabel}</Label>
          <Input type="password"
            name="password"
            placeholder="Votre Mot de passe"
            value={this.state.password}
            onChange={this.handleChange} noValidate />
          {this.state.errors.password.length > 0 &&
            <span style={{ fontSize: 12, color: "red" }}>{this.state.errors.password}</span>}
        </FormGroup>
        {this.isSignup && (
          <FormGroup>
            <Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
            <Input type="password"
              name="confirmPassword"
              placeholder="Confirmer Votre mot de passe"
              value={this.state.confirmPassword}
              onChange={this.handleChange} noValidate
            />
            {this.state.errors.confirmPassword.length > 0 &&
              <span style={{ fontSize: 12, color: "red" }}>{this.state.errors.confirmPassword}</span>}

          </FormGroup>

        )}
        {this.isSignup && (
          <FormGroup>
            <Label for={firstnameLabel}>{firstnameLabel}</Label>
            <Input type="text"
              name="first_name"
              placeholder=" Votre Prénom"
              value={this.state.first_name}
              onChange={this.handleChange} noValidate />
            {this.state.errors.first_name.length > 0 &&
              <span style={{ fontSize: 12, color: "red" }}>{this.state.errors.first_name}</span>}
          </FormGroup>
        )}
        {this.isSignup && (
          <FormGroup>
            <Label for={lastnameLabel}>{lastnameLabel}</Label>
            <Input type="text"
              name="last_name"
              placeholder=" Votre Nom"
              value={this.state.last_name}
              onChange={this.handleChange} noValidate />
            {this.state.errors.last_name.length > 0 &&
              <span style={{ fontSize: 12, color: "red" }}>{this.state.errors.last_name}</span>}
          </FormGroup>


        )}
        {this.isSignup && (
          <FormGroup>
            <Label for={classLabel}>{classLabel}</Label>
            <Input type="text"
              name="class"
              placeholder="Votre Classe "
              value={this.state.class}
              onChange={this.handleChange} noValidate />
            {this.state.errors.class.length > 0 &&
              <span style={{ fontSize: 12, color: "red" }}>{this.state.errors.class}</span>}
          </FormGroup>

        )}
        <hr />
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block>
          {this.renderButtonText()}
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle()}
          className={this.props.className}>
          <ModalHeader toggle={this.toggle()}>Avertissement</ModalHeader>
          <ModalBody>
            Formulaire invalid
                  </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle()}>
              OK
                    </Button>
          </ModalFooter>
        </Modal>

        <div className="text-center pt-1">
          <h6>Ou</h6>
          <h6>
            {this.isSignup ? (
              <a href="#login" onClick={this.changeAuthState(STATE_LOGIN)}>
                Connexion
              </a>
            ) : (
                <a href="#signup" onClick={this.changeAuthState(STATE_SIGNUP)}>
                  Inscription
                </a>
              )}
          </h6>
        </div>

        {children}
      </Form>
    );
  }

}

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';



AuthForm.propTypes = {
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

AuthForm.defaultProps = {
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


export default withRouter(AuthForm);

