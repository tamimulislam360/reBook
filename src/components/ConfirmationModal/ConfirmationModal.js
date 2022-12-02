import React from "react";

const ConfirmationModal = ({
  title,
  message,
  modalData,
  successButtonName,
  successAction,
  closeModal,
}) => {
  return (
    <div>
      <input type="checkbox" id="confirmationModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{message}</p>
          <div className="modal-action">
            <label
              onClick={closeModal}
              htmlFor="confirmationModal"
              className="btn btn-sm btn-secondary text-primary"
            >
              Cancel
            </label>
            <label
              onClick={() => successAction(modalData._id)}
              htmlFor="confirmationModal"
              className="btn btn-sm bg-red-600 hover:bg-red-500 border-0 text-white"
            >
              {successButtonName}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
