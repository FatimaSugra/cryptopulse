import { Wallet, RefreshCw } from "lucide-react";

export default function Header({ refresh, loading, lastUpdated }) {
  return (
    <header className="header">

      <div>

        <span className="header-tag">

          <Wallet size={15} />

          Live Cryptocurrency Dashboard

        </span>

        <h1>CryptoPulse</h1>

        <p>
          Monitor real-time cryptocurrency prices with live market updates.
        </p>
        <p className="last-updated">
        Last Updated: {lastUpdated || "Loading..."}
        </p>
      </div>

      <button
        className="refresh-btn"
        onClick={refresh}
        disabled={loading}
      >

        <RefreshCw
          size={16}
          className={loading ? "spin" : ""}
        />

        {loading ? "Updating..." : "Refresh"}

      </button>

    </header>
  );
}