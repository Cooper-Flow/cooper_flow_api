import { Injectable } from '@nestjs/common';
import { mail } from '../../configs/env';
import { MailerService } from '@nestjs-modules/mailer';
import { env } from 'process';
import { Resend } from 'resend';


interface mailerProps {
  to: string
  subject: string
  text: string,
  name: string,
  token: string
}

@Injectable()
export class MailService {

  constructor(
    private readonly mailerService: MailerService
  ) { }

  async createAccount(user: mailerProps) {

    const link = `${env.LINK_CREATE_ACCOUNT}${user.token}`
    const resend = new Resend('re_ZFwLsq9E_9sHX64Qoq5cKBnZ5sF3Z8exa');


    const _html = `
    <div>
      <div style="text-align:center; padding: 20px; border-radius: 10px; margin-bottom: 20px">
        <p style="font-weight: bold; font-size: 20px">Bem vindo ao <strong>CooperFlow</strong></p>
        <span>Clique no link abaixo para efetuar o primeiro acesso.</span>
      </div>
      <div style="padding: 20px; text-align:">
        <div>
          <span>Nome: ${user.name}</span>
        </div>
        <div style="margin-bottom: 20px;">
          <span>Usuário: ${user.to}</span>
        </div>
        <div style="margin-bottom: 20px; text-align: center">
          <a href="${link}">Primeiro acesso</a>
        </div>
      </div>
    </div>
    `

    const { data, error } = await resend.emails.send({
      from: 'noreply@cooperflow.com.br',
      to: user.to,
      subject: user.subject,
      html: _html
    });

    console.log(data)

    if (error) {
      console.log(error)
      return {
        message: 'Falha ao enviar email'
      }
    }

    return {
      message: 'Email enviado com sucesso'
    }

  }

}
