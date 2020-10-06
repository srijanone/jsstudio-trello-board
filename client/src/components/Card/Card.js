import React from 'react';
import './Card.scss';


export const Card = ({
  link = '',
  srcImage = '',
  title = '',
  description = '',
}) => {

  return (
    <div className={`card`}>
      {
        srcImage &&
        <div>
            <a href={link} onClick={() => console.log('card clicked')} target="_blank" rel="noopener noreferrer">
            <div>
              <img src={srcImage} alt="" width="100%" height="100%"/>
            </div>
            </a>
        </div>
      }
      <div>
        <a href={link} onClick={() => console.log('card clicked')} target="_blank" rel="noopener noreferrer">
        <h2>{title}</h2>
        </a>
        {
          description && <p className="card-text">
            {description}
          </p>
        }
      </div>
    </div>
  );
}