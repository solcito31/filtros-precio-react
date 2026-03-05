export default function DonutSalesChart({ products }) {
  const totalSales = products.reduce((sum, p) => sum + p.sales, 0);

  let cumulative = 0;

  const colors = ["#4CAF50", "#FF9800", "#2196F3", "#9C27B0", "#F44336"];

  return (
    <div style={{ margin: "30px 0" }}>
      <h3>Distribución de Ventas (%)</h3>

      <svg width="220" height="220" viewBox="0 0 36 36">
        <circle
          cx="18"
          cy="18"
          r="15.915"
          fill="transparent"
          stroke="#eee"
          strokeWidth="4"
        />

        {products.map((p, i) => {
          const percent = ((p.sales / totalSales) * 100).toFixed(1);
          const dash = `${percent} ${100 - percent}`;
          const offset = 100 - cumulative;
          cumulative += percent;

          return (
            <circle
              key={p.id}
              cx="18"
              cy="18"
              r="15.915"
              fill="transparent"
              stroke={colors[i % colors.length]}
              strokeWidth="4"
              strokeDasharray={dash}
              strokeDashoffset={offset}
            />
          );
        })}
      </svg>

      {/* LEYENDA */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {products.map((p, i) => (
          <li key={p.id}>
            <span
              style={{
                display: "inline-block",
                width: "12px",
                height: "12px",
                backgroundColor: colors[i % colors.length],
                marginRight: "8px"
              }}
            />
            {p.name} — {((p.sales / totalSales) * 100).toFixed(1)}%
          </li>
        ))}
      </ul>
    </div>
  );
}