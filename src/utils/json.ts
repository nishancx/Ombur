const jsonParse = (str: string) => {
  try {
    const strObj = JSON.parse(str);
    return strObj;
  } catch (e) {
    return null;
  }
};

export { jsonParse };
