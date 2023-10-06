import React, {useEffect, useState} from 'react';
import '../styles/Book.css';
import '../styles/Input.css';
import {AiOutlineSearch} from 'react-icons/ai'
import Button from "../components/Button";
import Table from "../components/Table";
import ModalForm from "../components/modal/ModalForm";
import useFetchData from "../hook/useFetchData";
import ModalDelete from "../components/modal/ModalDelete";
import {useForm, Controller} from "react-hook-form";
import debounce from 'lodash/debounce';
import axios from "../axios";
const Book = () => {
    const [showModalForm, setShowModalForm] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [dataBooks, setDataBooks] = useState([]);
    const [dataFilter, setDatFilter] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const {data: dataTopic, loading: loadingTopic, } = useFetchData('/api/topic');
    const [isInputFocused, setInputFocused] = useState(false);
    const [isAdd, setIsAdd] = useState(true);
    const [item, setItem] = useState({});
    const [valueSearch, setValueSearch] = useState('')
    const {
        control,
    } = useForm();

    useEffect(() => {
        const fetchData = async () =>{
            setLoading(true)
            const res = await axios.get('/api/books');
            if (res) {
                setDataBooks(res);
                setLoading(false)
            } else {
                setLoading(false);
                setError(true)
            }
        }
        fetchData();
    }, []);
    const debouncedSearch = debounce((searchTerm) => {
        const filtered = dataBooks.filter(book => book.name.toLowerCase().includes(searchTerm.trim().toLowerCase()));
        console.log(searchTerm)
        setDatFilter(filtered);
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

    const onChangeSearch = (e) =>{
        debouncedSearch(e);
        setValueSearch(e)
    }
    const onClickAddBook = () =>{
        setIsAdd(true)
        setShowModalForm(true)
    }
    return (
        <>
            <div className="m-top">
                <form action="" >
                    <div className={`form-search ${isInputFocused ? 'focused' : ''}`}>
                        <AiOutlineSearch size={30} color={'#9ea9b3'} className="icon-search"/>
                        <Controller
                            control={control}
                            name="first"
                            render={({field}) => (
                                <input {...field} onChange={e => {
                                    onChangeSearch(e.target.value);
                                    field.onChange(e);
                                }}
                               id="search"
                               name='search'
                               className="form-input-search border-none"
                               placeholder={'Search Books'}
                               type="search"
                               onFocus={handleInputFocus}
                                   onBlur={handleInputBlur}
                                />
                            )}
                        />
                    </div>
                </form>
                <Button
                    lable={'Add book'}
                    type={'button'}
                    fullWidth={false}
                    disabled={false}
                    secondary={false}
                    onClick={onClickAddBook}
                />
            </div>
            <Table
                setDataBooks={setDataBooks}
                dataBooks={dataFilter}
                loading={loading}
                error={error}
                setItem={setItem}
                setIsAdd={setIsAdd}
                dataTopis={dataTopic}
                setShow={setShowModalForm}
                setShowDelete={setShowModalDelete} />
            <ModalForm
                setDataBooks={setDataBooks}
                item={item}
                setIsAdd={setIsAdd}
                isAdd={isAdd}
                data={dataTopic}
                loadingTopic={loadingTopic}
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

export default Book;