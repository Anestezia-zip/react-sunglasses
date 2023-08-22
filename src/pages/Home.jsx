import Card from '../components/Card/Card';

function Home({ items, searchValue, setSearchValue, onChangeSearchValue, onAddToFavorites, onAddToCart, isLoading }) {

  const renderItems = () => {
    const filtredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()));

    return (
      (isLoading ? [...Array(9)] : filtredItems)
        .map((item, index) => (
          <Card
            key={index}
            onClickFavorite={(obj) => {onAddToFavorites(obj)}}
            onClickPlus={(obj) => {onAddToCart(obj)}}
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
          </ul>
        </section>
      </main>
	);
}

export default Home;

