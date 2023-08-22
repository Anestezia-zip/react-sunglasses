import { useContext } from 'react';
import Card from '../components/Card/Card';
import AppContext from '../context';

function Favorites() {
  const { favoritesItems, onAddToFavorites } = useContext(AppContext);

	return(
		<main className="main">
        <section className="content">
          <div className="content-title">
            <h2>Favorites items</h2>
          </div>
          <div className="cards">
            {favoritesItems
              .map((item, index) => (
              <Card
                key={index}
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

export default Favorites;