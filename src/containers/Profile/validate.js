import { validatorFactory } from 'utils/validationHelper'

const schema = {
  username: { presence: true },
  first_name: { presence: true },
  last_name: { presence: true },
  confirm_password: {
    equality: 'password',
  },
  expected_cal: {
    presence: true,
    numericality: {
      greaterThan: 0,
    }
  },
}

export default validatorFactory(schema)
