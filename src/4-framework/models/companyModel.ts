import { BaseDataSchema, BaseKeySchema } from '#framework/models/baseModel'
import dynamoose, { ModelConstructor, Schema, SchemaAttributes } from 'dynamoose'
import { Company } from '#enterprise/domain/company'

export type CompanyDataSchema = BaseDataSchema<Company>
export type CompanyKeySchema = BaseKeySchema

export type CompanySchema = ModelConstructor<
  CompanyDataSchema,
  CompanyKeySchema
>

const schema = {
  pk: {
    type: String,
    required: true,
    hashKey: true
  },
  sk: {
    type: String,
    required: true,
    rangeKey: true
  },
  id: {
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
  complianceAssessed: {
    type: Boolean,
    required: false,
    default: false
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
    'SIGO',
    new Schema(schema, {
      timestamps: true,
      saveUnknown: true,
      useDocumentTypes: false
    })
  )
