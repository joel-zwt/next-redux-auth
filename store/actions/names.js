import * as ActionTypes from "../action-types/names";

export const namesGetAll = (payload) => {
  return {
    type: ActionTypes.NAMES_GET_ALL,
    payload,
  };
};

export const namesEdit = (payload) => {
  return {
    type: ActionTypes.NAMES_EDIT,
    payload,
  };
};

export const namesAdd = (payload) => {
  return {
    type: ActionTypes.NAMES_ADD,
    payload,
  };
};

export const namesDelete = (payload) => {
  return {
    type: ActionTypes.NAMES_DELETE,
    payload,
  };
};
