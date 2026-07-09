import "./Card.css";

type CardProps = {
    title:string
}
const Card = ({title}:CardProps) => {
    return <div><h1 className="card__title">{title}</h1></div>
}
export {Card};