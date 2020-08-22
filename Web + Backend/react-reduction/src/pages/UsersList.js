import Page from 'components/Page';
import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { getActiveUsers, deleteUser } from 'components/UserFunctions';
import SearchInput from 'components/SearchInput';
import axios from 'axios';
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
    Form, FormGroup, Input, Label,
} from 'reactstrap';
import { MdDelete } from 'react-icons/md';
const classRegex = RegExp(/^[1-5]{1}[a-zA-Z]+[1-9]*$/i);
const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}
class UsersList extends React.Component {
    constructor() {
        super()
        this.state = {
            class: '',
            users: [],
            modal: false,
            modal_backdrop: false,
            modal_nested_parent: false,
            modal_nested: false,
            backdrop: true,
            errors: {
                class: '',
            },
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
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
    onDelete(id) {
        const userId = id
        deleteUser(userId).then(res => {
            window.location.reload();
        })
    }
    componentDidMount() {
        /*  let models = [...this.state.model]
          getAllModels().then(data =>  models.push(data),
          this.setState({
            model: models
          }))*/
        getActiveUsers()
            .then(res => {
                const users = res;
                this.setState({ users });
            })
    }
    isEmpty() {
        if (this.state.class !== '')
            return true
        else
            return false
    }
    handleSubmit(user) {
        // event.preventDefault();
        if (validateForm(this.state.errors) && this.isEmpty()) {
         
            axios.post(`/users/editUser/${user}`, {
                class: this.state.class,
            })
                .then(response => {
                    console.log('Class edited')
                    this.props.history.push(`/users`)
                }).catch(err => {
                    console.log(err)
                })

        }
    }

    render() {
        return (
            <Page title="Utilisateurs" breadcrumbs={[{ name: 'Liste Users', active: true }]}>

                <Row>
                    <Col>
                        <Card className="mb-3">
                            <CardHeader>IRTL USERS <SearchInput /></CardHeader>
                            <CardBody>
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nom</th>
                                            <th>Prénom</th>
                                            <th>Email</th>
                                            <th>Classe</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {this.state.users.map(user => {

                                            return (
                                                <tr>
                                                    <th scope="row"></th>
                                                    <td>{user.last_name}</td>
                                                    <td>{user.first_name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.class}</td>
                                                    <td><Button  color="danger" onClick={e =>
                                                        window.confirm("Êtes vous sûr de supprimer cet élement ? Cette action est irréversible") &&
                                                        this.onDelete(user._id)
                                                    }>Supprimer</Button></td>
                                                    <td><Button color="info" onClick={this.openModal.bind(this, user._id)}>Editer</Button></td>
                                                    <Modal
                                                        isOpen={this.state.modal[user._id]}
                                                        toggle={this.openModal.bind(this, user._id)}
                                                        className={this.props.className}
                                                        zIndex={user._id}>
                                                        <ModalHeader toggle={this.toggle()}>Modifier {user.first_name}  {user.last_name} </ModalHeader>
                                                        <ModalBody>
                                                            <Form onSubmit={this.handleSubmit.bind(this, user._id)} noValidate >


                                                                <FormGroup row>
                                                                    <Label for="exampleEmail" sm={2}>
                                                                        Classe
                                                                    </Label>
                                                                    <Col sm={10}>
                                                                        <Input
                                                                            type="text"
                                                                            name="res"
                                                                            placeholder={user.class}
                                                                            value={this.state.class}
                                                                            onChange={this.handleChange}
                                                                            noValidate
                                                                        />
                                                                        {this.state.errors.class.length > 0 &&
                                                                            <span style={{ fontSize: 12, color: "red" }}>{this.state.errors.class}</span>}
                                                                    </Col>
                                                                </FormGroup>
                                                                <FormGroup check row>
                                                                    <Col sm={{ size: 10, offset: 2 }}>
                                                                        <Button>Confirmer</Button>
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
                                                </tr>);
                                        })}

                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Page>
        );
    }
}

export default UsersList;
