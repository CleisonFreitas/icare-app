export type ColumnType<T> = {
  header: string
  accessor: keyof T
  clickable?: boolean
  onClick?: (row: T) => void
  render?: (row: T) => React.ReactNode
  sortable?: boolean
}