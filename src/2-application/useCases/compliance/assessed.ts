import { ICompanyRepository, ICompanyRepositoryToken } from '#application/repositories/iCompanyRepository'
import { Inject, Service } from 'typedi'
import { UseCaseBase } from '#application/useCases/base/useCaseBase'
import { Company } from '#enterprise/domain/company'

@Service()
export class UpdateComplianceAssessedUseCase implements UseCaseBase<Company> {

  @Inject(ICompanyRepositoryToken) private readonly companyRepository!: ICompanyRepository

  async run (companyId: string): Promise<Company> {
    console.info('[I] COMPLIANCE ASSESSED',companyId)
    return this.companyRepository.updateComplianceAssessed(companyId)
  }
}
