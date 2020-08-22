import Page from 'components/Page';
import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import * as moment from 'moment'
import { getReclamations, checkRec,addResponse } from 'components/UserFunctions';
import jwt_decode from 'jwt-decode';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row, Table,
    Form,
    FormGroup,
    FormText,
    Input,
    Label,
} from 'reactstrap';
const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }
class ReclamationsList extends React.Component {
    constructor() {
        super()
        this.state = {
            users: [],
            res: '',
            modal: false,
            modal_backdrop: false,
            modal_nested_parent: false,
            modal_nested: false,
            backdrop: true,
            errors: {
                res: '',
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this)
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
    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'res':
                errors.res =
                    value.length > 8 && this.isEmpty()
                        ? ''
                        : 'Contenu Réponse ne doit pas être vide !';
                break;
            default:
                break;
        }
        this.setState({ errors, [name]: value });
    }
    isEmpty() {
        if ( this.state.res !== '')
          return true
        else
          return false
      }
    handleSubmit(user,reclamation,object){
        //event.preventDefault();
        const newRes = {
            name: "RE: "+object,
            description: this.state.res,
            user:user,
            reclamation:reclamation

        }
         if (validateForm(this.state.errors)) {
         addResponse(newRes).then(res => {
         window.location.reload();
         })
          }

    };
    onDelete(id) {
        const recId = id
        checkRec(recId).then(res => {
            window.location.reload();
        })
    }
    componentDidMount() {
        /*  let models = [...this.state.model]
          getAllModels().then(data =>  models.push(data),
          this.setState({
            model: models
          }))*/
        getReclamations()
            .then(res => {
                const users = res;
                this.setState({ users });
            })
    }

    responseObject(object) { 
        return "RE: "+object
    }

    render() {
        return (
            <Page title="Utilisateurs" breadcrumbs={[{ name: 'Liste Users', active: true }]}>

                <Row>
                    <Col>
                        <Card className="mb-3">
                            <CardHeader>IRTL Reclamations</CardHeader>
                            <CardBody>
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Objet</th>
                                            <th>Contenu</th>
                                            <th>Date</th>
                                            <th>user</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {this.state.users.map(user => {

                                            return (
                                                <tr>
                                                    <th scope="row"></th>
                                                    <td>{user.name}</td>
                                                    <td>{user.description}</td>
                                                    <td>{moment(user.date).format('DD/MM/YYYY h:mm a')}</td>
                                                    <td>{user.user.first_name}  {user.user.last_name}</td>
                                                    <td><Button color="info" onClick={this.openModal.bind(this, user._id)}>Répondre</Button></td>
                                                    <Modal
                                                        isOpen={this.state.modal[user._id]}
                                                        toggle={this.openModal.bind(this, user._id)}
                                                        className={this.props.className}
                                                        zIndex={user._id}>
                                                        <ModalHeader toggle={this.toggle()}>Répondre {user.user.first_name}  {user.user.last_name} </ModalHeader>
                                                        <ModalBody>
                                                            <Form onSubmit={this.handleSubmit.bind(this,user.user._id,user._id,user.name)} noValidate >

                                                                <FormGroup row>
                                                                    <Label for="exampleEmail" sm={2}>
                                                                        Objet
                                                                    </Label>
                                                                    <Col sm={10}>
                                                                        <Input
                                                                            type="text"
                                                                            name="objet"
                                                                            value={this.responseObject(user.name)}
                                                                            //onChange={this.handleChange}
                                                                            noValidate
                                                                            disabled
                                                                        />
                                                                    </Col>
                                                                </FormGroup>
                                                                <FormGroup row>
                                                                    <Label for="exampleEmail" sm={2}>
                                                                        Votre Réponse
                                                                    </Label>
                                                                    <Col sm={10}>
                                                                        <textarea style={{ width: 300, height: 200 }}
                                                                            type="text"
                                                                            name="res"
                                                                            value={this.state.res}
                                                                            onChange={this.handleChange}
                                                                            noValidate
                                                                        />
                                                                        {this.state.errors.res.length > 0 &&
                                                                            <span style={{ fontSize: 12, color: "red" }}>{this.state.errors.res}</span>}
                                                                    </Col>
                                                                </FormGroup>
                                                                <FormGroup check row>
                                                                    <Col sm={{ size: 10, offset: 2 }}>
                                                                        <Button>Envoyer</Button>
                                                                    </Col>
                                                                </FormGroup>
                                                            </Form>
                                                        </ModalBody>
                                                        <ModalFooter>
                                                            <Button color="primary" onClick={this.toggle()}>
                                                                Annuler
                                                           </Button>
                                                        </ModalFooter>
                                                    </Modal>

                                                </tr>
                                            );

                                        })}

                                    </tbody>
                                </Table>
                                <Link to="/historyReclamations">
                                    <Button color="primary">historique</Button>
                                </Link>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Page>
        );
    }
}

export default ReclamationsList;
