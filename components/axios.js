import axios from 'axios';
// Next we make an 'instance' of it
const instance = axios.create({
  // .. where we make our configurations
  baseURL: 'http://2150fa5a9cdb.ngrok.io',
});

export default instance;
