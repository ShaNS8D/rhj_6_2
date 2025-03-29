import { Button, ButtonClose, Image, CardText, CardTextWithDate } from "../Atoms/Atoms";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { v4 as uuidv4 } from 'uuid';
import PostContext from "../../Context/PostContext";


const PostsView = (props) => {
  let details;
  const { data, onClickDelete } = useContext(PostContext);  
  const navigate = useNavigate();
  const params = useParams();
  if (!data) {
    return;
  }
  details = data.find((elem) => elem.id === +params.id);
  return (
    details && (
      <div id={details.id} className={props.type + "-wrapper"}>
        <div className="post-view-header">
          <Image
            key={"image-"+ details.id}
            url={details.avatar ? details.avatar : '#'}
            className={props.type + "-image"}
          />
          <CardText key={uuidv4()} text={details.userName} />
          <CardTextWithDate key={uuidv4()} date={details.created} />
        </div>
        <ButtonClose
          key={uuidv4()}
          text={"Х"}
          type={props.type + "-header__btn-close"}
          url={"/"}
        />
        <div key={uuidv4()} className={props.type + "-view__content"}>
          <CardText key={uuidv4()} text={details.title} />
          <CardText key={uuidv4()} text={details.post} />
          <div className={props.type + "-btns__block"}>
            <Link
              key={uuidv4()}
              to={`/posts/${params.id}/edit`}
              className={props.type + "-link"}
            >
              <Button
                key={uuidv4()}
                text={"Редактировать"}
                type={props.type + "__btn-edit "}
              />
            </Link>
            <Button
              key={uuidv4()}
              text={"Удалить"}
              type={props.type + "__btn-remove"}
              clickHandler={() => {
                onClickDelete(params.id);
                navigate("/");
              }}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default PostsView;
