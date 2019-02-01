import { validatorFactory } from 'utils/validationHelper'

const schema = {
  username: { presence: true },
  first_name: { presence: true },
  last_name: { presence: true },
  password: { presence: true },
  confirm_password: {
    presence: true,
    equality: "password",
  },
}

export default validatorFactory(schema)
