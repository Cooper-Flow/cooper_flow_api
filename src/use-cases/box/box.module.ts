import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { MailService } from 'src/external/mailer/mail.service';
import { BoxController } from './box.controller';
import { BoxService } from './box.service';

@Module({
  controllers: [BoxController],
  providers: [BoxService, PrismaService, MailService]
})
export class BoxModule {}
