import React from 'react';
import successIcon from '../images/success-icon.svg';
import errorIcon from '../images/error-icon.svg';

function InfoTooltip(props) {
  return (
    <div
      className={`modal modal_type_infotooltip ${props.isOpen && 'modal_open'}`}
    >
      <div className={`modal__box modal__box_type_infotooltip`}>
        {props.status === 'success' ? (
          <div className="infotooltip">
            <img
              src={successIcon}
              alt="Success icon"
              className="infotooltip__icon"
            ></img>
            <p className="infotooltip__text">
              Success! You have now been registered.
            </p>
          </div>
        ) : (
          <div className="infotooltip">
            <img
              src={errorIcon}
              alt="Failed icon"
              className="infotooltip__icon"
            ></img>
            <p className="infotooltip__text">
              Oops, something went wrong! Please try again.
            </p>
          </div>
        )}
        <button
          className={`modal__close-button modal__close-button_type_edit button`}
          type="button"
          style={{ backgroundImage: `url(${props.closeButton})` }}
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}

export default InfoTooltip;

//working

// import React from 'react';
// import SuccessIcon from '../images/success-icon.svg';
// import ErrorIcon from '../images/error-icon.svg';

// function InfoTooltip({ isOpen, onClose, status }) {
//   return (
//     <div className={`modal ${isOpen && 'modal__toggle'}`}>
//       <div className="modal__box">
//         <div className="modal__form">
//           <button
//             className="modal__close-button"
//             type="button"
//             onClick={onClose}
//           ></button>
//           {status === 'success' ? (
//             <div>
//               <img className="modal__icon" src={SuccessIcon} alt="" />
//               <p className="modal__status-message">
//                 Success! You have been registered.
//               </p>
//             </div>
//           ) : (
//             <div>
//               <img className="modal__icon" src={ErrorIcon} alt="" />
//               <p className="modal__status-message">
//                 Oops, something went wrong! Please try again.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default InfoTooltip;
