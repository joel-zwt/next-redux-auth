import * as ActionTypes from "../action-types/profile";

export const addModalOpen = () => {
  return {
    type: ActionTypes.ADD_MODAL_OPEN,
  };
};

export const addModalClose = () => {
  return {
    type: ActionTypes.ADD_MODAL_CLOSE,
  };
};

export const authModalClose = () => {
  return {
    type: ActionTypes.AUTH_MODAL_CLOSE,
  };
};

export const authModalOpen = () => {
  return {
    type: ActionTypes.AUTH_MODAL_OPEN,
  };
};

export const editModalOpen = () => {
  return {
    type: ActionTypes.EDIT_MODAL_OPEN,
  };
};

export const editModalClose = () => {
  return {
    type: ActionTypes.EDIT_MODAL_CLOSE,
  };
};

export const resetAllModals = () => {
  return {
    type: ActionTypes.RESET_ALL_MODALS,
  };
};

export const secondModalOpen = () => {
  return {
    type: ActionTypes.SECOND_MODAL_OPEN,
  };
};

export const secondModalClose = () => {
  return {
    type: ActionTypes.SECOND_MODAL_CLOSE,
  };
};
