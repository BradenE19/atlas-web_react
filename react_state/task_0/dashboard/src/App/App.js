import React from "react";
import PropTypes from "prop-types";
import { css, StyleSheet } from 'aphrodite';
import Notifications from "../Notifications/Notifications";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Login from "../Login/Login";
import CourseList from "../CourseList/CourseList";
import { getLatestNotification } from "../utils/utils";
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import BodySection from "../BodySection/BodySection";


const listCourses = [
  {id: 1, name: 'ES6', credit: 60},
  {id: 2, name: 'Webpack', credit: 20},
  {id: 3, name: 'React', credit: 40}
]

const listNotifications = [
  {id: 1, type: 'default', value: 'New course available'},
  {id: 2, type: 'urgent', value: 'New resume available'},
  {id: 3, type: 'urgent', html: { __html: getLatestNotification() }}
]

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
    width: "100%"
  }
})

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this)
    this.handleDisplayDrawer = this.handleDisplayDrawer.bind(this)
    this.handleHideDrawer = this.handleHideDrawer.bind(this)
    this.state = {
      displayDrawer: false
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
      this.props.logOut()
    }
  }

  handleDisplayDrawer() {
    this.setState({
      displayDrawer: true
    })
  }  

  handleHideDrawer() {
    this.setState({
      displayDrawer: false
    })
  }

  render () {
    const { displayDrawer } = this.state
    return(  
    <>
      <Notifications listNotifications={listNotifications} displayDrawer={displayDrawer} handleDisplayDrawer={this.handleDisplayDrawer} handleHideDrawer={this.handleHideDrawer} />
      <div className={css(styles.app)}>
        <Header />
      </div>
      <div className={css(styles.body, styles.bodySmall)}>
        {!this.props.isLoggedIn ? 
          <BodySectionWithMarginBottom title="Log in to continue">
            <Login /> 
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

App.defaultProps = {
  isLoggedIn: false,
  logOut: () => undefined
};

App.propTypes = {
  isLoggedIn: PropTypes.bool,
  logOut: PropTypes.func,
};

export default App;