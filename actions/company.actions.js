import axios from 'axios';
import Notification from 'component/common/Notification.js';

import {
  FETCH_LIST_COMPANY,
  FETCH_COMPANY,
  UPDATE_COMPANY
} from 'constant';
  
export const fetchListCompany = (accessToken, params = {}) => dispatch => {
  const url = `${API_URL}/company?access_token=${accessToken}`
  return axios.get(url, { params })
    .then(res => {
      if (res.data.success) {
        dispatch({
          type: FETCH_LIST_COMPANY,
          payload: res.data.data
        })
        return res.data.data
      }
    })
    .catch(err =>
      console.log(err)
    )
}

export const fetchCompany = (accessToken, user_id) => dispatch => {
  const url = `${API_URL}/company/${user_id}?access_token=${accessToken}`

  return axios.get(url)
    .then(res => {
      if (res.data.success) {
        dispatch({
          type: FETCH_COMPANY,
          payload: res.data.data
        })
        return res.data.data
      }
    })
    .catch(err =>
      console.log(err)
    )
}

export const updateCompany = (accessToken, company) => dispatch => {
  const url = `${API_URL}/update_company/${company.id}?access_token=${accessToken}`

  return axios.post(url, company)
    .then(res => {
      if (res.data.success) {
        dispatch({
          type: UPDATE_COMPANY,
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