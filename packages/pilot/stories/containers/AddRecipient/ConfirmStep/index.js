import React from 'react'
import { action } from '@storybook/addon-actions'
import { Card } from 'former-kit'

import Section from '../../../Section'
import ConfirmStep from '../../../../src/containers/AddRecipient/ConfirmStep'

const ConfirmRecipientStep = () => (
  <Section>
    <Card>
      <ConfirmStep
        onContinue={action('Continue')}
        onBack={action('Back')}
        onCancel={action('Cancel')}
        t={t => t}
      />
    </Card>
  </Section>
)

export default ConfirmRecipientStep
