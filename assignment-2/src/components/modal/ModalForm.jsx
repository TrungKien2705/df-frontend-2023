import '../../styles/Modal.css'
import Select from 'react-select';
import { useForm, Controller  } from 'react-hook-form';
import { toast } from "react-toastify";
import axios from "../../axios";
import {useEffect, useState} from "react";
import Loading from "../Loading";
import Button from "../Button";
import {AiOutlineClose} from "react-icons/ai";
const ModalForm = (props) => {
    const {show, setShow, data, loadingTopic, isAdd, item, setDataBooks} = props;
    const [loadingForm, setLoadingForm] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
        setValue
    } = useForm();
    useEffect(() => {
        console.log(isAdd, item)
        if (!isAdd) {
            setValue('name', item.name);
            setValue('author', item.author);
            const topicOption = topic.find(option => option.value === item.topic_id);
            setValue('topic_id', topicOption);
        } else {
            reset();
        }
    }, [isAdd]);
    let topic = [];
    if (data){
        data.map((item) =>{
            topic.push({
                value: item.id,
                label: item.name
            })

        })
    }

    const onSubmit = async (data) =>{
        setLoadingForm(true);
        const dataBook = {
            name: data.name,
            author: data.author,
            topic_id:data.topic_id.value
        }
       if (isAdd){
           const response = await axios.post('api/books', dataBook);
           if (response){
               reset();
               setLoadingForm(false);
               toast.success("Create book success!");
               const res = await axios.get('api/books');
               setDataBooks(res);
               setShow(false);
           } else {
               setLoadingForm(false);
               toast.error("An error occurred while creating the book.");
           }
       } else {
           const response = await axios.put(`api/books/${item.id}`, dataBook);
           if (response){
               reset();
               setLoadingForm(false);
               toast.success("Update book success!");
               const res = await axios.get('api/books');
               setDataBooks(res);
               setShow(false);
           } else {
               setLoadingForm(false);
               toast.error("An error occurred while updating the book.");
           }
       }

    }
    return (
        <section>
            <div className={show ? "modal modal-add-book" : "modal modal-add-book hidden"}>
                <button  aria-label="close" className="close-modal" id="close-modal-add" onClick={() => setShow(false)}>
                    <AiOutlineClose size={20}/>
                </button>
                <h2 id="title-modal"> {isAdd? "Add" : "Edit"} Book 📚</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor={'name'} className="form-label">Name Book</label>
                        <input
                            {...register('name',{ required: true})}
                            disabled={loadingForm}
                            id={'name'}
                            name={'name'}
                            className="border-input form-input"
                            type={'text'}
                            placeholder={'Enter name'}
                        />
                        {errors.name && <p className='required'>Last name is required.</p>}

                    </div>
                    <div className="form-group">
                        <label htmlFor={'author'} className="form-label">Author</label>
                        <input
                            {...register('author', { required: true })}
                            disabled={loadingForm}
                            id={'author'}
                            name={'author'}
                            className="border-input form-input"
                            type={'text'}
                            placeholder={'Enter author'}
                        />
                        {errors.author && <p className='required'>Last author is required.</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor={'select-topic'} className="form-label">Topic</label>
                        <Controller
                            name="topic_id"
                            control={control}
                            defaultValue={null}
                            rules={{ required: true }}
                            render={({ field }) => (
                           <>
                               <Select
                                   name="topic_id"
                                   id={'select-topic'}
                                    isDisabled={loadingForm}
                                   rules={{ required: true }}
                                   {...field}
                                   options={topic}
                                   isLoading={loadingTopic}/>
                           </>
                            )}
                        />
                        {errors.topic_id && <p className='required'>Last topic is required.</p>}
                    </div>
                    <Button
                        disabled={loadingForm}
                        type={"submit"}
                        secondary={false} fullWidth={true}
                        lable={ loadingForm ? <Loading width={'w-30'}/> : isAdd ? "Add Book" : "Save Book"}
                    />
                </form>
            </div>
            <div onClick={() => setShow(false)} className={show? "overlay overlay-add" : "overlay overlay-add hidden"}></div>
        </section>
    );
};

export default ModalForm;
