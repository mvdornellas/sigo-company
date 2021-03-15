import { IStandardRepository, IStandardRepositoryToken } from '#application/repositories/iStandardRepository'
import { ICompanyRepository, ICompanyRepositoryToken } from '#application/repositories/iCompanyRepository'
import { Inject, Service } from 'typedi'
import { CompanyDto } from '#application/dto/company'
import { Company } from '#enterprise/domain/company'
import { UseCaseBase } from '#application/useCases/base/useCaseBase'
import { INotificationService, INotificationServiceToken } from '#application/services/iNotificationService'

@Service()
export class CreateCompanyUseCase implements UseCaseBase<CompanyDto> {

  @Inject(ICompanyRepositoryToken) private readonly companyRepository!: ICompanyRepository

  @Inject(INotificationServiceToken) private readonly notificationService!: INotificationService

  async run (companyDto: CompanyDto): Promise<CompanyDto> {
    console.info('[I] COMPANY CREATE DTO DATA', companyDto)
    const companyCreated = await this.companyRepository.create(new Company(companyDto))
    console.info('[I] COMPANY CREATED DATA', JSON.stringify(companyCreated))
    const notification = await this.notificationService.send(JSON.stringify({
      ...companyCreated
    }))
    console.info('[I] NOTIFICATION COMPANY CREATED SENDED', notification)
    return companyDto
  }
}
