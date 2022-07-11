import {
  getTodoItems,
  logout,
  createTodoItem,
  selectTodoItems,
  showAlertSelector,
  alertTextSelector,
  userSelector,
} from '../../redux';

import {Typography, IconButton, Button, TextField} from '@mui/material';
import CustomALert from '../../components/Alert';
import {Add} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import SingleToDoItem from '../../components/SingleToDoItem';
import Pagination from '../../components/Pagination';
import {FaUserCircle, FaCaretDown} from 'react-icons/fa';
import React, {useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";

function HomePage() {
  const inputRef = useRef(null);

  // useSelector hook

  const todoItemsData = useSelector((store) => {
    return {
      user: userSelector(store),
      todoItems: selectTodoItems(store),
      showAlert: showAlertSelector(store),
      alertText: alertTextSelector(store),
    };
  });

  const {user, todoItems, showAlert, alertText} = todoItemsData;

  // useDispatch hook

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodoItems());
  }, [dispatch]);

  const [showLogout, setShowLogout] = useState(false);

  const addTodoHandler = (e) => {
    e.preventDefault();
    dispatch(createTodoItem({name: inputRef.current.value}));
    inputRef.current.value = '';
  };

  const addTodoHandlerForKeyBoardSubmit = (e) => {
    if (e.which === 13) {
      dispatch(createTodoItem({name: inputRef.current.value}));
      inputRef.current.value = '';
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user');
  };

  return (
    <div className='App'>
      <div className='navbar'>
        <div className="user">
        <Button
          onClick={() => setShowLogout(!showLogout)}
          variant='contained'
          color='secondary'>
          <FaUserCircle />
          {user}
          <FaCaretDown />
        </Button>
        {showLogout && (
          <Button onClick={handleLogout} variant='outlined' color='secondary'>
            Log out
          </Button>
        )}
        </div>
        <div>
          <Button  variant='contained'
          color='secondary'><Link to="/settings">Go to Settings</Link></Button>
        </div>
       
      </div>

      <header>
        <Typography variant='h2'>To do List </Typography>
      </header>
      <div className='form-control'>
        {showAlert && <CustomALert message={alertText} />}
        <TextField
          label='add todo item'
          color='secondary'
          inputRef={inputRef}
          type='text'
          onKeyUp={addTodoHandlerForKeyBoardSubmit}
        />
        <IconButton
          onClick={addTodoHandler}
          color='secondary'
          size='large'
          type='submit'>
          <Add />
        </IconButton>
      </div>
      <div className='itemContainer'>
        {todoItems?.length ? (
          todoItems.map((item) => {
            return (
              <SingleToDoItem
                key={item._id}
                item={item}
                todoItems={todoItems}
              />
            );
          })
        ) : (
          <h1>No todo items yet</h1>
        )}
      </div>
      <Pagination />
    </div>
  );
}

export default HomePage;
