import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import { isLogged } from 'pages/DashboardPage';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout,PrivateRoute,MainLayoutAdmin } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import AuthPage from 'pages/AuthPage';
import TrashList from 'pages/TrashList';
import Profile from 'components/Profile';
import IotTest from 'components/IotTest';
import AddModel from 'pages/AddModel';
import AddCard from 'pages/AddCard';
import EditCard from 'pages/EditCard';
import BlankPage from 'components/BlankPage';
import RefusePage from 'components/RefusePage';
import HistoryReservations from 'components/HistoryReservations';
import HistoryRec from 'pages/HistoryRec';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/reduction.scss';

const UsersList = React.lazy(() => import('pages/UsersList'));
const CardList = React.lazy(() => import('pages/CardList'));
const Patterns = React.lazy(() => import('pages/PatternsPage'));
const ReclamationsList = React.lazy(() => import('pages/ReclamationsList'));
const ModelPage = React.lazy(() => import('pages/ModelPage'));
const WaitingList = React.lazy(() => import('pages/WaitingList'));
const CardPage = React.lazy(() => import('pages/CardPage'));
const ReservationPage = React.lazy(() => import('pages/ReservationPage'));
const ProjectPage = React.lazy(() => import('pages/ProjectPage'));
const ChartPage = React.lazy(() => import('pages/ChartPage'));
const DashboardPage = React.lazy(() => import('pages/DashboardPage'));
const DashboardPageModel = React.lazy(() => import('pages/DashboardPageModel'));
const DashboardPageAdmin = React.lazy(() => import('pages/DashboardPageAdmin'));




const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};
const isAdmin = () => {
  let admin=false
 // console.log(localStorage.getItem('role'))
  if(localStorage.getItem('role')==='admin')
  admin=true
return admin;
};
const isConnected= () => {
  let logged=false
 console.log(localStorage.getItem('loggedIn'))
  if(localStorage.getItem('loggedIn')===true)
  logged=true
return logged;
};

class App extends React.Component {
  
  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <LayoutRoute
              exact
              path="/login"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_LOGIN} />
              )}
            />
            <LayoutRoute
              exact
              path="/signup"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_SIGNUP} />
              )}
            />
            <LayoutRoute
              exact
              path="/profile"
              layout={EmptyLayout}
              component={Profile}
            />
            <LayoutRoute
              exact
              path="/iot_test/:reservation"
              layout={EmptyLayout}
              component={IotTest}
            />
               <LayoutRoute
              exact
              path="/trash"
              layout={EmptyLayout}
              component={TrashList}
            />
              <LayoutRoute
              exact
              path="/addModel"
              layout={EmptyLayout}
              component={AddModel}
            />
              <LayoutRoute
              exact
              path="/editModel/:model"
              layout={EmptyLayout}
              component={AddModel}
            />
              <LayoutRoute
              exact
              path="/addCard"
              layout={EmptyLayout}
              component={AddCard}
            />
             <LayoutRoute
              exact
              path="/editCard/:card"
              layout={EmptyLayout}
              component={EditCard}
            />
            
               <LayoutRoute
              exact
              path="/card/:cardId"
              layout={EmptyLayout}
              component={EditCard}
            />
                 <LayoutRoute
              exact
              path="/redirect"
              layout={EmptyLayout}
              component={BlankPage}
            />
             <LayoutRoute
              exact
              path="/refuseaccess"
              layout={EmptyLayout}
              component={RefusePage}
            />
               <LayoutRoute
              exact
              path="/historyReclamations"
              layout={EmptyLayout}
              component={HistoryRec}
            />
             <LayoutRoute
              exact
              path="/reservationlist"
              layout={EmptyLayout}
              component={HistoryReservations}
            />
            
            {isAdmin()? <MainLayoutAdmin breakpoint={this.props.breakpoint}>
              <React.Suspense fallback={<PageSpinner />}>
                <PrivateRoute exact path="/administration" component={DashboardPageAdmin} />
                <PrivateRoute exact path="/users" component={UsersList} />
                <PrivateRoute exact path="/demandes" component={WaitingList} />
                <PrivateRoute exact path="/models" component={ModelPage} />
                <PrivateRoute exact path="/cardlist" component={CardList} />
                <PrivateRoute exact path="/reclamations" component={ReclamationsList} />
                <PrivateRoute exact path="/patterns" component={Patterns} />
              </React.Suspense>
            </MainLayoutAdmin>
            :
            <MainLayout breakpoint={this.props.breakpoint}>
              <React.Suspense fallback={<PageSpinner />}>
          
                <PrivateRoute exact path="/home" component={DashboardPage} />
                <PrivateRoute exact path="/home/:responseId" component={DashboardPageModel} />
                <PrivateRoute exact path="/projects" component={ProjectPage} />
                <PrivateRoute exact path="/cards" component={CardPage} />
                <PrivateRoute exact path="/reservation" component={ReservationPage} />
                <PrivateRoute exact path="/charts" component={ChartPage} />
              </React.Suspense>
            </MainLayout>}
           
            <Redirect to="/login" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
