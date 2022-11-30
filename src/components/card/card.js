import React from 'react';

const Card = (props) => {
  
    const dragOverHandler = (e) => {
      e.preventDefault();
      if (e.target.className === 'card'){
        e.target.style.boxShadow = '0 4px 3px gray';
      }
    }
    const dragLeaveHandler = (e) => {
      e.target.style.boxShadow = 'none';
    }
    const dragEndHandler = (e) => {
      e.target.style.boxShadow = 'none';
    }

    return (
    <div 
        onDragOver = {(e) => dragOverHandler(e)}
        onDragLeave = {e => dragLeaveHandler(e)}
        onDragStart = {props.dragStartHandler}
        onDragEnd = {(e) => dragEndHandler(e)}
        onDrop = {props.dropHandler}
        draggable={true} key={props.item.id}
        className='card'>
          <h3 className='card__title'>{props.item.title}</h3>
          <p className='card__descr'>{props.item.descr}</p>
        </div>
    );
};

export default Card;