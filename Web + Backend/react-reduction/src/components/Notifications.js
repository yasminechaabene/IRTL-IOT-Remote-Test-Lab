import React from 'react';
import PropTypes from 'utils/propTypes';

import { Media,Button } from 'reactstrap';

import Avatar from 'components/Avatar';
import { Link, withRouter } from 'react-router-dom';

const Notifications = ({ notificationsData }) => {
  return (
    notificationsData &&
    notificationsData.length &&
    notificationsData.map(({ id, avatar, message, date,dateRes,description,_id }) => (
      <Media key={id} className="pb-2">
        <Media left className="align-self-center pr-3">
          <Media body middle className="align-self-center" >
          [ADMIN]
        </Media>
        </Media>
          <Link to={`/home/${_id}`}>
        <Media body middle className="align-self-center" >
          {message}
        </Media>
        </Link>
        <br></br>
        <Media right className="align-self-center">
          <small className="text-muted">{date}</small>
        </Media>
      </Media>
      
    ))
   
  );
};

Notifications.propTypes = {
  notificationsData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.ID,
      avatar: PropTypes.string,
      message: PropTypes.node,
      date: PropTypes.date,
    })
  ),
};

Notifications.defaultProps = {
  notificationsData: [],
};

export default Notifications;
