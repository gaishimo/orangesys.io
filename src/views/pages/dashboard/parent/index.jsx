import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import Sidebar from 'src/views/components/sidebar';
import { getCurrentPageName, getCurrentPageGroup } from 'src/core/dashboard';
import styles from './index.css';

const DashboardParent = ({ children, pageName, pageGroup }) => (
  <div className={styles.whole}>
    <Sidebar pageGroup={pageGroup} />
    <div className={styles.main}>
      <header className={styles.header}>
        {pageName}
      </header>
      {children}
    </div>
  </div>
);

DashboardParent.propTypes = {
  children: PropTypes.object,
  pageName: PropTypes.string,
  pageGroup: PropTypes.string,
};

const mapStateToProps = createSelector(
  getCurrentPageName,
  getCurrentPageGroup,
  (pageName, pageGroup) => ({ pageName, pageGroup }),
);

export default connect(mapStateToProps)(DashboardParent);
