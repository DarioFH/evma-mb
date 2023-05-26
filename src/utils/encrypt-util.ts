import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';


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

    async generateUuid(): Promise<string> {
        const hash = randomUUID()
        return hash;
    }
}