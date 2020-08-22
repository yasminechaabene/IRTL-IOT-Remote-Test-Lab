import Avatar from 'components/Avatar';
import { UserCard } from 'components/Card';
import Notifications from 'components/Notifications';
import user1Image from 'assets/img/users/100_1.jpg';
import logo from 'assets/img/logo/logo_200.png';
import SearchInput from 'components/SearchInput';
//import { notificationsData } from 'demos/header';
import withBadge from 'hocs/withBadge';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { getMyResponses } from 'components/UserFunctions';
import axios from 'axios';
import moment from 'moment';
import classnames from "classnames";
import {
  MdClearAll,
  MdExitToApp,
  MdKeyboardArrowDown,
  MdHelp,
  MdInsertChart,
  MdMessage,
  MdExtension,
  MdNotificationsActive,
  MdNotificationsNone,
  MdPersonPin,
  MdSettingsApplications,
  MdRadioButtonChecked,
  MdChromeReaderMode,
} from 'react-icons/md';
import {
  ListGroup,
  ListGroupItem,
  // NavbarToggler,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Popover,
  PopoverBody,
  Label,
  Collapse,
  NavbarBrand,
  Container,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from 'utils/bemnames';
const notif =localStorage.getItem("notif")
const bem = bn.create('header');
const navComponents = [
  { to: '/cards', name: 'consulter les cartes', exact: false, Icon: MdRadioButtonChecked },

  { to: '/reservation', name: 'reservation', exact: false, Icon: MdChromeReaderMode },
];
const MdMessageWithBadge = withBadge({
  size: 'md',
  color: 'primary',
  style: {
    top: -10,
    right: -10,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
children: <small>{notif}</small>,
})(MdMessage);

class Header extends React.Component {
  state = {
    isOpenNotificationPopover: false,
    isNotificationConfirmed: false,
    isOpenUserCardPopover: false,
    navbarCollapse:false,
    navbarColor:"navbar-transparent",
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    profileImg: '',
    userId: '',
    data: [],
    notificationsData: [],
    errors: {}
  };
  checkDate(duration) {
    if (duration.hours() == 0 && duration.days() == 0)
      return duration.minutes() + " M"
    else if (duration.days() == 0)
      return duration.hours() + " H"
    else
      return duration.days() + " J"


  }
  

  componentDidMount() {
    window.addEventListener("scroll", this.updateNavbarColor);

  
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      userId: decoded._id,
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      email: decoded.email,
      password: decoded.password,
      profileImg: decoded.profileImg

    })
    let user = decoded._id
    axios.get(`/responses/getMyResponses/${user}`)
      .then(res => {
        const data = res.data.responses;
        this.setState({ data: res.data.responses });
        localStorage.setItem("notif",this.state.data.length)
        console.log(this.state.data)
        this.state.data.forEach(e => {
          let diff = moment(new Date()).diff(moment(e.date))
          const object = {
            _id: e._id,
            description: e.description,
            dateRes: e.date,
            id: data.indexOf(e) + 1,
            avatar: user1Image,
            message: e.name,
            date: "Il y a" + this.checkDate(moment.duration(diff)),
          }
          this.state.notificationsData.push(object)
          console.log(this.state.notificationsData)
          //localStorage.setItem("notif",this.state.notificationsData.length)
        })

      })
     this. MdNotificationsActiveWithBadge = withBadge({
        size: 'md',
        color: 'primary',
        style: {
          top: -10,
          right: -10,
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      children: <small>{this.state.notificationsData.length}</small>,
      })(MdNotificationsActive);
    // console.log(user)
    // console.log(this.state.data)
    return function cleanup() {
      window.removeEventListener("scroll", this.updateNavbarColor);
    };

  }
  isUser = () => {
    let user = false
    // console.log(localStorage.getItem('role'))
    if (localStorage.getItem('role') === 'user')
      user = true
    return user;
  };
  logOut(e) {
    e.preventDefault()
    // localStorage.removeItem('usertoken')
    // localStorage.removeItem('admin')
    // localStorage.removeItem('state')
    localStorage.clear()
    this.props.history.push(`/login`)
  }
  toggleNotificationPopover = () => {
    this.setState({
      isOpenNotificationPopover: !this.state.isOpenNotificationPopover,
    });

    if (!this.state.isNotificationConfirmed) {
      this.setState({ isNotificationConfirmed: true });
    }
  };
   updateNavbarColor = () => {
    if (
      document.documentElement.scrollTop > 299 ||
      document.body.scrollTop > 299
    ) {
      this.setState({navbarColor:"bg-white"});
    } else if (
      document.documentElement.scrollTop < 300 ||
      document.body.scrollTop < 300
    ) {
      this.setState({navbarColor:"navbar-transparent"});
    }
  };
  
  
  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
    });
  };
   toggleNavbarCollapse = () => {
    this.setState({navbarCollapse: !this.state.navbarCollapse});
    document.documentElement.classList.toggle("nav-open");
  };


  render() {
    const { isNotificationConfirmed } = this.state;

    return (
  
      <Navbar className={this.isUser()?classnames("fixed-top",this.state.navbarColor):bem.b('bg-white') }light expand >
      <Container>
      <div className="navbar-translate">
      {this.isUser() &&
          <NavbarBrand
            data-placement="bottom"
            href="/home"
            target="_blank"
            title="IOT LAB"
          >
            <img src={logo}   width="40"
                height="30"
                className="pr-2"
                alt=""></img>
           IOT REMOTE TEST LAB
          </NavbarBrand>}
          <button
            aria-expanded={this.state.navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: this.state.navbarCollapse
            })}
            onClick={this.toggleNavbarCollapse}
          >
           <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={this.state.navbarCollapse}
        >
        <Nav navbar className={bem.e('nav-right')}>
        {this.isUser() &&
        <NavItem>
              <NavLink
                data-placement="bottom"
                href="/home"
                title="Accueil"
              >
                Accueil
                <p className="d-lg-none">Accueil</p>
              </NavLink>
            </NavItem>}
            {this.isUser() &&
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="/cards"
                title="Consulter les cartes"
              >
                Cartes
                <p className="d-lg-none">Cartes</p>
              </NavLink>
            </NavItem>}
            {this.isUser() &&
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="/reservation"
                title="Reserver une carte"
              >
                Reservation
                <p className="d-lg-none">Réservation</p>
              </NavLink>
            </NavItem>}
            {this.isUser() &&
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="/projects"
                title="Liste Projets"
              >
                Mes Projets
                <p className="d-lg-none">Projets</p>
              </NavLink>
            </NavItem>}
          {this.isUser() &&
            <NavItem className="d-inline-flex">
              <NavLink id="Popover1" className="position-relative">
                {isNotificationConfirmed ? (
                  <MdMessage
                    size={25}
                    className="text-secondary can-click"
                    onClick={this.toggleNotificationPopover}
                  />
                ) : (
                    <MdMessageWithBadge
                      size={25}
                      className="text-secondary can-click animated swing infinite"
                      onClick={this.toggleNotificationPopover}
                    />
                  )}
              </NavLink>
              <Popover
                placement="bottom"
                isOpen={this.state.isOpenNotificationPopover}
                toggle={this.toggleNotificationPopover}
                target="Popover1"
              >
                <PopoverBody>
                  {this.state.notificationsData.length>0 ?(
                  <Notifications notificationsData={this.state.notificationsData} />):
                  (
                    <Label >Pas de nouveaux messages</Label>
                  )}
                </PopoverBody>
              </Popover>
            </NavItem>}

          <NavItem>
            <NavLink id="Popover2">
              <Avatar
                onClick={this.toggleUserCardPopover}
                className="can-click"
              />
            </NavLink>
            <Popover
              placement="bottom-end"
              isOpen={this.state.isOpenUserCardPopover}
              toggle={this.toggleUserCardPopover}
              target="Popover2"
              className="p-0 border-0"
              style={{ minWidth: 250 }}
            >
              <PopoverBody className="p-0 border-light">
                <UserCard
                  title={this.state.first_name}
                  subtitle={this.state.email}
                  // text="Last updated 3 mins ago"
                  className="border-light"
                >
                  <ListGroup flush>
                    <Link to="/profile">
                      <ListGroupItem tag="button" action className="border-light">
                        <MdPersonPin /> Profil
                    </ListGroupItem>
                    </Link>
                    <ListGroupItem tag="button" action className="border-light" onClick={this.logOut.bind(this)}>
                      <MdExitToApp /> Déconnexion
                    </ListGroupItem>
                  </ListGroup>
                </UserCard>
              </PopoverBody>
            </Popover>
          </NavItem>
        </Nav>
        </Collapse>
        </Container>
      </Navbar>
    );
  }
}


export default withRouter(Header);
