import {
  useTable,
  Column,
  useSortBy,
  Row as TableRow,
  TableRowProps,
  TableHeaderProps,
  HeaderGroup,
} from "react-table";
import { Row } from "./Layouts";

export function Table({
  columns,
  data,
  rowProps,
  headerProps,
}: {
  columns: Column[];
  data: {}[];
  rowProps: (row: TableRow<any>) => TableRowProps;
  headerProps: (header: HeaderGroup<any>) => TableHeaderProps;
}) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((header) => (
                <th
                  {...header.getHeaderProps(
                    header.getSortByToggleProps(headerProps(header))
                  )}
                >
                  <Row style={{ width: "fit-content", gap: 4 }}>
                    {header.render("Header")}
                    {header.canSort && <span>⬆︎</span>}
                  </Row>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps(rowProps(row))}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
