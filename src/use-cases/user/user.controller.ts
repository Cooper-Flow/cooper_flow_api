import { Body, Controller, Get, HttpCode, Post, Query, UnauthorizedException } from '@nestjs/common';
import { Public } from 'src/decorators/auth-guard.decorator';
import { UserCreateDTO } from './dto/user-create.dto';
import { AuthDTO } from './dto/auth.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) {}

    @Get('/create')
    async create(@Query() data: UserCreateDTO) {

    }

    @Public()
    @Post('/auth')
    async auth(@Body() data: AuthDTO) {
        if (!(await this.userService.exists(data.email))) {
            throw new UnauthorizedException('Usuário não encontrado')
        }

        return await this.userService.authenticate(data);
    }

}
