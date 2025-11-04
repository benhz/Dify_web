'use client'
import type { FC } from 'react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Badge from '@/app/components/base/badge'
import { GeneralChunk, ParentChildChunk } from '@/app/components/base/icons/src/vender/knowledge'

type Props = {
  isGeneralMode: boolean
  isQAMode: boolean
  isSemanticMode?: boolean
}

const ChunkingModeLabel: FC<Props> = ({
  isGeneralMode,
  isQAMode,
  isSemanticMode = false,
}) => {
  const { t } = useTranslation()

  // Determine the icon and label based on the mode
  let TypeIcon = GeneralChunk
  let labelKey = 'dataset.chunkingMode.general'
  let suffix = ''

  if (isSemanticMode) {
    TypeIcon = GeneralChunk // Reuse GeneralChunk icon for semantic mode
    labelKey = 'dataset.chunkingMode.semantic'
  } else if (!isGeneralMode) {
    TypeIcon = ParentChildChunk
    labelKey = 'dataset.chunkingMode.parentChild'
  } else if (isQAMode) {
    suffix = ' · QA'
  }

  return (
    <Badge>
      <div className='flex h-full items-center space-x-0.5 text-text-tertiary'>
        <TypeIcon className='h-3 w-3' />
        <span className='system-2xs-medium-uppercase'>{`${t(labelKey)}${suffix}`}</span>
      </div>
    </Badge>
  )
}
export default React.memo(ChunkingModeLabel)
