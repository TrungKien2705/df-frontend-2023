import React, {useEffect, useState} from 'react';
import "../styles/Table.css";
import Nodata from "./Nodata";
import Loading from "./Loading";
import Error from "./Error";
import Button from "./Button";
import Pagination from "./Pagination";
const Table = (props) => {
    const {setShow, dataTopis, setIsAdd, setItem, setShowDelete, dataBooks, loading, error, setDataBooks} = props;
    const [dataPagi, setDataPagi] = useState([]);
    const [topicId, setTopicId] = useState({});
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        const getTitleTopic = () =>{
            if (dataTopis){
                const topicById = {};
                dataTopis.forEach(topic => {
                    topicById[topic.id] = topic.name;
                });
                setTopicId(topicById);
            }
        }
        getTitleTopic();
    }, [dataTopis]);
    useEffect(() => {
        setDataPage();
    }, [currentPage, dataBooks]);
    const setDataPage = () => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const slicedData = dataBooks.slice(start, end);
        // console.log("slicedData", slicedData);
        setDataPagi(slicedData);
    };
    const calculateIndex = (pageIndex, pageSize, currentPage) => {
        const offset = (currentPage - 1) * pageSize;
        return offset + pageIndex;
    };
    const onClickEdit = (item) =>{
        setItem(item)
        setShow(true)
        setIsAdd(false)
    }
    const onClickDelete = (item) =>{
        setItem(item);
        setShowDelete(true);
    }
    if (loading) return <div style={{margin : '25px auto'}}><Loading width={'w-50'}/></div>;
    if (error) return <Error/>;
    if (dataBooks.length === 0 && !loading && !error) return <Nodata setIsAdd={setIsAdd} setShow={setShow}/>;

    // console.log(dataBooks)
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
                    {dataPagi.map((item, index) => {
                        const topicTitle = topicId[item.topic_id];
                        return(
                            <tr key={item.id}>
                                <td>{calculateIndex(index + 1, itemsPerPage, currentPage)}</td>
                                <td>{item.name}</td>
                                <td>{item.author}</td>
                                <td>{topicTitle}</td>
                                <td>
                                    <Button className={'btn-edit'} onClick={() => onClickEdit(item)} type={'button'} secondary={true} fullWidth={false} lable={'Edit'} />
                                    <Button onClick={() => onClickDelete(item)} className={'btn-delete'}  type={'button'} secondary={true} fullWidth={false} lable={'Delete'} />
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
                setDataBooks={setDataBooks}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}/>
        </>
    );
};

export default Table;