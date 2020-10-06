import React from 'react';
import { addDecorator } from '@storybook/react';
import { Card } from './Card';
import centered from '@storybook/addon-centered/react';

addDecorator(centered);

export default {
  title: 'Card',
  component: Card
};

export const basic = () => (
  <div style={{maxWidth: "400px", padding: '30px'}}>
    <Card
      link = 'https://www.google.com'
      srcImage = 'https://images.squarespace-cdn.com/content/5c2aec4b1137a6d8849debf1/1589482673361-JFOXBM38XYSJQ9MUBEDW/image-asset.jpeg?format=1000w&content-type=image%2Fjpeg'
      title = "Study confirms cats can become infected with and may transmit COVID-19 to other cat"
      description = 'In a study published today (May 13, 2020) in the New England Journal of Medicine, scientists in the U.S. and Japan report that in the laboratory, cats can readily become infected with SARS-CoV-2, the virus that causes COVID-19, and may be able to pass the virus to other cats.'/>
  </div>
);
