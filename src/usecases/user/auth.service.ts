import { JwtService } from '@nestjs/jwt';
import { Injectable } from "@nestjs/common";
import { AuthDTO, RegisterDTO } from './auth.dto';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt'
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService, private readonly prismaService: PrismaService){}

    public async login(auth: AuthDTO) {
        const user = await this.prismaService.user.findFirst({
            where: {
                email: auth.email,
            }
        })
        if(!user) throw new UnauthorizedException('Invalid credentials')
        const password = await bcrypt.compare(auth.password, user.password)
        if(!password) throw new UnauthorizedException('Invalid credentials')
        const token = this.jwtService.sign({id: user.id})
        return token
    }

    public async register(register: RegisterDTO) {
        const user = await this.prismaService.user.findFirst({
            where: {
                email: register.email
            }
        })
        if(user) throw new UnauthorizedException('User already exists')
        const code = await this.prismaService.code.findFirst({
            where: {
                code: register.code
            }
        })
        if(!code) throw new UnauthorizedException('Invalid code')
        const password = await bcrypt.hash(register.password, 10)
        await this.prismaService.user.create({
            data: {
                email: register.email,
                password,
                id: randomUUID()
            }
        })
        await this.prismaService.code.delete({
            where: {
                id: code.id
            }
        })
    }
}