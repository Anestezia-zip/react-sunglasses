
import { Route, Routes } from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { ShoppingCart } from './components/ShoppingCart/ShoppingCart';
import { Home } from './pages/Home';
import { Favorites } from './pages/Favorites';


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

  useEffect(() => {
    axios.get('https://64dc9e62e64a8525a0f6d201.mockapi.io/items').then((response) => {
      setItems(response.data)
    });
    axios.get('https://64dc9e62e64a8525a0f6d201.mockapi.io/cart').then((response) => {
      setCartItems(response.data)
    });
    axios.get('https://64de0b39825d19d9bfb1f045.mockapi.io/favorites').then((response) => {
      setFavoritesItems(response.data)
    });
  }, [])
  
  const onAddToCart = (addedCartItem) => {
    axios.post('https://64dc9e62e64a8525a0f6d201.mockapi.io/cart', addedCartItem)
    setCartItems((prev) => [...prev, addedCartItem]) // сохраняем в стейте, выводим результат для пользователя
  }

  const onAddToFavorites = (addedFavoriteItem) => {
    axios.post('https://64de0b39825d19d9bfb1f045.mockapi.io/favorites', addedFavoriteItem)
    setFavoritesItems((prev) => [...prev, addedFavoriteItem]) // сохраняем в стейте, выводим результат для пользователя
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://64dc9e62e64a8525a0f6d201.mockapi.io/cart/${id}`)
    setCartItems((prev) => prev.filter(item => item.id !== id)) // отфильтруй самого себя, возьми item и проверь, что он не равен id. Метод вернет массив с объектами без удаленного itema. Другими словами дай все item-ы без id 3
  }
  
  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value)
  }

  return (
    <div className="wrapper">
      {cartOpened && <ShoppingCart items={cartItems} onCloseCart={() => setCartOpened(false)} onRemove={onRemoveItem} />}
      <Header onClickCart={() => setCartOpened(true)} />
      <Routes>
        <Route path="/"
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchValue={onChangeSearchValue}
              onAddToFavorites={onAddToFavorites}
              onAddToCart={onAddToCart}
            />
          }
          exact
        />

        <Route path="/favorites"
          element={
            <Favorites items={favoritesItems} />
          }
          exact
        />

      </Routes>
    </div>
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