import './App.scss';
import Header from '../header/header';
import Footer from '../footer/footer';
import { useState } from 'react';

function App() {

  const [boards, setBoards] = useState([
    {id: 1, title: 'Текущая задача', items: [{id: 1, title: 'Создать проект', descr: 'создание структуры'}, {id: 2, title: 'Создать проект', descr: 'создание структуры'}]},
    {id: 2, title: 'Выполняемые задачи', items: [{id: 1, title: 'Стилизовать кнопку', descr: 'сделать её переиспользуемой'}, {id: 2, title: 'Функции кнопки', descr: 'создать функции для кнопки'}]},
    {id: 3, title: 'Проверка', items: [{id: 1, title: 'Проверка кнопки', descr: 'протестировать функционал кнопки'}, {id: 2, title: 'Проверка кнопки', descr: 'протестировать функционал кнопки'}]},
    {id: 4, title: 'Выполнено', items: [{id: 1, title: 'Кнопка', descr: 'реализована кнопка'}, {id: 2, title: 'Кнопка', descr: 'реализована кнопка'}]}
  ]);

  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  const dragOverHandler = (e) => {
    e.preventDefault();
    if (e.target.className === 'card'){
      e.target.style.boxShadow = '0 4px 3px gray';
    }
  }
  const dargLeaveHandler = (e) => {
    e.target.style.boxShadow = 'none';
  }
  const dargStartHandler = (e, board, item) => {
    setCurrentBoard(board);
    setCurrentItem(item);
  }
  const dragEndHandler = (e) => {
    e.target.style.boxShadow = 'none';
  }
  const dropHandler = (e, board, item) => {
    e.preventDefault();
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    const dropIndex = board.items.indexOf(item);
    board.items.splice(dropIndex + 1, 0, currentItem);
    setBoards(boards.map(x => {
      if (x.id === board.id){
        return board;
      }
      if (x.id === currentBoard.id){
        return currentBoard;
      }
      return x
    }))
    e.target.style.boxShadow = 'none';
  }
  const dropCardHandler = (e, board) => {
    board.items.push(currentItem);
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    setBoards(boards.map(x => {
      if (x.id === board.id){
        return board;
      }
      if (x.id === currentBoard.id){
        return currentBoard;
      }
      return x
    }))
    e.target.style.boxShadow = 'none';
  }

  return (
    <div className="app">
      <Header />
      <div className='app__board'>
        {boards.map( board => 
          <div 
          onDragOver = {(e) => dragOverHandler(e)}
          onDrop = {(e) => dropCardHandler(e, board)}
          className='board'>
            <h2 className='board__title'>{board.title}</h2>
            {board.items.map(item =>
              <div 
              onDragOver = {(e) => dragOverHandler(e)}
              onDragLeave = {e => dargLeaveHandler(e)}
              onDragStart = {(e) => dargStartHandler(e, board, item)}
              onDragEnd = {(e) => dragEndHandler(e)}
              onDrop = {(e) => dropHandler(e, board, item)}
              draggable={true}
              className='card'>
                <h3 className='card__title'>{item.title}</h3>
                <p className='card__descr'>{item.descr}</p>
              </div>
              )}
          </div>)}
      </div>
      <Footer />
    </div>
  );
}

export default App;
