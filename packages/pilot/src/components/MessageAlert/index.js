import React from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  Col,
  Grid,
  Row,
} from 'former-kit'

const MessageAlert = ({
  actionText,
  icon,
  relevance,
  message,
  onActionClick,
  title,
}) => (
  <Grid>
    <Row flex>
      <Col align="center">
        {icon}
      </Col>
    </Row>
    <Row flex>
      <Col align="center">
        {title}
      </Col>
    </Row>
    <Row flex>
      <Col align="center">
        {message}
      </Col>
    </Row>
    <Row flex>
      <Col align="center">
        <Button
          fill="gradient"
          relevance={relevance}
          onClick={onActionClick}
        >
          {actionText}
        </Button>
      </Col>
    </Row>
  </Grid>
)

MessageAlert.propTypes = {
  actionText: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  relevance: PropTypes.oneOf([
    'high', 'low', 'normal',
  ]),
  message: PropTypes.element.isRequired,
  onActionClick: PropTypes.func.isRequired,
  title: PropTypes.element.isRequired,
}

MessageAlert.defaultProps = {
  relevance: 'normal',
}

export default MessageAlert
