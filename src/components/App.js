import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import closeButton from '../images/close-button.svg';
import api from '../utils/api';
import Login from './Login';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { getInfo, signIn, signUp } from '../utils/auth';
import ProtectedRoute from './ProtectedRoute';

import auth from '../utils/auth';

function App() {
  // const navigare = useNavigate();

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);

  const [currentUser, setCurrentUser] = useState({});

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [status, setStatus] = React.useState(true);

  const [email, setEmail] = React.useState('');

  // const handleLogin = () => {
  //   setLoggedIn(true);
  // };

  // const handleLogout = () => {
  //   setLoggedIn(false);
  //   localStorage.removeItem('jwt');
  //   Navigate('/signin');
  // };

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((error) => console.error(error));
    // handleTokenCheck();
  }, []);

  React.useEffect(() => {
    api
      .getInitialProfile()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((error) => console.error(error));
  }, []);

  // React.useEffect(() => {
  //   const token = localStorage.getItem('jwt');
  //   if (token) {
  //     auth
  //       .checkToken(token)
  //       .then((res) => {
  //         if (res) {
  //           setEmail(res.data.email);
  //           setLoggedIn(true);
  //           Navigate.push('/');
  //         } else {
  //           localStorage.removeItem('jwt');
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, []);

  // function handleTokenCheck() {
  //   if (localStorage.getItem('jwt')) {
  //     const jwt = localStorage.getItem('jwt');
  //     getInfo(jwt)
  //       .then((res) => {
  //         if (res) {
  //           handleLogin();
  //           Navigate('/');
  //         } else {
  //           localStorage.removeItem('jwt');
  //         }
  //       })
  //       .catch((err) => {
  //         if (err === 400) {
  //           console.log('Token not provided or provided in the wrong format');
  //         } else if (err === 401) {
  //           console.log('The provided token is invalid ');
  //         }
  //       });
  //   }
  // }

  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    api
      .likeCard(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((item) => (item._id === card._id ? newCard : item)),
        );
      })
      .catch((error) => console.error(error));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((item) => item !== card));
      })
      .catch((error) => console.error(error));
  }

  function handleUpdateUser(userData) {
    api
      .changeProfileInfo(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => console.error(error));
  }

  function handleUpdateAvatar(userData) {
    api
      .changeProfileAvatar(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => console.error(error));
  }

  function handleAddPlaceSubmit(card) {
    api
      .createCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.error(error));
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />

        <Routes>
          <ProtectedRoute exact path="/">
            <Main
              onEditAvatarClick={handleEditAvatarClick}
              onEditProfileClick={handleEditProfileClick}
              onAddPlaceClick={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          </ProtectedRoute>
        </Routes>
        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          closeButton={closeButton}
          onClose={closeAllPopups}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          closeButton={closeButton}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          closeButton={closeButton}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />
        <PopupWithForm
          modalType={'delete'}
          modalTitle={'Are you sure?'}
          modalButtonText={'Yes'}
          closeButton={closeButton}
        />
        <ImagePopup
          closeButton={closeButton}
          selectedCard={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
