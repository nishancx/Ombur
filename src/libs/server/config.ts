const config = {
  mongodbUri: process.env.MONGODB_URI,
  public: {
    nextAuthUrl: process.env.NEXTAUTH_URL,
  },
};

export { config as serverConfig };
