import axios from 'axios';
import { BASE_URL } from '../config';

export const getNotifications = async (user) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/notifications/${user._id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
};
