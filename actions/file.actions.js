import axios from 'axios';
import Notification from 'component/common/Notification.js';

import {
  UPDATE_FILE,
  FETCH_FILE,
  FETCH_FILE_BY_USER,
  FETCH_LIST_FILE,
  FETCH_LIST_SAVED_FILE,
  CREATE_SAVED_FILE
} from '../constant';
  
export const fetchFileByUser = (accessToken, user_id) => dispatch => {
  const url = `${API_URL}/file_by_user?user_id=${user_id}&access_token=${accessToken}`
  return axios.get(url)
    .then(res => {
      if (res.data.success) {
        dispatch({
          type: FETCH_FILE_BY_USER,
          payload: res.data.data
        })
        return res.data.data
      }
    })
    .catch(err =>
      console.log(err)
    )
}

export const fetchListFile = (accessToken, params) => dispatch => {
  const url = `${API_URL}/files?access_token=${accessToken}`
  return axios.get(url, params)
    .then(res => {
      if (res.data.success) {
        dispatch({
          type: FETCH_LIST_FILE,
          payload: res.data.data
        })
        return res.data.data
      }
    })
    .catch(err =>
      console.log(err)
    )
}

export const fetchFile = (accessToken, file_id) => dispatch => {
  const url = `${API_URL}/files/${file_id}?access_token=${accessToken}`
  return axios.get(url)
    .then(res => {
      if (res.data.success) {
        dispatch({
          type: FETCH_FILE,
          payload: res.data.data
        })
        return res.data.data
      }
    })
    .catch(err =>
      console.log(err)
    )
}

export const updateFile = (accessToken, file) => dispatch => {
  const url = `${API_URL}/files/${file.id}?access_token=${accessToken}`

  return axios.put(url, { file })
    .then(res => {
      if (res.data.success) {
        dispatch({
          type: UPDATE_FILE,
          payload: res.data.data
        })
        Notification.success("Cập nhật thành công");
        return res.data.data
      }
    })
    .catch(err =>
      console.log(err)
    )
}

export const fetchSavedFile = (accessToken, params) => dispatch => {
  const url = `${API_URL}/saved_file?access_token=${accessToken}`

  return axios.get(url)
    .then(res => {
      if (res.data.success) {
        dispatch({
          type: FETCH_LIST_SAVED_FILE,
          payload: res.data.data
        })
        return res.data.data
      }
    })
    .catch(err =>
      console.log(err)
    )
}

export const createSavedFile = (accessToken, saved_file) => dispatch => {
  const url = `${API_URL}/saved_file?access_token=${accessToken}`

  return axios.post(url, { saved_file })
    .then(res => {
      if (res.data.success) {
        dispatch({
          type: CREATE_SAVED_FILE,
          payload: res.data.data
        })
        Notification.success("Lưư hồ sơ thành công");
        return res.data.data
      }
    })
    .catch(err =>
      console.log(err)
    )
}