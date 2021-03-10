import { BaseDataSchema, BaseKeySchema } from '#framework/models/baseModel'
import dynamoose, { ModelConstructor, Schema, SchemaAttributes } from 'dynamoose'
import { Standard } from '#enterprise/domain/standard'

export type StandardDataSchema = BaseDataSchema<Standard>
export type StandarKeySchema = BaseKeySchema

export type StandardSchema = ModelConstructor<
  StandardDataSchema,
  StandarKeySchema
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
  rating: {
    type: Number,
    required: true,
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

export const StandardModel: StandardSchema = dynamoose.model<
  StandardDataSchema,
  StandarKeySchema>(
    'SIGO',
    new Schema(schema, {
      timestamps: true,
      saveUnknown: true,
      useDocumentTypes: false
    })
  )
