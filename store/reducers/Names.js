import * as ActionTypes from "../action-types/names";

const initialState = {
  names: null,
};

const NamesReducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case ActionTypes.NAMES_GET_ALL:
      return namesGetAll(state, payload);
    case ActionTypes.NAMES_ADD:
      return namesAdd(state, payload);
    case ActionTypes.NAMES_EDIT:
      return namesEdit(state, payload);
    case ActionTypes.NAMES_DELETE:
      return namesDelete(state, payload);
    default:
      return state;
  }
};

const namesGetAll = (state, payload) => {
  state = {
    // ...state,
    // names: state.names.concat(payload),
    names: payload,
  };
  return state;
};

const namesAdd = (state, payload) => {
  state = {
    ...state,
    names: state.names.concat(payload),
  };
  return state;
};

const namesEdit = (state, payload) => {
  console.log(payload);
  state = {
    ...state,
    names: state.names.map((name) =>
      name.id == payload.id
        ? {
            id: payload.id,
            firstName: payload.firstName,
            middleName: payload.middleName,
            lastName: payload.lastName,
          }
        : name
    ),
  };
  console.log(state);
  return state;
};

const namesDelete = (state, payload) => {
  state = {
    ...state,
    names: state.names.filter((name) => name.id !== payload.id),
  };
  return state;
};

export default NamesReducer;
