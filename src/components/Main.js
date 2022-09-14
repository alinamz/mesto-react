import React from "react";
import api from "../utils/api.js";
import Card from "./Card.js";

function Main(props) {
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getUserData()
        .then(userInfo=>{
            setUserName (userInfo.name);
            setUserDescription (userInfo.about);
            setUserAvatar (userInfo.avatar);
          })
          .catch(err => {
            console.log(err);
          });
    },[])

    React.useEffect(() => {
        api.getInitalCards()
        .then(Cards => {
            setCards(Cards)
        })
        .catch(err => {
            console.log(err);
          });
    },[])
    return (
        <main>
            <section className="profile">
                <div className="profile__icon" style={{ backgroundImage: `url(${userAvatar})` }} />
                <button className="profile__update-avatar" onClick={props.onEditAvatar}></button>
                <div className="profile__info">
                    <div className="profile__redaction">
                        <h1 className="profile__title">{userName}</h1>
                        <button className="profile__button" type="button" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__pharagraph">{userDescription}</p>
                </div>
                <button className="profile__add" type="button" onClick={props.onAddPlace}></button>
            </section>

            <section className="elements">
                <ul className="elements__images">
                        {cards.map(card => {
                            return (
                                <Card key={card._id} card={card} onCardClick={props.onCardClick} />
                            )
                        })}
                </ul>
            </section>
        </main>
    );
}

export default Main