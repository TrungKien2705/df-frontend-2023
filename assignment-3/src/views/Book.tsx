import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useForm, Controller } from 'react-hook-form';
import "../styles/Book.css";
import debounce from 'lodash/debounce';
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
    const [dataBooks, setDataBooks] = useState<Book[] | any>([]);
    const [dataFilter, setDataFilter] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [dataTopic, setDataTopic] = useState<Topic[] | any>([]);
    const [isInputFocused, setInputFocused] = useState(false);
    const [isAdd, setIsAdd] = useState(true);
    const [item, setItem] = useState<Book>(initialBook);
    const [valueSearch, setValueSearch] = useState('');

    const {
        control,
    } = useForm();

    useEffect(() => {
        const fetchData =  async () => {
            if (!loading) {
                return;
            }
            try {
                setLoading(true);
                const resBook = await getAllBooks();
                const resTopic = await  getAllTopic();
                if (resBook && resTopic) {
                    setDataTopic(resTopic);
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
    const debouncedSearch = debounce((searchTerm: string) => {
        const filtered: Book[] = dataBooks.filter(book => book.name.toLowerCase().includes(searchTerm.trim().toLowerCase()));
        setDataFilter(filtered);
    }, 300);

    useEffect(() => {
        debouncedSearch(valueSearch);
    }, [debouncedSearch, valueSearch]);

    const handleInputFocus = () => {
        setInputFocused(true);
    };

    const handleInputBlur = () => {
        setInputFocused(false);
    };




    const onChangeSearch = (e) => {
        debouncedSearch(e.target.value);
        setValueSearch(e.target.value);
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
                dataBooks={dataFilter}
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
