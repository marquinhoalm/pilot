import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Form from 'react-vanilla-form'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Col,
  FormCheckbox,
  FormDropdown,
  FormInput,
  Grid,
  RadioGroup,
  Row,
  Spacing,
} from 'former-kit'
import {
  merge,
  range,
} from 'ramda'

import style from './style.css'
import createCpfCnpjValidation from '../../../validation/cpfCnpj'
import createEmailValidation from '../../../validation/email'
import createPhoneValidation from '../../../validation/phone'
import createRequiredValidation from '../../../validation/required'

const PARTNER_LIMIT = 5

const hasOwnProperties = (obj, fields = []) => (
  fields.some(element => (
    Object.prototype.hasOwnProperty.call(obj, element)
  ))
)

class RecipientStep extends Component {
  constructor (props) {
    super(props)

    this.state = {
      formData: {
        cnpj: '',
        cnpjEmail: '',
        cnpjInformation: false,
        cnpjName: '',
        cnpjPhone: '',
        cnpjUrl: '',
        cpf: '',
        cpfEmail: '',
        cpfInformation: false,
        cpfName: '',
        cpfPhone: '',
        cpfUrl: '',
        documentType: 'cpf',
        partner: '0',
        partner0Cpf: '',
        partner0Name: '',
        partner0Phone: '',
        partner1Cpf: '',
        partner1Name: '',
        partner1Phone: '',
        partner2Cpf: '',
        partner2Name: '',
        partner2Phone: '',
        partner3Cpf: '',
        partner3Name: '',
        partner3Phone: '',
        partner4Cpf: '',
        partner4Name: '',
        partner4Phone: '',
        ...props.data,
      },
    }

    this.masks = {
      cnpj: '11.111.111/1111-11',
      cpf: '111.111.111-11',
      phone: '(11) 11111-1111',
    }

    this.errorByDocumentType = {
      cnpj: [
        'cnpj',
        'cnpjEmail',
        'cnpjInformation',
        'cnpjName',
        'cnpjPhone',
        'cnpjUrl',
        'partner',
        'partner0Cpf',
        'partner0Name',
        'partner0Phone',
        'partner1Cpf',
        'partner1Name',
        'partner1Phone',
        'partner2Cpf',
        'partner2Name',
        'partner2Phone',
        'partner3Cpf',
        'partner3Name',
        'partner3Phone',
        'partner4Cpf',
        'partner4Name',
        'partner4Phone',
      ],
      cpf: [
        'cpf',
        'cpfEmail',
        'cpfInformation',
        'cpfName',
        'cpfPhone',
        'cpfUrl',
      ],
    }

    this.documentTypeOptions = [
      {
        name: this.props.t('pages.recipients.identification.cpf_person'),
        value: 'cpf',
      },
      {
        name: this.props.t('pages.recipients.identification.cnpj_person'),
        value: 'cnpj',
      },
    ]

    this.partnerOptions = range(0, PARTNER_LIMIT + 1)
      .map(index => ({ name: String(index), value: String(index) }))

    const required = createRequiredValidation(
      this.props.t('pages.recipients.identification.error_validate_required')
    )

    const validateCpfCnpj = createCpfCnpjValidation(
      this.props.t('pages.recipients.identification.error_validate_cpf')
    )

    const validateEmail = createEmailValidation(
      this.props.t('pages.recipients.identification.error_validate_email')
    )

    const validatePhone = createPhoneValidation(
      this.props.t('pages.recipients.identification.error_validate_phone')
    )

    this.formValidators = {
      cnpj: [required, validateCpfCnpj],
      cnpjEmail: [validateEmail],
      cnpjName: [required],
      cnpjPhone: [validatePhone],
      cpf: [required, validateCpfCnpj],
      cpfEmail: [required, validateEmail],
      cpfName: [required],
      cpfPhone: [required, validatePhone],
      cpfUrl: [required],
      documentInformation: [required, validatePhone, validateEmail],
      documentType: [],
      partner0Cpf: [required, validateCpfCnpj],
      partner0Name: [required],
      partner0Phone: [required, validatePhone],
      partner1Cpf: [required, validateCpfCnpj],
      partner1Name: [required],
      partner1Phone: [required, validatePhone],
      partner2Cpf: [required, validateCpfCnpj],
      partner2Name: [required],
      partner2Phone: [required, validatePhone],
      partner3Cpf: [required, validateCpfCnpj],
      partner3Name: [required],
      partner3Phone: [required, validatePhone],
      partner4Cpf: [required, validateCpfCnpj],
      partner4Name: [required],
      partner4Phone: [required, validatePhone],
    }

    this.documentHandler = this.documentHandler.bind(this)
    this.onChangeWithMask = this.onChangeWithMask.bind(this)
    this.onFormChange = this.onFormChange.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.renderDocumentInput = this.renderDocumentInput.bind(this)
  }

