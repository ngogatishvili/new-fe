import {SHOW_ALERT, HIDE_ALERT} from './alertTypes';

export const showAlert = () => {
  return {
    type: SHOW_ALERT,
  };
};

export const hideAlert = () => {
  return {
    type: HIDE_ALERT,
  };
};
