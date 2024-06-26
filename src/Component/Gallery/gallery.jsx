import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import * as React from 'react';
import Image1 from '../../assets/images/g1.webp';
import Image10 from '../../assets/images/g10.webp';
import Image2 from '../../assets/images/g2.webp';
import Image3 from '../../assets/images/g3.webp';
import Image4 from '../../assets/images/g4.webp';
import Image5 from '../../assets/images/g5.webp';
import Image6 from '../../assets/images/g6.webp';
import Image7 from '../../assets/images/g7.webp';
import Image8 from '../../assets/images/g8.webp';
import Image9 from '../../assets/images/g9.webp';

// Function to generate src and srcSet for responsive images
function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}

// Sample data for ImageList items (arranged in a specific sequence)
const itemData = [
  {
    img: Image1,
    rows: 2,
    cols: 2,
  },
  {
    img: Image2,
  },
  {
    img: Image3,
  },
  {
    img: Image4,
    cols: 2,
  },
  {
    img: Image5,
    cols: 2,
  },
  {
    img: Image6,
    rows: 2,
    cols: 2,
  },
  {
    img: Image7,
  },
  {
    img: Image8,
  },
  {
    img: Image9,
  },
  {
    img: Image10,
  },
];

// QuiltedImageList component
export default function QuiltedImageList() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <ImageList sx={{ maxWidth: '1200px', width: '100%', height: 'auto' }} variant="quilted" cols={6} gap={8} rowHeight={200}>
        {itemData.map((item, index) => (
          <ImageListItem key={index} cols={item.cols || 1} rows={item.rows || 1}>
            <img
              {...srcset(item.img, 200, item.rows, item.cols)}
              alt={`Image ${index + 1}`}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
