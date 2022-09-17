import useSWR from "swr";

function fetchJobs() {
  return [
    {
      name: "ABC",
      address: "0x123",
      feePerCall: "11.11",
      accumFee: "222.22",
      balance: "44.55",
      status: "Active",
    },
    {
      name: "DEF",
      address: "0x456",
      feePerCall: "3.33",
      accumFee: "555.55",
      balance: "24.42",
      status: "InActive",
    },
  ];
}

export function useJobs() {
  const { data } = useSWR("jobs", fetchJobs);

  const getJobDetail = (_jid: string) => ({
    name: "ABC",
    address: "0x123",
    feePerCall: "11.11",
    accumFee: "222.22",
    balance: "44.55",
    status: "Active",
    gas: "1.234",
    numOfRuns: "5",
  });

  return { data, getJobDetail };
}
