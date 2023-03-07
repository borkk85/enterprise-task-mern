import axios from "axios";
const API_URL = "/api/books";


const getBook = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

const bookService = {
  getBook,
};

export default bookService;
