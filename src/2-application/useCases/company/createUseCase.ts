import { ICompanyRepository, ICompanyRepositoryToken } from '#application/repositories/iCompanyRepository'
import { Inject, Service } from 'typedi'
import _ from 'lodash'
import { v4 as uuid } from 'uuid'
import { CompanyDto } from '#application/dto/company'
import { Company } from '#enterprise/domain/company'
import { UseCaseBase } from '#application/useCases/base/useCaseBase'
import { INotificationService, INotificationServiceToken } from '#application/services/iNotificationService'

@Service()
export class CreateCompanyUseCase implements UseCaseBase<Company> {

  @Inject(ICompanyRepositoryToken) private readonly companyRepository!: ICompanyRepository

  @Inject(INotificationServiceToken) private readonly notificationService!: INotificationService

  async run ({
      cnpj,
      email,
      endHire,
      name,
      startHire
  }: CompanyDto): Promise<Company> {

    const companyCreated = await this.companyRepository.create({
      id: uuid(),
      cnpj,
      email,
      endHire,
      name,
      startHire
    } as Company)

    console.info('[I] COMPANY CREATED DATA', JSON.stringify(companyCreated))

    const notification = await this.notificationService.send(JSON.stringify({
      companyCreated
    }))

    console.info('[I] SEND NOTIFICATION MESSAGE', notification)

    return companyCreated
  }
}
