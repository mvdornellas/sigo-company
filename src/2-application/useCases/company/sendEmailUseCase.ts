import { Company } from '#enterprise/domain/company'
import { Service } from 'typedi'
import _ from 'lodash'
import { UseCaseBase } from '#application/useCases/base/useCaseBase'

@Service()
export class SendCompanyEmailUseCase implements UseCaseBase<void> {

  async run (_company: Company): Promise<void> {
    console.info(`[I] SEND EMAIL OK`)
  }
}
