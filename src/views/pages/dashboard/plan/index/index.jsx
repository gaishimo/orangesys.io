import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { hashHistory as history } from 'react-router';
import { createSelector } from 'reselect';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index';
import Paper from 'material-ui/Paper';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import { getPlanId } from 'src/core/auth';
import { findPlan } from 'src/core/plans';

import styles from './index.css';

const Plan = ({ planId }) => {
  const plan = findPlan(planId);
  return (
    <div className={styles.whole}>
      <Grid>
        <Row>
          <Col md={8} sm={10} xs={12}>
            <Paper className={styles.main} zDepth={1}>
              <div className={styles.header}>
                {plan.title}
              </div>
              <div>
                <Table selectable={false}>
                  <TableBody displayRowCheckbox={false}>
                    <TableRow>
                      <TableRowColumn>月額</TableRowColumn>
                      <TableRowColumn>
                        <strong>{plan.price}</strong>
                      </TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn>データ保存期間</TableRowColumn>
                      <TableRowColumn>
                        <strong>{plan.retentionText}</strong>
                      </TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn>ストレージ</TableRowColumn>
                      <TableRowColumn>
                        <strong>{plan.storage}</strong>
                      </TableRowColumn>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </Paper>
            <div className={styles.actions}>
              <FlatButton
                label="プランを解約する"
                secondary
                onClick={() => { history.replace('/dashboard/plan/cancel'); }}
              />
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

Plan.propTypes = {
  planId: PropTypes.string.isRequired,
};

const mapStateToProps = createSelector(
  getPlanId,
  (planId) => ({ planId }),
);

export default connect(mapStateToProps)(Plan);
