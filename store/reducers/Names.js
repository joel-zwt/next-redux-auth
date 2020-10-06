import * as ActionTypes from "../action-types/names";

const initialState = {
  names: null,
  page: 1,
  rowsPerPage: 5,
  totalEntries: 5,
  totalPages: 1,
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
    case ActionTypes.GET_PAGINATION_DETAILS:
      return getPaginationDetails(state, payload);
    default:
      return state;
  }
};

const namesGetAll = (state, payload) => {
  state = {
    // ...state,
    // names: state.names.concat(payload),
    ...state,
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
  return state;
};

const namesDelete = (state, payload) => {
  state = {
    ...state,
    names: state.names.filter((name) => name.id !== payload.id),
  };
  return state;
};

const getPaginationDetails = (state, payload) => {
  state = {
    ...state,
    page: payload.page,
    rowsPerPage: payload.rowsPerPage,
    totalEntries: payload.rows,
    totalPages: payload.pages,
  };
  return state;
};

export default NamesReducer;
