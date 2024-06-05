import React from "react";
import { StyleSheet, css } from "aphrodite";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { getFullYear, getFooterCopy } from "../utils/utils";

const styles = StyleSheet.create({
  paragraph: {
    textAlign: "center",
    fontSize: "1.2rem",
  },
  copyright: {
    marginTop: "40px",
  },
});

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { user } = this.props;
    return (
      <footer className="footer">
        <p className={css(styles.copyright)}>
          Copyright {getFullYear()} - {getFooterCopy(true)}
        </p>
        { user ?
          <p className={css(styles.paragraph)}>
            <a>Contact us</a>
          </p> :
          <></>
        }
      </footer>
    );
  }
}

Footer.propTypes = {
  user: PropTypes.object,
};

Footer.defaultProps = {
  user: null,
};

export const mapStateToProps = (state) => {
  return {
    user: state.get('user')
  };
};

export default connect(mapStateToProps, null)(Footer);