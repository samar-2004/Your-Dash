import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function Analytics({ height = 200 }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Replace this with your real API call
        // const response = await fetch("/api/analytics");
        // const result = await response.json();
        // setData(result);

        // Dummy data to match the image pattern
        const dummyData = [
          { day: "Mon", tasks: 10 },
          { day: "Tue", tasks: 15 },
          { day: "Wed", tasks: 16 },
          { day: "Thu", tasks: 14 },
          { day: "Fri", tasks: 18 },
          { day: "Sat", tasks: 24 },
          { day: "Sun", tasks: 27 },
        ];
        setData(dummyData);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 0, right:10, left: -30, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ec4899" stopOpacity={0.8} />
              <stop offset="50%" stopColor="#f472b6" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#fce7f3" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="0" stroke="transparent" />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#9CA3AF" }}
            padding={{ left: 5, right: 5 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#9CA3AF" }}
            domain={[0, 30]}
            padding={{ top: 10, bottom: 10}}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Area
            type="monotone"
            dataKey="tasks"
            stroke="#ec4899"
            fill="url(#colorTasks)"
            strokeWidth={2}
            activeDot={{ r: 4, fill: "#ec4899" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
