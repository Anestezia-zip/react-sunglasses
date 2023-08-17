import { Card } from '../components/Card/Card';

export function Home({ items, searchValue, setSearchValue, onChangeSearchValue, onAddToFavorites, onAddToCart }) {
	return(
		<main className="main">
        <section className="content">
          <div className="content-title">
            <h2>{searchValue ? `Search by request: ${searchValue}` : 'All sunglasses'}</h2>
            <div className="content-title-searchblock">
              <img src="/imgs/search.svg" alt="search icon" />
              <input onChange={onChangeSearchValue} value={searchValue} type="text" placeholder="Search..."/>
              {searchValue && <img
                onClick={() => {setSearchValue('')}} 
                className='clearInput' 
                src="/imgs/close-cart.svg" 
                alt="Clear input" 
              />}

            </div>
          </div>
          <div className="cards">
            {items
              .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
              .map((item) => (
              <Card
                key={item.title}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                onClickFavorite={(addedFavoriteItem) => {onAddToFavorites(addedFavoriteItem)}}
                onClickPlus={(addedCartItem) => {onAddToCart(addedCartItem)}}
              />
            ))}
            
            {/* {products.map(p => <Product product={p} key={p.id}/>)} */}
          </div>
        </section>
      </main>
	);
}

