import { Content, Footer, Header, HeaderImage } from 'components/Layout';
import React from 'react';
import {
  MdImportantDevices,
  // MdCardGiftcard,
  MdLoyalty,
} from 'react-icons/md';
import NotificationSystem from 'react-notification-system';
import { NOTIFICATION_SYSTEM_STYLE } from 'utils/constants';

class MainLayout extends React.Component {


  componentWillReceiveProps({ breakpoint }) {
    if (breakpoint !== this.props.breakpoint) {
     // this.checkBreakpoint(breakpoint);
    }
  }

  componentDidMount() {
   // this.checkBreakpoint(this.props.breakpoint);

    setTimeout(() => {
      if (!this.notificationSystem) {
        return;
      }

      this.notificationSystem.addNotification({
        title: <MdImportantDevices />,
        message: 'Bonjour dans Iot Remote Test Lab',
        level: 'info',
      });
    }, 1500);

   /* setTimeout(() => {
      if (!this.notificationSystem) {
        return;
      }

      this.notificationSystem.addNotification({
        title: <MdLoyalty />,
        message:
          'IOT Remote Test Lab ...!',
        level: 'info',
      });
    }, 2500);*/
  }

  // close sidebar when



  render() {
    const { children } = this.props;
    return (
      <main className="cr-app bg-light">
      
        <Content fluid onClick={this.handleContentClick}>
          <Header />
          <HeaderImage/>
          {children}
          <Footer />
        </Content>

        <NotificationSystem
          dismissible={false}
          ref={notificationSystem =>
            (this.notificationSystem = notificationSystem)
          }
          style={NOTIFICATION_SYSTEM_STYLE}
        />
      </main>
    );
  }
}

export default MainLayout;
