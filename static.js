// static api

import axios from 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js';

export async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post('https://static.geoloup.com/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('Success:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
