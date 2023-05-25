import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptUtils {
    
    async generateHash(pass: string): Promise<string> {
        const salt = await bcrypt.genSalt(12);
        const password = pass;
        const hash = await bcrypt.hash(password, salt);
        return hash
    }

    async compareHash(pass: string, hash: string): Promise<boolean> {
        const check = await bcrypt.compare(pass, hash);
        return check
    }
}