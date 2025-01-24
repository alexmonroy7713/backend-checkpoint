import "dotenv/config";
import * as joi from "joi";

interface Envars {
  PORT: number;
  DATABASE_URL: string;
  JWT_SECRET: string;

}

const envSchema = joi.object({
  PORT: joi.number().required(),
  DATABASE_URL: joi.string().uri().required(),
  JWT_SECRET: joi.string().required(),
}).unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: Envars = {
  PORT: Number(value.PORT),
  DATABASE_URL: value.DATABASE_URL,
  JWT_SECRET: value.JWT_SECRET,
};

export default envVars;
