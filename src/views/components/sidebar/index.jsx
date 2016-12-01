import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import PlanIcon from 'material-ui/svg-icons/action/class';
import GrafanaIcon from 'material-ui/svg-icons/action/assessment';
// import InfluxDBIcon from 'material-ui/svg-icons/image/grain';
import InfluxDBIcon from 'material-ui/svg-icons/device/data-usage';
import LogoutIcon from 'material-ui/svg-icons/action/power-settings-new';
import { hashHistory as history } from 'react-router';
import { authActions } from 'src/core/auth/';
import styles from './index.css';

const groups = [
  { id: 'plan', title: 'Plan', Icon: PlanIcon, path: '' },
  { id: 'grafana', title: 'Grafana', Icon: GrafanaIcon, path: 'grafana' },
  { id: 'influxdb', title: 'InfluxDB', Icon: InfluxDBIcon, path: 'influxdb' },
];
const iconStyle = { width: 48, height: 48, color: 'white' };

const Sidebar = ({ onSignOut, jumpTo, pageGroup }) => (
  <nav className={styles.whole}>
    <div className={styles.item}>
    </div>
    {groups.map(({ id, title, Icon, path }) => (
      <div
        key={`sidebar-group-${id}`}
        className={`${styles.item} ${pageGroup === id && styles['item-selected']}`}
        onClick={() => jumpTo(path)}
      >
        <Icon className={styles.icon} style={iconStyle} />
        <div className={styles.text}>{title}</div>
      </div>
    ))}
    <div className={`${styles.item}`} onClick={onSignOut}>
      <LogoutIcon className={styles.icon} style={iconStyle} />
      <div className={styles.text}>Logout</div>
    </div>
  </nav>
);

Sidebar.propTypes = {
  onSignOut: PropTypes.func.isRequired,
  jumpTo: PropTypes.func.isRequired,
  pageGroup: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  jumpTo: (page) => {
    history.replace(`/dashboard/${page}`);
  },
  onSignOut: () => {
    dispatch(authActions.signOut());
  },
});


export default connect(null, mapDispatchToProps)(Sidebar);
