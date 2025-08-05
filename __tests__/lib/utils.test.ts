import { cn } from '@/lib/utils'

describe('Utils', () => {
  describe('cn function', () => {
    it('combines class names correctly', () => {
      const result = cn('class1', 'class2', 'class3')
      expect(result).toBe('class1 class2 class3')
    })

    it('handles conditional classes', () => {
      const isActive = true
      const result = cn('base-class', isActive && 'active-class', 'always-class')
      expect(result).toBe('base-class active-class always-class')
    })

    it('handles false conditional classes', () => {
      const isActive = false
      const result = cn('base-class', isActive && 'active-class', 'always-class')
      expect(result).toBe('base-class always-class')
    })

    it('handles undefined and null values', () => {
      const result = cn('base-class', undefined, null, 'valid-class')
      expect(result).toBe('base-class valid-class')
    })

    it('handles empty strings', () => {
      const result = cn('base-class', '', 'valid-class')
      expect(result).toBe('base-class valid-class')
    })

    it('handles objects with conditional classes', () => {
      const isActive = true
      const isDisabled = false
      const result = cn('base-class', {
        'active-class': isActive,
        'disabled-class': isDisabled,
        'always-class': true,
      })
      expect(result).toBe('base-class active-class always-class')
    })

    it('handles arrays of classes', () => {
      const result = cn('base-class', ['class1', 'class2'], 'class3')
      expect(result).toBe('base-class class1 class2 class3')
    })

    it('handles mixed input types', () => {
      const isActive = true
      const result = cn(
        'base-class',
        isActive && 'active-class',
        ['array-class1', 'array-class2'],
        { 'object-class': true, 'false-class': false },
        'string-class'
      )
      expect(result).toBe('base-class active-class array-class1 array-class2 object-class string-class')
    })

    it('handles no input', () => {
      const result = cn()
      expect(result).toBe('')
    })

    it('handles single class', () => {
      const result = cn('single-class')
      expect(result).toBe('single-class')
    })
  })
}) 