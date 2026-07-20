import {
  Activity,
  DollarSign,
  BarChart3,
  Database,
} from "lucide-react";

export default function StatsPanel({ coin }) {
  if (!coin) return null;

  return (
    <div className="stats-grid">

      <div className="stat-card">

        <div className="stat-icon">
          <DollarSign size={18} />
        </div>

        <div>
          <span>Current Price</span>

          <h3>
            $
            {coin.price >= 1
              ? coin.price.toLocaleString()
              : (coin.price ?? 0).toFixed(4)}
          </h3>
        </div>

      </div>

      <div className="stat-card">

        <div className="stat-icon">
          <Activity size={18} />
        </div>

        <div>
          <span>24 Hour Change</span>

          <h3
            className={
              coin.change >= 0
                ? "positive"
                : "negative"
            }
          >
            {(coin.change ?? 0).toFixed(2)}%
          </h3>
        </div>

      </div>

      <div className="stat-card">

        <div className="stat-icon">
          <BarChart3 size={18} />
        </div>

        <div>
          <span>Trading Volume</span>

          <h3>${coin.volume}</h3>
        </div>

      </div>

      <div className="stat-card">

        <div className="stat-icon">
          <Database size={18} />
        </div>

        <div>
          <span>Data Source</span>

          <h3>CoinGecko API</h3>
        </div>

      </div>

    </div>
  );
}