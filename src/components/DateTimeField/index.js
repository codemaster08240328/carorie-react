import React from 'react'
import PropTypes from 'prop-types'
import DateTime from 'react-datetime'
import { FormFeedback, FormGroup, Label } from 'reactstrap'

const DateTimeField = ({
  input,
  label,
  placeholder,
  dateFormat,
  timeFormat,
  type,
  meta: { touched, error, warning },
}) => (
  <FormGroup color={touched && error ? 'danger' : ''}>
    <Label>
      {label}
    </Label>
    <DateTime {...input} inputProps={{ placeholder }}
      dateFormat={dateFormat} timeFormat={timeFormat} />
    {touched && error && <FormFeedback>{error}</FormFeedback>}
  </FormGroup>
)

DateTimeField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  dateFormat: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  timeFormat: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  type: PropTypes.string,
  meta: PropTypes.object,
}

export default DateTimeField
