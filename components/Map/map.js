import Image from "next/image";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { divIcon } from "leaflet";

import location from "../../public/img/location.svg";
import calender from "../../public/img/calender.svg";
import Paragraph from "../Typography/paragraph";
import { useMemo } from "react";

const Map = ({ latitude, longitude, address, date, place }) => {
  const center = useMemo(() => [latitude, longitude], []);
  const customIcon = divIcon({
    html: `
      <svg
        width="54"
        height="55"
        viewBox="0 0 54 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_817_1163)">
          <path
            d="M27.0001 54.2632C27.0001 54.2632 8.1001 29.6122 8.1001 19.1632C8.1001 16.6812 8.58896 14.2235 9.53877 11.9305C10.4886 9.63741 11.8808 7.55389 13.6358 5.79887C15.3908 4.04384 17.4743 2.65167 19.7674 1.70186C22.0604 0.752047 24.5181 0.263184 27.0001 0.263184C29.4821 0.263184 31.9398 0.752047 34.2328 1.70186C36.5259 2.65167 38.6094 4.04384 40.3644 5.79887C42.1194 7.55389 43.5116 9.63741 44.4614 11.9305C45.4112 14.2235 45.9001 16.6812 45.9001 19.1632C45.9001 29.6122 27.0001 54.2632 27.0001 54.2632ZM27.0001 24.5632C28.4323 24.5632 29.8058 23.9943 30.8185 22.9816C31.8312 21.9689 32.4001 20.5954 32.4001 19.1632C32.4001 17.731 31.8312 16.3575 30.8185 15.3448C29.8058 14.3321 28.4323 13.7632 27.0001 13.7632C25.5679 13.7632 24.1944 14.3321 23.1817 15.3448C22.169 16.3575 21.6001 17.731 21.6001 19.1632C21.6001 20.5954 22.169 21.9689 23.1817 22.9816C24.1944 23.9943 25.5679 24.5632 27.0001 24.5632Z"
            fill="#1B1130"
          />
        </g>
        <defs>
          <clipPath id="clip0_817_1163">
            <rect
              width="54"
              height="54"
              fill="white"
              transform="translate(0 0.263184)"
            />
          </clipPath>
        </defs>
      </svg>`,
    popupAnchor: [180, 236],
  });
  return (
    <MapContainer center={center} zoom={10} scrollWheelZoom={false} key={place}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center} icon={customIcon}>
        <Popup className="request-popup">
          <div className="flex flex-col justify-center">
            <div className="flex gap-2 ">
              <Image src={location} width={30} height={30} alt="location" />
              <Paragraph
                typeStyle="body-md"
                fontWeight="font-semibold"
                className="leading-relaxed  break-words text-base"
              >
                {address}
              </Paragraph>
            </div>
            <div className="flex gap-2 -mt-8 ">
              <Image src={calender} width={20} height={20} alt="location" />
              <Paragraph
                typeStyle="body-md"
                fontWeight="font-semibold"
                className="leading-relaxed  break-words text-base"
              >
                {date}
              </Paragraph>
            </div>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;