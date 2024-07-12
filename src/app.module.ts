import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './api/mailer/mail.service';
import { UserModule } from './use-cases/user/user.module';
import { AuthModule } from './use-cases/user/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './use-cases/user/user.controller';
@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'noreplycooperflow@gmail.com',
          pass: 'aeduzxgkjhlunmne'
        }
      }
    }),
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [MailService],
})
export class AppModule { }
