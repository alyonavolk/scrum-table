import { useState } from 'react';import './App.scss';
import Header from '../header/header';
import Footer from '../footer/footer';
import Card from '../card/card';
import Modal from '../modal/modal';

function App() {
  const [boards, setBoards] = useState([
    {id: 10001, title: 'Текущая задача', items: [{id: 110001, title: 'Создать проект', descr: 'создание структуры'}]},
    {id: 20002, title: 'Выполняемые задачи', items: [{id: 210001, title: 'Стилизовать кнопку', descr: 'сделать её переиспользуемой'}, {id: 220002, title: 'Функции кнопки', descr: 'создать функции для кнопки'}]},
    {id: 30003, title: 'Проверка', items: [{id: 310001, title: 'Проверка кнопки', descr: 'протестировать функционал кнопки'}]},
    {id: 40004, title: 'Выполнено', items: [{id: 410001, title: 'Кнопка', descr: 'реализована кнопка'}]}
  ]);

  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  const dragOverHandler = (e) => {
    e.preventDefault();
    if (e.target.className === 'card'){
      e.target.style.boxShadow = '0px 1px 30px #f5bf8d';
    }
  }
  const dragStartHandler = (e, board, item) => {
    setCurrentBoard(board);
    setCurrentItem(item);
  }
  const dropHandler = (e, board, item) => {
    e.preventDefault();
    e.stopPropagation();
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
    //e.target.style.boxShadow = 'none';
  }

  const [cardTitle, setCardTitle] = useState('');
  const [cardDescr, setCardDescr] = useState('');

  const addNewItem = (board) => {
    const newCard = {
      id: Date.now(),
      title: cardTitle,
      descr: cardDescr
    }
    const id = boards.indexOf(board);
    setCurrentBoard([...boards, boards[id].items.push(newCard)]);
    setBoards(boards.map(x => {
      if (x.id === board.id){
        return board;
      }
      if (x.id === currentBoard.id){
        return currentBoard;
      }
      return x
    }))
    setCardDescr('');
    setCardTitle('');
    setModal(false);
  }
  const [modalBoard, setModalBoard] = useState();
  const [modal, setModal] = useState(false);
  const addModal = (board) => {
    setCurrentBoard(board);
    setModal(true);
    setModalBoard(board);
    console.log(modalBoard);
  }
  const delCard = (id, board) => {
    for (const column of boards) {
			const delItem = column.items.find(it => it.id === id);
			if (delItem) {
				column.items.splice(column.items.indexOf(delItem), 1);
			}
		}
    setBoards(boards.map(x => {
      if (x.id === board.id){
        return board;
      }
      if (x.id === currentBoard.id){
        return currentBoard;
      }
      return x;
    }))
  }

  return (
    <div className="app">
    <div className={`app__modal ${modal ? 'app__modal_active' : 'app__modal_close'}`} onClick={() => setModal(false)}>
      <Modal addNewItem={() => addNewItem(modalBoard)}  close={() => setModal(false)} content={(e) => e.stopPropagation()}
        cardTitle={cardTitle} cardDescr={cardDescr} 
        setCardTitle={e => setCardTitle(e.target.value)} setCardDescr={e => setCardDescr(e.target.value)}/>
    </div>
    <div className='app__header'>
      <Header />
    </div>
      <div className='app__board'>
        {boards.map( board => 
          <div 
          onDragOver = {(e) => dragOverHandler(e)}
          onDrop = {(e) => dropCardHandler(e, board)}
          className='board'
          key={board.id}>
            <div className='board__header'>
              <h2 className='board__title'>{board.title}</h2>
              { board.id === 10001 ? <button className='board__addButton' onClick={() => addModal(board)}>&#9998;</button> : null}
            </div>
            <div className='board__main'>
              {board.items.map(item =>
              <Card item={item} dragStartHandler={(e) => dragStartHandler(e, board, item)}
              dropHandler={(e) => dropHandler(e, board, item)} 
              delCard={(e) =>delCard(item.id, board)} key={item.id}/>
              )}
            </div>
          </div>)}
      </div>
      <div className='app__footer'>
        <Footer />
      </div>
    </div>
  );
}

export default App;