  onFormSubmit (formData, formErrors = {}) {
    const { documentType } = formData

    if (!hasOwnProperties(formErrors, this.errorByDocumentType[documentType])) {
      this.props.onContinue(formData)
    }
  }

  onFormChange (formData) {
    this.setState({
      formData,
    })
  }

  onChangeWithMask (event) {
    const { name } = event.target
    const value = event.target.value || ''

    if (!name) return

    const formData = merge(
      this.state.formData,
      { [name]: value }
    )

    this.onFormChange(formData, {})
  }

  documentHandler () {
    const { documentType } = this.state.formData

    this.setState({
      formData: {
        ...this.state.formData,
        [`${documentType}Information`]: !this.state.formData[`${documentType}Information`],
      },
    })
  }

  renderDocumentInput () {
    const { documentType } = this.state.formData

    if (documentType === 'cpf') {
      return (
        <FormInput
          key="cpf"
          label={this.props.t('pages.recipients.identification.type_label_cpf')}
          mask={this.masks.cpf}
          name="cpf"
          onChange={this.onChangeWithMask}
          size={35}
          type="text"
        />
      )
    }

    return (
      <FormInput
        key="cnpj"
        label={this.props.t('pages.recipients.identification.type_label_cnpj')}
        mask={this.masks.cnpj}
        name="cnpj"
        onChange={this.onChangeWithMask}
        size={35}
        type="text"
      />
    )
  }

  renderInformationCheck () {
    const { documentType } = this.state.formData

    const info = this.props.t(`pages.recipients.identification.${documentType}_check_label`)

    return (
      <FormCheckbox
        label={info}
        name={`${documentType}Information`}
        onChange={this.documentHandler}
        checked={this.state.formData[`${documentType}Information`]}
        value=""
      />
    )
  }

  renderDocumentInformationInput () {
    const {
      formData,
      formData: {
        documentType,
      },
    } = this.state

    const { t } = this.props

    if (!formData[`${documentType}Information`]) return null

    return (
      <div>
        <h2 className={style.title}>
          {t(`pages.recipients.identification.${documentType}_title`)}
        </h2>
        <h3 className={style.subtitle}>
          {t(`pages.recipients.identification.${documentType}_subtitle`)}
        </h3>
        <Row>
          <Col>
            <FormInput
              label={t(`pages.recipients.identification.${documentType}_name`)}
              name={`${documentType}Name`}
              size={35}
              type="text"
            />
          </Col>
        </Row>
        <Row stretch>
          <Col>
            <FormInput
              label={t(`pages.recipients.identification.${documentType}_email`)}
              name={`${documentType}Email`}
              size={35}
              type="text"
            />
          </Col>
          <Col>
            <FormInput
              label={t(`pages.recipients.identification.${documentType}_url`)}
              name={`${documentType}Url`}
              size={35}
              type="text"
            />
          </Col>
          <Col>
            <FormInput
              key="documentPhone"
              label={t(`pages.recipients.identification.${documentType}_phone`)}
              mask={this.masks.phone}
              name={`${documentType}Phone`}
              onChange={this.onChangeWithMask}
              size={35}
              type="text"
            />
          </Col>
        </Row>
      </div>
    )
  }

  renderPartnerInput () {
    const { t } = this.props
    const { partner } = this.state.formData

    const translations = {
      Cpf: t('pages.recipients.identification.cnpj_partners_cpf'),
      Name: t('pages.recipients.identification.cnpj_partners_name'),
      Phone: t('pages.recipients.identification.cnpj_partners_phone'),
    }

    const fieldOnChange = {
      Cpf: this.onChangeWithMask,
      Name: '',
      Phone: this.onChangeWithMask,
    }

    const fieldMask = {
      Cpf: this.masks.cpf,
      Name: '',
      Phone: this.masks.phone,
    }

    return (
      range(0, parseInt(partner, 10)).map(partnerNumber => (
        <Row stretch key={`Row${partnerNumber}Name`}>
          { ['Name', 'Cpf', 'Phone'].map(fieldName => (
            <Col key={`partner${partnerNumber}${fieldName}Col`}>
              <FormInput
                key={`partner${partnerNumber}${fieldName}`}
                label={translations[fieldName]}
                name={`partner${partnerNumber}${fieldName}`}
                type="text"
                onChange={fieldOnChange[fieldName]}
                mask={fieldMask[fieldName]}
                value=""
                size={35}
              />
            </Col>
          )) }
        </Row>
      ))
    )
  }

