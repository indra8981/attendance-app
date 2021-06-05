import axios from 'axios';
import Constants from './constants';
// Next we make an 'instance' of it
const instance = axios.create({
  // .. where we make our configurations
  baseURL: Constants.BACKEND_ENDPOINT,
});

export default instance;
