interface ButtonProps {
    name?: string;
    divClassName?: string;
    buttonClassName?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

const button: React.FC<ButtonProps> = (props) => {
    return (
        <div className={props.divClassName}>
            <button
                type={props.type}
                onClick={props.onClick}
                disabled={props.disabled}
                className={props.buttonClassName}
            >
                {props.name}
            </button>
        </div>
    )
}

export default button