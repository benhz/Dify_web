import type { FC, PropsWithChildren, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { InputProps } from '@/app/components/base/input'
import Input from '@/app/components/base/input'
import Tooltip from '@/app/components/base/tooltip'
import type { InputNumberProps } from '@/app/components/base/input-number'
import { InputNumber } from '@/app/components/base/input-number'

const TextLabel: FC<PropsWithChildren> = (props) => {
  return <label className='text-xs font-semibold leading-none text-text-secondary'>{props.children}</label>
}

const FormField: FC<PropsWithChildren<{ label: ReactNode }>> = (props) => {
  return <div className='flex-1 space-y-2'>
    <TextLabel>{props.label}</TextLabel>
    {props.children}
  </div>
}

export const DelimiterInput: FC<InputProps & { tooltip?: string }> = (props) => {
  const { t } = useTranslation()
  return <FormField label={<div className='mb-1 flex items-center'>
    <span className='system-sm-semibold mr-0.5'>{t('datasetCreation.stepTwo.separator')}</span>
    <Tooltip
      popupContent={
        <div className='max-w-[200px]'>
          {props.tooltip || t('datasetCreation.stepTwo.separatorTip')}
        </div>
      }
    />
  </div>}>
    <Input
      type="text"
      className='h-9'
      placeholder={t('datasetCreation.stepTwo.separatorPlaceholder')!}
      {...props}
    />
  </FormField>
}

export const MaxLengthInput: FC<InputNumberProps> = (props) => {
  const maxValue = Number.parseInt(globalThis.document?.body?.getAttribute('data-public-indexing-max-segmentation-tokens-length') || '4000', 10)

  const { t } = useTranslation()
  return <FormField label={<div className='system-sm-semibold mb-1'>
    {t('datasetCreation.stepTwo.maxLength')}
  </div>}>
    <InputNumber
      type="number"
      size='large'
      placeholder={`≤ ${maxValue}`}
      max={maxValue}
      min={1}
      {...props}
    />
  </FormField>
}

export const OverlapInput: FC<InputNumberProps> = (props) => {
  const { t } = useTranslation()
  return <FormField label={<div className='mb-1 flex items-center'>
    <span className='system-sm-semibold'>{t('datasetCreation.stepTwo.overlap')}</span>
    <Tooltip
      popupContent={
        <div className='max-w-[200px]'>
          {t('datasetCreation.stepTwo.overlapTip')}
        </div>
      }
    />
  </div>}>
    <InputNumber
      type="number"
      size='large'
      placeholder={t('datasetCreation.stepTwo.overlap') || ''}
      min={1}
      {...props}
    />
  </FormField>
}

// Semantic segmentation specific inputs
export const ThresholdAmountInput: FC<InputNumberProps> = (props) => {
  const { t } = useTranslation()
  return <FormField label={<div className='mb-1 flex items-center'>
    <span className='system-sm-semibold'>{t('datasetCreation.stepTwo.thresholdAmount')}</span>
    <Tooltip
      popupContent={
        <div className='max-w-[200px]'>
          {t('datasetCreation.stepTwo.thresholdAmountTip')}
        </div>
      }
    />
  </div>}>
    <InputNumber
      type="number"
      size='large'
      placeholder={t('datasetCreation.stepTwo.thresholdAmount') || ''}
      min={0}
      max={1}
      step={0.01}
      {...props}
    />
  </FormField>
}

export const BufferSizeInput: FC<InputNumberProps> = (props) => {
  const { t } = useTranslation()
  return <FormField label={<div className='mb-1 flex items-center'>
    <span className='system-sm-semibold'>{t('datasetCreation.stepTwo.bufferSize')}</span>
    <Tooltip
      popupContent={
        <div className='max-w-[200px]'>
          {t('datasetCreation.stepTwo.bufferSizeTip')}
        </div>
      }
    />
  </div>}>
    <InputNumber
      type="number"
      size='large'
      placeholder={t('datasetCreation.stepTwo.bufferSize') || ''}
      min={0}
      {...props}
    />
  </FormField>
}

export const TargetChunkTokensInput: FC<InputNumberProps> = (props) => {
  const { t } = useTranslation()
  return <FormField label={<div className='system-sm-semibold mb-1'>
    {t('datasetCreation.stepTwo.targetChunkTokens')}
  </div>}>
    <InputNumber
      type="number"
      size='large'
      placeholder={t('datasetCreation.stepTwo.targetChunkTokens') || ''}
      min={1}
      {...props}
    />
  </FormField>
}

export const ChunkOverlapTokensInput: FC<InputNumberProps> = (props) => {
  const { t } = useTranslation()
  return <FormField label={<div className='system-sm-semibold mb-1'>
    {t('datasetCreation.stepTwo.chunkOverlapTokens')}
  </div>}>
    <InputNumber
      type="number"
      size='large'
      placeholder={t('datasetCreation.stepTwo.chunkOverlapTokens') || ''}
      min={0}
      {...props}
    />
  </FormField>
}

export const MinChunkTokensInput: FC<InputNumberProps> = (props) => {
  const { t } = useTranslation()
  return <FormField label={<div className='system-sm-semibold mb-1'>
    {t('datasetCreation.stepTwo.minChunkTokens')}
  </div>}>
    <InputNumber
      type="number"
      size='large'
      placeholder={t('datasetCreation.stepTwo.minChunkTokens') || ''}
      min={1}
      {...props}
    />
  </FormField>
}

export const MaxChunkTokensInput: FC<InputNumberProps> = (props) => {
  const { t } = useTranslation()
  return <FormField label={<div className='system-sm-semibold mb-1'>
    {t('datasetCreation.stepTwo.maxChunkTokens')}
  </div>}>
    <InputNumber
      type="number"
      size='large'
      placeholder={t('datasetCreation.stepTwo.maxChunkTokens') || ''}
      min={1}
      {...props}
    />
  </FormField>
}
