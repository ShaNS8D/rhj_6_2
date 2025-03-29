import { useContext, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import PostContext from "../../Context/PostContext";
import { Button, Text, Textarea } from "../Atoms/Atoms";


const content = {
  userName: "John Doe",
  author_id: uuidv4(),
  post: '',
  title: ''
};

const Form = (props) => {
  const { type } = props;
  const params = useParams();
  const navigate = useNavigate();  
  const inputRef = useRef();
  const tooltipeRef = useRef();
  const context = useContext(PostContext);

  tooltipeRef.current = document.querySelector(".tooltipe"); 
  const initial = params.id ? context.data.find((i) => i.id === +params.id) : content;
  const [formData, setFormData] = useState(initial);

  const handleSubmit = (event) => {
    event.preventDefault(); 
    if (!inputRef.current || inputRef.current.value === "") {
      tooltipeRef.current.style["visibility"] = "visible";
      return null;
    }
    tooltipeRef.current.style["visibility"] = "hidden";

    formData.title =formData.post.split(" ")[0];
    const request = context.data?.find((i) => i.id === +params.id);
    if (request) request.title = inputRef.current.value;
    const data = params.id
      ? {...formData, id: params.id}
      : formData;
    if (params.id) {
      context.onClickEdit(data);
    } else {
      context.handleAdd(data);
    }
    
    inputRef.current.value = "";   
    navigate("/");
  };

  const handleInput = (event) => {
    event.preventDefault();    
    inputRef.current = event.target;
    const { value } = event.target;
    setFormData({ ...formData, post: value });
  };
  return (
    <div className="form-field-wrapper">
      <form onSubmit={handleSubmit} className={type + "-forms"}>
        <Textarea
          className={type + "-forms-message"}
          name={type + "-message"}
          label={"Сообщение"}
          type="text"
          onChange={handleInput}
          placeholder="Напишите что-нибудь..."
          value={formData.post}
        />
        <Text
          ref={tooltipeRef}
          className={type + "-form-tooltipe tooltipe"}
          text={"*Заполните поле!"}
        />
        <Button
          key={type}
          id={type}
          type={type + "-form-add__btn"}
          text={""}
        />
      </form>
    </div>
  );
};

export default Form;
