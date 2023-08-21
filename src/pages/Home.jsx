import { Card } from '../components/Card/Card';

export function Home({ items, cartItems, searchValue, setSearchValue, onChangeSearchValue, onAddToFavorites, onAddToCart, isLoading }) {

  const renderItems = () => {
    const filtredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()));

    return (
      (isLoading ? [...Array(9)] : filtredItems)
        .map((item, index) => (
          <Card
            key={index}
            onClickFavorite={(addedFavoriteItem) => {onAddToFavorites(addedFavoriteItem)}}
            onClickPlus={(addedCartItem) => {onAddToCart(addedCartItem)}}
            addedItems={cartItems.some(addedCartItem => Number(addedCartItem.id) === Number(item.id))} // если хотя бы что-то было true, метод вернет true
            loadingItems={isLoading}
            {...item}
          />
        ))
    )
  }

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
          <ul className="cards">
            {renderItems()}
            
            {/* {products.map(p => <Product product={p} key={p.id}/>)} */}
          </ul>
        </section>
      </main>
	);
}

