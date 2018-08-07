import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Form from 'react-vanilla-form'
import {
  Button,
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
  isEmpty,
  range,
} from 'ramda'

import style from './style.css'
import createRequiredValidation from '../../../validation/required'
import createNumberValidation from '../../../validation/number'

const anticipationModelOptions = t => (
  [
    {
      name: t('pages.recipients.anticipation_model_by.manual'),
      value: 'manual',
    },
    {
      name: t('pages.recipients.anticipation_model_by.automatic_volume'),
      value: 'automatic_volume',
    },
    {
      name: t('pages.recipients.anticipation_model_by.automatic_1025'),
      value: 'automatic_1025',
    },
    {
      name: t('pages.recipients.anticipation_model_by.automatic_dx'),
      value: 'automatic_dx',
    },
  ]
)

const transferIntervalOptions = t => (
  [
    {
      name: t('pages.recipients.transfer_interval_by.daily'),
      value: 'daily',
    },
    {
      name: t('pages.recipients.transfer_interval_by.weekly'),
      value: 'weekly',
    },
    {
      name: t('pages.recipients.transfer_interval_by.monthly'),
      value: 'monthly',
    },
  ]
)

const transferWeekdayOptions = t => (
  [
    {
      name: t('pages.recipients.transfer_weekday_on.monday'),
      value: 'monday',
    },
    {
      name: t('pages.recipients.transfer_weekday_on.tuesday'),
      value: 'tuesday',
    },
    {
      name: t('pages.recipients.transfer_weekday_on.wednesday'),
      value: 'wednesday',
    },
    {
      name: t('pages.recipients.transfer_weekday_on.thursday'),
      value: 'thursday',
    },
    {
      name: t('pages.recipients.transfer_weekday_on.friday'),
      value: 'friday',
    },
  ]
)

class ConfigurationsStep extends Component {
  constructor (props) {
    super(props)

    this.state = {
      formData: {
        anticipationDays: '15',
        anticipationModel: 'manual',
        anticipationVolumePercentage: '100',
        transferDay: '10',
        transferEnabled: false,
        transferInterval: 'daily',
        transferWeekday: 'monday',
        ...props.data,
      },
    }

    const numberMessage = props.t('pages.recipients.number')
    const requiredMessage = props.t('pages.recipients.required')

    this.number = createNumberValidation(numberMessage)
    this.required = createRequiredValidation(requiredMessage)

    this.onFormChange = this.onFormChange.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.renderAnticipationInput = this.renderAnticipationInput.bind(this)
    this.renderTransferInput = this.renderTransferInput.bind(this)
    this.transferHandler = this.transferHandler.bind(this)
  }

  onFormSubmit (formData, formErrors = {}) {
    if (isEmpty(formErrors)) {
      this.props.onContinue(formData)
    }
  }

  onFormChange (formData) {
    this.setState({
      formData,
    })
  }

  transferHandler () {
    const {
      formData,
    } = this.state

    this.setState({
      formData: {
        ...formData,
        transferEnabled: !formData.transferEnabled,
      },
    })
  }

  renderAnticipationInput () {
    const { anticipationModel } = this.state.formData
    const { t } = this.props

    switch (anticipationModel) {
      case 'automatic_volume':
      case 'manual':
        return (
          <FormInput
            label={t('pages.recipients.anticipation_volume_percentage')}
            max="100"
            min="1"
            name="anticipationVolumePercentage"
            type="number"
          />
        )
      case 'automatic_dx':
        return (
          <FormInput
            label={t('pages.recipients.anticipation_days')}
            min="1"
            name="anticipationDays"
            type="number"
          />
        )
      default:
        return <span className={style.paddingInputHeight} />
    }
  }

  renderTransferInput () {
    const {
      transferDay,
      transferEnabled,
      transferInterval,
      transferWeekday,
    } = this.state.formData

    const { t } = this.props

    const transferDayOptions = range(1, 32)
      .map(day => ({ name: String(day), value: String(day) }))

    if (transferEnabled && transferInterval === 'monthly') {
      return (
        <FormDropdown
          disabled={!transferEnabled}
          label={t('pages.recipients.transfer_day')}
          name="transferDay"
          options={transferDayOptions}
          key={transferDay}
        />
      )
    }

    const disabledWeekday = transferEnabled && transferInterval !== 'weekly'

    return (<FormDropdown
      disabled={!transferEnabled || disabledWeekday}
      label={t('pages.recipients.transfer_weekday')}
      name="transferWeekday"
      options={transferWeekdayOptions(t)}
      key={transferWeekday}
    />)
  }

  render () {
    const {
      t,
      errors,
    } = this.props
    const {
      formData,
    } = this.state

    return (
      <Form
        data={formData}
        errors={errors}
        onChange={this.onFormChange}
        onSubmit={this.onFormSubmit}
        validateOn="blur"
        validation={{
          anticipationDays: [this.required, this.number],
          anticipationModel: [this.required],
          anticipationVolumePercentage: [this.required, this.number],
          transferDay: [this.required, this.number],
          transferEnabled: [this.required],
          transferInterval: [this.required],
          transferWeekday: [this.required],
        }}
      >
        <CardContent>
          <Grid>
            <Row>
              <Col tv={12} desk={12} tablet={12} palm={12}>
                <RadioGroup
                  name="anticipationModel"
                  options={anticipationModelOptions(t)}
                />
              </Col>
              <Col tv={2} desk={2} tablet={4} palm={4}>
                { this.renderAnticipationInput() }
              </Col>
            </Row>
            <Row>
              <Col tv={12} desk={12} tablet={12} palm={12}>
                <FormCheckbox
                  checked={formData.transferEnabled}
                  label={t('pages.recipients.transfer_enabled')}
                  name="transferEnabled"
                  onChange={this.transferHandler}
                  value=""
                />
              </Col>
            </Row>
            <Row>
              <Col tv={12} desk={12} tablet={12} palm={12}>
                <RadioGroup
                  disabled={!formData.transferEnabled}
                  name="transferInterval"
                  options={transferIntervalOptions(t)}
                />
              </Col>
              <Col tv={2} desk={2} tablet={4} palm={4}>
                { this.renderTransferInput() }
              </Col>
            </Row>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            fill="outline"
            onClick={this.props.onCancel}
            relevance="low"
          >
            {t('pages.recipients.cancel')}
          </Button>
          <Spacing />
          <Button
            fill="outline"
            onClick={this.props.onBack}
          >
            {t('pages.recipients.back')}
          </Button>
          <Button type="submit">
            {t('pages.recipients.submit')}
          </Button>
        </CardActions>
      </Form>
    )
  }
}

ConfigurationsStep.propTypes = {
  data: PropTypes.shape({
    anticipationModel: PropTypes.string,
    anticipationVolumePercentage: PropTypes.string,
    anticipationDays: PropTypes.string,
    transferEnabled: PropTypes.bool,
    transferInterval: PropTypes.string,
    transferDay: PropTypes.string,
    transferWeekday: PropTypes.string,
  }),
  errors: PropTypes.shape({
    anticipationModel: PropTypes.string,
    anticipationVolumePercentage: PropTypes.string,
    anticipationDays: PropTypes.string,
    transferEnabled: PropTypes.string,
    transferInterval: PropTypes.string,
    transferDay: PropTypes.string,
    transferWeekday: PropTypes.string,
  }),
  onBack: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

ConfigurationsStep.defaultProps = {
  data: {},
  errors: {},
}

export default ConfigurationsStep
