import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com';

const ACCESS_KEY = 'Wl4qybTYTQPq5gU9K04QFcw-kXdFeKEPT7O7-67e0y0';

export const fetchImages = async (query, page = 1) => {
  const response = await axios.get('/search/photos', {
    params: {
      query: query,
      page: page,
      per_page: 12,
    },
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
  });
  return response.data;
};

// import axios from 'axios';

// const ACCESS_KEY = 'YOUR_ACCESS_KEY';

// axios.defaults.baseURL = 'https://api.unsplash.com';

// export const searchImages = async (query, page) => {
//   const response = await axios.get('/search/photos', {
//     params: {
//       query,
//       page,
//       per_page: 12,
//       client_id: ACCESS_KEY,
//     },
//   });
//   return response.data;
// };
