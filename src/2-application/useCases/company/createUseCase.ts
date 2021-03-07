import { ICompanyRepository, ICompanyRepositoryToken } from '#application/repositories/iCompanyRepository'
import { Inject, Service } from 'typedi'
import _ from 'lodash'
import { CompanyDto } from '#application/dto/company'
import { Company } from '#enterprise/domain/company'
import { IStandardService, IStandardServiceToken } from '#application/services/iStandardService'

@Service()
export class CreateCompanyUseCase {
  @Inject(ICompanyRepositoryToken) private readonly companyRepository!: ICompanyRepository

  @Inject(IStandardServiceToken) private readonly standardService!: IStandardService

  async run ({
      id,
      cnpj,
      email,
      endHire,
      name,
      startHire,
      standards
  }: CompanyDto): Promise<boolean> {

    const { id: companyId } = await this.companyRepository.create({
      id,
      cnpj,
      email,
      endHire,
      name,
      startHire
    } as Company)

    for (const { id,name } of standards) {
      await this.standardService.create({
        id,
        name,
        companyId
      })
    }

    return true
  }
}
