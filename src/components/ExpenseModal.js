import React from 'react'; 
import Modal from 'react-modal';

const ExpenseModal = (props) => (
    <Modal
        isOpen={!!props.deleteSelected}
        onRequestClose={props.handleClearSelectedExpense}
        contentLabel="Plese confirm to delete selected expense"
        closeTimeoutMS={300}
        className="modal"
    >
        <h3 className="modal__title">Please confirm to delete selected expense</h3>
        {props.deleteSelected && <p className="modal__body">{props.deleteSelected.description}</p>}
        <button className="button" onClick={props.onRemove}>Delete</button>
    </Modal>
);

export default ExpenseModal;
