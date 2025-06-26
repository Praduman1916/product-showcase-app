import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/products';

export const getAllProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    return null;
  }
};
