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
  icon,
  exportOptions,
  onExport,
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
    placement="bottomEnd"
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
  icon: PropTypes.node.isRequired,
  exportOptions: PropTypes.shape({
    title: PropTypes.string.isRequired,
    mime: PropTypes.string.isRequired,
  }).isRequired,
  onExport: PropTypes.func.isRequired,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default ExportData

