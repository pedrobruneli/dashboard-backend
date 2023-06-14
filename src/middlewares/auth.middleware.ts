import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import {
    UnauthorizedException,
  } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(private readonly jwtService: JwtService){}

    use(req: any, res: any, next: (error?: any) => void) {
        try{
            const authHeaders = req.headers.authorization;
            if(!authHeaders) throw new UnauthorizedException('Token not found')
            const token = authHeaders.split('Bearer ')[1];
            const user = this.jwtService.verify(token);
            req.user = user;
            return next()
        } catch(err) {
            throw new UnauthorizedException('Token invalid')
        }
    }
}