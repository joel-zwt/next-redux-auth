import * as ActionTypes from "../action-types/profile";

const initialState = {
  addModalOpen: false,
  authModalOpen: false,
  editModalOpen: false,
  secondModalOpen: false,
};

const ProfileReducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case ActionTypes.ADD_MODAL_CLOSE:
      return { ...state, addModalOpen: false };
    case ActionTypes.ADD_MODAL_OPEN:
      return { ...state, addModalOpen: true };
    case ActionTypes.AUTH_MODAL_CLOSE:
      return { ...state, authModalOpen: false };
    case ActionTypes.AUTH_MODAL_OPEN:
      return { ...state, authModalOpen: true };
    case ActionTypes.EDIT_MODAL_CLOSE:
      return { ...state, editModalOpen: false };
    case ActionTypes.EDIT_MODAL_OPEN:
      return { ...state, editModalOpen: true };
    case ActionTypes.RESET_ALL_MODALS:
      return {
        ...state,
        addModalOpen: false,
        authModalOpen: false,
        editModalOpen: false,
        page: 1,
        secondModalOpen: false,
        totalEntries: 5,
        totalPages: 1,
      };
    case ActionTypes.SECOND_MODAL_CLOSE:
      return { ...state, secondModalOpen: false };
    case ActionTypes.SECOND_MODAL_OPEN:
      return { ...state, secondModalOpen: true };
    default:
      return state;
  }
};

export default ProfileReducer;
