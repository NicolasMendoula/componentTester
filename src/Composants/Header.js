/* Header générique */
import logo from "../assets/images/logo.jpg";

const Header = () =>{
    return (<header>
        <div className="container flex">
            <img src={logo} alt="logo"/>
        </div>
    </header>);
} 


export default Header;