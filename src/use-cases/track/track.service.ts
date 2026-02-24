import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';

@Injectable()
export class TrackService {


    constructor(
        private readonly prismaService: PrismaService
    ) {}


    async CreateEnter(data: any, user_id: string) {

        try {

            const newEnter = await this.prismaService.entryV2.create({
                data: {
                    creator_id: user_id,
                    producer_id: data.producer_id,
                    field: data.field ?? '',
                    batch: data.batch ?? '',
                    entry_at: data.entry_at,
                    observation: data.observation,
                    status: data.status
                }
            })

        }   
        catch(error: any) {
            throw new Error('Houve um erro ao criar entrada')
            console.log(error.message)
        }

    }

}
