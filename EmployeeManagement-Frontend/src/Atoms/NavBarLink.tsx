interface NavBarLinkProps{
    url: string;
    name:string;
    divclassName?: string
    linkclassName?: string

}

const navBarLink: React.FC<NavBarLinkProps> = (props) => {
  return (
    <>
        <div className={props.divclassName}>
        <a href={props.url} className={props.linkclassName}>{props.name}</a>
    </div>
    </>

  )
}

export default navBarLink