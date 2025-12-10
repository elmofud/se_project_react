import logoImage from '../../assets/logoWtwr.svg';
import avatar from '../../assets/avatar.png';

function Header() {
     const currentDate = new Date();
     console.log(currentDate);

    return (
        <header className='Header'>
             <img className='header__logo' src={logoImage} alt='What to Wear logo' /> 
             <p className="header__Date-and-location">date and location</p>
             <button className="header__add-Clothes-btn">+ Add Cloths</button>
             <div className="header__user-container">
                <p className="header__username">Terrence Tegegne</p>
                <img className='header__avatar' src={avatar} alt='Terrence Tegegne'/>
             </div>         

        </header>                  
    );

}

export default Header