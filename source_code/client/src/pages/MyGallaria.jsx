import React, { useEffect, useRef } from 'react';
import { Galleria } from 'primereact/galleria';

const MyGalleria = () => {
//   const galleriaRef = useRef(null);

//   useEffect(() => {
//     if (galleriaRef.current) {
//       galleriaRef.current.start();
//     }
//   }, []);

  return (
    <div className="card" style={{ flexDirection: 'row' }}>
      <div
        id="pr_id_25"
        className="p-galleria p-component p-ripple-disabled p-galleria-indicators-bottom"
        role="region"
        data-pc-name="galleria"
        data-pc-section="root"
        style={{ alignSelf: 'stretch', maxWidth: '100%', height: '45vh', width: '95vw' }}
      >
        <div className="p-galleria-content" aria-live="polite" data-pc-section="content">
          <div className="p-galleria-item-wrapper" data-pc-section="itemwrapper">
            <div className="p-galleria-item-container" data-pc-section="itemcontainer">
              <div
                className="p-galleria-item"
                id="pr_id_25_item_9"
                role="group"
                aria-label="10"
                aria-roledescription="Slide"
                data-pc-section="item"
              >
                <img
                  src="https://primefaces.org/cdn/primereact/images/galleria/galleria10.jpg"
                  alt="Description for Image 10"
                  style={{ height: '100%', width: '100%', display: 'block' }}
                />
              </div>
            </div>
            <ul className="p-galleria-indicators p-reset" data-pc-section="indicators">
              <li
                className="p-galleria-indicator"
                tabIndex="0"
                aria-label="Page 1"
                aria-selected="false"
                aria-controls="pr_id_25_item_0"
                data-p-highlight="false"
                data-pc-section="indicator"
              >
                <button tabIndex="-1" type="button" className="p-link"></button>
              </li>
              <li
                className="p-galleria-indicator"
                tabIndex="0"
                aria-label="Page 2"
                aria-selected="false"
                aria-controls="pr_id_25_item_1"
                data-p-highlight="false"
                data-pc-section="indicator"
              >
                <button tabIndex="-1" type="button" className="p-link"></button>
              </li>
              <li
                className="p-galleria-indicator"
                tabIndex="0"
                aria-label="Page 3"
                aria-selected="false"
                aria-controls="pr_id_25_item_2"
                data-p-highlight="false"
                data-pc-section="indicator"
              >
                <button tabIndex="-1" type="button" className="p-link"></button>
              </li>
              {/* Rest of the indicators code here */}
            </ul>
          </div>
        </div>
      </div>
      <Galleria  value={[]} showIndicators={true} showThumbnails={false} autoplayInterval={3000} />
    </div>
  );
};

export default MyGalleria;