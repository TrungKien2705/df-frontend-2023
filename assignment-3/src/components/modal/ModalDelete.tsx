import React, {useState} from 'react';
import '../../styles/Modal.css';
import {AiOutlineClose} from "react-icons/ai";
import Button from "../Button";
import Loading from "../Loading";
import {Book} from "../../types/books";
import {deleteBook, getAllBooks} from "../../services/bookServices";

interface ModalDeleteProps{
    show: boolean,
    setShow: (b: boolean) => void,
    item: Book,
    setDataBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}
const ModalDelete: React.FC<ModalDeleteProps> = (props) => {
    const {show, setShow, item, setDataBooks} = props;

    const [loading, setLoading] = useState(false)
    const onClickDelete = async () =>{
        if (item){
            setLoading(true);
            const res = await deleteBook(item.id)
            if (res){
                const res = await getAllBooks();
                setDataBooks(res);
                setShow(false);
                setLoading(false);
            } else {
                setLoading(false)
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
                    Do you want to delete <strong className="delete-name">{item?.name}</strong> book ?
                </p>
                <div className="modal-btn">
                    {
                        loading ?
                            <Button label={<Loading width="w-30"/>}  disabled={loading} type="button" secondary={false} fullWidth/>
                            :
                            <>
                                <Button
                                    disabled={loading}
                                    onClick={onClickDelete}
                                    type="button" secondary
                                    fullWidth={false}
                                    label="Delete"  />
                                <Button onClick={() => {setShow(false)}} type="button" secondary={false} fullWidth={false} label="Canel" />
                            </>
                    }

                </div>
            </div>
            <div aria-hidden="true" onClick={() => setShow(false)} className={ show ? "overlay overlay-delete" : "overlay overlay-delete hidden"} />
        </section>
    );
};

export default ModalDelete;