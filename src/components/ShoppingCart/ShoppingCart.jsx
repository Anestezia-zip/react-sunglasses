
import s from './ShoppingCart.module.scss'
import Info from '../Info'
import { useState, useContext } from 'react'
import AppContext from '../../context'
import axios from 'axios'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const ShoppingCart = ({ onCloseCart, onRemove, items = [], opened }) => {
	const { setCartItems, cartItems } = useContext(AppContext)
	const [isOrderComplete, setOrderComplete] = useState(false)
	const [orderId, setOrderId] = useState(null)
	const [isLoading, setIsLoading] = useState(false)

	const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)

	const onClickOrder = async () => {
		try {
			setIsLoading(true)
			const {data} = await axios.post('https://64e5c8ee09e64530d17f0525.mockapi.io/orders', {
				items: cartItems
			})
			setOrderId(data.id)
			setOrderComplete(true)
			setCartItems([])

			for (let i = 0; i < cartItems.length; i++) {
				const item = cartItems[i];
				await axios.delete('https://64dc9e62e64a8525a0f6d201.mockapi.io/cart/' + item.id)
				await delay(1000)
			}

		} catch (error) {
			alert('Order creation error')
		}
		setIsLoading(false)
	}

	return (
		<div className={`${s.overlayDrawer} ${opened ? s.overlayVisible : ''}`}>
			<div className={s.drawer}>
				<div className={s.drawerClose}>
					<h2>Shopping cart</h2>
					<img onClick={onCloseCart} className={s.closeCartBtn} src="/imgs/close-cart.svg" alt="Close cart" />
				</div>

				{ items.length > 0 
					?
						<>
							<ul className={s.cart}>
								{items.map((obj) => (
									<li key={obj.id} className={s.cartItem}>
										<div className={s.cartItemLeftSide}>
											<img width={106} height={80} src={obj.imageUrl} alt="sunglasses cart img" />
											<div className={s.cartItemDescr}>
												<p>{obj.title}</p>
												<b>{obj.price} €</b>
											</div>
										</div>
										<button className={s.removeBtn} onClick={() => onRemove(obj.id)}>
											<img width={36} height={36} src="/imgs/remove-btn.svg" alt="Remove item from cart" />
										</button>
									</li>
								))}
							</ul>
							<ul className={s.cartTotalBlock}>
								<li>
									<span>Total: </span>
									<div></div>
									<b>{ totalPrice } €</b>
								</li>
							</ul>
							<button onClick={onClickOrder} disabled={isLoading} className={s.greenBtn}>
								Place your order <img src="/imgs/tick-order.svg" alt="right-tick" />
							</button>
						</>
					:
						<Info 
							title= {isOrderComplete ? "Order placed!" : "Shopping cart is empty"}
							description={ isOrderComplete ? `Your order #${orderId} will soon be transferred to courier delivery.` : "Please add at least one pair of sunglasses to place an order."}
							image={ isOrderComplete ? "/imgs/order-complited.jpg" : "/imgs/empty-cart-box.png" }
						/>
				}

				
			</div>
		</div>
	)
}