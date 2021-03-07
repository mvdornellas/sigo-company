import { ICompanyRepository, ICompanyRepositoryToken } from '#application/repositories/iCompanyRepository'
import { Inject, Service } from 'typedi'
import _ from 'lodash'
import { v4 as uuid } from 'uuid'
import { CompanyDto } from '#application/dto/company'
import { Company } from '#enterprise/domain/company'
import { UseCaseBase } from '#application/useCases/base/useCaseBase'

@Service()
export class CreateCompanyUseCase implements UseCaseBase<boolean> {

  @Inject(ICompanyRepositoryToken) private readonly companyRepository!: ICompanyRepository

  async run ({
      cnpj,
      email,
      endHire,
      name,
      startHire,
      standards
  }: CompanyDto): Promise<boolean> {

    const companyCreated = await this.companyRepository.create({
      id: uuid(),
      cnpj,
      email,
      endHire,
      name,
      startHire
    } as Company)

    console.info('[I] COMPANY CREATED DATA', JSON.stringify(companyCreated))

    return true
  }
}
