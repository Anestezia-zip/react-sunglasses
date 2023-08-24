import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom'
import axios from 'axios';
import { Header } from './components/Header';
import { ShoppingCart } from './components/ShoppingCart/ShoppingCart';
import AppContext from './context';
import Home from './pages/Home'
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';


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
      try {
        const [cartResponse, favResponse, itemsResponse] = await Promise.all([
          axios.get('https://64dc9e62e64a8525a0f6d201.mockapi.io/cart'),
          axios.get('https://64e5c8ee09e64530d17f0525.mockapi.io/favorites'),
          axios.get('https://64dc9e62e64a8525a0f6d201.mockapi.io/items')
        ])

        setIsLoading(false)
        setCartItems(cartResponse.data)
        setFavoritesItems(favResponse.data)
        setItems(itemsResponse.data)
      } catch (error) {
        alert('Data request error')
        console.error(error)
      }
    }

    fetchData()
  }, [])
  
  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)))
        await axios.delete(`https://64dc9e62e64a8525a0f6d201.mockapi.io/cart/${findItem.id}`)
      } else {
        setCartItems((prev) => [...prev, obj])
        const { data } = await axios.post('https://64dc9e62e64a8525a0f6d201.mockapi.io/cart', obj)
        setCartItems((prev) => prev.map(item => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            }
          }
          return item;
        }))
      }
    } catch (error) {
      alert('Failed to add to cart')
      console.error(error)
    }
  }

  const onAddToFavorites = async (addedFavoriteItem) => {
    try {
      if (favoritesItems.find((favObj) => favObj.id === addedFavoriteItem.id)) {
        axios.delete(`https://64e5c8ee09e64530d17f0525.mockapi.io/favorites/${addedFavoriteItem.id}`)
        setFavoritesItems((prev) => prev.filter(item => item.id !== addedFavoriteItem.id))
      } else {
        const { data } = await axios.post('https://64e5c8ee09e64530d17f0525.mockapi.io/favorites', addedFavoriteItem)
        setFavoritesItems((prev) => [...prev, data]) // сохраняем в стейте, выводим результат для пользователя
      }
    } catch (error) {
      alert('Failed to add to favorites')
      console.error(error)
    }
  }

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://64dc9e62e64a8525a0f6d201.mockapi.io/cart/${id}`)
      setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id))) // отфильтруй самого себя, возьми item и проверь, что он не равен id. Метод вернет массив с объектами без удаленного itema. Другими словами дай все item-ы без id 3
    } catch (error) {
      alert('Error when deleting from cart')
      console.error(error)
    }
  }
  
  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id))
  }

  return (
    <AppContext.Provider value={{ items, cartItems, favoritesItems, isItemAdded, onAddToFavorites, onAddToCart, setCartOpened, setCartItems }}>
      <div className="wrapper">
        <ShoppingCart items={cartItems} onCloseCart={() => setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened} />
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

          <Route path="/orders"
            element={
              <Orders />
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