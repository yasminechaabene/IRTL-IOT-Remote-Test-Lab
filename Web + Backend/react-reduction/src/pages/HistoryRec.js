import Page from 'components/Page';
import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import* as moment from 'moment'
import { getHistory,deleteRec } from 'components/UserFunctions';
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
class HistoryRec extends React.Component {
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
        const recId = id
        deleteRec(recId).then(res => {
            window.location.reload();
        })
    }
    componentDidMount() {
        /*  let models = [...this.state.model]
          getAllModels().then(data =>  models.push(data),
          this.setState({
            model: models
          }))*/
        getHistory()
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
                        <CardHeader>Historique Réclamations</CardHeader>
                        <CardBody>
                            <Table dark>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>objet</th>
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
                                                <td>{user.user.first_name},{user.user.last_name}</td>
                                                <td><Button color="danger" onClick={e =>
                                                        window.confirm("Êtes vous sûr de supprimer cette réclamation ? Cette action est irréversible") &&
                                                        this.onDelete(user._id)
                                                    }>>Supprimer</Button></td>
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

export default HistoryRec;
