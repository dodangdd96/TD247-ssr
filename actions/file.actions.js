import axios from 'axios';
import Notification from 'component/common/Notification.js';

import {
  UPDATE_FILE,
  FETCH_FILE
} from '../constant';
  
export const fetchFile = (accessToken, file_id) => dispatch => {
  const url = `${API_URL}/files?${file_id}?access_token=${accessToken}`
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
  const url = `${API_URL}/file?${file.id}?access_token=${accessToken}`

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