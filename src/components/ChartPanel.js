import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { TrendingUp, TrendingDown } from "lucide-react";

export default function ChartPanel({ coin }) {
  if (!coin) return null;

  return (
    <div className="chart-panel">

      <div className="chart-header">

        <div>

          <span className="chart-label">
            Live Market Overview
          </span>

          <h2>{coin.name}</h2>

          <p>{coin.id}</p>

        </div>

        <div className="price-box">

          <h1>
            $
            {coin.price >= 1
              ? coin.price.toLocaleString()
              : coin.price.toFixed(4)}
          </h1>

          <div
            className={
              coin.change >= 0
                ? "change positive"
                : "change negative"
            }
          >
            {coin.change >= 0 ? (
              <TrendingUp size={16} />
            ) : (
              <TrendingDown size={16} />
            )}

            {coin.change.toFixed(2)}%
          </div>

        </div>

      </div>

      <div className="chart-container">

        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <LineChart data={coin.sparkline}>

            <XAxis hide />

            <YAxis hide />

            <Tooltip
              formatter={(value) => [
                `$${Number(value).toFixed(2)}`,
                "Price",
              ]}
              labelFormatter={() => "Market Price"}
            />

            <Line
              type="monotone"
              dataKey="price"
              stroke={
                coin.change >= 0
                  ? "#22c55e"
                  : "#ef4444"
              }
              strokeWidth={3}
              dot={false}
            />

          </LineChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}