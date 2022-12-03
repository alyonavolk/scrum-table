import React from 'react';
import './card.scss';

const Card = (props) => {
  
    const dragOverHandler = (e) => {
      e.preventDefault();
      if (e.target.className === 'card'){
        e.target.style.boxShadow = '0px 1px 30px #f5bf8d';
      }
    }

    return (
    <div 
        onDragOver = {(e) => dragOverHandler(e)}
        onDragStart = {props.dragStartHandler}
        onDrop = {props.dropHandler}
        draggable={true} key={props.item.id}
        className='card'>
          <div>
            <h3 className='card__title'>{props.item.title}</h3>
            <p className='card__descr'>{props.item.descr}</p>
          </div>
          <div className='card__del'><button onClick={props.delCard}>&#10008;</button></div>
        </div>
    );
};

export default Card;