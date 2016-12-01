import { delay } from 'redux-saga';
import { call, fork, put, take, select } from 'redux-saga/effects';
import axios from 'axios';
import moment from 'moment';
import { hashHistory as history } from 'react-router';

function* cancelPlan() {

}

// ----------------------------------------------------------------------
// Watcher
// ----------------------------------------------------------------------
function* watchCancelPlan() {
  while (true) {
    const { payload } = yield take(`${dashboardAction.cancelPlan}`);
    yield fork(cancelPlan);
  }
}

export const setupSagas = [
  fork(watchCancelPlan),
];
