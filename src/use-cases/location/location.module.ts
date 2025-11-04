import { PrismaService } from 'src/infra/database/prisma.service';
import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { CalcHandlerService } from 'src/shared/handlers/calc.handler';

@Module({
  providers: [LocationService, PrismaService, CalcHandlerService],
  controllers: [LocationController]
})
export class LocationModule {}
