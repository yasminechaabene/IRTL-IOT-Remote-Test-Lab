import raspImage from 'assets/img/products/rasp.jpg';
import { UserCard } from 'components/Card';
import Page from 'components/Page';
import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardImgOverlay,
  CardLink,
  CardText,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap';
import { getAllModels, deleteModel } from 'components/UserFunctions';
class ModelPage extends React.Component {
  constructor() {
    super()
    this.state = {
      models: [],
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
  componentDidMount() {
    /*  let models = [...this.state.model]
      getAllModels().then(data =>  models.push(data),
      this.setState({
        model: models
      }))*/
    getAllModels()
      .then(res => {
        const models = res;
        this.setState({ models });
      })
  }
  onDelete(id) {
    const cardId = id
    deleteModel(cardId).then(res => {
      window.location.reload();
    })
  }

  render() {
    return (
      <Page title="Cartes" breadcrumbs={[{ name: 'Modéle', active: true }]}>
        <Row>
          {this.state.models.map(model => {

            return (
              <Col md={5} key={model._id} >
                <UserCard
                  avatar={raspImage}
                  title={model.name}
                  text="Modéle Disponible"
                  style={{
                    height: 300,
                  }}

                >
                  <Button outline color="light" onClick={this.openModal.bind(this, model._id)}>
                    Voir Plus
                </Button>
                  <Modal
                    isOpen={this.state.modal[model._id]}
                    toggle={this.openModal.bind(this, model._id)}
                    className={this.props.className}>
                    <ModalHeader toggle={this.toggle()}>{model.name}</ModalHeader>
                    <ModalBody>
                      {model.description}
                    </ModalBody>
                    <ModalFooter>

                      <Button color="primary" onClick={e =>
                        window.confirm("Êtes vous sûr de supprimer ce modéle ? Cette action est irréversible") &&
                        this.onDelete(model._id)
                      }>
                        Supprimer
                    </Button>
                      <Link to={`/editModel/${model._id}`}>
                        <Button color="secondary" onClick={this.toggle()}>
                          Editer
                    </Button></Link>
                    </ModalFooter>
                  </Modal>
                </UserCard>

              </Col>

            );
          })}

        </Row>
        <Link to="/addModel">
          <Button color="primary" >Ajouter un modéle</Button></Link>
      </Page>
    );
  }
}

export default ModelPage;
