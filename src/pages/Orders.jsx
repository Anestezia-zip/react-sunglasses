import { useState, useEffect, useContext } from 'react'
import Card from '../components/Card/Card'
import axios from 'axios'
import AppContext from '../context'

function Orders() {
	const { onAddToCart, onAddToFavorites } = useContext(AppContext)
	const [orders, setOrders] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get('https://64e5c8ee09e64530d17f0525.mockapi.io/orders')
				setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
				setIsLoading(false)
			} catch (error) {
				alert('Order request error')
			}
		})()
	}, [])

  return (
	<main className="main">
	<section className="content">
	  <div className="content-title">
		<h2>My orders</h2>
	  </div>
	  <div className="cards">
		{(isLoading ? [...Array(3)] : orders)
		  .map((item, index) => (
		  <Card
			key={index}
			loadingItems={isLoading}
			{...item}
		  />
		))}
	  </div>
	</section>
  </main>
  )
}

export default Orders