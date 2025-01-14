import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./VideoCarousel.css";

import Slider from "react-slick";

/**
 * Information related to a single video item.
 */
interface VideoItem {
  id: number;
  src: string;
  title?: string;
}

/**
 * Defines the props for the Carousel component.
 * @property videos A list of videos to display.
 */
interface VideoCarouselProps {
  videos: VideoItem[];
}

/**
 * This is a carousel component to display videos.
 * @param videos {@link VideoCarouselProps}
 * @returns A carousel component to display videos.
 * @param videos
 */
export const VideoCarousel = ({ videos }: VideoCarouselProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Slider {...settings}>
        {videos.map((video) => (
          <div key={video.id} className="px-2">
            <div className="flex flex-col items-center">
              <video src={video.src} controls className="w-full h-auto rounded-md" />
              {video.title && <p className="mt-2 text-center text-lg">{video.title}</p>}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
