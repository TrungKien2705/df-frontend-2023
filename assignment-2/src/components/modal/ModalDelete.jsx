import React, {useState} from 'react';
import '../../styles/Modal.css';
import Button from "../Button";
import axios from "../../axios";
import {toast} from "react-toastify";
import Loading from "../Loading";
import {AiOutlineClose} from "react-icons/ai";
const ModalDelete = (props) => {
    const {show, setShow, item, setDataBooks} = props;

    const [loading, setLoading] = useState(false)
    const onClickDelete = async () =>{
        if (item){
            setLoading(true);
            const res = await axios.delete(`/api/books/${item.id}`);
            if (res){
                const res = await axios.get('api/books');
                setDataBooks(res);
                setShow(false);
                toast.success("Delete book success!");
                setLoading(false);
            } else {
                setLoading(false)
                toast.error("An error occurred while deleting the book.");
            }
        }
    }
    return (
        <section>
            <div className={ show ? "modal modal-confirm-delete" : "modal modal-confirm-delete hidden"}>
                <button aria-label="close" className="close-modal" id="close-modal-delete" onClick={() => setShow(false)}>
                    <AiOutlineClose size={20}/>
                </button>
                <h2>Delete Book 🗑️</h2>
                <p className="modal-text">
                    Do you want to delete <strong className="delete-name">{item.name}</strong> book ?
                </p>
                <div className="modal-btn">
                    {
                        loading ?
                            <Button lable={<Loading width={'w-30'}/>}  disabled={loading} type={'button'} secondary={false} fullWidth={true}/>
                        :
                        <>
                            <Button
                                disabled={loading}
                                onClick={onClickDelete}
                                type={'button'} secondary={true}
                                fullWidth={false}
                                lable={'Delete'} />
                            <Button onClick={() => {setShow(false)}} type={'button'} secondary={false} fullWidth={false} lable={'Canel'} />
                        </>
                    }

                </div>
            </div>
            <div onClick={() => setShow(false)} className={ show ? "overlay overlay-delete" : "overlay overlay-delete hidden"}></div>
        </section>
    );
};

export default ModalDelete;