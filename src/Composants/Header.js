import Menu from './Menu';
import Meteo from './Meteo/Meteo';

/* Header générique */


const Header = ({listeMenus,smoothScroll}) =>{
    return (<header>
        <div className="flex">
            <Menu menuList={listeMenus} smoothScroll={smoothScroll} />
            <Meteo />
        </div>
    </header>);
} 


export default Header;