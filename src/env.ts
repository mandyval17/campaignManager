import { config } from 'dotenv';
import { z } from 'zod';
import validateSchema from './utils/validate-schema';
config();

const ENVSchema = z.object({
  DATABASE_URL: z.string({
    required_error: 'DATABASE_URL is required',
    invalid_type_error: 'DATABASE_URL must be a string',
  }),
  JWT_AUTH_SECRET: z.string({
    required_error: 'JWT_AUTH_SECRET is required',
    invalid_type_error: 'JWT_AUTH_SECRET must be a string',
  }),
  JWT_AUTH_EXPIRY: z.string({
    required_error: 'JWT_AUTH_EXPIRY is required',
    invalid_type_error: 'JWT_AUTH_EXPIRY must be a string',
  }),
  JWT_REFRESH_SECRET: z.string({
    required_error: 'JWT_REFRESH_SECRET is required',
    invalid_type_error: 'JWT_REFRESH_SECRET must be a string',
  }),
  JWT_REFRESH_EXPIRY: z.string({
    required_error: 'JWT_REFRESH_EXPIRY is required',
    invalid_type_error: 'JWT_REFRESH_EXPIRY must be a string',
  }),
  NODE_ENV: z.string({
    required_error: 'NODE_ENV is required',
    invalid_type_error: 'NODE_ENV must be a string',
  }),

});
const { data, message } = validateSchema(ENVSchema, process.env);
if (!data) {
  console.trace(message);
  process.exit(1);
}

export const env = data;

