import { useState } from 'react';import './App.scss';
import Header from '../header/header';
import Footer from '../footer/footer';
import Card from '../card/card';

function App() {
  const [boards, setBoards] = useState([
    {id: 10001, title: 'Текущая задача', items: [{id: 110001, title: 'Создать проект', descr: 'создание структуры'}, {id: 120002, title: 'Создать проект', descr: 'создание структуры'}]},
    {id: 20002, title: 'Выполняемые задачи', items: [{id: 210001, title: 'Стилизовать кнопку', descr: 'сделать её переиспользуемой'}, {id: 220002, title: 'Функции кнопки', descr: 'создать функции для кнопки'}]},
    {id: 30003, title: 'Проверка', items: [{id: 310001, title: 'Проверка кнопки', descr: 'протестировать функционал кнопки'}, {id: 320002, title: 'Проверка кнопки', descr: 'протестировать функционал кнопки'}]},
    {id: 40004, title: 'Выполнено', items: [{id: 410001, title: 'Кнопка', descr: 'реализована кнопка'}, {id: 420002, title: 'Кнопка', descr: 'реализована кнопка'}]}
  ]);

  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  const dragOverHandler = (e) => {
    e.preventDefault();
    if (e.target.className === 'card'){
      e.target.style.boxShadow = '0 4px 3px gray';
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
    e.target.style.boxShadow = 'none';
  }

  const [cardTitle, setCardTitle] = useState('');
  const [cardDescr, setCardDescr] = useState('');
  // const addNewCard = (e, board) => {
  //   e.preventDefault();
  //   const newCard = {
  //     id: Date.now(),
  //     cardTitle,
  //     cardDescr
  //   }
  //   board.items.push(newCard);
    // setBoards(boards.map(x => {
    //   if (x.id === board.id){
    //     return board;
    //   }
    //   if (x.id === currentBoard.id){
    //     return currentBoard;
    //   }
    //   return x
    // }))
  //   //setBoards([...setBoards['items'], newCard]);
  //   setCardDescr('');
  //   setCardTitle('');
  // }
  const addNewItem = (board) => {
    const newCard = {
      id: Date.now(),
      title: cardTitle,
      descr: cardDescr
    }
    console.log(newCard);
    const id = boards.indexOf(board);
    //setBoards([...boards[id].items, newCard]);
    //boards[id].items.push(newCard);
    setCurrentBoard([...boards, boards[id].items.push(newCard)]);
    console.log(boards[id].items);
    setBoards(boards.map(x => {
      if (x.id === board.id){
        return board;
      }
      if (x.id === currentBoard.id){
        return currentBoard;
      }
      return x
    }))
  }
  const delCard = (id, board) => {
    for (const column of boards) {
			const delItem = column.items.find(it => it.id === id);
			if (delItem) {
        console.log(column.items.indexOf(delItem));
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
      return x
    }))
    console.log(boards);
  }
  // const delCard = (board, item) => {
  //   const currentId = item.id;
  //   console.log(currentId);
  //   board.items.forEach(br => {
  //     if (br.id === currentId){
  //       currentBoard.items.splice(br, 1)
  //     }
  //   })
  //   //currentBoard.items.splice(currentId, 1);
  //   setBoards(boards.map(x => {
  //     if (x.id === board.id){
  //       return board;
  //     }
  //     if (x.id === currentBoard.id){
  //       return currentBoard;
  //     }
  //     return x
  //   }))
  //   console.log(boards);
  // }

  return (
    <div className="app">
      <Header />
      <div className='app__board'>
        {boards.map( board => 
          <div 
          onDragOver = {(e) => dragOverHandler(e)}
          onDrop = {(e) => dropCardHandler(e, board)}
          className='board'
          key={board.id}>
            <h2 className='board__title'>{board.title}</h2>
            <div className='app__modal'>
              <input placeholder='Название задачи' className='app_input' value={cardTitle} onChange={e => setCardTitle(e.target.value)} />
              <input placeholder='Описание задачи' className='app_input' value={cardDescr} onChange={e => setCardDescr(e.target.value)} />
              <button onClick={() => addNewItem(board)} className='app__button'>Добавить задачу</button>
            </div>
            {board.items.map(item =>
            <Card item={item} dragStartHandler={(e) => dragStartHandler(e, board, item)}
            dropHandler={(e) => dropHandler(e, board, item)} 
            delCard={(e) =>delCard(item.id, board)} key={item.id}/>
            )}
          </div>)}
      </div>
      <Footer />
    </div>
  );
}

export default App;
