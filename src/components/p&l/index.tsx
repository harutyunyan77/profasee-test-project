import { IData } from "@/types/types";
import React from "react";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

const COLORS = ["#A092BC", "#785E9B", "#3C2E4D"];
const moreData = [
  {
    id: 1,
    label: "Units last year",
    value: "units_lastyear",
  },
  {
    id: 2,
    label: "Revenue last year",
    value: "revenue_lastyear",
  },
  {
    id: 3,
    label: "Cogs last year",
    value: "cogs_lastyear",
  },
  {
    id: 4,
    label: "Ads cost last year",
    value: "ads_cost_lastyear",
  },
  {
    id: 5,
    label: "Best sellers rank last year",
    value: "best_sellers_rank_lastyear",
  },
  {
    id: 6,
    label: "Ppc revenue adjusted last year",
    value: "ppc_revenue_adjusted_lastyear",
  },
  {
    id: 7,
    label: "Ads cost adjusted last year",
    value: "ads_cost_adjusted_lastyear",
  },
  {
    id: 8,
    label: "Revenue projected",
    value: "revenue_projected",
  },
  {
    id: 9,
    label: "Ads cost projected",
    value: "ads_cost_projected",
  },
  {
    id: 10,
    label: "Best sellers rank projected",
    value: "best_sellers_rank_projected",
  },
  {
    id: 11,
    label: "Ppc revenue projected",
    value: "ppc_revenue_projected",
  },
  {
    id: 12,
    label: "Ppc revenue last year",
    value: "ppc_revenue_lastyear",
  },
];
const ProfitLoss = ({ data }: { data: IData | null }) => {
  const [
    revenue,
    cogs,
    adsCost,
    revenueLastYear,
    cogsLastYear,
    adsCostLastYear,
  ] = [
    "revenue",
    "cogs",
    "ads_cost",
    "revenue_lastyear",
    "cogs_lastyear",
    "ads_cost_lastyear",
  ].map((key) => (data ? parseFloat(data[key]) : 0));

  const chartData = [
    { name: "Revenue", value: revenue },
    { name: "COGS", value: cogs },
    { name: "Ads", value: adsCost },
  ];

  const profitLossCurrentYear = revenue - (cogs + adsCost);
  const profitLossLastYear = revenueLastYear - (cogsLastYear + adsCostLastYear);
  return (
    <>
      <PieChart width={400} height={300}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={chartData}
          cx={200}
          cy={150}
          outerRadius={100}
          fill="#8884d8"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
      <div className="mt-2 mb-4">
        <p className="text-dark-purple font-semibold flex justify-between">
          Profit/Loss (Current Year)
          <span className="font-normal">
            {profitLossCurrentYear.toFixed(2)}
          </span>
        </p>
        <p className="text-dark-purple font-semibold  flex justify-between">
          Profit/Loss (Last Year)
          <span className="font-normal">{profitLossLastYear.toFixed(2)}</span>
        </p>
      </div>
      <div className="border-t-[1px] border-grey py-3">
        <span className="text-xl font-semibold text-dark-purple text-end sm:text-start">
          More Information
        </span>
        <div className="pt-6 more-info">
          {moreData.map((item) => {
            return (
              <div
                key={item.id}
                className="flex justify-between border-b-[1px] pb-1 text-purple-100 even:bg-light-purple"
              >
                <span>{item.label}</span>
                <span className="text-grey">
                  {data && parseInt(data[item.value], 10)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProfitLoss;
