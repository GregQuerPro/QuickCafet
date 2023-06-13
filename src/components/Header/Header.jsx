import { Link } from 'react-router-dom';
import './Header.css';

function Header () {

    return(
        <>
            <header className='header'>
                <nav className='header__wrapper'>
                    <ul className='header__item_ctn'>
                        <li>
                            <Link to='/home'>QuickCafet</Link>
                        </li>
                        <li>Mon compte</li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Header