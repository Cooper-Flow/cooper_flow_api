import { Module } from '@nestjs/common';
import { VolumeService } from './volume.service';
import { VolumeController } from './volume.controller';
import { PrismaService } from 'src/infra/database/prisma.service';
import { CalcHandlerService } from 'src/shared/handlers/calc.handler';

@Module({
  providers: [VolumeService, PrismaService, CalcHandlerService],
  controllers: [VolumeController]
})
export class VolumeModule {}
