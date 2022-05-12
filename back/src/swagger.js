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
  apis: ["./src/router/*.js", "/swagger/*", "./src/schemas/*.js"],
};

export default options;
