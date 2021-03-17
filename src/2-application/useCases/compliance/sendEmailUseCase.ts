import { IAuthorizerService, IAuthorizerServiceToken } from '#application/services/iAuthorizerService'
import { Company } from '#enterprise/domain/company'
import { Inject, Service } from 'typedi'
import { UseCaseBase } from '#application/useCases/base/useCaseBase'
import { IEmailService, IEmailServiceToken } from '#application/services/iEmailService'

@Service()
export class SendEmailComplianceUseCase implements UseCaseBase<boolean> {

  @Inject(IEmailServiceToken) private readonly emailService!: IEmailService
  @Inject(IAuthorizerServiceToken) private readonly tokenService!: IAuthorizerService

  async run (_company: Company): Promise<boolean> {
    const { id, name, email } = _company
    const source = process.env.COMPLIANCE_SOURCE_EMAIL!
    const appRedirectUrl = process.env.APP_BASE_URL
    const token = this.tokenService.encrypt(_company, {
      secret: process.env.TOKEN_SECRET_KEY!
    })

    await this.emailService.sendHTML(source, [email ,'dornellas13@gmail.com'], {
      subject: 'SISTEMA INTEGRADO DE GESTÃO DE OPERAÇÃO',
      content: `<img src="https://milvus.com.br/wp-content/uploads/mv_compliance-1024x538.jpg"><p>Olá empresa <b>${name}</b>.</p>
      <p>Bem vindo a <b>Têxtil do Brasil SA</b> </p>
      <p>
        Estamos muito contente com esta nova parceria. A sua experiencia é muito importante para a nossa empresa.
         Abaixo segue o link para avaliar nossas normas.
      </p>
      <p>
        <a href="${`${appRedirectUrl}/company/${id}/compliance?token=${token}`}">Clique aqui</a>
      </p>
      <p>Obrigado por nos ajudar a melhorar nossa gestão.</p>`
    })
    return true
  }
}
