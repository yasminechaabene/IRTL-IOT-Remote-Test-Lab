import Page from 'components/Page';
import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { getCards, deleteCard } from 'components/UserFunctions';
import SearchInput from 'components/SearchInput';
import * as moment from 'moment'
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
class CardList extends React.Component {
    constructor() {
        super()
        this.state = {
            cards: [],
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
    openModal(id) {
        this.setState({
            modal: {
                [id]: true
            }
        });
    }
    onDelete(id) {
        const cardId = id
        deleteCard(cardId).then(res => {
            window.location.reload();
        })
    }
    componentDidMount() {
        getCards()
            .then(res => {
                const cards = res;
                this.setState({ cards });
            })
    }



    render() {
        return (
            <Page title="Cartes" breadcrumbs={[{ name: 'Liste Cartes', active: true }]}>

                <Row>
                    <Col>
                        <Card className="mb-3">
                            <CardHeader>IRTL Cards  <SearchInput /></CardHeader>
                            <CardBody>
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nom</th>
                                            <th>IP</th>
                                            <th>Date d'ajout</th>
                                            <th>Modéle</th>
                                            <th>Statut</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {this.state.cards.map(user => {

                                            return (
                                                <tr>
                                                    <th scope="row"></th>
                                                    <td>{user.name}</td>
                                                    <td>{user.ip}</td>
                                                    <td>{moment(user.date).format('DD/MM/YYYY')}</td>
                                                    <td>{user.model.name}</td>
                                                    <td>{user.status ? "Disponible" : "Indisponible"}</td>
                                                    <td><Button color="danger" onClick={e =>
                                                        window.confirm("Êtes vous sûr de supprimer cet élement ? Cette action est irréversible") &&
                                                        this.onDelete(user._id)
                                                    }>Supprimer</Button></td>
                                                    <Link to={`/editCard/${user._id}`}>
                                                        <td><Button color="info" onClick>Editer</Button></td></Link>

                                                </tr>);
                                        })}

                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>    <Link to="/addCard">
                    <Button color="primary" >Ajouter une Carte</Button></Link>

            </Page>
        );
    }
}

export default CardList;
