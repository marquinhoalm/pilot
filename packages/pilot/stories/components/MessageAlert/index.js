import React from 'react'
import { action } from '@storybook/addon-actions'
import { compose } from 'ramda'

import ErrorIcon from '../../../src/components/TransferError/ErrorIcon.svg'
import MessageAlert from '../../../src/components/MessageAlert'

const enhanced = compose(
  Component => () => <Component t={t => t} />
)

const MessageAlertExample = ({ t }) => (
  <MessageAlert
    actionCall="Fechar"
    icon={<ErrorIcon />}
    title={
      <h1 style={{ margin: 0 }}>
        {t('Erro!')}
      </h1>
    }
    message={
      <span>
        {t('Algo inesperado aconteceu')}
      </span>
    }
    onActionClick={action('onActionClick')}
  />
)

export default enhanced(MessageAlertExample)
