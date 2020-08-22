import Page from 'components/Page';
import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { getInactiveUsers,disapproveUser,approveUser } from 'components/UserFunctions';
import SearchInput from 'components/SearchInput';
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
class WaitingList extends React.Component {
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
    onApprove(id) {
        const userId = id
        approveUser(userId).then(res => {
            window.location.reload();
        })
    }
    onDisapprove(id) {
        const userId = id
        disapproveUser(userId).then(res => {
            window.location.reload();
        })
    }
    componentDidMount() {
        /*  let models = [...this.state.model]
          getAllModels().then(data =>  models.push(data),
          this.setState({
            model: models
          }))*/
        getInactiveUsers()
            .then(res => {
                const users = res;
                this.setState({ users });
            })
    }

    render() {
        return (
            <Page title="Utilisateurs" breadcrumbs={[{ name: 'Liste Demandes', active: true }]}>

                <Row>
                    <Col>
                        <Card className="mb-3">
                            <CardHeader>IRTL Demandes <SearchInput /></CardHeader>
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
                                                    <td><Button color="danger"onClick={() => this.onDisapprove(user._id)}>Refuser</Button></td>
                                                    <td><Button color="info" onClick={() => this.onApprove(user._id)}>Approuver</Button></td>
                                                </tr>);
                                        })}

                                    </tbody>
                                </Table>
                                <Link to="/trash">
                                <Button color="primary">Corbeille</Button>
                                </Link>
                            </CardBody>
                        </Card>
                    </Col>
                    
                </Row>
            </Page>
        );
    }
}

export default WaitingList;
