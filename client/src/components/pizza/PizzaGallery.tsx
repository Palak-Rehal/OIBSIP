import { useState } from "react";

const IMAGE_URL = "http://localhost:5000";

interface Props {
  image: string;
  name: string;
}

const PizzaGallery = ({ image, name }: Props) => {
  const fullImage = `${IMAGE_URL}${image}`;

  const [selected, setSelected] = useState(fullImage);

  // Temporary thumbnails
  const images = [
    fullImage,
    fullImage,
    fullImage,
    fullImage,
  ];

  return (
    <div className="space-y-5">

      {/* Main Image */}
      <div
        className="
          bg-white
          rounded-[32px]
          border border-[#E7DED3]
          overflow-hidden
          shadow-lg
          group
        "
      >
        <img
          src={selected}
          alt={name}
          className="
            w-full
            h-[520px]
            object-contain
            transition-transform
            duration-500
            group-hover:scale-110
          "
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-4">

        {images.map((img, index) => (

          <button
            key={index}
            onClick={() => setSelected(img)}
            className={`
              rounded-2xl
              overflow-hidden
              border-2
              transition
              ${
                selected === img
                  ? "border-[#BD6A3C]"
                  : "border-[#E7DED3]"
              }
              hover:border-[#BD6A3C]
            `}
          >
            <img
              src={img}
              alt={`${name}-${index}`}
              className="w-full h-24 object-cover"
            />
          </button>

        ))}

      </div>

    </div>
  );
};

export default PizzaGallery;