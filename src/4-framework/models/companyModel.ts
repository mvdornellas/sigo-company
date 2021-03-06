import dynamoose, { ModelConstructor, Schema, SchemaAttributes } from 'dynamoose'
import { Company } from '#enterprise/domain/company'

export type CompanyDataSchema = Company
export type CompanyKeySchema = Pick<Company, any>

export type CompanySchema = ModelConstructor<
  CompanyDataSchema,
  CompanyKeySchema
>

const schema = {
  companyId: {
    type: String,
    required: true,
    hashKey: true
  },
  standardId: {
    type: String,
    required: true,
    rangeKey: true
  },
  standardName: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  cnpj: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  startHire: {
    type: String,
    required: true,
    default: new Date()
  },
  endHire: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: false,
    default: 0
  },
  createdAt: {
    type: String,
    default: new Date()
  },
  updatedAt: {
    type: String,
    required: false
  }
} as SchemaAttributes

export const CompanyModel: CompanySchema = dynamoose.model<
  CompanyDataSchema,
  CompanyKeySchema>(
    'Company',
    new Schema(schema, {
      timestamps: true,
      saveUnknown: true,
      useDocumentTypes: false
    })
  )
