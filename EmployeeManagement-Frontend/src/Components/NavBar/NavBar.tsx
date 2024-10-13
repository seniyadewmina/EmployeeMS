import './NavBar.css'
import '../../index.css'
import NavBarLink from '../../Atoms/NavBarLink'


function NavBar() {
  return (
    <>
      <header className="header">
        <nav className="nav-bar">
          <a href="/" className="logo">Employee Mangement System</a>
          <div className='nav-item'>
            <NavBarLink url="/" linkclassName='employeelist' name="Employee List" />
            <NavBarLink url="/Register" linkclassName='register' name="Register" />
          </div>
        </nav>
      </header>
    </>

  )
}

export default NavBar