import "dotenv/config";
import * as joi from "joi";

interface Envars {
  PORT: number;
  DATABASE_URL: string;
}

const envSchema = joi.object({
  PORT: joi.number().required(),
  DATABASE_URL: joi.string().uri().required(),
}).unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: Envars = {
  PORT: Number(value.PORT),
  DATABASE_URL: value.DATABASE_URL,
};

export default envVars;
