const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Moive API",
      version: "1.0.0",
      description: "Movie API",
    },
    servers: [
      {
        url: "http://localhost:5001",
      },
    ],
  },
  apis: ["./router/*.js", "/swagger/*"],
};

export default options;
