import React from 'react'
import { action } from '@storybook/addon-actions'
import { Card } from 'former-kit'
import Section from '../../../Section'
import RecipientStep from '../../../../src/containers/AddRecipient/RecipientStep'

const RecipientStepContainer = () => (
  <Section>
    <Card>
      <RecipientStep
        onContinue={action('onContinue')}
        onBack={action('onBack')}
        onCancel={action('onCancel')}
        t={translate => translate}
      />
    </Card>
  </Section>
)

export default RecipientStepContainer
