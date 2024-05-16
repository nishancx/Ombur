const serializeObject = (obj: any) => {
  if (obj === null || obj === undefined) return null;

  return jsonParse(JSON.stringify(obj));
};

const jsonParse = (str: string) => {
  try {
    const strObj = JSON.parse(str);
    return strObj;
  } catch (e) {
    return null;
  }
};

export { serializeObject, jsonParse };
