import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useForm, Controller } from 'react-hook-form';
import "../styles/Book.css";
import {Book, initialBook} from "../types/books";
import Button from '../components/Button';
import {getAllBooks} from "../services/bookServices";
import Input from "../components/Input";
import {getAllTopic} from "../services/topicServices";
import Table from "../components/Table";
import {Topic} from "../types/topic";
import ModalForm from "../components/modal/ModalForm";
import ModalDelete from "../components/modal/ModalDelete";

const Books = () => {
    const [showModalForm, setShowModalForm] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [dataBooks, setDataBooks] = useState<Book[] | []>([]);
    // const [dataFilter, setDataFilter] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [dataTopic, setDataTopic] = useState<Topic[] | []>([])
    const [isInputFocused, setInputFocused] = useState(false);
    const [isAdd, setIsAdd] = useState(true);
    const [item, setItem] = useState<Book>(initialBook);
    // const [valueSearch, setValueSearch] = useState('');

    const {
        control,
    } = useForm();

    useEffect(() => {
        const fetchData = async () => {
            if (!loading) {
                return;
            }
            try {
                setLoading(true);
                const resBook = await getAllBooks();
                const resTopic = await getAllTopic();
                if (resBook && resTopic) {
                    // @ts-ignore
                    setDataTopic(resTopic);
                    // @ts-ignore
                    setDataBooks(resBook);
                    setLoading(false);
                } else {
                    setError(true)
                    setLoading(false);
                }
            } catch (error) {
                setError(true)
                setLoading(false);
            }
        };

        fetchData();
    }, [loading]);

    const handleInputFocus = () => {
        setInputFocused(true);
    };

    const handleInputBlur = () => {
        setInputFocused(false);
    };

    // const debouncedSearch = debounce((searchTerm: string) => {
    //     const filtered = dataBooks.filter(book => book.name.toLowerCase().includes(searchTerm.trim().toLowerCase()));
    //     console.log(searchTerm);
    //     setDataFilter(searchTerm.length > 0 ? filtered : dataBooks);
    // }, 300);
    //
    const onChangeSearch = () => {
        // debouncedSearch(e);
        // setValueSearch(e);
        // console.log(e.target.value)
    };

    const onClickAddBook = () => {
        setIsAdd(true);
        setShowModalForm(true);
    };

    return (
        <>
            <div className="m-top">
                <form action="" >
                    <div className={`form-search ${isInputFocused ? 'focused' : ''}`}>
                        <AiOutlineSearch size={30} color="#9ea9b3" className="icon-search" />
                        <Controller
                            control={control}
                            name="search"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    name="search"
                                    type="search"
                                    placeholder="Search Books"
                                    onChange={onChangeSearch}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                />
                            )}
                        />
                    </div>
                </form>
                <Button
                    label="Add book"
                    type="button"
                    fullWidth={false}
                    disabled={false}
                    secondary={false}
                    onClick={onClickAddBook}
                />
            </div>
            <Table
                setDataBooks={setDataBooks}
                dataBooks={dataBooks.length > 0 ? dataBooks : []}
                loading={loading}
                error={error}
                setItem={setItem}
                setIsAdd={setIsAdd}
                dataTopic={dataTopic.length > 0 ? dataTopic :  []}
                setShow={setShowModalForm}
                setShowDelete={setShowModalDelete}
            />
            <ModalForm
                setDataBooks={setDataBooks}
                item={item || {}}
                isAdd={isAdd}
                data={dataTopic.length > 0 ? dataTopic : []}
                loadingTopic={loading}
                show={showModalForm}
                setShow={setShowModalForm}
                />
            <ModalDelete
                setDataBooks={setDataBooks}
                item={item}
                show={showModalDelete}
                setShow={setShowModalDelete}
            />
        </>
    );
};

export default Books;
