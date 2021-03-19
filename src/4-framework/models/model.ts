import { BaseDataSchema, BaseKeySchema } from '#framework/models/baseModel'
import dynamoose, { ModelConstructor, Schema, SchemaAttributes } from 'dynamoose'

export type ModelDataSchema = BaseDataSchema<any>
export type ModelKeySchema = BaseKeySchema

export type ModelSchema = ModelConstructor<
  ModelDataSchema,
  ModelKeySchema
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
    required: false
  },
  name: {
    type: String,
    required: false
  },
  cnpj: {
    type: Number,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  startHire: {
    type: String,
    required: false
  },
  endHire: {
    type: String,
    required: false
  },
  complianceAssessed: {
    type: Boolean,
    required: false
  },
  rating: {
    type: Number,
    required: false
  },
  createdAt: {
    type: String,
    default: new Date(),
    required: false
  },
  updatedAt: {
    type: String,
    required: false
  }
} as SchemaAttributes

export const Model: ModelSchema = dynamoose.model<
  ModelDataSchema,
  ModelKeySchema>(
    'SIGO',
    new Schema(schema, {
      timestamps: true,
      saveUnknown: true,
      useDocumentTypes: false
    })
  )
