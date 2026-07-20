import { TrendingUp, TrendingDown } from "lucide-react";

export default function CoinCard({
  coin,
  selectedCoin,
  setSelectedCoin,
}) {
  const isSelected = selectedCoin?.id === coin.id;

  return (
    <div
      className={`coin-card ${isSelected ? "active" : ""}`}
      onClick={() => setSelectedCoin(coin)}
    >
      <div className="coin-left">

        <img
          src={coin.image}
          alt={coin.name}
          className="coin-image"
        />

        <div>

          <h3>{coin.id}</h3>

          <p>{coin.name}</p>

          <span>Volume: ${coin.volume}</span>

        </div>

      </div>

      <div className="coin-right">

        <h3>
          $
          {coin.price >= 1
            ? coin.price.toLocaleString()
            : (coin.price ?? 0).toFixed(4)}
        </h3>

        <div
          className={
            coin.change >= 0
              ? "coin-change positive"
              : "coin-change negative"
          }
        >
          {coin.change >= 0 ? (
            <TrendingUp size={14} />
          ) : (
            <TrendingDown size={14} />
          )}

         {(coin.change ?? 0).toFixed(2)}%
        </div>

      </div>
    </div>
  );
}