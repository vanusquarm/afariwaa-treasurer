import swaggerJSDoc from 'swagger-jsdoc';
import { Options } from 'swagger-jsdoc';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Estate Management API',
      version: '1.0.0',
      description: 'Express API with Swagger (TS)',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
  },
  apis: ['src/routes/*.ts', 'dist/routes/*.js'], // IMPORTANT: point to TS files
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;