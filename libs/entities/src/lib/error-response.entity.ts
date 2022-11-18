import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ErrorObject } from 'ajv';

export class ErrorResponse {
  @ApiProperty()
  statusCode: HttpStatus;
  @ApiProperty({
    anyOf: [
      {
        title: 'SchemaError',
        description: 'Schema validation error',
        type: 'array',
        items: {
          type: 'object',
          properties: {
            keyword: {
              type: 'string',
              description: 'The keyword that failed',
              example: 'required',
            },
            instancePath: {
              type: 'string',
              description:
                'JSON Pointer to the location in the data instance (e.g., `"/prop/1/subProp"`).',
              example: '/prop/1/subProp',
            },
            schemaPath: {
              type: 'string',
              description:
                'JSON Pointer to the location of the failing keyword in the schema (e.g. `"#/properties/prop/type"`).',
              example: '#/properties/prop/type',
            },
            params: {
              type: 'object',
              description:
                'Params property is the object with the additional information about error',
              example: {
                missingProperty: 'prop',
              },
            },
            propertyName: {
              type: 'string',
              description: 'Name of the property that caused the error',
            },
            message: {
              type: 'string',
              description:
                'the error message (can be excluded with option `messages: false`)',
              example: "must have required property 'prop'",
            },
            schema: {
              description: 'The value of the failing keyword in the schema',
            },
            parentSchema: {
              type: 'object',
              description: 'The schema containing the keyword',
            },
            data: {
              description: 'the data validated by the keyword.',
            },
          },
          required: ['keyword', 'instancePath', 'schemaPath', 'params'],
        },
      },
      {
        type: 'string',
      },
      {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    ],
  })
  message: string | Array<string> | Array<ErrorObject>;
  @ApiProperty()
  error: string;
}
