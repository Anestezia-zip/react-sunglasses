import { useState } from 'react'
import s from './Card.module.scss'

export const Card = ({ onClickFavorite, onClickPlus, title, price, imageUrl }) => {
	const [isAdded, setIsAdded] = useState(false)
	const [isFavorite, setIsFavorite] = useState(false)

	const onPlus = () => {
		onClickPlus({title, price, imageUrl})
		setIsAdded(!isAdded)
	}

	const onFavorite = () => {
		onClickFavorite({title, price, imageUrl})
		setIsFavorite(!isFavorite)
	}

	return (
		<li className={s.card}>
			<div className={s.favoritesIcon} onClick={ onFavorite }>
				<i className="fa-solid fa-heart" style={{ color: isFavorite ? '#cf1717' : '' }}></i>
			</div>
			<img width={320} height={250} src={ imageUrl } className={s.cardImg} alt="sunglasses card" />
			<h5>{ title }</h5>
			<ul>
				<li>
					<span>Price: </span>
					<b>{ price } €</b>
				</li>
				<li>
					{/* <button className={s.plusBtn}>+</button> */}

					<button style={{ border: 'none', backgroundColor: 'transparent' }}>
						<img 
							width={36} height={36} 
							onClick={ onPlus }
							src={isAdded ? "/imgs/plus-btn-checked.svg" : "/imgs/plus-btn.svg"} 
							alt="Add button" 
						/>
					</button>
				</li>
			</ul>
		</li>
	)
}