import { getLocation } from 'src/core/selectors';

export const getCurrentPageName = (state, ownProps) => {
  const pathname = getLocation(state, ownProps).pathname;
  if (/^\/dashboard\/grafana/.test(pathname)) {
    return 'Grafana';
  }
  if (/^\/dashboard\/influxdb/.test(pathname)) {
    return 'InfluxDB';
  }
  if (/^\/dashboard\/plan\/cancel/.test(pathname)) {
    return 'プランの解約';
  }
  return 'プラン情報';
};


export const getCurrentPageGroup = (state, ownProps) => {
  const pathname = getLocation(state, ownProps).pathname;
  if (/^\/dashboard\/grafana/.test(pathname)) {
    return 'grafana';
  }
  if (/^\/dashboard\/influxdb/.test(pathname)) {
    return 'influxdb';
  }
  return 'plan';
};

export const getPlanCancel = state => {
  const { confirmingPlanCancel, cancelingPlan } = state.dashboard;
  return {
    confirmingPlanCancel,
    cancelingPlan,
  };
};
