

export const ShoppingCart = () => {
	return (
		<div style={{ display: 'none' }} className="overlay-drawer">
			<div className="drawer">
				<div className="drawer-close">
					<h2>Shopping cart</h2>
					<img className="close-btn" src="/imgs/close-cart.svg" alt="" />
				</div>
				<ul className="cart">
					<li className="cart-item">
						<div className="cart-item-left">
							<img width={106} height={80} className="card-img" src="/imgs/sunglasses1.jpeg" alt="sunglasses cart img" />
							<div className="cart-item-descr">
								<p>ROUND METAL</p>
								<b>155 €</b>
							</div>
						</div>
						<button className="plus-btn remove-btn">
							<img width={36} height={36} src="/imgs/remove-btn.svg" alt="" />
						</button>
					</li>
					<li className="cart-item">
						<div className="cart-item-left">
							<img width={106} height={80} className="card-img" src="/imgs/sunglasses1.jpeg" alt="sunglasses cart img" />
							<div className="cart-item-descr">
								<p>ROUND METAL</p>
								<b>155 €</b>
							</div>
						</div>
						<button className="plus-btn remove-btn">
							<img width={36} height={36} src="/imgs/remove-btn.svg" alt="" />
						</button>
					</li>
				</ul>
				<ul className="cart-total-block">
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
				<button className="green-btn">Place your order <img src="/imgs/tick-order.svg" alt="right-tick" /></button>
			</div>
		</div>
	)
}