import axios from 'axios';
import Notification from 'component/common/Notification.js';

import {
  FETCH_JOB_POST,
  CREATE_JOB_POST,
  UPDATE_JOB_POST,
  FETCH_JOB,
  FETCH_LIST_SAVED_JOB,
  CREATE_SAVED_JOB,
  FETCH_LIST_APPLIED,
  CREATE_APPLIED,
  CLEAR_JOB,
} from '../constant';
  
export const fetchListJobPost = (accessToken, params = {}) => dispatch => {
  const url = `${API_URL}/job_post?access_token=${accessToken}`
  return axios.get(url, { params })
    .then(res => {
      if (res.data.success) {
        dispatch({
          type: FETCH_JOB_POST,
          payload: res.data.data
        })
        return res.data.data
      }
    })
    .catch(err =>
      console.log(err)
    )
}

export const fetchJobPost = (accessToken, job_id) => dispatch => {
  const url = `${API_URL}/job_post/${job_id}?access_token=${accessToken}`

  return axios.get(url)
    .then(res => {
      if (res.data.success) {
        dispatch({
          type: FETCH_JOB,
          payload: res.data.data
        })
        return res.data.data
      }
    })
    .catch(err =>
      console.log(err)
    )
}

export const createJobPost = (accessToken, job_post) => dispatch => {
  const url = `${API_URL}/job_post?access_token=${accessToken}`

  return axios.post(url, { job_post })
    .then(res => {
      if (res.data.success) {
        dispatch({
          type: CREATE_JOB_POST,
          payload: res.data.data
        })
        Notification.success("Tạo tin tuyển dụng thành công");
        return res.data.data
      }
    })
    .catch(err =>
      console.log(err)
    )
}

export const updateJobPost = (accessToken, job_post) => dispatch => {
  const url = `${API_URL}/job_post/${job_post.id}?access_token=${accessToken}`

  return axios.put(url, { job_post } )
    .then(res => {
      if (res.data.success) {
        dispatch({
          type: UPDATE_JOB_POST,
          payload: res.data.data
        })
        Notification.success("Cập nhật tin thành công");
        return res.data.data
      }
    })
    .catch(err =>
      console.log(err)
    )
}

export const fetchListSavedJob = (accessToken, user_id, params = {}) => dispatch => {
  const url = `${API_URL}/saved_job?user_id=${user_id}&access_token=${accessToken}`
  return axios.get(url, { params })
    .then(res => {
      if (res.data.success) {
        dispatch({
          type: FETCH_LIST_SAVED_JOB,
          payload: res.data.data
        })
        return res.data.data
      }
    })
    .catch(err =>
      console.log(err)
    )
}

export const createSavedJob = (accessToken, saved_job) => dispatch => {
  const url = `${API_URL}/saved_job?access_token=${accessToken}`

  return axios.post(url, { saved_job })
    .then(res => {
      if (res.data.success) {
        dispatch({
          type: CREATE_SAVED_JOB,
          payload: res.data.data
        })
        Notification.success("Lưu thông tin thành công");
        return res.data.data
      }
    })
    .catch(err =>
      console.log(err)
    )
}

export const fetchListApplied = (accessToken, user_id, params = {}) => dispatch => {
  const url = `${API_URL}/applied?user_id=${user_id}&access_token=${accessToken}`
  return axios.get(url, { params })
    .then(res => {
      if (res.data.success) {
        dispatch({
          type: FETCH_LIST_APPLIED,
          payload: res.data.data
        })
        return res.data.data
      }
    })
    .catch(err =>
      console.log(err)
    )
}

export const createApplied = (accessToken, applied) => dispatch => {
  const url = `${API_URL}/applied?access_token=${accessToken}`

  return axios.post(url, { applied })
    .then(res => {
      if (res.data.success) {
        dispatch({
          type: CREATE_APPLIED,
          payload: res.data.data
        })
        Notification.success("Ứng tuyển thành công");
        return res.data.data
      }
    })
    .catch(err =>
      console.log(err)
    )
}

export const clearJob = () => ({ type: CLEAR_JOB });