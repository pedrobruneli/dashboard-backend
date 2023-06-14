import { Body, Controller, Post, Res } from "@nestjs/common";
import { SellService } from "./sell.service";
import { SellDTO } from "./sell.dto";
import { Response } from "express";

@Controller('sell')
export class SellController {

    constructor(private readonly sellService: SellService){}

    @Post()
    public async sell(@Body() body: SellDTO, @Res() res: Response) {
        await this.sellService.sell(body)
        res.status(201).send()
    }

}