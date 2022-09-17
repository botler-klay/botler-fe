import useSWR from "swr";

function fetchJobs() {
  return [
    {
      name: "ABC",
      address: "0x123",
      feeCall: "11.11",
      accum: "222.22",
      balance: "44.55",
      status: "Active",
    },
  ];
}

export function useJobs() {
  const { data } = useSWR("jobs", fetchJobs);

  return { data };
}
