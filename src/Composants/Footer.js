/* Contenu du footer */
const Footer = ({logo, listeMenus,smoothScroll})=>{
    let list = listeMenus !== null ?  Array.from(listeMenus) : [];
    return(
        <footer>
            <nav className="flex">
                <div className="colonneA">
                    <div>
                        <img src={logo} alt="DemoReact" />
                    </div>
                    <div>DemoReact</div>
                </div>
                <div className="coloneB">
                    <h3>Navigation</h3>
                    <ul>
                        {list.map((item,index)=>
                            <li key={'nav'+index}>
                                <a href={'#'+item.id} onClick={smoothScroll} >{item.id}</a>
                            </li>
                        )}

                    </ul>
                </div>
                <div className="coloneC">
                <h3>D'autres exemples ici</h3>
                    <ul>
                        <li><a href="https://infinity.mendoula.com/" target="_blank" rel="noreferrer">Un site immobilier</a></li>
                        <li><a href="https://mendoula.com/" target="_blank" rel="noreferrer">Un site Portfolio en cours</a></li>
                        <li><a href="https://github.com/NicolasMendoula/DemoReact.git" target="_blank" rel="noreferrer">Le code source pour cete page</a></li>
                    </ul>
                </div>
            </nav>
            <div className="mentionLegales">Nicolas Mendoula @ 2016-2021</div>
        </footer>
    );
}

export default Footer;