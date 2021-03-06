import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index';
import Paper from 'material-ui/Paper';
import LinearProgress from 'material-ui/LinearProgress';

import Header from 'src/views/components/header-auth';
import { getServerSetup } from 'src/core/auth';
import {
  isProcessing,
  isErrored,
  SERVER_SETUP_STATUS,
} from 'src/core/server_setup';
import { setupActions } from 'src/core/setup';
import styles from './index.css';

class Server extends Component {
  componentWillMount() {
    this.props.setupServer(this.props.status);
  }
  componentWillUpdate() {
    this.props.setupServer(this.props.status);
  }
  render() {
    const { status, errorCode } = this.props;
    return (
      <div>
        <Header />
        <Grid>
          <Row>
            <Col
              className={styles.navigation}
              xsOffset={1} xs={10}
              smOffset={2} sm={8}
              mdOffset={3} md={6}
            >
              <Paper className={styles.main}>
                <div className={styles.header}>
                  サーバ構築
                </div>
                <div className={styles.body}>
                  {isProcessing(status) &&
                    <div>
                      <p className={styles.message}>
                        現在サーバ構築中です。しばらくお待ちください。
                      </p>
                      <div>
                        <LinearProgress />
                      </div>
                    </div>
                  }
                  {isErrored(status) &&
                    <div className={styles.error}>
                      <p>
                        サーバ構築時にエラーが発生しました。管理者にお問い合わせください。
                      </p>
                      <p>
                        Error Code: {errorCode}
                      </p>
                    </div>
                  }
                </div>
              </Paper>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

Server.propTypes = {
  status: PropTypes.string.isRequired,
  errorCode: PropTypes.string,
  setupServer: PropTypes.func.isRequired,
};

const mapStateToProps = createSelector(
  getServerSetup,
  ({ status, errorCode }) => ({ status, errorCode }),
);

const mapDispatchToProps = (dispatch) => ({
  setupServer: (status) => {
    let action = null;
    switch (status) {
      case SERVER_SETUP_STATUS.WAIT_STARTING:
        action = setupActions.startBuildingServers;
        break;
      case SERVER_SETUP_STATUS.BUILDING:
        action = setupActions.keepWaitingForServerBuild;
        break;
      default:
    }
    if (action) {
      dispatch(action());
    }
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(Server);
