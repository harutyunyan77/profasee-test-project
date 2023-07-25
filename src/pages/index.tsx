import ChartWithDropdown from "@/components/chart";
import SkeletonCard from "@/components/loader";
import Table from "@/components/table";
import { IData } from "@/types/types";
import { BASE_URL } from "@/utils/constants";
import { Inter } from "next/font/google";
import { useState } from "react";
import { useFetch } from "../hooks/queries";

const inter = Inter({ subsets: ["latin"] });
interface IfetchData {
  payload?: {
    results?: IData[];
  };
}
export default function Home() {
  const [data, setData] = useState<IData[]>([]);
  const { isLoading } = useFetch(BASE_URL, "getTableData", successData);
  function successData(data: IfetchData) {
    setData(data?.payload?.results || []);
  }
  if (!isLoading) {
    return (
      <div className={inter.className}>
        <div className="max-w-7xl m-auto">
          <ChartWithDropdown data={data} />
          <Table data={data} />
        </div>
      </div>
    );
  } else {
    return <SkeletonCard />;
  }
}
