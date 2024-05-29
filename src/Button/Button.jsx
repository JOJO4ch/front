import classes from './Button.module.css'

export default function Button({children, onClick,isActive}){

    function HandleClick() {
        console.log('Button clicked')

    }

    
    return <button 
    className={isActive ? `${classes.button}` : classes.button} 
    onClick={HandleClick} 
       
        >
        {children}
        </button>
}
