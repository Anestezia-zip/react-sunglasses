
export const Card = () => {
	return (
		<li className="card">
			<img width={36} height={36} src="/imgs/favorites-icon.svg" className="favorites-icon" alt="Unliked" />
			<img width={320} height={250} src="/imgs/sunglasses1.jpeg" className="card-img" alt="sunglasses card" />
			<h5>ROUND METAL</h5>
			<ul>
				<li>
					<span>Price: </span>
					<b>155 €</b>
				</li>
				<li>
					<button className="plus-btn">
						<img width={36} height={36} src="/imgs/plus-btn.svg" alt="" />
					</button>
				</li>
			</ul>
		</li>
	)
}