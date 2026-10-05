import './ui.css';

export interface DataColumn<Row> {
  key: keyof Row & string;
  label: string;
}

interface DataTableProps<Row> {
  columns: DataColumn<Row>[];
  rows: Row[];
  caption: string;
}

/** Tabla simple que en pantallas estrechas se apila fila por fila, con el nombre de cada columna. */
export function DataTable<Row extends Record<string, string>>({ columns, rows, caption }: DataTableProps<Row>) {
  return <table className="ui-table">
    <caption>{caption}</caption>
    <thead><tr>{columns.map(c => <th key={c.key} scope="col">{c.label}</th>)}</tr></thead>
    <tbody>{rows.map((row, i) => <tr key={i}>{columns.map(c => <td key={c.key} data-label={c.label}>{row[c.key]}</td>)}</tr>)}</tbody>
  </table>;
}
