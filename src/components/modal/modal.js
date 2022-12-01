import React from 'react';
import './modal.scss';

const Modal = (props) => {
    return (
        <div className='modal_back'>
            <div className='modal'>
                <input placeholder='Название задачи' className='app_input' value={props.cardTitle} onChange={props.setCardTitle} />
                <input placeholder='Описание задачи' className='app_input' value={props.cardDescr} onChange={props.setCardDescr} />
                <button onClick={props.addNewItem} className='app__button'>Добавить задачу</button>
            </div>
        </div>
    );
};

export default Modal;