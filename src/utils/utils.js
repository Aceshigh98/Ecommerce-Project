//Convert id
export const convertId = (object) => {
  const newObject = object.map((item) => ({
    ...item,
    _id: item._id.toString(),
  }));

  if (newObject) {
    return newObject;
  }

  throw new Error("Error converting object");
};
