import { validatorFactory } from 'utils/validationHelper'

const schema = {
  date: { presence: true },
  time: { presence: true },
  text: { presence: true },
  calorie: { 
    presence: true,
    numericality: {
      greaterThan: 0,
    },
  },
  user: { presence: true },
}

export default validatorFactory(schema)
