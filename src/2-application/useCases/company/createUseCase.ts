import { IStandardRepository, IStandardRepositoryToken } from '#application/repositories/iStandardRepository'
import { ICompanyRepository, ICompanyRepositoryToken } from '#application/repositories/iCompanyRepository'
import { Inject, Service } from 'typedi'
import _ from 'lodash'
import { CompanyDto } from '#application/dto/company'
import { Company } from '#enterprise/domain/company'
import { UseCaseBase } from '#application/useCases/base/useCaseBase'
import { INotificationService, INotificationServiceToken } from '#application/services/iNotificationService'

@Service()
export class CreateCompanyUseCase implements UseCaseBase<Company> {

  @Inject(ICompanyRepositoryToken) private readonly companyRepository!: ICompanyRepository
  @Inject(IStandardRepositoryToken) private readonly standardRepository!: IStandardRepository
  @Inject(INotificationServiceToken) private readonly notificationService!: INotificationService

  async run (companyDto: CompanyDto): Promise<Company> {
    console.info('[I] COMPANY CREATE DTO DATA', companyDto)
    const companyDomain = new Company(companyDto)
    console.info('[I] COMPANY DOMAIN DATA', companyDomain)
    const company = await this.companyRepository.create(companyDomain)
    console.info('[I] COMPANY CREATED ENTITY DATA', company)
    await this.standardRepository.create(companyDomain.id, companyDomain.standards!)
    .catch(async error => {
      /** ROLLBACK */
      console.info(`[E] ROLLBACK CREATE COMPANY`,error)
      await this.companyRepository.delete(company.id)
      throw new Error(JSON.stringify(error))
    })

    console.info('[I] COMPANY CREATED DATA', JSON.stringify(company))

    const notification = await this.notificationService.send(JSON.stringify({
      ...company
    }))

    console.info('[I] NOTIFICATION COMPANY CREATED SENDED', notification)

    return company
  }
}
