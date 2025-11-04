import type { FC, PropsWithChildren, ReactNode } from 'react'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import type { InputProps } from '@/app/components/base/input'
import Input from '@/app/components/base/input'
import Tooltip from '@/app/components/base/tooltip'
import type { InputNumberProps } from '@/app/components/base/input-number'
import { InputNumber } from '@/app/components/base/input-number'
import Slider from '@/app/components/base/slider'

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
export const ThresholdAmountInput: FC<{ value: number; onChange: (value: number) => void }> = ({ value, onChange }) => {
  const { t } = useTranslation()

  const handleBlur = useCallback(() => {
    if (value === undefined || value === null) {
      onChange(95)
      return
    }
    if (value > 99) {
      onChange(99)
      return
    }
    if (value < 80)
      onChange(80)
  }, [value, onChange])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number.parseFloat(e.target.value)
    if (!Number.isNaN(val))
      onChange(val)
  }, [onChange])

  const handleSliderChange = useCallback((newValue: number | number[]) => {
    onChange(Array.isArray(newValue) ? newValue[0] : newValue)
  }, [onChange])

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
    <div className='flex h-8 items-center justify-between space-x-2'>
      <div className='relative'>
        <input
          value={value}
          className='block h-8 w-16 shrink-0 appearance-none rounded-lg bg-components-input-bg-normal pl-3 pr-6 text-[13px] text-components-input-text-filled outline-none'
          type='number'
          min={80}
          max={99}
          step={1}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span className='absolute right-2 top-1/2 -translate-y-1/2 text-[13px] text-text-tertiary'>%</span>
      </div>
      <Slider
        className='grow'
        value={value}
        min={80}
        max={99}
        step={1}
        onChange={handleSliderChange}
      />
    </div>
  </FormField>
}

export const BufferSentencesInput: FC<{ value: number; onChange: (value: number) => void }> = ({ value, onChange }) => {
  const { t } = useTranslation()

  const handleBlur = useCallback(() => {
    if (value === undefined || value === null) {
      onChange(2)
      return
    }
    if (value > 5) {
      onChange(5)
      return
    }
    if (value < 0)
      onChange(0)
  }, [value, onChange])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number.parseFloat(e.target.value)
    if (!Number.isNaN(val))
      onChange(val)
  }, [onChange])

  const handleSliderChange = useCallback((newValue: number | number[]) => {
    onChange(Array.isArray(newValue) ? newValue[0] : newValue)
  }, [onChange])

  return <FormField label={<div className='mb-1 flex items-center'>
    <span className='system-sm-semibold'>{t('datasetCreation.stepTwo.bufferSentences')}</span>
    <Tooltip
      popupContent={
        <div className='max-w-[200px]'>
          {t('datasetCreation.stepTwo.bufferSentencesTip')}
        </div>
      }
    />
  </div>}>
    <div className='flex h-8 items-center justify-between space-x-2'>
      <div className='relative'>
        <input
          value={value}
          className='block h-8 w-16 shrink-0 appearance-none rounded-lg bg-components-input-bg-normal pl-3 pr-6 text-[13px] text-components-input-text-filled outline-none'
          type='number'
          min={0}
          max={5}
          step={1}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span className='absolute right-2 top-1/2 -translate-y-1/2 text-[13px] text-text-tertiary'>{t('datasetCreation.stepTwo.sentenceUnit')}</span>
      </div>
      <Slider
        className='grow'
        value={value}
        min={0}
        max={5}
        step={1}
        onChange={handleSliderChange}
      />
    </div>
  </FormField>
}

export const MinSegmentLengthInput: FC<InputNumberProps> = (props) => {
  const { t } = useTranslation()
  return <FormField label={<div className='system-sm-semibold mb-1'>
    {t('datasetCreation.stepTwo.minSegmentLength')}
  </div>}>
    <InputNumber
      type="number"
      size='large'
      placeholder={t('datasetCreation.stepTwo.minSegmentLength') || ''}
      min={50}
      max={500}
      unit='characters'
      {...props}
    />
  </FormField>
}

export const MaxSegmentLengthInput: FC<InputNumberProps> = (props) => {
  const { t } = useTranslation()
  return <FormField label={<div className='system-sm-semibold mb-1'>
    {t('datasetCreation.stepTwo.maxSegmentLength')}
  </div>}>
    <InputNumber
      type="number"
      size='large'
      placeholder={t('datasetCreation.stepTwo.maxSegmentLength') || ''}
      min={400}
      max={4000}
      unit='characters'
      {...props}
    />
  </FormField>
}
