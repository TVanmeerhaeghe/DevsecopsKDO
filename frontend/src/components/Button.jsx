const Button = ({textcontent, onClick}) => {
    
    return(
        <div><button onClick={onClick}>{textcontent}</button></div>
    );
}
export default Button