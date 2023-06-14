import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthDTO, RegisterDTO } from "./auth.dto";
import { Response } from "express";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post()
    public async login(@Res() res: Response, @Body() auth: AuthDTO) {
        const access_token = await this.authService.login(auth)

        return res.status(200).json({access_token})
    }

    @Post('register')
    public async register(@Res() res: Response, @Body() register: RegisterDTO) {
        await this.authService.register(register)
        return res.status(201).json({message: 'User created'})
    }
}