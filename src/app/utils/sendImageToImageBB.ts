import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import config from '../config';

export const sendImageToImgBB = (
  imageName: string,
  imagePath: string,
): Promise<Record<string, unknown>> => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('image', fs.createReadStream(imagePath));
    formData.append('name', imageName);

    const uploadUrl = `https://api.imgbb.com/1/upload`;

    axios
      .post(uploadUrl, formData, {
        headers: {
          ...formData.getHeaders(),
        },
        params: {
          key: config.imagebb_api_key,
        },
      })
      .then((response) => {
        if (response.data && response.data.data) {
          resolve(response.data.data);
        } else {
          reject(new Error('Image upload failed.'));
        }
      })
      .catch((error) => {
        console.error(
          'Error during image upload:',
          error.response || error.message,
        );
        reject(error);
      })
      .finally(() => {
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
          } else {
            console.log('File deleted from the server.');
          }
        });
      });
  });
};
