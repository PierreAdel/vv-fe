import axios from "../helpers/axios";

const route = "todos";

const get = async (id: string) => axios.get(`v1/${route}/${id}`);
const getAll = async () => axios.get(`v1/${route}`);

interface CreateProps {
  title: string;
  text: string;
}
const create = async ({ title, text }: CreateProps) =>
  axios.post(`v1/${route}`, {
    title,
    text,
  });

interface UpdateProps {
  title: string;
  text: string;
}
const update = async ({ title, text }: UpdateProps) =>
  axios.patch(`v1/${route}`, {
    title,
    text,
  });

interface DeleteProps {
  id: string;
}
const remove = async ({ id }: DeleteProps) => axios.delete(`v1/${route}/${id}`);

export default {
  get,
  getAll,
  create,
  update,
  remove,
};
