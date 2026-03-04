import { useState } from "react";
import { products } from "./data/products";
import ProductList from "./components/ProductList";

function App() {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("asc");

  const filteredProducts = products
    .filter(p =>
      (min === "" || p.price >= min) &&
      (max === "" || p.price <= max) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );

    const total = filteredProducts.length;
    const prices = filteredProducts.map(p => p.price);
    const average=
      prices.length > 0
      ? (prices.reduce((a, b) => a+b, 0) /prices.length).toFixed(2)
      : 0;
    const maxProduct =
      total > 0
        ? filteredProducts.reduce((a, b)=>
          a.price > b.price ? a : b
      )
      : null;
      
    const minProduct =
      total > 0
        ? filteredProducts.reduce((a, b)=>
          a.price < b.price ? a : b
      )
      : null;
  const getcolorByPrice = (price) => {
    if(price <=200) return "#4caf50";
    if(price <=1000) return "#ff9800";
    return "#f44336";

  }
      
  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>Filtros Avanzados de Precio</h1>
{/*ESTADISTICAS*/} 

<div 
style={{
  display:"grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "15px",
  marginBotton: "20px"
}}
>
  <div style={{padding: "15px", border: "1px solid #ccc"}}>
    <strong> Total productos</strong>
    <p>{total}</p>
  </div>
  <div style={{padding: "15px , border: 1px solid #ccc"}}>
    <strong>Precio promedio</strong>
    <p>S/ {average}</p>
  </div>
  {total > 0 && (
    <>
  
  <div style={{ padding: "15px", border: "1px solid #ccc"}}>
    <strong>Mas barato</strong>
    <p>{minProduct.name} - S/{minProduct.price}</p>
  </div>

  <div style={{padding: "15px",  border:"1px solid #ccc"}}>
    <strong> Mas caro</strong>
    <p>{maxProduct.name} - S/{maxProduct.price}</p>
  </div>
  </>
  )}
</div>
{/*FILTROS */}
      <div style={{ marginBotton: "20px" }}>
        <input
          type="number"
          placeholder="Precio mínimo"
          value={min}
          onChange={e => setMin(e.target.value)}
        />

        <input
          type="number"
          placeholder="Precio máximo"
          value={max}
          onChange={e => setMax(e.target.value)}
          style={{ marginLeft: "10px" }}
        />

        <input
          type="text"
          placeholder="Buscar producto"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginLeft: "10px" }}
        />

        <select
          value={order}
          onChange={e => setOrder(e.target.value)}
          style={{ marginLeft: "10px" }}
        >
          <option value="asc">Más barato → más caro</option>
          <option value="desc">Más caro → más barato</option>
        </select>
      </div>

      <ProductList items={filteredProducts} />
      <h2> Estadisticas de precios(barras)</h2>

      <div style={{
        display:"flex",
        alignItems:"flex-end",
        gap: "10px",
        height:"200px", border: "1px solid #ccc",
        padding:"10px"

      }}>
        {filteredProducts.map(product =>( 
          <div key={product.id}style={{ textAlign: "center"}}>
            {/*PRECIO */}
            <small style={{display: "block" , marginbottom: "4px"}}>
              S/ {product.price}
            </small>
            
            {/*BARRA */}
            <div
              style={{
              width: "40px",
              height: product.price / 32,
              backgroundColor: "#4CAF50",
              backgroundColor: getcolorByPrice(product.price),
              margin: "0 auto 5px",
              borderRadius: "4px"
      }}
    />
            {/*NOMBRE*/}
            <small> {product.name}</small>

          </div>
        ))}

      </div>

    </div>
  );
}

export default App;