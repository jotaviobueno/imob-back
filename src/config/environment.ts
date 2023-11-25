export const environment = {
  PORT: process.env.PORT ?? 3000,
  JWT_SECRET: process.env.JWT_SECRET,
  AWS_ACCESS_ID: process.env.AWS_ACCESS_ID,
  AWS_ACCESS_SECRET: process.env.AWS_ACCESS_SECRET,
  AWS_S3_REGION: process.env.AWS_S3_REGION,
};
