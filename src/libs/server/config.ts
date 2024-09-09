function loadFromEnv(key: string) {
  if (typeof process.env[key] !== "undefined") {
    return process.env[key] as string;
  }
  throw new Error(`process.env doesn't have the key ${key}`);
}

const config = {
  mongodbUri: loadFromEnv("MONGODB_URI"),
};

export { config as serverConfig };
