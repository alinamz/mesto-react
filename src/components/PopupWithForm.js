function PopupWithForm(props) {
    return(
       <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`} >
          <div className="popup__container">
            <h3 className="popup__title">{props.title}</h3>
            <form name={props.name} className="form" noValidate onSubmit={props.onSubmit}>
            {props.children}
            </form>
            <button className="popup__close" type="button" onClick={props.onClose}></button>
          </div>
        </div>
    )
}
export default PopupWithForm;