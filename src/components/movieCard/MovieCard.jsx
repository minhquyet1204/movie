import React, { useEffect, useState } from "react";

import "./movieCard.scss";
import NoImage from "../../assets/no-image.png";

import { Link, useLocation } from "react-router-dom";

import Button from "../button/Button";

import { category, apiConfig } from "../../api/tmdbApi";

import { BsPlayFill } from "react-icons/bs";
import { RiCloseLine } from "react-icons/ri";

import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { UserContext } from "../../context/UserAuth";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Modal, { ModalContent } from "../modal/Modal";

const MovieCard = (props) => {
  const { item, filterMovie } = props;
  const { user, movies } = UserContext();
  const { pathname } = useLocation();

  const [liked, setLiked] = useState(false);

  const link = "/" + category[props.category || item.category] + "/" + item.id;
  let bg;
  if (
    (item.backdrop_path === null && item.poster_path === null && !item.image) ||
    item.image === null
  ) {
    bg = NoImage;
  } else {
    bg = apiConfig.w500Image(
      item.poster_path || item.backdrop_path || item.image
    );
  }
  const movieDb = doc(db, "user", `${user?.email}`);

  const toggleLike = async () => {
    if (!user) {
      setModalActive();
    } else {
      setLiked(true);

      await updateDoc(movieDb, {
        favoriteMovie: arrayUnion({
          id: item.id,
          name: item.name || item.title,
          image: item.poster_path || item.backdrop_path,
          category: props.category,
        }),
      });
    }
  };

  const setModalActive = () => {
    const modal = document.querySelector(".modal");
    modal.querySelector(".modal__content > iframe").setAttribute("height", 0);
    modal.querySelector(".modal__content > iframe").setAttribute("width", 0);

    modal.querySelector(".modal__content >  span").innerText =
      "You need to login first to add your favorite movie ";

    modal.classList.toggle("active");
  };
  const deleteFavorMovie = async (id) => {
    setLiked(false);
    const result = movies.filter((movie) => movie.id !== id);
    await updateDoc(movieDb, { favoriteMovie: result });
  };

  useEffect(() => {
    if (user) {
      movies?.forEach((movie) => {
        if (movie.id === item.id) {
          setLiked(true);
        }
      });
    } else {
      setLiked(false);
    }
  }, [item.id, user, movies]);

  return (
    <div>
      <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
        <Link to={link}>
          <Button>
            <BsPlayFill />
          </Button>
        </Link>

        {pathname === "/favorite" ? (
          <div
            className="movie-card__icon-right"
            onClick={() => {
              filterMovie(item.id);
            }}
          >
            <RiCloseLine />
          </div>
        ) : (
          <div className="movie-card__icon">
            {liked ? (
              <div
                className="movie-card__icon-liked "
                onClick={() => deleteFavorMovie(item.id)}
              >
                <HiHeart color="red" />
              </div>
            ) : (
              <div className="movie-card__icon-outline" onClick={toggleLike}>
                <HiOutlineHeart />
              </div>
            )}
          </div>
        )}
      </div>
      <h4 className="movie-card__title">{item.title || item.name}</h4>
    </div>
  );
};
export const NotyModal = () => {
  return (
    <Modal active={false}>
      <ModalContent>
        <span></span>
      </ModalContent>
    </Modal>
  );
};

export default MovieCard;
