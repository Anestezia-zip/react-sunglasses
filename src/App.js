import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom'
import axios from 'axios';
import { Header } from './components/Header';
import { ShoppingCart } from './components/ShoppingCart/ShoppingCart';
import AppContext from './context';
import Home from './pages/Home'
import Favorites from './pages/Favorites';


const cardsArray = [
	{
    "title": "ROUND METAL",
    "imageUrl": "/imgs/sunglasses1.jpeg",
    "price": 155
	},
  {
    "title": "OVAL 1970 BI-GRADIENT",
    "imageUrl": "/imgs/sunglasses3.jpeg",
    "price": 124
  },
  {
    "title": "CLUBMASTER CLASSIC",
    "imageUrl": "/imgs/sunglasses11.jpeg",
    "price": 145
  },
  {
    "title": "HAWKEYE",
    "imageUrl": "/imgs/sunglasses4.jpeg",
    "price": 319
  },
  {
    "title": "AVIATOR METAL II",
    "imageUrl": "/imgs/sunglasses2.jpeg",
    "price": 205
  },
  {
    "title": "EAGLE EYE",
    "imageUrl": "/imgs/sunglasses10.jpeg",
    "price": 175
  }
]

function App() {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favoritesItems, setFavoritesItems] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [cartOpened, setCartOpened] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const cartResponse = await axios.get('https://64dc9e62e64a8525a0f6d201.mockapi.io/cart')
      const favResponse = await axios.get('https://64de0b39825d19d9bfb1f045.mockapi.io/favorites')
      const itemsResponse = await axios.get('https://64dc9e62e64a8525a0f6d201.mockapi.io/items')

      setIsLoading(false)
      setCartItems(cartResponse.data)
      setFavoritesItems(favResponse.data)
      setItems(itemsResponse.data)
    }

    fetchData()
  }, [])
  
  const onAddToCart = (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(`https://64dc9e62e64a8525a0f6d201.mockapi.io/cart/${obj.id}`)
        setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
      } else {
        axios.post('https://64dc9e62e64a8525a0f6d201.mockapi.io/cart', obj)
        setCartItems((prev) => [...prev, obj]) // сохраняем в стейте, выводим результат для пользователя
      }
    } catch (error) {
      alert('Failed to add to cart')
    }
  }

  const onAddToFavorites = async (addedFavoriteItem) => {
    try {
      if (favoritesItems.find((favObj) => favObj.id === addedFavoriteItem.id)) {
        axios.delete(`https://64de0b39825d19d9bfb1f045.mockapi.io/favorites/${addedFavoriteItem.id}`)
        setFavoritesItems((prev) => prev.filter(item => item.id !== addedFavoriteItem.id))
      } else {
        const { data } = await axios.post('https://64de0b39825d19d9bfb1f045.mockapi.io/favorites', addedFavoriteItem)
        setFavoritesItems((prev) => [...prev, data]) // сохраняем в стейте, выводим результат для пользователя
      }
    } catch (error) {
      alert('Failed to add to favorites')
    }
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://64dc9e62e64a8525a0f6d201.mockapi.io/cart/${id}`)
    setCartItems((prev) => prev.filter(item => item.id !== id)) // отфильтруй самого себя, возьми item и проверь, что он не равен id. Метод вернет массив с объектами без удаленного itema. Другими словами дай все item-ы без id 3
  }
  
  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id))
  }

  return (
    <AppContext.Provider value={{ items, cartItems, favoritesItems, isItemAdded, onAddToFavorites }}>
      <div className="wrapper">
        {cartOpened && <ShoppingCart items={cartItems} onCloseCart={() => setCartOpened(false)} onRemove={onRemoveItem} />}
        <Header onClickCart={() => setCartOpened(true)} />
        <Routes>
          <Route path="/"
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchValue={onChangeSearchValue}
                onAddToFavorites={onAddToFavorites}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
            exact
          />

          <Route path="/favorites"
            element={
              <Favorites />
            }
            exact
          />

        </Routes>
    </div>
    </AppContext.Provider>
  );
}

export default App;







// rough draft

  // useEffect(() => { // первый рендер произошел у App.js - выполни запрос, больше не выполняй
  //   fetch('https://64dc9e62e64a8525a0f6d201.mockapi.io/items')
  //   .then((response) => {
  //     return response.json()
  //   })
  //   .then((json) => {
  //     setItems(json);
  //   })
  // }, [])