  render () {
    const {
      t,
      errors,
    } = this.props

    const {
      formData,
      formData: {
        documentType,
      },
    } = this.state

    return (
      <div>
        <Form
          data={this.state.formData}
          errors={errors}
          onSubmit={this.onFormSubmit}
          onChange={this.onFormChange}
          validateOn="blur"
          validation={this.formValidators}
        >
          <Card>
            <CardContent>
              <h2 className={style.title}>
                {t('pages.recipients.identification.title')}
              </h2>
              <h3 className={style.subtitle}>
                {t('pages.recipients.identification.subtitle')}
              </h3>
              <h3 className={style.subtitle}>
                {t('pages.recipients.identification.type_label')}
              </h3>
              <RadioGroup
                options={this.documentTypeOptions}
                name="documentType"
              />
              <Grid>
                <Row>
                  <Col>
                    { this.renderDocumentInput() }
                  </Col>
                </Row>
                <Row>
                  <Col>
                    { this.renderInformationCheck() }
                  </Col>
                </Row>
                { formData[`${documentType}Information`] && (
                <Fragment>
                  { this.renderDocumentInformationInput()}
                  { documentType === 'cnpj' && (
                    <Fragment>
                      <Row className={style.dropdownPartner}>
                        <Col>
                          <h2 className={style.title}>
                            {t('pages.recipients.identification.cnpj_partnes_title')}
                          </h2>
                          <h3 className={style.subtitle}>
                            {t('pages.recipients.identification.cnpj_partnes_subtitle')}
                          </h3>
                          <FormDropdown
                            options={this.partnerOptions}
                            name="partner"
                            label={t('pages.recipients.identification.cnpj_partners_label')}
                          />
                        </Col>
                      </Row>
                      { this.renderPartnerInput() }
                    </Fragment>
                  )}
                </Fragment>
                )}
              </Grid>
            </CardContent>
            <CardActions>
              <Button
                fill="outline"
                onClick={this.props.onCancel}
                type="button"
              >
                {t('pages.recipients.identification.button_cancel')}
              </Button>
              <Spacing />
              <Button
                fill="gradient"
                type="submit"
              >
                {t('pages.recipients.identification.button_submit')}
              </Button>
            </CardActions>
          </Card>
        </Form>
      </div>
    )
  }
}

RecipientStep.propTypes = {
  data: PropTypes.shape({
    cnpj: PropTypes.string,
    cnpjEmail: PropTypes.string,
    cnpjInformation: PropTypes.bool,
    cnpjName: PropTypes.string,
    cnpjPhone: PropTypes.string,
    cnpjUrl: PropTypes.string,
    cpf: PropTypes.string,
    cpfEmail: PropTypes.string,
    cpfInformation: PropTypes.bool,
    cpfName: PropTypes.string,
    cpfPhone: PropTypes.string,
    cpfUrl: PropTypes.string,
    documentType: PropTypes.string,
    partner: PropTypes.string,
    partner0Cpf: PropTypes.string,
    partner0Name: PropTypes.string,
    partner0Phone: PropTypes.string,
    partner1Cpf: PropTypes.string,
    partner1Name: PropTypes.string,
    partner1Phone: PropTypes.string,
    partner2Cpf: PropTypes.string,
    partner2Name: PropTypes.string,
    partner2Phone: PropTypes.string,
    partner3Cpf: PropTypes.string,
    partner3Name: PropTypes.string,
    partner3Phone: PropTypes.string,
    partner4Cpf: PropTypes.string,
    partner4Name: PropTypes.string,
    partner4Phone: PropTypes.string,
  }),
  errors: PropTypes.shape({
    anticipationDays: PropTypes.string,
    anticipationModel: PropTypes.string,
    anticipationVolumePercentage: PropTypes.string,
    transferDay: PropTypes.string,
    transferEnabled: PropTypes.string,
    transferInterval: PropTypes.string,
    transferWeekday: PropTypes.string,
  }),
  onCancel: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

RecipientStep.defaultProps = {
  data: {},
  errors: {},
}

export default RecipientStep
