import React, { useState, useEffect, useRef } from "react";

import { useParams } from "react-router";

import tmdbApi from "../../api/tmdbApi";

const Video = (props) => {
  const { cate } = useParams();

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      const res = await tmdbApi.getVideos(cate, props.id);
      setVideos(res.results.slice(0, 2));
    };
    getVideos();
  }, [cate, props.id]);

  return (
    <>
      {videos.map((item, i) => (
        <VideoTrailer key={i} item={item} />
      ))}
    </>
  );
};

const VideoTrailer = (props) => {
  const item = props.item;

  const iframeRef = useRef(null);

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + "px";
    iframeRef.current.setAttribute("height", height);
  }, []);

  return (
    <div className="video">
      <div className="video__title">
        <h2>{item.name}</h2>
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${item.key}`}
        ref={iframeRef}
        width="100%"
        title="video"
      ></iframe>
    </div>
  );
};

export default Video;
