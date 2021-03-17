import axios from "axios";

export const fetchData = (limit, offset, query) => {
  const actualQuery = query ? query.toLowerCase() : "cats";
  const APIKEY = "L0MvVScbx42FtgMad1nG1buExy1jkEIs";
  const LINK = `https://api.giphy.com/v1/gifs/search?q=${actualQuery}&api_key=${APIKEY}&limit=${limit}&offset=${offset}`;

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
