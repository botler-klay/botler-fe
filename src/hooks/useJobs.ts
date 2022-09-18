import useSWR from "swr";

function fetchJobs() {
  return [
    {
      jid: "1",
      name: "ABC",
      address: "0x123",
      feePerCall: "11.11",
      accumFee: "222.22",
      balance: "44.55",
      status: "Active",
      owner: "0x373e13B3B55D86B48cf6A5F3464942140f1E1486",
      gas: "100000",
      numOfRuns: 3,
    },
    {
      jid: "2",
      name: "DEF",
      address: "0x456",
      feePerCall: "3.33",
      accumFee: "555.55",
      balance: "24.42",
      status: "InActive",
      owner: "0xabcdef",
      gas: "100000",
      numOfRuns: 3,
    },
    {
      jid: "3",
      name: "GEH",
      address: "0x789",
      feePerCall: "2.25",
      accumFee: "31.415",
      balance: "1212.21",
      status: "InActive",
      owner: "0x373e13B3B55D86B48cf6A5F3464942140f1E1486",
      gas: "100000",
      numOfRuns: 3,
    },
    {
      jid: "4",
      name: "IJK",
      address: "0xABC",
      feePerCall: "8.191",
      accumFee: "92.6535897932",
      balance: "4849.311",
      status: "Active",
      owner: "0x098098089",
      gas: "100000",
      numOfRuns: 3,
    },
  ];
}

export function useJobs() {
  const { data } = useSWR("jobs", fetchJobs);

  const getJobDetail = (jid?: string) => {
    if (!data || !jid) return undefined;

    return data.find((job) => job.jid === jid);
  };

  return { data, getJobDetail };
}
