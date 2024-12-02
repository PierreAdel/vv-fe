const queryString = (options) =>
  Object.keys(options)
    .map((key) => `${options[key] ? `&${key}=${options[key]}` : ""}`)
    .join("");

export default {
  queryString,
};
