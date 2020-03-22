import Express from 'express';
import * as path from 'path';
import errorHandler from '../api/middlewares/error.handler';
import { OpenApiValidator } from 'express-openapi-validator';

function oas(app, routes) {
  const apiSpec = path.join(__dirname, 'api.yml');
  const validateResponses = !!(
    process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION &&
    process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION.toLowerCase() === 'true'
  );
  const validateRequests = !!(
    process.env.OPENAPI_ENABLE_REQUEST_VALIDATION &&
    process.env.OPENAPI_ENABLE_REQUEST_VALIDATION.toLowerCase() === 'true'
  );
  return new OpenApiValidator({
    apiSpec,
    validateRequests,
    validateResponses,
  })
    .install(app)
    .then(() => {
      app.use(process.env.OPENAPI_SPEC || '/spec', Express.static(apiSpec));
      routes(app);
      app.use(errorHandler);
    });
}

export default oas;
