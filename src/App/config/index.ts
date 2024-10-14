import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env') })
export default {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt_secret: process.env.JWT_SECRET,
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDE_API_KEY,
    api_secret: process.env.CLOUDE_API_SECRET,
}