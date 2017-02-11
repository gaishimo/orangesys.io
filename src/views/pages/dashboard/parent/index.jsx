import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Sidebar from 'src/views/components/sidebar';
import { isNeedServerSetup } from 'src/core/auth';
import {
  getMessages,
  getCurrentPageName,
  getCurrentPageGroup,
  dashboardActions,
} from 'src/core/dashboard';
import Message from 'src/views/components/snackbar/message';
import ErrorMessage from 'src/views/components/snackbar/error-message';
import styles from './index.css';

class DashboardParent extends Component {
  componentWillMount() {
    if (!this.props.needServerSetup) {
      this.props.fetchData();
    }
  }
  render() {
    const {
      children,
      pageName,
      pageGroup,
      needServerSetup,
      message,
      errorMessage,
      onMessageClose,
    } = this.props;
    return (
      <div className={styles.whole}>
        <Sidebar pageGroup={pageGroup} needServerSetup={needServerSetup} />
        <div className={styles.main}>
          <header className={styles.header}>
            {pageName}
          </header>
          {children}
        </div>
        <Message message={message} onClose={onMessageClose} />
        <ErrorMessage error={errorMessage} onClose={onMessageClose} />
      </div>
    );
  }
}

DashboardParent.propTypes = {
  children: PropTypes.object,
  pageName: PropTypes.string,
  pageGroup: PropTypes.string,
  needServerSetup: PropTypes.bool,
  message: PropTypes.string,
  errorMessage: PropTypes.string,
  onMessageClose: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
};

const mapStateToProps = createSelector(
  getCurrentPageName,
  getCurrentPageGroup,
  isNeedServerSetup,
  getMessages,
  (pageName, pageGroup, needServerSetup, { message, errorMessage }) => ({
    pageName, pageGroup, needServerSetup, message, errorMessage,
  }),
);

const mapDispatchToProps = (dispatch) => ({
  onMessageClose: () => {
    dispatch(dashboardActions.clearMessage());
  },
  fetchData: () => {
    dispatch(dashboardActions.fetchInfluxDBStorageUsage());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardParent);
