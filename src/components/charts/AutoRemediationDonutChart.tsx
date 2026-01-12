/**
 * Auto-Remediation Donut Chart Component
 */
import React from "react";
import ReactECharts from "echarts-for-react";
import { useFiltersStore } from "@/store/filtersStore";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/client";

const AutoRemediationDonutChart: React.FC = () => {
  const { filters } = useFiltersStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ["autoRemediationStats", filters],
    queryFn: async () => {
      const response = await api.get("/analytics/auto-remediation-stats", {
        params: filters,
      });
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[300px] text-red-500">
        Error al cargar datos
      </div>
    );
  }

  const chartData = data?.data || [];
  const percentage = data?.percentage || 0;

  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      borderColor: "#333",
      textStyle: {
        color: "#fff",
      },
    },
    legend: {
      orient: "vertical",
      right: "10%",
      top: "center",
      textStyle: {
        color: "#fff",
      },
      data: chartData.map((item: any) => item.name),
    },
    graphic: {
      type: "text",
      left: "35%",
      top: "45%",
      style: {
        text: `${percentage.toFixed(0)}%`,
        textAlign: "center",
        fill: "#fff",
        fontSize: 24,
        fontWeight: "bold",
      },
    },
    series: [
      {
        name: "Autoremediado",
        type: "pie",
        radius: ["40%", "70%"],
        center: ["35%", "50%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#0a0e27",
          borderWidth: 2,
        },
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: "bold",
            color: "#fff",
          },
        },
        labelLine: {
          show: false,
        },
        data: chartData.map((item: any, index: number) => ({
          value: item.value,
          name: item.name,
          itemStyle: {
            color: item.name === "Sí" ? "#10b981" : "#6b7280", // Green for "Sí", Gray for "No"
          },
        })),
      },
    ],
  };

  return (
    <div className="glass rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">Problemas Autoremediados</h3>
      <ReactECharts option={option} style={{ height: "300px" }} />
    </div>
  );
};

export default AutoRemediationDonutChart;
