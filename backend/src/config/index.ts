const config = {
  isProduction: process.env.NODE_ENV === "production",
  port: process.env.PORT,
  db_url:
    process.env.NODE_ENV === "production"
      ? process.env.REMOTE_DB_URL
      : process.env.LOCAL_DB_URL,
};

export { config };
