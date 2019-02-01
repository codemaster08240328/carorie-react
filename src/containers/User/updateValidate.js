import { validatorFactory } from 'utils/validationHelper'

const schema = {
  first_name: { presence: true },
  last_name: { presence: true },
  expected_cal: { 
    presence: true,
    numericality: {
      greaterThan: 0,
    },
  },
  role: { presence: true },
}

export default validatorFactory(schema)
