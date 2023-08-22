import { useState, useContext } from "react";
import ContentLoader from "react-content-loader";
import AppContext from "../../context";
import s from "./Card.module.scss";

function Card({
  id,
  title,
  price,
  imageUrl,
  onClickFavorite,
  onClickPlus,
  favoritedItems = false,
  loadingItems = false,
}) {
  const { isItemAdded } = useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState(favoritedItems);

  const onPlus = () => {
    onClickPlus({ id, title, price, imageUrl });
  };

  const onFavorite = () => {
    onClickFavorite({ id, title, price, imageUrl });
    setIsFavorite(!isFavorite);
  };

  return (
    <li className={s.card}>
      {loadingItems ? (
        <ContentLoader
          speed={2}
          width={310}
          height={360}
          viewBox="0 0 155 275"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="1" y="12" rx="10" ry="10" width="155" height="145" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={s.favoritesIcon} onClick={onFavorite}>
            <i
              className="fa-solid fa-heart"
              style={{ color: isFavorite ? "#cf1717" : "" }}
            ></i>
          </div>
          <img
            width={320}
            height={250}
            src={imageUrl}
            className={s.cardImg}
            alt="sunglasses card"
          />
          <h5>{title}</h5>
          <ul>
            <li>
              <span>Price: </span>
              <b>{price} €</b>
            </li>
            <li>
              <button
                style={{ border: "none", backgroundColor: "transparent" }}
                onClick={onPlus}
              >
                <img
                  width={36}
                  height={36}
                  src={
                    isItemAdded(id)
                      ? "/imgs/plus-btn-checked.svg"
                      : "/imgs/plus-btn.svg"
                  }
                  alt="Add button"
                />
              </button>
            </li>
          </ul>
        </>
      )}
    </li>
  );
}

export default Card;

// <button className={s.plusBtn}>+</button>
