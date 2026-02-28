import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

import type { AnalyticsData } from "@/types/analytics";
import { getAnalytics } from "@/api/analyticApi";

const AnalyticsPage = () => {
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAnalytics();
                setAnalytics(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    if (!analytics) return <p>Loading...</p>;

    const statusChart = {
        series: Object.values(analytics.statusCounts),
        options: {
            chart: { type: "pie" as const },
            labels: Object.keys(analytics.statusCounts),
            title: { text: "Complaints by Status" },
        } as ApexOptions,
    };

    const categoryChart = {
        series: [
            { name: "Complaints", data: Object.values(analytics.categoryCounts) },
        ],
        options: {
            chart: { type: "bar" as const },
            xaxis: { categories: Object.keys(analytics.categoryCounts) },
            title: { text: "Complaints by Category" },
        } as ApexOptions,
    };

    const districtChart = {
        series: [
            { name: "Complaints", data: Object.values(analytics.districtCounts) },
        ],
        options: {
            chart: { type: "bar" as const },
            xaxis: { categories: Object.keys(analytics.districtCounts) },
            title: { text: "Complaints by District" },
        } as ApexOptions,
    };

    return (
        <div className="p-4 space-y-8">
            <h2 className="text-2xl font-bold">Analytics Dashboard</h2>

            <div className="flex justify-center items-center my-6">
                <div className="bg-white shadow rounded p-4">
                    <h3 className="text-lg font-semibold mb-4 text-center">Complaints by Status</h3>
                    <ReactApexChart
                        options={statusChart.options}
                        series={statusChart.series}
                        type="pie"
                        width={550}   // chart width
                        height={550}  // chart height
                    />
                </div>
            </div>

            <div className="bg-white shadow rounded p-4">
                <h3 className="text-lg font-semibold mb-2">By Category</h3>
                <ReactApexChart
                    options={categoryChart.options}
                    series={categoryChart.series}
                    type="bar"
                />
            </div>

            <div className="bg-white shadow rounded p-4">
                <h3 className="text-lg font-semibold mb-2">By District</h3>
                <ReactApexChart
                    options={districtChart.options}
                    series={districtChart.series}
                    type="bar"
                />
            </div>
        </div>
    );
};

export default AnalyticsPage;