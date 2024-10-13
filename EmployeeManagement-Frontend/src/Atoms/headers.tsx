interface HeadersProps{
    divClassName? : string;
    headerClassName? : string;
    name: string;
}

const Headers: React.FC<HeadersProps> = (props) => {
  return (
 <div className={props.divClassName}>
    <h1 className={props.headerClassName}>{props.name}</h1>
 </div>
  )
}

export default Headers