import { Body, Controller, Get, HttpCode, Param, Post, Query, UnauthorizedException } from '@nestjs/common';
import { Public } from 'src/decorators/auth-guard.decorator';
import { UserCreateDTO } from './dto/user-create.dto';
import { AuthDTO } from './dto/auth.dto';
import { UserService } from './user.service';
import { User } from 'src/decorators/user.decorator';
import { UserPaginateDTO } from './dto/user-paginate.dto';
import { FindUserByIdDTO } from './dto/find-user-by-id.dto';
import { UserSetPasswordDTO } from './dto/user-set-password';
import { ValidateToken } from './dto/validate-token.dto';
import { ProfileCreateDTO } from './dto/profile-create.dto';
import { ProfileUpdateDTO } from './dto/profile-update.dto';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    @Public()
    @Post('/auth')
    async auth(@Body() data: AuthDTO) {
        if (!(await this.userService.exists(data.email))) {
            throw new UnauthorizedException('Usuário não encontrado')
        }

        return await this.userService.authenticate(data);
    }

    @Public()
    @Post('/set-password')
    async setPassword(@Body() data: UserSetPasswordDTO) {
        return await this.userService.setPassword(data)
    }

    @Public()
    @Get('/validate-password/:token')
    async validatePassword(@Param() data: ValidateToken) {
        return await this.userService.validateToken(data)
    }

    @Public()
    @Get('/test')
    async testAPI() {
        return 'API is working'
    }

    @Get('/profile/combolist')
    async listProfile() {
        return await this.userService.listProfile()
    }

    @Post('/profile/create')
    async createProfile(@Body() data: ProfileCreateDTO) {
        return await this.userService.createProfile(data)
    }

    @Get('/profile/detail/:id')
    async detailProfile(@Param() data: { id: string }) {
        return await this.userService.detailProfile(data.id)
    }

    @Post('/profile/update')
    async updateProfile(@Body() data: ProfileUpdateDTO) {
        return await this.userService.updateProfile(data)
    }

    @Get('/profile/permission')
    async getPermission(@User() user_id: string) {
        return await this.userService.getPermission(user_id)
    }

    @Get('/profile/check/:id')
    async checkPermission(@Param() data: { id: string }, @User() user_id: string) {
        return await this.userService.checkPermission(data.id, user_id)
    }
}
