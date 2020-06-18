import axios from 'axios';
import Notification from 'component/common/Notification.js';

import {
  FETCH_JOB_POST,
  CREATE_JOB_POST,
  UPDATE_JOB_POST,
  FETCH_JOB
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

  return axios.post(url, { job_post } )
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