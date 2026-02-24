import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/decorators/auth-guard.decorator';

@Controller('box')
export class BoxController {

    @Public()
    @Get('/')
    async paginate() {
        return 'works'
    }
}
