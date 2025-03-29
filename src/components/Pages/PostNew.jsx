import { Button,  ButtonClose} from "../Atoms/Atoms";
import Form from "../Form/Form";


const PostsNew = (props) => {
  return (
    <div className={props.type + "-wrapper"}>
      <div key="posts-new-header" className="post-new-header__btns-block">
        <Button
          key="posts-new-publish"
          text={"Публикация"}
          type={props.type + "-header__btn"}
        >
          {props.children}
        </Button>
        <Button
          key="posts-new-photo"
          text={"Фото/Видео"}
          type={props.type + "-header__btn "}
        />
        <Button
          key="posts-new-broadcast"
          text={"Прямой эфир"}
          type={props.type + "-header__btn"}
        />
        <Button
          key="posts-new-more"
          text={"Ещё..."}
          type={props.type + "-header__btn"}
        />
        <ButtonClose
          key="posts-new-close"
          text={"Х"}
          type={props.type + "-header__btn-close"}
          url={"/"}
        />
      </div>
      <div className={props.type +"__content"}>
        <Form type={props.type}/>
      </div>      
    </div>
  );
};

export default PostsNew;
