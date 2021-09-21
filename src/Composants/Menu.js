//Menu de navigation

const Menu = ({menuList,smoothScroll})=>{
    
    let list = menuList !== null ?  Array.from(menuList) : [];
    return(
        <ul className="generalMenu" >
            {list.map((item, index)=> 
                <li key={item.id+index}>
                    <a href={'#'+item.id}  onClick={smoothScroll}>{item.id}</a>
                </li>)
            }
        </ul>
    )
}

export default Menu;
