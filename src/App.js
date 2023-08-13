import { Card } from './components/Card';
import { Header } from './components/Header';
import { ShoppingCart } from './components/ShoppingCart';


const cardsArray = [
	{
    name: 'ROUND METAL',
    src: '/imgs/sunglasses1.jpeg',
    price: '155 €'
	}
]

function App() {
  return (
    <div className="wrapper">

      <ShoppingCart />

      <Header />

      <main className="main">
        <section className="content">
          <div className="content-title">
            <h2>All sunglasses</h2>
            <div className="content-title-searchblock">
              <img src="/imgs/search.svg" alt="search icon" />
              <input type="text" placeholder="Search..."/>
            </div>
          </div>
          <ul className="cards">
            <Card />
            {/* {products.map(p => <Product product={p} key={p.id}/>)} */}

            <li className="card">
              <img width={36} height={36} src="/imgs/favorites-icon.svg" className="favorites-icon" alt="Unliked"/>
              <img width={320} height={250} src="/imgs/sunglasses3.jpeg" className="card-img" alt="sunglasses card" />
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
            <li className="card">
              <img width={36} height={36} src="/imgs/favorites-icon.svg" alt="Unliked" className="favorites-icon" />
              <img width={320} height={250} src="/imgs/sunglasses11.jpeg" className="card-img" alt="sunglasses card" />
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
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
