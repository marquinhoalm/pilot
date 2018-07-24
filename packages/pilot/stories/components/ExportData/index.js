import React from 'react'

import DownloadIcon from 'emblematic-icons/svg/Download32.svg'

import Section from '../../Section'
import ExportData from '../../../src/components/ExportData'

const ExportDataExample = () => (
  <Section>
    <ExportData
      icon={<DownloadIcon width={16} height={16} />}
      exportOptions={[
        { title: 'CSV', mime: '.csv' },
        { title: 'Excel', mime: '.xlsx' },
      ]}
      onExport={() => undefined}
      subTitle="Export to"
      titlte="Export"
    />
  </Section>
)

export default ExportDataExample

