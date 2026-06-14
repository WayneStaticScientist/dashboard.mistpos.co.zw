"use client";
import { useEffect } from "react";
import { NormalLoader } from "../loaders/normal-loader";
import { CardOverview } from "../layouts/card-overview";
import { TableProducts } from "../layouts/table-products";
import { CircularWheelChart } from "../graphs/donut-graph";
import { ActiveEmployees } from "../layouts/active-employees";
import { useMainReportStore } from "@/stores/main-report-store";
import { MaterialColors } from "@/utils/colors";
import { toLocalCurrency } from "@/utils/currencies";
import { MistLineGraph } from "../graphs/line-graph";
import { MistBarGraph } from "../graphs/bar-graph";
import { PeriodSelector } from "../ui/period-selector";
import { 
  BanknotesIcon, 
  PresentationChartLineIcon, 
  ArrowTrendingDownIcon, 
  ReceiptRefundIcon, 
  WalletIcon, 
  TagIcon, 
  ArchiveBoxIcon, 
  InformationCircleIcon 
} from "@heroicons/react/24/outline";

export const MainReport = () => {
  const report = useMainReportStore();

  useEffect(() => {
    report.loadAdminStats();
  }, []);

  if (report.loading && !report.loaded) {
    return <NormalLoader />;
  }

  const revenueMargin =
    (report.productStats.totalRevenue - report.productStats.totalCost) /
    (Math.abs(report.productStats.totalRevenue) > 0
      ? Math.abs(report.productStats.totalRevenue)
      : 1);
  const stockAverage =
    report.productStats.totalCost /
    (Math.abs(report.productStats.totalStock) > 0
      ? Math.abs(report.productStats.totalStock)
      : 1);

  const productAverage =
    (report.productStats.totalCost - report.totalProducts) /
    (Math.abs(report.productStats.totalStock) > 0
      ? Math.abs(report.productStats.totalStock)
      : 1);
  const profitMargin =
    (report.salesStates.totalSalesValue - report.salesStates.totalLossValue) /
    (Math.abs(report.salesStates.totalSalesValue) > 0
      ? Math.abs(report.salesStates.totalSalesValue)
      : 1);

  // Derive totals from graphData based on the selected period
  const derivedExpenses = report.graphData.reduce((acc, curr) => acc + (curr.totalExpenses || 0), 0);
  const derivedCustomers = report.graphData.reduce((acc, curr) => acc + (curr.uniqueCustomersCount || 0), 0);
  const derivedReceipts = report.graphData.reduce((acc, curr) => acc + (curr.receiptsCount || 0), 0);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 animate-in fade-in duration-500">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-ui-surface p-4 rounded-xl border border-white/5 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-ui-text-main">Sales Summary</h1>
          <p className="text-sm text-ui-text-muted mt-1">Overview of your business performance</p>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <CardOverview
          label="Net Profit"
          value={toLocalCurrency(
            report.salesStates.totalSalesValue -
            report.salesStates.totalCosts -
            report.salesStates.totalExpenses -
            report.salesStates.totalLossValue
          )}
          icon={BanknotesIcon}
          color="text-ui-success"
        />
        <CardOverview
          label="Gross Profit"
          value={toLocalCurrency(report.salesStates.totalSalesValue - report.salesStates.totalCosts)}
          icon={PresentationChartLineIcon}
          color="text-blue-500"
        />
        <CardOverview
          label="Expenses"
          value={toLocalCurrency(report.salesStates.totalExpenses)}
          icon={WalletIcon}
          color="text-orange-500"
        />
        <CardOverview
          label="Losses"
          value={toLocalCurrency(report.salesStates.totalLossValue)}
          icon={ArrowTrendingDownIcon}
          color="text-red-500"
        />
        <CardOverview
          label="Refunds"
          value={toLocalCurrency(report.salesStates.totalRefunds)}
          icon={ReceiptRefundIcon}
          color="text-yellow-500"
        />
        <CardOverview
          label="Discounts"
          value={toLocalCurrency(report.salesStates.totalDiscounts)}
          icon={TagIcon}
          color="text-pink-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-ui-surface rounded-xl border border-white/5 shadow-sm p-4 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-lg font-semibold text-ui-text-main">Revenue & Profit Trend</h2>
            <PeriodSelector 
              value={report.period} 
              onChange={(period, dates) => report.setPeriod(period, dates)} 
            />
          </div>
          <div className="h-80 w-full">
             <MistLineGraph label={`${report.period.toUpperCase()} Trend`} />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="bg-ui-surface rounded-xl border border-white/5 shadow-sm p-4 h-full flex flex-col justify-center">
            <h2 className="text-sm font-semibold text-ui-text-muted mb-2 text-center">Sales Breakdown</h2>
            <CircularWheelChart
              label="Sales/Cost/Expenses"
              chartData={[
                { name: "Sales", value: report.salesStates.totalSalesValue, color: MaterialColors.MaterialGreen },
                { name: "Costs", value: report.salesStates.totalCosts, color: MaterialColors.MaterialBlue },
                { name: "Expenses", value: derivedExpenses, color: MaterialColors.MaterialOrange },
                { name: "Discounts", value: report.salesStates.totalDiscounts, color: MaterialColors.MaterialPink },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Monthly Summary */}
      <div>
        <h3 className="text-lg font-bold text-ui-text-main mb-4">Monthly Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <CardOverview
            label="Net Profit"
            value={toLocalCurrency(report.monthlySummary.totalProfit - report.monthlySummary.totalExpenses)}
            icon={BanknotesIcon}
            color="text-ui-success"
          />
          <CardOverview
            label="Gross Profit"
            value={toLocalCurrency(report.monthlySummary.totalProfit)}
            icon={PresentationChartLineIcon}
            color="text-blue-500"
          />
          <CardOverview
            label="Revenue"
            value={toLocalCurrency(report.monthlySummary.totalRevenue)}
            icon={WalletIcon}
            color="text-green-500"
          />
          <CardOverview
            label="Expenses"
            value={toLocalCurrency(report.monthlySummary.totalExpenses)}
            icon={ArrowTrendingDownIcon}
            color="text-orange-500"
          />
          <CardOverview
            label="Items Sold"
            value={report.monthlySummary.numberOfItemsSold.toString()}
            icon={ArchiveBoxIcon}
            color="text-purple-500"
          />
          <CardOverview
            label="Receipts"
            value={report.monthlySummary.numberOfReceipts.toString()}
            icon={ReceiptRefundIcon}
            color="text-teal-500"
          />
        </div>
        
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-ui-surface border border-white/5 p-4 rounded-lg shadow-sm">
            <h4 className="text-sm font-semibold text-ui-text-main mb-3">Top 5 Days (Revenue)</h4>
            <div className="space-y-3">
              {report.monthlySummary.top5SellingDays.length > 0 ? report.monthlySummary.top5SellingDays.map((day, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <span className="text-ui-text-muted">{new Date(day.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                  <span className="font-medium text-ui-text-main">{toLocalCurrency(day.sales)}</span>
                </div>
              )) : (
                <div className="text-sm text-ui-text-muted">No sales data available for this month.</div>
              )}
            </div>
          </div>
          <div className="bg-ui-surface border border-white/5 p-4 rounded-lg shadow-sm flex flex-col justify-center">
            <strong className="text-ui-text-main font-semibold mb-3 flex items-center gap-2">
              <InformationCircleIcon className="w-5 h-5 text-ui-primary"/> 
              Insight & Recommendation
            </strong>
            <p className="text-sm text-ui-text-muted leading-relaxed">
              {report.monthlySummary.salesRecommendation}
            </p>
          </div>
        </div>
      </div>

      {/* Expenses Analysis */}
      <div>
        <h3 className="text-lg font-bold text-ui-text-main mb-4 mt-8">Expenses Analysis</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-ui-surface rounded-xl border border-white/5 shadow-sm p-4 overflow-hidden">
            <h2 className="text-lg font-semibold text-ui-text-main mb-4">Monthly Expenses Trend</h2>
            <div className="h-80 w-full">
               <MistBarGraph 
                  title="Expenses Trend" 
                  label="Amount" 
                  data={report.monthlySummary.expensesGraph} 
                  color="rgba(249, 115, 22, 0.8)" 
               />
            </div>
          </div>
          <div className="bg-ui-surface rounded-xl border border-white/5 shadow-sm p-4">
            <h4 className="text-sm font-semibold text-ui-text-main mb-3">Top 5 Highest Expenses</h4>
            <div className="space-y-3">
              {report.monthlySummary.top5ExpensiveExpenses.length > 0 ? report.monthlySummary.top5ExpensiveExpenses.map((expense, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm border-b border-white/5 pb-2 last:border-0 last:pb-0">
                  <div className="flex flex-col">
                    <span className="font-medium text-ui-text-main">{expense.name}</span>
                    <span className="text-xs text-ui-text-muted">{new Date(expense.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                  </div>
                  <span className="font-medium text-orange-500">{toLocalCurrency(expense.amount)}</span>
                </div>
              )) : (
                <div className="text-sm text-ui-text-muted">No expenses recorded for this month.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
