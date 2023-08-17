import { Card } from '../components/Card/Card';

export function Favorites({ items }) {
	return(
		<main className="main">
        <section className="content">
          <div className="content-title">
            <h2>Favorites items</h2>
          </div>
          <div className="cards">
            {items
              .map((item) => (
              <Card
                key={item.title}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                // onClickPlus={(addedCartItem) => {onAddToCart(addedCartItem)}}
              />
            ))}
          </div>
        </section>
      </main>
	);
}

