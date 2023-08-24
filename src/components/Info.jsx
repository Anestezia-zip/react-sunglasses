import { useContext } from 'react'
import s from './ShoppingCart/ShoppingCart.module.scss'
import AppContext from '../context'

function Info({ title, image, description }) {
	const { setCartOpened } = useContext(AppContext)

  return (
	<div className={s.emptyCart}>
		<img width={120} src={ image } alt="Empty cart" />
		<h2>{ title }</h2>
		<p>{ description }</p>
		<button className={`${s.greenBtn} ${s.emptyCartBtn}`} onClick={() => setCartOpened(false)}>
			<img src="/imgs/left-tick.png" alt="right-tick"/>Go back
		</button>
	</div>
  )
}

export default Info