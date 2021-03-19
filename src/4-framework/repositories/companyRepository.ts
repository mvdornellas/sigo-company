import { Service } from 'typedi'
import { Model } from '#framework/models/model'
import { ICompanyRepository, ICompanyRepositoryToken } from '#application/repositories/iCompanyRepository'
import { Company } from '#enterprise/domain/company'
import _ from 'lodash'

export const COMPANY_PK = 'COMPANY'
export const COMPANY_SK = 'DETAILS'
export const COMPANY_ID = `ID`

@Service({ id: ICompanyRepositoryToken })
export class CompanyRepository implements ICompanyRepository {
  async updateComplianceAssessed (id: string): Promise<Company> {
    return Model.update({
      pk: COMPANY_PK,
      sk: `${COMPANY_SK}#${COMPANY_ID}#${id}`
    }, {
      complianceAssessed: true
    })
  }
  async create ({ id, name, email, cnpj, startHire, endHire }: Company): Promise<Company> {
    return Model.create({
      pk: COMPANY_PK,
      sk: `${COMPANY_SK}#${COMPANY_ID}#${id}`,
      id,
      name,
      email,
      cnpj,
      complianceAssessed: false,
      startHire,
      endHire
    })
  }

  async delete (id: string): Promise<void> {
    return Model.delete({
      pk:  COMPANY_PK,
      sk: `${COMPANY_SK}#${COMPANY_ID}#${id}`
    })
  }

  async getAllDetails (): Promise<Company[]> {
    return Model.query('pk')
    .eq(COMPANY_PK)
    .where('sk')
    .beginsWith(COMPANY_SK)
    .descending()
    .exec()
  }

  async get (companyId: string): Promise<Company> {
    return Model.queryOne('pk').eq(COMPANY_PK).where('sk').eq(`${COMPANY_SK}#${COMPANY_ID}#${companyId}`).exec()
  }

  async getAllItems (): Promise<Company[]> {
    const items = await Model.query('pk').eq(COMPANY_PK).descending().exec()
    return _.chain(
      items.map((company) => {
        const guid = company.sk.split('#ID#')[1] ||
        company.sk.split('#STANDARD')[0].split('ID#')[1]
        return {
          guid,
          ...company
        }
      })
    )
    .groupBy('guid')
      .map((value, key) => {
        return {
          ...value.find((company) => company.sk === `DETAILS#ID#${key}`),
          standards: value.filter((standard) => standard.sk !== `DETAILS#ID#${key}`)
        }
      })
    .value()

  }

}
