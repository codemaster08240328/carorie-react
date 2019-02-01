import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, FormFeedback, Input, Label } from 'reactstrap'

const RenderField = ({
  input,
  label,
  type,
  options,
  meta: { touched, error, warning }
}) => (
  <FormGroup color={touched && error ? 'danger' : ''}>
    <Label>
      {label}
    </Label>
    <Input {...input} type={type} className='form-control'>
      {
        type === 'select' && options ? options.map((option, index) => (
          <option key={index} value={option.value}>{option.label}</option>
        )) : null
      }
    </Input>
    {touched && error && <FormFeedback>{error}</FormFeedback>}
  </FormGroup>
)

RenderField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  options: PropTypes.array,
  meta: PropTypes.object,
}

export default RenderField
