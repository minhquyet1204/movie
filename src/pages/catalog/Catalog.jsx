import React from "react";

import { useParams } from "react-router";

import PageHeader from "../../components/pageHeader/PageHeader";

import { category } from "../../api/tmdbApi";
import MovieGridCate from "../../components/movieGridCate/MovieGridCate";

const Catalog = () => {
  const { cate } = useParams();

  return (
    <>
      <PageHeader>
        {cate === category.movie ? "Movies" : "TV Series"}
      </PageHeader>
      <div className="container">
        <div className="section mb-3">
          <MovieGridCate category={cate} />
        </div>
      </div>
    </>
  );
};

export default Catalog;
