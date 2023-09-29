import React, {useCallback, useEffect, useState} from 'react';
import "../styles/Table.css";
import Loading from "./Loading";
import Error from "./Error";
import Button from "./Button";
import {Book} from "../types/books";
import Pagination from "./Pagination";
import {Topic} from "../types/topic";
import Nodata from "./Nodata";

interface TableProps{
    setShow: (b: boolean) => void,
    dataTopic: Topic[],
    setIsAdd: (b: boolean) => void,
    setItem:  React.Dispatch<React.SetStateAction<Book>>,
    setShowDelete: (b: boolean) => void,
    dataBooks: Book[],
    loading: boolean,
    error: boolean,
    setDataBooks: React.Dispatch<React.SetStateAction<Book[]>>
}
const Table:React.FC<TableProps> = (props) => {
    const {  setItem,  dataBooks, dataTopic,loading, error, setDataBooks,setShow, setIsAdd ,setShowDelete } = props;
    const [pageData, setPagedData] = useState<Book[] | []>([]);
    const [topicId, setTopicId] = useState({});
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        const getTitleTopic = () =>{
            if (dataTopic){
                const topicById = {};
                dataTopic.forEach(topic => {
                    topicById[topic.id] = topic.name;
                });
                setTopicId(topicById);
            }
        }
        getTitleTopic();
    }, [dataTopic]);
    const setPageData = useCallback(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const slicedData: Book[] = dataBooks.slice(start, end);
        setPagedData(slicedData);
    }, [currentPage, dataBooks, setPagedData]);

    useEffect(() => {
        setPageData();
    }, [currentPage, dataBooks, setPageData]);



    const calculateIndex = (pageIndex: number, pageSize: number, currentPage:number) => {
        const offset = (currentPage - 1) * pageSize;
        return offset + pageIndex;
    };
    const onClickEdit = (item: Book) =>{
        setItem(item)
        setShow(true)
        setIsAdd(false)
    }
    const onClickDelete = (item: Book) =>{
        setItem(item);
        setShowDelete(true);
    }
    if (loading) return <div style={{margin : '25px auto'}}><Loading width="w-50"/></div>;
    if (error) return <Error/>;
    if (dataBooks.length === 0 && !loading && !error) return <Nodata setIsAdd={setIsAdd} setShow={setShow}/>;

    return (
        <>
            <div className="table">
                <table id="table-book" className="table-book table-bordered">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Author</th>
                        <th>Topic</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pageData.map((item: Book, index: number) => {
                        const topicTitle = topicId[item.topic_id];
                        return(
                            <tr key={item.id}>
                                <td>{calculateIndex(index + 1, itemsPerPage, currentPage)}</td>
                                <td>{item.name}</td>
                                <td>{item.author}</td>
                                <td>{topicTitle}</td>
                                <td>
                                    <Button className="btn-edit" onClick={() => onClickEdit(item)} type="button" secondary fullWidth={false} label="Edit" />
                                    <Button onClick={() => onClickDelete(item)} className="btn-delete"  type="button" secondary fullWidth={false} label="Delete" />
                                </td>
                            </tr>
                        )}
                    )}
                    </tbody>
                </table>
            </div>
            <Pagination
                data={dataBooks}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}/>
        </>
    );
};

export default Table;