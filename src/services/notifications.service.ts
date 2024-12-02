import axios from "../helpers/axios";
import stringUtils from "../helpers/stringUtils";

const route = "notifications";

const get = async (id: string) => axios.get(`v1/${route}/${id}`);

const query = async (options = {}) =>
  axios.get(`v1/${route}?${stringUtils.queryString(options)}`);

interface ReadProps {
  id: string;
}
const read = async ({ id }: ReadProps) => axios.put(`v1/${route}/${id}`);

export default {
  get,
  query,
  read,
};
