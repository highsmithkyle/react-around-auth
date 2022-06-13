import logo from "../images/newlogo.png"

function Header() {
    return (

        <header className="header">

            <img
                className="header__logo"
                src={logo}
                alt="Around The World"
            />

        </header>
    );
}

export default Header;




