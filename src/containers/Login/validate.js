import { validatorFactory } from 'utils/validationHelper'

const schema = {
  username: { presence: true },
  password: { presence: true },
}

export default validatorFactory(schema)
