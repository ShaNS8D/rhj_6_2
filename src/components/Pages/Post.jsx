import { v4 as uuidv4 } from 'uuid';
import { CardTitle, Image, CardText, CardTextWithDate } from "../Atoms/Atoms";

export default function Post(props) {
 

  return (
    <>
      <div className="post-header">
        <Image key={uuidv4()} url={props.avatar} className={"post-image"} />
        <CardText key={uuidv4()} text={props.author} type={"post"}/>
        <CardTextWithDate key={uuidv4()} date={props.created} type={"post"}/>
      </div>
      <div className="post-content">
        <CardTitle
          key={uuidv4()}
          title={props.title}
          className={props.className}
        />
      </div>
    </>
  );
}
