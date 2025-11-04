import { type FC, useCallback } from 'react'
import { RiArrowDownSLine, RiArrowUpSLine } from '@remixicon/react'
import Input, { type InputProps } from '../input'
import classNames from '@/utils/classnames'

export type InputNumberProps = {
  unit?: string
  value?: number
  onChange: (value: number) => void
  amount?: number
  size?: 'regular' | 'large'
  max?: number
  min?: number
  defaultValue?: number
  disabled?: boolean
  wrapClassName?: string
  controlWrapClassName?: string
  controlClassName?: string
} & Omit<InputProps, 'value' | 'onChange' | 'size' | 'min' | 'max' | 'defaultValue'>

export const InputNumber: FC<InputNumberProps> = (props) => {
  const {
    unit,
    className,
    onChange,
    amount = 1,
    value,
    size = 'regular',
    max,
    min,
    defaultValue,
    wrapClassName,
    controlWrapClassName,
    controlClassName,
    disabled,
    ...rest
  } = props

  const isValidValue = useCallback((v: number) => {
    if (typeof max === 'number' && v > max)
      return false
    return !(typeof min === 'number' && v < min)
  }, [max, min])

  const inc = () => {
    if (disabled) return

    if (value === undefined || value === '' || value === null) {
      onChange(defaultValue ?? min ?? 0)
      return
    }
    const currentValue = Number(value)
    const newValue = currentValue + amount
    if (!isValidValue(newValue))
      return
    onChange(newValue)
  }
  const dec = () => {
    if (disabled) return

    if (value === undefined || value === '' || value === null) {
      onChange(defaultValue ?? min ?? 0)
      return
    }
    const currentValue = Number(value)
    const newValue = currentValue - amount
    if (!isValidValue(newValue))
      return
    onChange(newValue)
  }

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      // Allow empty value during editing, will be validated on blur
      onChange('' as any)
      return
    }
    const parsed = Number(e.target.value)
    if (Number.isNaN(parsed))
      return

    // Allow invalid values during editing, will be validated on blur
    onChange(parsed)
  }, [onChange])

  const handleBlur = useCallback(() => {
    // Validate and correct the value on blur
    if (value === '' || value === undefined || value === null) {
      onChange(defaultValue ?? min ?? 0)
      return
    }
    const numValue = Number(value)
    if (Number.isNaN(numValue)) {
      onChange(defaultValue ?? min ?? 0)
      return
    }
    if (typeof max === 'number' && numValue > max) {
      onChange(max)
      return
    }
    if (typeof min === 'number' && numValue < min) {
      onChange(min)
    }
  }, [value, defaultValue, min, max, onChange])

  return <div className={classNames('flex', wrapClassName)}>
    <Input {...rest}
      // disable default controller
      type='number'
      className={classNames('no-spinner rounded-r-none', className)}
      value={value === '' ? '' : (value ?? 0)}
      max={max}
      min={min}
      disabled={disabled}
      onChange={handleInputChange}
      onBlur={handleBlur}
      unit={unit}
      size={size}
    />
    <div className={classNames(
      'flex flex-col rounded-r-md border-l border-divider-subtle bg-components-input-bg-normal text-text-tertiary focus:shadow-xs',
      disabled && 'cursor-not-allowed opacity-50',
      controlWrapClassName)}
    >
      <button
        type='button'
        onClick={inc}
        disabled={disabled}
        aria-label='increment'
        className={classNames(
          size === 'regular' ? 'pt-1' : 'pt-1.5',
          'px-1.5 hover:bg-components-input-bg-hover',
          disabled && 'cursor-not-allowed hover:bg-transparent',
          controlClassName,
        )}
      >
        <RiArrowUpSLine className='size-3' />
      </button>
      <button
        type='button'
        onClick={dec}
        disabled={disabled}
        aria-label='decrement'
        className={classNames(
          size === 'regular' ? 'pb-1' : 'pb-1.5',
          'px-1.5 hover:bg-components-input-bg-hover',
          disabled && 'cursor-not-allowed hover:bg-transparent',
          controlClassName,
        )}
      >
        <RiArrowDownSLine className='size-3' />
      </button>
    </div>
  </div>
}
