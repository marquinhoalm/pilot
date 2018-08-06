import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Popover,
  PopoverContent,
  PopoverMenu,
} from 'former-kit'
import style from './style.css'

const ExportData = ({
  exportOptions,
  icon,
  onExport,
  placement,
  subtitle,
  title,
}) => (
  <Popover
    content={
      <div className={style.exportPopover}>
        <PopoverContent>
          <strong>{subtitle}</strong>
        </PopoverContent>
        <PopoverMenu items={exportOptions} />
      </div>
    }
    placement={placement}
  >
    <Button
      fill="outline"
      icon={icon}
      size="tiny"
      relevance="low"
      onClick={onExport}
    >
      {title}
    </Button>
  </Popover>
)

ExportData.propTypes = {
  exportOptions: PropTypes.shape({
    mime: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  icon: PropTypes.node.isRequired,
  onExport: PropTypes.func.isRequired,
  placement: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default ExportData

