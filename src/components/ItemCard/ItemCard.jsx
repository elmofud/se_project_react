function ItemCard({ item }) {
  return (
    <li>
      <h2>{item.name}</h2>
      <img src={item.link} alt={item.name} />
    </li>
  );
}

export default ItemCard;
