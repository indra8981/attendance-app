import axios from 'axios';
// Next we make an 'instance' of it
const instance = axios.create({
  // .. where we make our configurations
  baseURL: 'https://geolocation-attendance.herokuapp.com',
});

export default instance;
