import './Sidebar.css'
import { Link, useLocation } from 'react-router-dom';


function Sidebar ({restaurants, menus, categories}) {

    const {pathname} = useLocation();

    // console.log(pathname);

    return (
        <>
            <aside className="sidebar">
                <ul>
                    <Link to="/restaurants"><li className={`sidebar__item ${pathname.startsWith('/restaurants') ? 'active' : ''}`}>Restaurants</li></Link>
                    <div className={`sidebar__submenu ${!pathname.startsWith('/restaurants') ? 'close' : ''}`}>
                        {restaurants && restaurants.map((restaurant) => (
                            <Link to={`/restaurants/${restaurant.id}`} key={restaurant.id}>
                                <li className={`sidebar__item sidebar__subitem ${pathname === `/restaurants/${restaurant.id}` ? 'active' : ''}`}>{restaurant.name}</li>
                            </Link>
                        ))}
                    </div>
                    {/* <Link to="/menus"><li className={`sidebar__item ${pathname.startsWith('/menus') ? 'active' : ''}`}>Menus</li></Link>
                    <div className={`sidebar__submenu ${!pathname.startsWith('/menus') ? 'close' : ''}`}>
                        {menus && menus.map((menu) => (
                            <Link to={`/menus/${menu.id}`} key={menu.id}>
                                <li className={`sidebar__item sidebar__subitem ${pathname === `/menus/${menu.id}` ? 'active' : ''}`}>{menu.name}</li>
                            </Link>
                        ))}
                    </div> */}
                    <Link to="/categories"><li className={`sidebar__item ${pathname.startsWith('/categories') ? 'active' : ''}`}>Catégories</li></Link>
                    <div className={`sidebar__submenu ${!pathname.startsWith('/categories') ? 'close' : ''}`}>
                        {categories && categories.map((categorie) => (
                            <Link to={`/categories/${categorie.id}`} key={categorie.id}>
                                <li className={`sidebar__item sidebar__subitem ${pathname === `/categories/${categorie.id}` ? 'active' : ''}`}>{categorie.name}</li>
                            </Link>
                        ))}
                    </div>
                </ul>
            </aside>
        </>
    )
}

export default Sidebar