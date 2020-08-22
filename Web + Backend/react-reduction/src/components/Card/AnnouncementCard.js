import React from 'react';
import PropTypes from 'utils/propTypes';
import { Link, withRouter } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardText, Button } from 'reactstrap';

import Avatar from 'components/Avatar';

import classNames from 'classnames';

const AnnouncementCard = ({
  color,
  header,
  avatar,
  avatarSize,
  name,
  date,
  text,
  className,
  buttonProps,
  ...restProps
}) => {
  const bgColor = `bg-${color}`;
  const classes = classNames(bgColor, className);

  return (
    <Card inverse className={classes} {...restProps}>
      {header && typeof header === 'string' ? (
        <CardHeader className={bgColor}>{header}</CardHeader>
      ) : (
          header
        )}
      <CardBody className="d-flex flex-wrap flex-column align-items-center justify-content-center">
        <CardText className="text-center">
          <strong className="d-block">{name}</strong>
          <small className="text-muted">{date}</small>
        </CardText>
        <CardText className="text-center">{text}</CardText>
        <Link to="/reservation">
          <Button color="primary" /></Link>
      </CardBody>
    </Card>
  );
};

AnnouncementCard.propTypes = {
  color: PropTypes.string,
  header: PropTypes.node,
  avatarSize: PropTypes.number,
  name: PropTypes.string,
  date: PropTypes.date,
  className: PropTypes.string,
  children: PropTypes.element,
  to:PropTypes.string,
  btnname:PropTypes.string
};

AnnouncementCard.defaultProps = {
  color: 'gradient-secondary',
  avatarSize: 60,
};

export default withRouter(AnnouncementCard);
