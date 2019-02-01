import validator from 'validate.js'
import { forEach } from 'lodash'

export function validatorFactory(schema) {
  return values => {
    const errors = validator(values, schema)
    forEach(errors, (item, key) => // eslint-disable-line
      errors[key] = item[0]
    )
    return errors || {}
  }
}
