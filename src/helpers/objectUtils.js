const cleanEmpty = (obj) =>
  Object.entries(obj)
    .map(([k, v]) => [k, v && typeof v === "object" ? cleanEmpty(v) : v])
    .reduce((a, [k, v]) => {
      if (v) a[k] = v;
      return a;
    }, {});

export default {
  cleanEmpty,
};
