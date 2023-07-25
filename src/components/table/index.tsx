import { useState } from "react";
import moment from "moment";
import Image from "next/image";
import Pagination from "../pagination";
import { IData } from "@/types/types";
import Overlay from "../overlay";

const columns = [
  {
    id: 0,
    label: "Info",
  },
  {
    id: 1,
    label: "Date",
  },
  {
    id: 2,
    label: "Units",
  },
  {
    id: 3,
    label: "Revenue",
  },
  {
    id: 4,
    label: "Cogs",
  },
  {
    id: 5,
    label: "Ads Cost",
  },
  {
    id: 6,
    label: "Best sellers rank",
  },
  {
    id: 7,
    label: "Ppc revenue adjusted",
  },
  {
    id: 8,
    label: "Ads cost adjusted",
  },
  {
    id: 9,
    label: "Ppc revenue",
  },
];
type overlay = {
  open: boolean;
  data: IData | null;
};
const Table = ({ data }: { data: IData[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [overlay, setOverlay] = useState<overlay>({
    open: false,
    data:null
  });
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  return (
    <div className="px-4 sm:px-6 lg:px-8 m-auto">
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block px-4 min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300 overflow-x-auto table">
                <thead className="bg-gray-50">
                  <tr>
                    {columns.map((item) => {
                      return (
                        <th
                          key={item.id}
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-bold text-purple-100 sm:pl-6"
                        >
                          {item.label}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {currentPosts.map((item, idx) => (
                    <tr key={idx} className="even:bg-light-purple">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        <div
                          className="cursor-pointer"
                          onClick={() => setOverlay({ open: true, data: item })}
                        >
                          <Image
                            src="/assets/info.svg"
                            alt="info icon"
                            width={20}
                            height={6}
                          />
                        </div>
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {moment(item?.date).format("ddd MM/DD, YYYY")}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex gap-2 font-semibold justify-center">
                          <span>{item?.units}</span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex justify-center">
                          {item?.revenue}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex justify-center">{item?.cogs}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex justify-center">
                          {item?.ads_cost}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex justify-center">
                          {item?.best_sellers_rank}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex justify-center">
                          {" "}
                          {item?.ppc_revenue_adjusted
                            ? (+item?.ppc_revenue_adjusted).toFixed(2)
                            : "-"}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex justify-center">
                          {item?.ads_cost_adjusted
                            ? (+item?.ads_cost_adjusted).toFixed(2)
                            : "-"}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex justify-center">
                          {" "}
                          {item?.ppc_revenue
                            ? (+item?.ppc_revenue).toFixed(2)
                            : "-"}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={data.length}
              paginateBack={paginateBack}
              paginateFront={paginateFront}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
      <Overlay overlay={overlay} setOverlay={setOverlay} />
    </div>
  );
};
export default Table;
