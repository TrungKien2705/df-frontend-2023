<<<<<<< HEAD
// Your JS code goes here
=======

const modalAdd = document.querySelector('.modal-add-book');
const  closeModalAdd = document.querySelector('#close-modal-add');
const overlayAdd = document.querySelector('.overlay-add');

const modalDelete = document.querySelector('.modal-confirm-delete');
const overlayDelete = document.querySelector('.overlay-delete');
const  closeModalDelete = document.querySelector('#close-modal-delete');
const  btnCancel = document.querySelector('#btn-cancel');
const titleModal = document.getElementById("title-modal");
const btnSubmit = document.getElementById("submit-btn");
const deleteName = document.getElementById("delete-name");

const searchInput = document.querySelector("#search-input");
let currentAction = "";
let idItem = 0;
let baseUrl = window.location.protocol + "//" + window.location.host;
let books = [];
let topics = [];

const  onClickModalAdd = () =>{
    clearForm();
    currentAction = 'Add';
    updateTitleModal();
    toggleModalAdd();
}


function updateTitleModal() {
    if (currentAction === "Edit") {
        titleModal.textContent = 'Edit Book 📚';
        btnSubmit.textContent = 'Save';
    }else {
        titleModal.textContent = 'Add Book 📚';
        btnSubmit.textContent = 'Create';
    }
}
const toggleModalAdd  = () => {
    modalAdd.classList.toggle('hidden');
    overlayAdd.classList.toggle('hidden');
}
const toggleModalDelete  = () => {
    modalDelete.classList.toggle('hidden');
    overlayDelete.classList.toggle('hidden');
}


const onClickModalDelete = (id, name) =>{
    idItem = id;
    deleteName.textContent = name;
    toggleModalDelete();
}

closeModalDelete.addEventListener('click', toggleModalDelete);
btnCancel.addEventListener('click', toggleModalDelete);
overlayDelete.addEventListener('click', toggleModalDelete);

closeModalAdd.addEventListener('click', toggleModalAdd);
overlayAdd.addEventListener('click', toggleModalAdd);

//fetch all data

const getAllBook  = async () =>{
    const resBook = await fetch(`${baseUrl}/data/book.json`);
    books = await resBook.json();
    console.log("book",books);
    const resTopics = await fetch(`${baseUrl}/data/topic.json`);
    topics = await resTopics.json();
    await getAllTopic(topics);
    console.log("topic", topics);
    if (books && topics){
        setDataTable(books);
    }
}
getAllBook();
const getAllTopic = async (topics) =>{
    if (topics){
        const selectTopic = document.getElementById("select-topic");
        topics.forEach(topic => {
            const option = document.createElement("option");
            option.textContent = topic.title;
            option.value = topic.id;
            selectTopic.appendChild(option);
        });
    }
}

const clearForm = () =>{
    document.getElementById("name").value = "";
    document.getElementById("author").value = "";
    document.getElementById("select-topic").value = "null";
}

const onSubmitForm = () =>{
    const name = document.getElementById("name").value;
    const author = document.getElementById("author").value;
    const topicId = document.getElementById("select-topic").value;

    if (name.trim() === "" || author.trim() === "" || topicId === "null") {
        alert("Vui lòng điền đầy đủ thông tin và chọn chủ đề.");
        return;
    }
    if (currentAction === 'Add') {
        const newBook = {
            id:  Math.floor(Math.random() * (1000 - 6 + 1) + 6),
            name: name,
            author: author,
            topic_id: parseInt(topicId)
        };
        books.push(newBook);
        console.log(books);

        const tbody = document.querySelector("#table-book tbody");
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
        <td>${books.length}</td>
        <td>${newBook.name}</td>
        <td>${newBook.author}</td>
        <td>${getTopicTitle(newBook.topic_id)}</td>
        <td>
           <a id="edit-book" onclick="onClickModalEdit(${newBook.id}, '${newBook.name}', '${newBook.author}', ${newBook.topic_id})" class="edit-book">Edit</a>
           <a id="delete-book" onclick="onClickModalDelete(${newBook.id}, '${newBook.name}')" class="delete-book">Delete</a>
       </td>
    `;
        tbody.appendChild(newRow);
        toggleModalAdd();
        clearForm();
    } else  {
         books= books.map(item => {
            if (item.id === idItem){
                item.name = name;
                item.author = author;
                item.topic_id = topicId;
            }
             return item;
        }) ;
        console.log(books);
        setDataTable(books);
        toggleModalAdd();
        clearForm();
    }
}
const  onClickModalEdit = (id, name, author, topic_id) =>{
    currentAction = 'Edit';
    updateTitleModal();
    toggleModalAdd();
    console.log(id, name, author, topic_id);
    if (id && name && author && author){
        document.getElementById("name").value = name;
        document.getElementById("author").value = author;
        document.getElementById("select-topic").value = topic_id;
        idItem = id;

    }
}
const getTopicTitle = (topicId) => {
    const topic = topics.find(topic => topic.id === topicId);
    return topic ? topic.title : "";
}
const setDataTable = (data) =>{
    const tbody = document.querySelector("#table-book tbody");
    const topicById = {};
    topics.forEach(topic => {
        topicById[topic.id] = topic.title;
    });
    tbody.innerHTML = "";
    data.forEach((item, index) => {
        const topicTitle = topicById[item.topic_id];
        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.author}</td>
                <td>${topicTitle}</td>
                 <td>
                   <a id="edit-book" onclick="onClickModalEdit(${item.id}, '${item.name}', '${item.author}', ${item.topic_id})" class="edit-book">Edit</a>
                   <a id="delete-book" onclick="onClickModalDelete(${item.id}, '${item.name}')" class="delete-book">Delete</a>
               </td>
            `;
        tbody.appendChild(row);
    });
}
const onClickDelete = () =>{
    books = books.filter(item => item.id !== idItem);
    console.log(books);
    setDataTable(books);
    toggleModalDelete();
}
console.log(searchInput);
searchInput.addEventListener('change', (e) => {
    const searchValue = e.target.value.trim().toLowerCase();
    const filteredBooks = books.filter(book => {
        const bookName = book.name.toLowerCase();
        return bookName.includes(searchValue);
    });
    setDataTable(filteredBooks);
})






>>>>>>> 4f63042 (first commit assignment-1)
