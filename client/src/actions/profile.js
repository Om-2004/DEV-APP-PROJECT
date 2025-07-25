import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ACCOUNT_DELETED,
    GET_PROFILES,
    GET_REPOS
} from './types';

//get currrent user profile
export const getCurrentUserProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

//get all users
export const getProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });

    try {
        const res = await axios.get('/api/profile');

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

//get user by unique id
export const getProfileById = userId => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};


//get GitHub repos
export const getGitHubProfiles = username => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/github/${username}`);

        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

//Create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        // 🛠️ Await is MISSING here in your code
        const res = await axios.post('/api/profile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

        if (!edit) {
            history.push('/dashboard');
        }
    } catch (err) {
        // Optional chaining added here to avoid breaking if err.response is undefined
        const errors = err.response?.data?.errors;

        if (Array.isArray(errors)) {
            errors.forEach(error =>
                dispatch(setAlert(error.msg, 'danger'))
            );
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response?.statusText || 'Server Error',
                status: err.response?.status || 500
            }
        });
    }
};

//add an experience
export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        // 🛠️ Await is MISSING here in your code
        const res = await axios.put('/api/profile/experience', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Added', 'success'));

        history.push('/dashboard');
    } catch (err) {
        // Optional chaining added here to avoid breaking if err.response is undefined
        const errors = err.response?.data?.errors;

        if (Array.isArray(errors)) {
            errors.forEach(error =>
                dispatch(setAlert(error.msg, 'danger'))
            );
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response?.statusText || 'Server Error',
                status: err.response?.status || 500
            }
        });
    }
}


//add an educatioon
export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        // 🛠️ Await is MISSING here in your code
        const res = await axios.put('/api/profile/education', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Added', 'success'));

        history.push('/dashboard');
    } catch (err) {
        // Optional chaining added here to avoid breaking if err.response is undefined
        const errors = err.response?.data?.errors;

        if (Array.isArray(errors)) {
            errors.forEach(error =>
                dispatch(setAlert(error.msg, 'danger'))
            );
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response?.statusText || 'Server Error',
                status: err.response?.status || 500
            }
        });
    }
};

//Delete experience
export const deleteExperience = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Experience removed', 'success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response?.statusText || 'Server Error',
                status: err.response?.status || 500
            }
        });
    }
};

//delete education
export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Education removed', 'success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response?.statusText || 'Server Error',
                status: err.response?.status || 500
            }
        });
    }
};

//Delete Account & profile
export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure? This action cannot be undone!')) {
    try {
      await axios.delete('/api/profile');

      dispatch({ type:CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });
      dispatch(setAlert('Your account has been permanently deleted', 'success'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response?.statusText || 'Server Error',
          status: err.response?.status || 500
        }
      });
    }
  }
};
