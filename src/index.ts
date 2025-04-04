import startApp from "./App"

const config: any = {
  port: Number(process.env.PORT) || 3000,
  environment: process.env.NODE_ENV || 'development'
};

startApp(config);
