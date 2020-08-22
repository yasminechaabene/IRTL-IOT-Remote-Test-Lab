import React from 'react';
import PropTypes from 'utils/propTypes';
import { Link, withRouter } from 'react-router-dom'
import { Card, CardImg, CardImgOverlay, CardTitle, CardText, CardFooter,Button } from 'reactstrap';

import Todos, { propTypes as TodosPropTypes } from 'components/Todos';

import backgroundImage from 'assets/img/bg/IoT.png';

const TodosCard = ({ image, title, subtitle, todos,to, ...restProps }) => {
  return (
    <Card {...restProps}>
      <div className="position-relative">
        <CardImg src={image} style={{ height:400 , width:615}} />
        <CardImgOverlay className="bg-dark" style={{ opacity: 0.4 }}>
          <CardTitle  style={{ fontSize:30,color:"white"}} >{title}</CardTitle>
          <CardText className="text-white">{subtitle}</CardText>
        </CardImgOverlay>
      </div>
      <Todos todos={todos} />
  
      <Link to={to}>
      <Button block>Voir plus</Button></Link>
    
    </Card>
  );
};

TodosCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  todos: TodosPropTypes.todos,
  to:PropTypes.string,
};

TodosCard.defaultProps = {
  image: backgroundImage,
  title: 'Projets Récents',
  to:"/projects"
};

export default withRouter(TodosCard);
