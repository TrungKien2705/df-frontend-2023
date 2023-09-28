import '../../styles/Modal.css'
import {Controller, useForm} from 'react-hook-form';
import React, {ReactNode, useEffect, useState} from "react";
import {AiOutlineClose} from "react-icons/ai";
import Select from "react-select";
import {toast} from "react-toastify";
import {Topic, TopicSelect} from "../../types/topic";
import Button from "../Button";
import Input from "../Input";
import {getAllBooks, postCreateBook, putUpdateBook} from "../../services/bookServices";
import Loading from "../Loading";
import {Book} from "../../types/books";

interface ModalFormProps {
    show:  boolean,
    setShow: (b: boolean) => void,
    data: Topic[],
    loadingTopic: boolean,
    isAdd: boolean,
    item: Book,
    setDataBooks: any,
}
const ModalForm: React.FC<ModalFormProps> = (props) => {
    const {show, setShow, data, isAdd, loadingTopic, setDataBooks, item} = props;
    const [loadingForm, setLoadingForm] = useState(false);
    const [dataTopicSelect, setDataTopicSelect] = useState<TopicSelect[]>([]);
    const defaultValues = {
        name: "",
        author: "",
        topic_id: {}
    } as{
        name: string;
        author: string;
        topic_id: TopicSelect
    };

    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
        setValue
    } = useForm({defaultValues});
    useEffect(() => {
        const setDataForm = (item: Book) =>{
            if (!isAdd) {
                setValue('name', item.name);
                setValue('author', item.author);
                const topicOption: TopicSelect | undefined = dataTopicSelect.find(option => option.value === item.topic_id);
                // @ts-ignore
                setValue('topic_id', topicOption);
            } else {
                reset();

            }
        }
        setDataForm(item);
    }, [isAdd, item, reset, setValue, dataTopicSelect]);
    useEffect(() => {
        const setDataSelect = () =>{
            const topicList: TopicSelect[] = data.map((item: Topic) => ({
                value: item.id,
                label: item.name
            }));
            console.log("topicList", topicList)
            setDataTopicSelect(topicList);
        }
        setDataSelect();
    }, [data]);
    const onSubmit = async (data) =>{
        const dataBook = {
            name: data.name,
            author: data.author,
            topic_id: data.topic_id.value
        }
        setLoadingForm(true);
        if (isAdd){
            const response = await postCreateBook(dataBook)
            if (response){
                reset();
                setLoadingForm(false);
                toast.success("Create book success!");
                const res = await getAllBooks()
                setDataBooks(res);
                setShow(false);
            } else {
                setLoadingForm(false);
                toast.error("An error occurred while creating the book.");
            }
        } else {
            const response = await putUpdateBook(dataBook, item.id)
               if (response){
                   reset();
                   setLoadingForm(false);
                   toast.success("Update book success!");
                   const res = await getAllBooks()
                   setDataBooks(res);
                   setShow(false);
               } else {
                    setLoadingForm(false);
                    toast.error("An error occurred while updating the book.");
               }
        }

    }
    let buttonLabel: string | ReactNode;
    if (loadingForm) {
        buttonLabel = <Loading width="w-30" />;
    } else if (isAdd) {
        buttonLabel = "Add Book";
    } else {
        buttonLabel = "Save Book";
    }
    return (
        <section>
            <div className={show ? "modal modal-add-book" : "modal modal-add-book hidden"}>
                <button  aria-label="close" className="close-modal" id="close-modal-add" onClick={() => setShow(false)}>
                    <AiOutlineClose size={20}/>
                </button>
                <h2 id="title-modal"> {isAdd? "Add" : "Edit"} Book 📚</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        control={control}
                        name="name"
                        rules={{ required: "Last name is required." }}
                        render={({ field }) => (
                            <Input
                                {...field}
                                errors={errors}
                                disabled={loadingForm}
                                label="Name:"
                                name="name"
                                type="text"
                                placeholder="Enter Name Book"
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="author"
                        rules={{ required: 'Last author is required.' }}
                        render={({ field }) => (
                            <Input
                                {...field}
                                errors={errors}
                                disabled={loadingForm}
                                label="Author:"
                                name="author"
                                type="text"
                                placeholder="Enter Author Books"
                            />
                        )}
                    />
                    <div className="form-group">
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor="topic_id" className="form-label">Topic
                        <Controller
                            name="topic_id"
                            control={control}
                            // defaultValue={null}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder="Select Book"
                                    classNamePrefix="react-select"
                                    name="topic_id"
                                    id="topic_id"
                                    isDisabled={loadingForm}
                                    options={dataTopicSelect}
                                    isLoading={loadingTopic}/>
                            )}
                        />
                        </label>
                        {errors.topic_id && <small className='required'>Last topic is required.</small>}
                    </div>
                    <Button
                        disabled={loadingForm}
                        type="submit"
                        secondary={false} fullWidth
                        label={buttonLabel}
                        />
                </form>
            </div>
            <div aria-hidden="true" onClick={() => setShow(false)} className={show? "overlay overlay-add" : "overlay overlay-add hidden"} />
        </section>
    );
};

export default ModalForm;
