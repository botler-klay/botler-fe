import { Column } from "react-table";

export const CYPRESS_NETWORK_VERSION = 8217;
export const BAOBAB_NETWORK_VERSION = 1001;

export const JOBLIST_COLUMNS: Column[] = [
  {
    accessor: "name",
    Header: "Name",
    disableSortBy: true,
  },
  {
    accessor: "address",
    Header: "Address",
    disableSortBy: true,
  },
  {
    accessor: "feePerCall",
    Header: "Fee/Call",
  },
  {
    accessor: "accumFee",
    Header: "Accumulated Fee",
  },
  {
    accessor: "balance",
    Header: "Balance",
  },
  {
    accessor: "status",
    Header: "Status",
    disableSortBy: true,
  },
];
