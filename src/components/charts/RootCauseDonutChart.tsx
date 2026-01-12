/**
 * Root Cause Donut Chart Component
 */
import React from "react";
import ReactECharts from "echarts-for-react";
import { useFiltersStore } from "@/store/filtersStore";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/client";

const RootCauseDonutChart: React.FC = () => {
  const { filters } = useFiltersStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ["rootCauseDistribution", filters],
    queryFn: async () => {
      const response = await api.get("/analytics/root-cause-distribution", {
        params: filters,
      });
      return response.data.data;
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
      data: data?.map((item: any) => item.name) || [],
    },
    series: [
      {
        name: "Causa Raíz",
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
          position: "center",
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
        data:
          data?.map((item: any, index: number) => ({
            value: item.value,
            name: item.name,
            itemStyle: {
              color: index === 0 ? "#3b82f6" : "#10b981", // Blue for "With Root Cause", Green for "Without"
            },
          })) || [],
      },
    ],
  };

  return (
    <div className="glass rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">Tiene Causa Raíz</h3>
      <ReactECharts option={option} style={{ height: "300px" }} />
    </div>
  );
};

export default RootCauseDonutChart;
