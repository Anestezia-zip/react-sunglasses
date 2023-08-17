
import s from './ShoppingCart.module.scss'

export const ShoppingCart = ({ onCloseCart, onRemove, items = [] }) => {
	return (
		<div className={s.overlayDrawer}>
			<div className={s.drawer}>
				<div className={s.drawerClose}>
					<h2>Shopping cart</h2>
					<img onClick={onCloseCart} className={s.closeCartBtn} src="/imgs/close-cart.svg" alt="Close cart" />
				</div>

				{
					items.length > 0 
					?
						<>
							<ul className={s.cart}>
								{items.map((obj) => (
									<li className={s.cartItem}>
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
									<b>155 €</b>
								</li>
								<li>
									<span>Tax: </span>
									<div></div>
									<b>7,75 €</b>
								</li>
							</ul>
							<button className={s.greenBtn}>Place your order <img src="/imgs/tick-order.svg" alt="right-tick" /></button>
						</>
					:
						<div className={s.emptyCart}>
							<img width={120} height={120} src="/imgs/empty-cart-box.png" alt="Empty cart" />
							<h2>Shopping cart is empty</h2>
							<p>Please add at least one pair of sunglasses to place an order.</p>
							<button className={`${s.greenBtn} ${s.emptyCartBtn}`} onClick={onCloseCart}><img src="/imgs/left-tick.png" alt="right-tick" />Go back</button>
						</div>
				}

				
			</div>
		</div>
	)
}