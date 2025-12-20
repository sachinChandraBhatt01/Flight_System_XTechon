import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/myapp';
const jwtSecret = process.env.JWT_SECRET

export default {
  port,
  mongoURI,
  jwtSecret,
};
