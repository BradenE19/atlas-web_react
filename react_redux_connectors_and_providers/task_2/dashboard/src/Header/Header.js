import React, { cloneElement } from "react";
import { css, StyleSheet } from 'aphrodite';
import { connect } from 'react-redux'
import holberton_logo from "../assets/holberton_logo.jpg";
import { logout } from "../actions/uiActionCreators";

const styles = StyleSheet.create({
  header: {
    display: "flex",
    color: '#e14852',
    alignItems: "center"
  },
  headerLogo: {
    width: '200px',
    height: '200px'
  },
  span: {
    fontStyle: 'italic',
    textDecoration: 'underline black'
  },
  welcomeParagraph: {
    marginLeft: '15px',
    color: 'black',
    fontSize: '1.3rem'
  },
  welcomeParagraphSmall: {
    '@media (max-width: 900px)': {
      fontSize: '1.1rem',
      marginLeft: '10px'
    }
  }
})

export default class Header extends React.Component {
  
  constructor(props) {
    super(props)
  }

  render() {

    const { user, logout } = this.props;

    return (
      <header className={css(styles.header)}>
        <img src={holberton_logo} className={css(styles.headerLogo)} alt="Holberton Logo" />
        <h1>School dashboard</h1>
        { user ?
          <p id='logoutSection' className={css(styles.welcomeParagraph, styles.welcomeParagraphSmall)}>Welcome <b>{`${user.email} `}</b><span onClick={logout} className={css(styles.span)}>(logout)</span></p>
          : <></>
        }
      </header>

    );
  }
}

Header.defaultProps  = {
  user: null,
  logout: () => {}
}

Header.propTypes = {
  user: propTypes.object,
  logout: propTypes.func
}

const mapStateToProps = (state) => {
  return {
    user: state.get('user')
  }
}

const mapDispatchToProps = () => {
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);