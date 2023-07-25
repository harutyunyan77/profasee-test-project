import { IData } from "@/types/types";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import React, { Fragment, SetStateAction, useState } from "react";
import {
  Brush,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: IData[];
}
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const selectData = [
  { id: 1, value: "units", name: "Units" },
  { id: 2, value: "revenue", name: "Revenue" },
  { id: 3, value: "cogs", name: "Cost of Goods Sold" },
  { id: 4, value: "ppcRevenue", name: "PPC Revenue" },
  { id: 5, value: "adsCost", name: "Ads Cost" },
  { id: 6, value: "bestsellersrank", name: "Best sellers rank" },
  { id: 7, value: "ppcrevenueAdjusted", name: "Ppc revenue adjusted" },
];

const ChartWithDropdown: React.FC<Props> = ({ data }: Props) => {
  const [selectedValue, setSelectedValue] = useState({
    id: 1,
    value: "units",
    name: "Units",
  });

  const handleChange = (
    event: SetStateAction<{ id: number; value: string; name: string }>
  ) => {
    setSelectedValue(event);
  };

  const formattedData = data.map((entry) => {
    const date = entry.date ? new Date(entry.date) : new Date(); // Use a fallback date if entry.date is undefined
    return {
      date: date.toDateString(),
      units: parseFloat(entry.units || "0"),
      revenue: parseFloat(entry.revenue || "0"),
      cogs: parseFloat(entry.cogs || "0"),
      ppcRevenue: parseFloat(entry.ppc_revenue || "0"),
      adsCost: parseFloat(entry.ads_cost || "0"),
      bestsellersrank: parseFloat(entry.best_sellers_rank || "0"),
      ppcrevenueAdjusted: parseFloat(entry.ppc_revenue_adjusted || "0"),
    };
  });

  const renderBar = (dataKey: string, fill: string) => (
    <Bar dataKey={dataKey} fill={fill} />
  );
  return (
    <div className="flex flex-col space-y-4 p-4">
      <div className="w-full md:w-[50%] px-4">
        <Listbox value={selectedValue} onChange={handleChange}>
          {({ open }) => (
            <>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                  <span className="block truncate">{selectedValue.name}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {selectData.map((item) => (
                      <Listbox.Option
                        key={item.id}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "text-white bg-indigo-600"
                              : "text-gray-900",
                            "relative cursor-default select-none py-2 pl-3 pr-9"
                          )
                        }
                        value={item}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "block truncate"
                              )}
                            >
                              {item.name}
                            </span>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? "text-white" : "text-indigo-600",
                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>
      <div className="w-full">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={formattedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {renderBar(selectedValue.value, "#8884d8")}
            <Brush dataKey="date" height={30} stroke="#614B88" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartWithDropdown;
