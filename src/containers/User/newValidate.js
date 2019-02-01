import { validatorFactory } from 'utils/validationHelper'

const schema = {
  username: { presence: true },
  first_name: { presence: true },
  last_name: { presence: true },
  expected_cal: { 
    presence: true,
    numericality: {
      greaterThan: 0,
    },
  },
  role: { presence: true },
  password: { presence: true },
  confirm_password: {
    presence: true,
    equality: 'password',
  },
}

export default validatorFactory(schema)
