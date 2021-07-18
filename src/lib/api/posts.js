import axios from "axios";

export const getPostList = async () => {
  const response = await axios.get("/posts");
  return response;
};
