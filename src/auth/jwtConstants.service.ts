import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtConstants {
    secret:string = process.env.JWT_KEY
}