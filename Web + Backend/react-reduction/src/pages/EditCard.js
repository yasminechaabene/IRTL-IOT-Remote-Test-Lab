import logo200Image from 'assets/img/users/user.png';
import React from 'react';
import { withRouter } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import axios from 'axios';
const ipRegex = RegExp(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/i);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}
class EditCard extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      ip: '',
      card: {},
      status: true,
      model: 0,
      errors: {
        name: '',
        ip:'',
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
        case 'ip':
          errors.ip =
            ipRegex.test(value)
              ? ''
              : 'Vérifier IP Carte';
          break;
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  }
  isEmpty() {
    if (this.state.name !== '' && this.state.ip !== '')
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

    axios.get(`/cards/getCardById/${params.card}`)
      .then(res => {
       // console.log('card', card);
  
        this.setState({ card :res.data.card});
        this.setState({name:this.state.card.name})
        this.setState({status:this.state.card.status})
        this.setState({ip:this.state.card.ip})
      });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { match: { params } } = this.props;
    if (validateForm(this.state.errors) && this.isEmpty()) {
      const newCard = {
       // model: this.state.model,
        status: this.state.status,
        name: this.state.name,
        ip: this.state.ip,
      }
  
      axios.post(`/cards/editCard/${params.card}`, {
        name: newCard.name,
        status: newCard.status,
        ip:newCard.ip,
      })
      .then(response => {
        console.log('Card edited')
        this.props.history.push(`/cardlist`)
      }).catch(err => {
        console.log(err)
      })
    
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
        <Card style={{ width: 750, height: 400, marginTop: 75 }}>
          <CardHeader>Modifier Carte</CardHeader>
 
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
            <FormGroup row style={{ marginTop: 20 }}>
              <Label for="exampleEmail" sm={2}>
                IP
                      </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="ip"
                  value={this.state.ip}
                  onChange={this.handleChange}
                  noValidate
                />
                {this.state.errors.ip.length > 0 &&
                  <span style={{ fontSize: 12, color: "red" }}>{this.state.errors.ip}</span>}
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleSelect" sm={2}>
               Disponibilité
                  </Label>
              <Col sm={10}>
                <Input type="select" name="status" value={this.state.status} onChange={this.handleChange} >
                  <option value="true">Disponible</option>
                  <option value="false">Indisponible</option>
                </Input>
              </Col>
            </FormGroup>

            <FormGroup check row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button>Enregister</Button>
              </Col>
            </FormGroup>
          </Form>
      
        </Card>

      </Row>



    );
  }
}



export default withRouter(EditCard);
