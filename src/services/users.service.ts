import axios from "../helpers/axios";

const route = "users";
const getAll = async () => axios.get(`v1/${route}`);

export default {
  getAll,
};
