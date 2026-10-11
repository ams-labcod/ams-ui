import { ChipGroup } from '@ams/ui'

export default function Single() {
  return (
    <ChipGroup
      aria-label="Período"
      defaultValue="p2"
      options={[
        { value: 'p1', label: 'Período 1' },
        { value: 'p2', label: 'Período 2' },
        { value: 'p3', label: 'Período 3' },
        { value: 'p4', label: 'Período 4' },
      ]}
    />
  )
}
