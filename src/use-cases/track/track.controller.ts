import { Body, Controller, Post } from '@nestjs/common';
import { TrackService } from './track.service';
import { User } from 'src/decorators/user.decorator';

@Controller('track')
export class TrackController {

    constructor(
        public readonly trackService: TrackService
    ) { }

    @Post('/create-enter')
    async CreateEnter(@Body() data: any,  @User() user_id: string) {
        return await this.trackService.CreateEnter(data, user_id);
    }

}
