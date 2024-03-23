import React from 'react';

const DeleteVerificationModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
        <div className="bg-white p-8 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Delete Verification</h2>
          <p className="mb-4">Are you sure you want to delete this item?</p>
          <div className="flex justify-end">
            <button
              className="px-4 py-2 mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded"
              onClick={onConfirm}
            >
              Confirm Delete
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default DeleteVerificationModal;
