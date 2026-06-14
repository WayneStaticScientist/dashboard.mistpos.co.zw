"use client";
import React, { useEffect, useState } from "react";
import { useSuperAdminStore } from "@/stores/superadmin-store";
import { Spinner } from "@/components/ui/spinner";
import { MistDateUtils } from "@/utils/date-utils";
import { FaUsers, FaBuilding, FaMoneyBillWave, FaChartLine } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export const SuperAdminView = () => {
  const store = useSuperAdminStore();
  const [period, setPeriod] = useState("daily");

  useEffect(() => {
    store.fetchStats();
    store.fetchSalesChart(period);
    store.fetchTopCompanies(period);
  }, [period]);

  if (store.loading && !store.stats) {
    return (
      <div className="flex items-center justify-center w-full h-full min-h-[400px]">
        <Spinner className="w-8 h-8 text-ui-primary" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-ui-text-main">SuperAdmin Overview</h1>
        <div className="flex bg-ui-surface p-1 rounded-lg border border-ui-border">
          {["daily", "monthly", "yearly"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                period === p ? "bg-ui-primary text-white shadow-sm" : "text-ui-text-muted hover:text-ui-text-main hover:bg-ui-bg"
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value={`$${store.stats?.totalRevenue?.toFixed(2) || '0.00'}`} icon={FaMoneyBillWave} color="text-green-500" />
        <StatCard title="Total Companies" value={store.stats?.totalCompanies?.toString() || '0'} icon={FaBuilding} color="text-blue-500" />
        <StatCard title="Active Users" value={store.stats?.totalUsers?.toString() || '0'} icon={FaUsers} color="text-purple-500" />
        <StatCard title="Active Subscriptions" value={store.stats?.activeSubscriptions?.toString() || '0'} icon={FaChartLine} color="text-orange-500" />
      </div>

      {/* Charts and Tables Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart Placeholder */}
        <div className="lg:col-span-2 bg-ui-surface border border-ui-border rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-ui-text-main mb-4">Revenue Trend ({period})</h2>
          <div className="h-64 flex items-center justify-center bg-ui-bg rounded-lg border border-ui-border border-dashed">
            {store.loading ? <Spinner /> : <span className="text-ui-text-muted">Chart Data Loaded (Use Recharts/Chart.js)</span>}
          </div>
        </div>

        {/* Top Companies List */}
        <div className="bg-ui-surface border border-ui-border rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-ui-text-main mb-4">Top Performing Companies</h2>
          <div className="space-y-4">
            {store.topCompanies.length > 0 ? store.topCompanies.slice(0, 5).map((company: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-ui-bg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-ui-primary/10 flex items-center justify-center text-ui-primary font-bold">
                    {company.name ? company.name.charAt(0).toUpperCase() : '#'}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ui-text-main">{company.name || 'Unknown'}</p>
                    <p className="text-xs text-ui-text-muted">{company.totalTransactions || 0} transactions</p>
                  </div>
                </div>
                <div className="text-sm font-semibold text-ui-success">
                  ${company.revenue?.toFixed(2) || '0.00'}
                </div>
              </div>
            )) : (
              <div className="text-center text-sm text-ui-text-muted py-8">No data available for {period}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, color }: { title: string, value: string, icon: any, color: string }) => (
  <div className="bg-ui-surface border border-ui-border rounded-xl p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
    <div className={`p-4 rounded-full bg-ui-bg ${color}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-sm font-medium text-ui-text-muted">{title}</p>
      <h3 className="text-2xl font-bold text-ui-text-main mt-1">{value}</h3>
    </div>
  </div>
);
