
//declare a props for reuse the input field
interface InputFieldProps {
    label?: string;
    type?: string;
    value?: string;
    placeholder?: string;
    name?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    disabled?: boolean;
    divClassName?: string;
    labelClassName?: string;
    inputClassName?: string;
}

const inputField: React.FC<InputFieldProps> = (props) => {
    return (
        <div className={props.divClassName}>
            <label className={props.labelClassName}>{props.label}</label>
            <input className={props.inputClassName} value={props.value} required={props.required} disabled={props.disabled} name={props.name} placeholder={props.placeholder} onChange={props.onChange} />
        </div>
    );
}

export default inputField