import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { PrismaService } from 'src/infra/database/prisma.service';
import { LogService } from '../log/log.service';
import { BooleanHandlerService } from 'src/shared/handlers/boolean.handler';
import { VolumeService } from '../volume/volume.service';
import { CalcHandlerService } from 'src/shared/handlers/calc.handler';

@Module({
  controllers: [RegisterController],
  providers: [RegisterService, PrismaService, LogService, BooleanHandlerService, VolumeService, CalcHandlerService]

})
export class RegisterModule {}
