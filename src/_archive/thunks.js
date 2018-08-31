import server from '../logic/http';
import act from './actions';

export const get = (url, path) => async (dispatch) => {
  dispatch({type: 'API_GET'});
  const res = await server.get(url);
  dispatch(act.PATH([path, res]));
};
export const startup = () => async (dispatch) => {
  //dispatch(get('db', 'data'));
};
export const set = (url, data, path) => async (dispatch) => {
  const res = await server.post(url, data);
  if(path) {
    dispatch(act.PATH([path, res]));
  }
};
