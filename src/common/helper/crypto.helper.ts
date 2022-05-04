import * as bcrypt from 'bcrypt';


export class CryptoHelper {
    static async hashPassword(password: string) {
        return await bcrypt.hash(password, Number(process.env.HASH_SALT));
    }

    static async comparePassord(password: string, passwordCompare: string){
        return bcrypt.compare(password, passwordCompare);
    }
}
