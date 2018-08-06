import React from 'react'
import { action } from '@storybook/addon-actions'
import DownloadIcon from 'emblematic-icons/svg/Download32.svg'

import Section from '../../Section'
import ExportData from '../../../src/components/ExportData'

const ExportDataExample = () => (
  <Section>
    <ExportData
      exportOptions={[
        { title: 'CSV', mime: 'text/csv' },
        { title: 'Excel', mime: 'application/vnd.ms-excel' },
        { title: 'PDF', mime: 'application/pdf' },
      ]}
      icon={<DownloadIcon width={16} height={16} />}
      onExport={() => action('export')}
      placement="bottomEnd"
      subtitle="Export to"
      titlte="Export"
    />
  </Section>
)

export default ExportDataExample

