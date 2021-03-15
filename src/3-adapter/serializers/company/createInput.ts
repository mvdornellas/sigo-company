import { CompanyDto } from '#application/dto/company'
import { StandardDto } from '#application/dto/standard'
import { v4 as uuid } from 'uuid'

export class CreateCompanyInput {
  company!: CompanyDto
  standards!: StandardDto[]

  constructor ({ name, cnpj, email, startHire, endHire, standards }: {
    name: string
    cnpj: string
    email: string
    startHire: string
    endHire: string
    standards: Array<{id: string, name: string}>
  }) {
    this.company = {
      id: uuid(),
      name,
      cnpj: parseInt(cnpj,10),
      email,
      startHire,
      endHire
    }

    this.standards = standards.map(s => new StandardDto(s))
  }
}

// export class StandardInput {
//   id!: string
//   name!: string
//   constructor (obj: Partial<StandardInput>) {
//     Object.assign(this,obj)
//   }
// }
