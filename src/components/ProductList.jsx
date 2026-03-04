export default function ProductList({ items}){
    return (
        <ul>
          {items.map(product =>(
            <li key={product.id}>
                {product.name} - S/ {product.price}
            </li>
          ))}
        </ul>
    );
}