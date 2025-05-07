import { useEffect, useState } from "react";
import "./styles.css";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

export default function ImageSlider({ url, limit = 5, page = 1 }) {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchImages(getUrl) {
    try {
      setLoading(true);
      const repsonse = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
      const data = await repsonse.json();
      if (data) {
        setImages(data);
        setLoading(false);
      }
    } catch (e) {
      setErrorMessage(e.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (url !== "") fetchImages(url);
  }, [url]);

  console.log(images);

  if (loading) {
    return <div>Loading data! Please wait</div>;
  }
  if (errorMessage !== null) {
    return <div>Error occured! {errorMessage}</div>;
  }
  return (
    <div className="container">
      <BsArrowRightCircleFill className="arrow arrow-right" />
      {images && images.length
        ? images.map((imageItem) => (
            <img
              key={imageItem.id}
              alt={imageItem.author}
              src={imageItem.download_url}
              className="current-image"
            />
          ))
        : null}
      <BsArrowLeftCircleFill className="arrow arrow-left" />
      <span className="circle-indicators">
        {images && images.length
          ? images.map((_, index) => (
              <button key={index} className="current-indicator"></button>
            ))
          : null}
      </span>
    </div>
  );
}
