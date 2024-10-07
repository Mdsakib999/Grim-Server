import config from "../config";
import { UserRole } from "../modules/User/user.interface";
import { User } from "../modules/User/user.model";
import bcrypt from 'bcrypt';


const superUser = {
    userName: 'grimMarket159',
    password: '123456789@',
    role: UserRole.admin,
}

export const seedAdmin = async () => {
    const isExist = await User.findOne({ role: superUser.role })
    if (!isExist) {
        superUser.password = await bcrypt.hash(superUser.password, Number(config.bcrypt_salt_rounds));
        await User.create(superUser)
    }
}