// Punto de entrada público de @ams/ui.
// Los consumidores importan además 'src/styles/tokens.css' y cargan
// Space Grotesk + Inter (ver docs > Introducción).
export { cn } from './lib/cn'
export { mergeRefs } from './lib/mergeRefs'
export { applyTheme, readTheme, resolveTheme, THEME_STORAGE_KEY, type Theme } from './lib/theme'
export { useTheme } from './hooks/useTheme'

export { Logo, type LogoProps } from './components/brand/Logo'
export { Aurora } from './components/brand/Aurora'

export { Button, buttonClass, type ButtonProps, type ButtonVariant, type ButtonSize } from './components/ui/button/Button'
export { Badge, type BadgeProps, type BadgeVariant } from './components/ui/badge/Badge'
export { Alert, type AlertProps, type AlertVariant } from './components/ui/alert/Alert'
export { FormField, Label, useFieldControl, type FormFieldProps, type LabelProps } from './components/ui/field/Field'
export { Input, type InputProps } from './components/ui/input/Input'
export { Textarea } from './components/ui/textarea/Textarea'
export { Select, type SelectProps, type SelectOption } from './components/ui/select/Select'
export { Checkbox, type CheckboxProps } from './components/ui/checkbox/Checkbox'
export { Switch, type SwitchProps } from './components/ui/switch/Switch'
export { Dialog, DialogTrigger, DialogClose, DialogContent, DialogFooter, type DialogContentProps } from './components/ui/dialog/Dialog'
export { Popover, PopoverTrigger, PopoverClose, PopoverAnchor, PopoverContent } from './components/ui/popover/Popover'
export { Tooltip, type TooltipProps } from './components/ui/tooltip/Tooltip'
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  type DropdownMenuItemProps,
} from './components/ui/dropdown-menu/DropdownMenu'
export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs/Tabs'
export { Avatar, initials, type AvatarProps } from './components/ui/avatar/Avatar'
export { Separator, type SeparatorProps } from './components/ui/separator/Separator'
export { Skeleton } from './components/ui/skeleton/Skeleton'
export { Spinner, type SpinnerProps } from './components/ui/spinner/Spinner'
export { EmptyState, type EmptyStateProps } from './components/ui/empty-state/EmptyState'

// v0.2
export { FieldDescription, FieldError } from './components/ui/field/Field'
export { FloatingField, type FloatingFieldProps } from './components/ui/floating-field/FloatingField'
export { RadioGroup, type RadioGroupProps, type RadioOption } from './components/ui/radio-group/RadioGroup'
export { Chip, ChipGroup, type ChipProps, type ChipGroupProps, type ChipOption } from './components/ui/chips/Chips'
export { Form, FormItem, type FormProps, type FormItemProps } from './components/ui/form/Form'
export { Calendar, nextRange, type CalendarProps, type CalendarSingleProps, type CalendarRangeProps, type DateRange } from './components/ui/calendar/Calendar'
export { DatePicker, DateRangePicker, type DatePickerProps, type DateRangePickerProps } from './components/ui/date-picker/DatePicker'
export { Sheet, SheetTrigger, SheetClose, SheetContent, type SheetContentProps } from './components/ui/sheet/Sheet'
export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  type CommandDialogProps,
  type CommandItemProps,
} from './components/ui/command/Command'
export { Dropzone, DropzoneFile, type DropzoneProps, type DropzoneFileProps } from './components/ui/dropzone/Dropzone'
export { validateFiles, type RejectedFile, type FileRules } from './components/ui/dropzone/validateFiles'
export { Editor, type EditorProps } from './components/ui/editor/Editor'
export { applyMarkdown, type MarkdownFormat } from './components/ui/editor/markdown'
export { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption, TableEmpty, type TableProps } from './components/ui/table/Table'
export { Collapsible, CollapsibleTrigger, CollapsibleContent } from './components/ui/collapsible/Collapsible'
export { ScrollArea, type ScrollAreaProps } from './components/ui/scroll-area/ScrollArea'
export { Toaster, type ToasterProps } from './components/ui/toast/Toaster'
export { toast, useToasts, type ToastOptions, type ToastItem, type ToastVariant } from './components/ui/toast/toast'
export { alertVariants } from './components/ui/alert/Alert'
export { formatBytes, formatNumber, formatCurrency, formatDate } from './lib/format'
export * as dates from './lib/date'

// v0.3
export { Progress, ProgressRing, type ProgressProps, type ProgressRingProps, type ProgressTone } from './components/ui/progress/Progress'
export { Slider, type SliderProps } from './components/ui/slider/Slider'
export { Toggle, type ToggleProps } from './components/ui/toggle/Toggle'
export { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogCancel, AlertDialogAction, type AlertDialogContentProps } from './components/ui/alert-dialog/AlertDialog'
export { HoverCard, HoverCardTrigger, HoverCardContent } from './components/ui/hover-card/HoverCard'
export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuGroup,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  type ContextMenuItemProps,
} from './components/ui/context-menu/ContextMenu'
export { Combobox, type ComboboxProps, type ComboboxOption } from './components/ui/combobox/Combobox'
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './components/ui/accordion/Accordion'
export { Breadcrumb, type BreadcrumbProps, type BreadcrumbItem } from './components/ui/breadcrumb/Breadcrumb'
export { Pagination, paginationRange, type PaginationProps } from './components/ui/pagination/Pagination'

export { DataTable, type DataTableProps } from './components/data/data-table/DataTable'
export { useDataTable, type UseDataTableOptions } from './components/data/data-table/useDataTable'
export { createColumnHelper, type ColumnDef } from '@tanstack/react-table'
export { AdvancedFilter, type AdvancedFilterProps } from './components/data/advanced-filter/AdvancedFilter'
export {
  applyFilter,
  describeCondition,
  emptyFilter,
  isComplete,
  matchCondition,
  newCondition,
  operatorsByType,
  type FilterCondition,
  type FilterField,
  type FilterFieldType,
  type FilterState,
  type FilterValue,
  type Operator,
} from './components/data/advanced-filter/filtering'
export { LineChart, AreaChart, BarChart, DonutChart, type CartesianChartProps, type DonutChartProps } from './components/data/charts/Charts'
export { ChartFrame, ChartTooltipCard, chartColor, type ChartSeries, type ChartFrameProps } from './components/data/charts/ChartFrame'

// v0.3.1
export { Flex, Stack, Inline, Container, Grid, Divider, AspectRatio, type FlexProps, type ContainerProps, type GridProps, type DividerProps, type AspectRatioProps, type Gap } from './components/layout/Layout'
export { useDisclosure, useMediaQuery, useDebouncedValue, useInView, useHotkey, matchesHotkey, type HotkeyOptions } from './hooks/hooks'
export { Stat, type StatProps, type StatDelta } from './components/data/stat/Stat'
