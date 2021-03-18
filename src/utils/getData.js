import axios from "axios";

const APIKEY = "L0MvVScbx42FtgMad1nG1buExy1jkEIs";

export const fetchData = (limit, offset, query) => {
  const trend = "trending?";
  const search = `search?&q=${query.toLowerCase()}`;
  const LINK = `https://api.giphy.com/v1/gifs/${
    query ? search : trend
  }&api_key=${APIKEY}&limit=${limit}&offset=${offset}`;

  return axios
    .get(LINK)
    .then((response) => {
      const dataArray = response.data.data;
      const gifs = dataArray.map((item) => item.images.original);
      return gifs;
    })
    .catch((error) => {
      console.log(error);
    });
};
