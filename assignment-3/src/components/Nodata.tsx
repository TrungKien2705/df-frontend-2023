import React from 'react';
import Button from "./Button";
import '../styles/Nodata.css';
import ImageNoData from "../image/empty.svg";

interface NodataProps{
    setIsAdd: (b: boolean) => void,
    setShow: (b: boolean) => void
}
const Nodata: React.FC<NodataProps> = (props) => {
    const {setIsAdd, setShow} = props;
    const onClickAddBook = () =>{
        setIsAdd(true)
        setShow(true)
    }
    return (
        <div className="no-data-center" >
                <div className="no-data">
                    <img src={ImageNoData} alt="No data" />
                    <p>No data</p>
                    <Button
                        label="Add book"
                        type="button"
                        fullWidth={false}
                        disabled={false}
                        secondary={false}
                        onClick={onClickAddBook}
                    />
                </div>
            </div>
    );
};

export default Nodata;