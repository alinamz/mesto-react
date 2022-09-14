function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
      }
    return(
        <li className="element">
        <img className="element__image" src={props.card.link}
          alt={props.card.name} onClick = {handleClick} />
        <button className="element__delete"></button>
        <div className="element__name">
            <h2 className="element__text">{props.card.name}</h2>
            <button className="element__button" type="button"></button>
            <span className="element__like-sum">{props.card.likes.length}</span>
        </div>
    </li>
    )
}
export default Card