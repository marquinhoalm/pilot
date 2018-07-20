import React, { Component, Fragment } from 'react'

import Form from 'react-vanilla-form'

import {
  Button,
  FormInput,
} from 'former-kit'

import {
  merge,
  equals,
  isEmpty,
  values,
  clone,
} from 'ramda'

import createRequired from '../../validation/required'

const hasEmptyStringValues = object => values(object).some(equals(''))
const required = createRequired('Este campo é obrigatório')

export default class MaskTest extends Component {
  constructor (props) {
    super(props)

    this.state = {
      data: {
        date: '',
        cpf: '',
      },
      errors: {},
      disabled: true,
      validationMode: 'blur',
    }

    this.validation = {
      date: [required],
      cpf: [required],
    }

    this.handleMaskedInputChange = this.handleMaskedInputChange.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleMaskedInputChange (event) {
    const value = event.target.value || ''
    const { name } = event.target
    if (!name) return

    const newData = merge(
      this.state.data,
      { [name]: value }
    )

    const inputValidators = this.validation[name]
    const validatorsResult = inputValidators
      .map(validator => validator(value))
    const errorMessage = validatorsResult
      .find(result => (typeof result === 'string'))

    let newErrors = {}
    if (errorMessage) {
      newErrors = merge(
        this.state.errors,
        { [name]: errorMessage }
      )
    } else {
      const currentErrors = clone(this.state.errors)
      delete currentErrors[name]
      newErrors = currentErrors
    }

    this.handleFormChange(newData, newErrors)
  }

  handleFormChange (data, errors = {}) {
    const someErrors = !isEmpty(errors)
    const someEmptyFields = hasEmptyStringValues(data)
    const shouldDisableSubmit = (someErrors || someEmptyFields)
    const validationMode = (someErrors) ? 'change' : 'blur'

    this.setState({
      data,
      errors,
      disabled: shouldDisableSubmit,
      validationMode,
    })
  }

  handleFormSubmit (data, errors) {
    this.setState({ data, errors })
  }

  render () {
    return (
      <Fragment>
        <Form
          data={this.state.data}
          errors={this.state.errors}
          validateOn={this.state.validationMode}
          validation={this.validation}
          onChange={this.handleFormChange}
          onSubmit={this.handleFormSubmit}
        >
          <FormInput
            label="Masked Date:"
            name="date"
            type="text"
            maxLength={8}
            mask="1111-11-11"
            onChange={this.handleMaskedInputChange}
            error={this.state.errors.date}
          />
          <br />
          <FormInput
            label="Masked CPF:"
            name="cpf"
            type="text"
            maxLength={11}
            mask="111.111.111-11"
            onChange={this.handleMaskedInputChange}
            error={this.state.errors.cpf}
          />
          <Button disabled={this.state.disabled} type="submit">Submit</Button>
        </Form>
        <p>Form data:</p>
        <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
        <p>Form erros:</p>
        <pre>{JSON.stringify(this.state.errors, null, 2)}</pre>
      </Fragment>
    )
  }
}
