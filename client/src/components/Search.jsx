
import logo from "../assets/browser.svg"

const Search = () => {
    return (
      <header>
        <div style={{display:"flex", justifyContent:"space-between"}}>
        <div > 
        <p className="header__subtitle">Seek and buy available domain names</p>
        <h2 className="header__title">It all begins with a domain name.</h2>
        <div className="header__search">
          <input
            type="text"
            className="header__input"
            placeholder="Find your domain"
          />
          <button
            type="button"
            className='header__button'
          >
            Buy It
          </button>
        </div>
        </div>
        <div style={{display:"flex", justifyContent:"flex-end"}}>
        <img src={logo} alt="" style={{height:"500px",width:"500px"}}/>

        </div>
        </div>
      </header>
    );
  }
  
  export default Search;