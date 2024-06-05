import React from "react";
import PropTypes from "prop-types";
import { css, StyleSheet } from 'aphrodite';
import { connect } from 'react-redux';
import Notifications from "../Notifications/Notifications";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Login from "../Login/Login";
import CourseList from "../CourseList/CourseList";
import { getLatestNotification } from "../utils/utils";
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import BodySection from "../BodySection/BodySection";
import { loginRequest as login, logout } from "../actions/uiActionCreators";
import { displayNotificationDrawer, hideNotificationDrawer } from "../actions/uiActionCreators";



const listCourses = [
  {id: 1, name: 'ES6', credit: 60},
  {id: 2, name: 'Webpack', credit: 20},
  {id: 3, name: 'React', credit: 40}
]

// const listNotifications = [
//   {id: 1, type: 'default', value: 'New course available'},
//   {id: 2, type: 'urgent', value: 'New resume available'},
//   {id: 3, type: 'urgent', html: { __html: getLatestNotification() }}
// ]

const styles = StyleSheet.create({
  app: {
    borderBottom: "3px solid #e14852",
    width: "100%"
  },
  bodySmall: {
    marginBottom: '150px',
    textAlign: 'left',
    display: 'flex',
    flexWrap: 'wrap'
  },
  footer: {
    borderTop: "3px solid #e14852",
    display: "flex",
    justifyContent: "center",
    fontStyle: "italic",
    fontSize: '1.2rem',
    width: "100%"
  }
})

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this)
    this.markNotificationAsRead = this.markNotificationAsRead.bind(this)
    this.state = {
      listNotifications: [
        {id: 1, type: 'default', value: 'New course available'},
        {id: 2, type: 'urgent', value: 'New resume available'},
        {id: 3, type: 'urgent', html: { __html: getLatestNotification() }}
      ]
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handlePress)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlePress)
  }

  handlePress(event) {
    if (event.ctrlKey && event.key === 'h') {
      alert('Logging you out');
      this.props.logout()
    }
  }

  markNotificationAsRead(id) {
    const newNotification = this.state.listNotifications.filter((not) => {
      not.id !== id})
    this.setState({
      listNotifications: newNotification
    })
  }

  render () {
    const { listNotifications } = this.state
    const { isLoggedIn, displayDrawer, displayNotificationDrawer, hideNotificationDrawer, login, logout } = this.props
    return(  
    <>
      <Notifications listNotifications={listNotifications} displayDrawer={displayDrawer} 
        handleDisplayDrawer={displayNotificationDrawer} handleHideDrawer={hideNotificationDrawer} 
        markNotificationAsRead={this.markNotificationAsRead}
        />
      
      <div className={css(styles.app)}>
        <Header />
      </div>
      
      <div className={css(styles.body, styles.bodySmall)}>

        {!isLoggedIn ? 
          <BodySectionWithMarginBottom title="Log in to continue">
            <Login logIn={login} /> 
          </BodySectionWithMarginBottom> : 
          
          <BodySectionWithMarginBottom title="Course list">
            <CourseList listCourses={listCourses}/>
          </BodySectionWithMarginBottom>
        }

        <BodySection title="News from the School">
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere, temporibus. Totam, quis quo provident magni reprehenderit nulla eaque. A, illo?</p>
        </BodySection>

      </div>

      <div className={css(styles.footer)}>
        <Footer />
      </div>

    </>
    );
  }
}

App.propTypes = {
  isLoggedIn: PropTypes.bool,
  displayDrawer: PropTypes.bool,
  displayNotificationDrawer: PropTypes.func,
  hideNotificationDrawer: PropTypes.func,
  login: PropTypes.func,
};

App.defaultProps = {
  isLoggedIn: false,
  displayDrawer: false,
  displayNotificationDrawer: () => {},
  hideNotificationDrawer: () => {},
  login: () => {},
};

export const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.get('isUserLoggedIn'),
    displayDrawer: state.get('isNotificationDrawerVisible')
  }
}

const mapDispatchToProps = {
  displayNotificationDrawer,
  hideNotificationDrawer, 
  login,
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(App);