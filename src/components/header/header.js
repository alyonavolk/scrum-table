import './header.scss';

const Header = () => {
    return(
        <div className='header'>
            <div className='header__logo'>
                Scrum-table
            </div>
            <div className='header_post'>
                <button>Создать задачу</button>
            </div>
        </div>
    )
}

export default Header;