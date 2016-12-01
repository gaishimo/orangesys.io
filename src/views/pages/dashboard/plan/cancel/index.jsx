import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import LinearProgress from 'material-ui/LinearProgress';
import { dashboardActions, getPlanCancel } from 'src/core/dashboard';
import RaisedButton from 'material-ui/RaisedButton';
import { getCSSPropertyOf } from 'src/views/utils';
import styles from './index.css';

const PlanCancel = ({ confirmingPlanCancel, cancelingPlan,
  onClickCancel, onCancel, onProceed }) => {
  const actions = [
    <FlatButton
      label="キャンセル"
      onTouchTap={onCancel}
    />,
    <FlatButton
      label="解約する"
      onTouchTap={onProceed}
      style={{ color: getCSSPropertyOf('--dangerColor') }}
    />,
  ];
  return (
    <div className={styles.whole}>
      <Dialog
        actions={actions}
        modal={false}
        open={confirmingPlanCancel}
        onRequestClose={onCancel}
      >
        本当に解約してよろしいですか？
      </Dialog>
      <Grid>
        <Row>
          <Col md={8} sm={10} xs={12}>
            <Paper className={styles.main}>
              <div className={styles.text1}>プランの解約を行います。</div>
              <div className={styles.caution}>
                ※解約した時点ですべての機能は利用出来なくなります
                <br />
                ※月の途中の解約の場合でもその月の料金まではお支払頂く必要があります
              </div>
              <div
                style={{ visibility: cancelingPlan ? '' : 'hidden' }}
                className={styles.progress}
              >
                <LinearProgress />
              </div>
              <div className={styles.cancel}>
                <RaisedButton
                  label="解約する"
                  primary
                  onClick={onClickCancel}
                  disabled={cancelingPlan}
                />
              </div>
            </Paper>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

PlanCancel.propTypes = {
  confirmingPlanCancel: PropTypes.bool,
  cancelingPlan: PropTypes.bool,
  onClickCancel: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onProceed: PropTypes.func.isRequired,
};

const mapStateToProps = createSelector(
  getPlanCancel,
  ({ confirmingPlanCancel, cancelingPlan }) => ({ confirmingPlanCancel, cancelingPlan }),
);

const mapDispatchToProps = (dispatch) => ({
  onClickCancel: () => {
    dispatch(dashboardActions.confirmPlanCancel());
  },
  onCancel: () => {
    dispatch(dashboardActions.cancelPlanCancel());
  },
  onProceed: () => {
    dispatch(dashboardActions.cancelPlan());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlanCancel);
