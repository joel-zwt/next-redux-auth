import axios from "axios";
import * as actions from "../actions/auth";

export const login = (credentials) => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await axios({
          method: "post",
          url: "/signin",
          data: credentials,
        });
        await dispatch(actions.userLogin(response.data));
        return resolve();
      } catch (err) {
        let code = err.response.status;
        let error = err.response.data.message;
        let data = {
          code,
          error,
        };
        return reject(data);
      }
    });
  };
};

export const signup = (credentials) => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await axios({
          method: "post",
          url: "/signup",
          data: credentials,
        });
        await dispatch(actions.userSignUp(response.data));
        return resolve();
      } catch (err) {
        let code = err.response.status;
        let error = err.response.data.message;
        let data = {
          code,
          error,
        };
        return reject(data);
      }
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        await axios({
          method: "post",
          url: "/signout",
        });
        await dispatch(actions.userLogout());
        return resolve();
      } catch (err) {
        await dispatch(actions.userLogout());
        return resolve();
        // let code = err.response.status;
        // let error = err.response.data.message;
        // let data = {
        //   code,
        //   error,
        // };
        // return reject(data);
      }
    });
  };
};

// export const authCheck = (cookies) => {
//   return (dispatch) => {
//     return new Promise(async (resolve, reject) => {
//       try {
//         let response = await axios({
//           method: "post",
//           url: "/authcheck",
//           headers: cookies && { headers: { Cookie: cookies.toString() } },
//         });
//         dispatch(actions.userAuthCheck());
//         return resolve();
//       } catch (err) {
//         let code = err.response.status;
//         if (code === 401) {
//           dispatch(actions.userLogout());
//         }
//         return resolve();
//       }
//     });
//   };
// };

export const authCheck = () => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        await axios({
          method: "post",
          url: "/authcheck",
          withCredentials: true,
        });
        await dispatch(actions.userAuthCheck());
        return resolve();
      } catch (err) {
        let code = err.response.status;
        let error = err.response.data.message;
        let data = {
          code,
          error,
        };
        await dispatch(actions.userLogout());
        return reject(data);
      }
    });
  };
};
