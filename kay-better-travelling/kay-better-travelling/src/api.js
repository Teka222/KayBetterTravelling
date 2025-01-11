import axios from 'axios';

export const getToken = async () => {
  try {
    const response = await axios.post(
      'https://test.api.amadeus.com/v1/security/oauth2/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: 'nJJwpZO0UNBVwEcBKUSIlqbVBAc71PHG', // Your API Key here
        client_secret: 'CBiPPFqPEr6bx6gk', // Your API Secret here
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data.access_token; // Return the access token
  } catch (error) {
    console.error('Failed to get access token:', error);
    return null;
  }
};
