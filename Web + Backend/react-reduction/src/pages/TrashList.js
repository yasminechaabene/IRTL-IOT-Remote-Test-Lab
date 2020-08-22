import Page from 'components/Page';
import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { getBlockedUsers,deleteUser,approveUser } from 'components/UserFunctions';
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
    Row, Table
} from 'reactstrap';
class TrashList extends React.Component {
    constructor() {
        super()
        this.state = {
            users: [],
            modal: false,
            modal_backdrop: false,
            modal_nested_parent: false,
            modal_nested: false,
            backdrop: true,
        }
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
    onDelete(id) {
        const userId = id
        deleteUser(userId).then(res => {
            window.location.reload();
        })
    }
    onApprove(id) {
        const userId = id
        approveUser(userId).then(res => {
            window.location.reload();
        })
    }
    componentDidMount() {
        /*  let models = [...this.state.model]
          getAllModels().then(data =>  models.push(data),
          this.setState({
            model: models
          }))*/
        getBlockedUsers()
            .then(res => {
                const users = res;
                this.setState({ users });
            })
    }

    render() {
        return (


            <Row>
                <Col>
                    <Card className="mb-3">
                        <CardHeader>IRTL Corbeille</CardHeader>
                        <CardBody>
                            <Table dark>
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
                                                <td><Button color="danger" onClick={e =>
                                                        window.confirm("Êtes vous sûr de supprimer cet utilisateur ? Cette action est irréversible") &&
                                                        this.onDelete(user._id)
                                                    }>>Supprimer</Button></td>
                                                <td><Button color="info"  onClick={() => this.onApprove(user._id)}>Approuver</Button></td>
                                            </tr>);
                                    })}

                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>

            </Row>
        );
    }
}

export default TrashList;
