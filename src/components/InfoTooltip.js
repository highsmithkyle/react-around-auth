import React from 'react';
import SuccessIcon from '../images/success-icon.svg';
import ErrorIcon from '../images/error-icon.svg';

function InfoTooltip({ isOpen, onClose, status }) {
  return (
    <div className={`modal ${isOpen && 'modal__toggle'}`}>
      <div className="modal__box">
        <div className="modal__form">
          <button
            className="modal__close-button"
            type="button"
            onClick={onClose}
          ></button>
          {status === 'success' ? (
            <div>
              <img className="modal__icon" src={SuccessIcon} alt="" />
              <p className="modal__status-message">
                Success! You have been registered.
              </p>
            </div>
          ) : (
            <div>
              <img className="modal__icon" src={ErrorIcon} alt="" />
              <p className="modal__status-message">
                Oops, something went wrong! Please try again.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
