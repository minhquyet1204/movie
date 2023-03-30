import React, { useState, useEffect } from "react";

import { useParams } from "react-router";
import noUser from "../../assets/no-image-user.jpg";

import tmdbApi, { apiConfig } from "../../api/tmdbApi";

const Cast = (props) => {
  const { cate } = useParams();

  const [casts, setCasts] = useState([]);

  useEffect(() => {
    const getCredits = async () => {
      const res = await tmdbApi.credits(cate, props.id);
      setCasts(res.cast.slice(0, 6));
    };
    getCredits();
  }, [cate, props.id]);

  return (
    <div className="casts">
      {casts.map((item, i) => (
        <div key={i} className="casts__item">
          <div
            className="casts__item__img"
            style={{
              backgroundImage: `url(${
                item?.profile_path === null
                  ? noUser
                  : apiConfig.w500Image(item.profile_path)
              })`,
            }}
          ></div>
          <p className="casts__item__name">{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Cast;
