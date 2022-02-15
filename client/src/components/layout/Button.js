import classes from './SaveButton.module.css';

const Button = (props) => {
    return (
        <button className={`${classes.button} ${props.styles}`} onClick={props.onClickHandler}>{props.btnText}</button>
    )
}

export default Button;