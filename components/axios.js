import axios from 'axios';
// Next we make an 'instance' of it
const instance = axios.create({
  // .. where we make our configurations
  baseURL: 'http://1c9def41d7a5.ngrok.io',
});

export default instance;
