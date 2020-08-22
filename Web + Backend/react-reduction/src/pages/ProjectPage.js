import Page from 'components/Page';
import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { deleteProject } from 'components/UserFunctions';
import * as moment from 'moment'
import jwt_decode from 'jwt-decode';
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
    Row, Table
} from 'reactstrap';
class ProjectPage extends React.Component {
    constructor() {
        super()
        this.state = {
            projects: [],
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
        const projectId = id
        deleteProject(projectId).then(res => {
            window.location.reload();
        })
    }
    componentDidMount() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        const projectId = decoded._id
        let user = decoded._id
        axios.get(`/projects/getMyProjects/${user}`)
            .then(res => {
                const reservation = res.data;
                this.setState({ projects: res.data.projects });
            })
    }



    render() {
        return (
            <Page>
                <h2 className="presentation-subtitle text-center">
                   Mes projets récents
            </h2>
                <hr></hr>

                <Row>
                    <Col>
                        <Card className="mb-3">
                            <CardHeader>Mes Projets</CardHeader>
                            <CardBody>
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nom</th>
                                            <th>Date de création</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {this.state.projects.map(user => {

                                            return (
                                                <tr>
                                                    <th scope="row"></th>
                                                    <td>{user.name}</td>
                                                    <td>{moment(user.date).format('DD/MM/YYYY h:mm a')}</td>
                                                    <td><Button color="info">Exporter</Button></td>
                                                    <td><Button color="danger" onClick={e =>
                                                        window.confirm("Êtes vous sûr de supprimer cet élement ? Cette action est irréversible") &&
                                                        this.onDelete(user._id)
                                                    }>Supprimer</Button></td>

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

export default ProjectPage;
