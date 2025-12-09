import logoImage from '../assets/LogoWtwr.svg'

function Header() {
     const currentDate = new Date();
     console.log(currentDate);

    return (
        <header>
             <img className='header_logo' src={logoImage} alt='What to Wear logo' /> 
             <h1 className="header__currentDate">{currentDate}</h1>
                       
        </header>                  
    );

}

export default Header