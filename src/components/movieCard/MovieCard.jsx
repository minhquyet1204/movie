import React, { useState } from "react";

import "./movieCard.scss";
import NoImage from "../../assets/no-image.png";

import { Link } from "react-router-dom";

import Button from "../button/Button";

import { category, apiConfig } from "../../api/tmdbApi";

import { BsPlayFill } from "react-icons/bs";

import { HiHeart, HiOutlineHeart } from "react-icons/hi";

const MovieCard = (props) => {
  const item = props.item;

  const [liked, setLiked] = useState(false);

  const link = "/" + category[props.category] + "/" + item.id;
  let bg;
  if (item.backdrop_path === null && item.poster_path === null) {
    bg = NoImage;
  } else {
    bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);
  }

  return (
    <div>
      <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
        <Link to={link}>
          <Button>
            <BsPlayFill />
          </Button>
        </Link>

        <div className="movie-card__icons">
          {liked ? (
            <div className="card__icon-liked ">
              <HiHeart color="red" />
            </div>
          ) : (
            <div className="card__icon-outline">
              <HiOutlineHeart />
            </div>
          )}
        </div>
      </div>
      <h4 className="movie-card__title">{item.title || item.name}</h4>
    </div>
  );
};

export default MovieCard;
