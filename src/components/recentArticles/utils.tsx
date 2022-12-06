export const duplicateRemover = (rawArray) => {
  return rawArray.filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i);
};
