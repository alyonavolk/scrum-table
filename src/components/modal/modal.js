import React from 'react';
import './modal.scss';

const Modal = (props) => {
    return (
        <div className='modal_back' onClick={props.content}>
            <div className='modal'>
                <p>Добавление задачи</p>
                <input placeholder='Название задачи' className='modal__input' value={props.cardTitle} onChange={props.setCardTitle} />
                <textarea rows="10" cols="45" placeholder='Описание задачи' className='modal__input' value={props.cardDescr} onChange={props.setCardDescr} />
                <button onClick={props.addNewItem} className='modal__button'>Добавить задачу</button>
            </div>
            <div><button className='modal__button_close' onClick={props.close}>&#10008;</button></div>
        </div> 
    );
};

export default Modal;