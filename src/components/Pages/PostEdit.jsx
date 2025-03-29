import { useParams } from "react-router-dom";
import { useContext } from "react";
import { v4 as uuidv4 } from 'uuid';
import PostContext from "../../Context/PostContext";
import { ButtonClose, Image, CardText, CardTitle } from "../Atoms/Atoms";
import Form from "../Form/Form";


const PostEdit = (props) => {
  let details;
  const { data } = useContext(PostContext);
  const params = useParams();

  if (!data) {
    return;
  }

  details = data.find((elem) => elem.id === +params.id);
  return (
    <div className="post-edit">
      {details && (
        <div id={details.id} className={props.type + "-wrapper"}>
          <div className="post-edit-header">
            <CardTitle title={"Редактировать публикацию"} />
            <ButtonClose
              text={"Х"}
              type={props.type + "-header__btn-close"}
              url={`/posts/${params.id}`}
            />
          </div>
          <div key={uuidv4()} className={props.type + "__content"}>
            <Image
              key={uuidv4()}
              url={details.avatar}
              className={props.type + "-image"}
            />
            <CardText text={details.title} />
          </div>
          <Form key={uuidv4()} type={"card-edit"}/>
        </div>
      )}
    </div>
  );
};

export default PostEdit;
