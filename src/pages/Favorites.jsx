import { Card } from '../components/Card/Card';

export function Favorites({ items, onAddToFavorites }) {
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
                favoritedItems={true}
                onClickFavorite={onAddToFavorites}
                {...item}
                // onClickPlus={(addedCartItem) => {onAddToCart(addedCartItem)}}
              />
            ))}
          </div>
        </section>
      </main>
	);
}

