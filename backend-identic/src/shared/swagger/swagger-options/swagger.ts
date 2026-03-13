import path from "path";
import swaggerJSDoc from "swagger-jsdoc";
import { Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "IDentic API",
      version: "1.0.0",
      description: "API documentation for IDentic",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Development server",
      },
    ],
  },
  apis: [
    path.join(process.cwd(), "src/**/*.ts"),
    path.join(process.cwd(), "dist/**/*.js"),
    path.join(process.cwd(), "src/**/*.js"),
  ],
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app: Express, port: number) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}

export default swaggerDocs;
