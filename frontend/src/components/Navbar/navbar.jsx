import React, { useEffect, useState, useRef } from 'react'
import './navbar.css'
import logo from '../../assets/logo.png'
import menu_icon from '../../assets/menu-icon.png'
import { Link as ScrollLink} from 'react-scroll';
import { NavLink as Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../utils/Context/UserContext';

const navbar = () => {
  // User info for profile header
  const [userData, setUserData] = useState({
    /*name: 'John Smith',
    position: 'Legal Counsel',
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" */
    name: 'Andrii Shuianskyi',
    position: 'Student',
    profileImage: null 
  });

  const { user, isLoading, logoutUser } = useUser();

  if (isLoading) {
    return <nav>Loading...</nav>;
  }

  const path = useLocation().pathname;
  const location = path.split('/')[1];
  const navigate = useNavigate();

  // Profile header states
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [sticky, setSticky] = useState(false);

  // Auto scroll to selected component (setting state for mainPage.jsx)
  const goToPageAndScroll = async (selector) => {
    navigate('/', { state: { scrollTo: selector } });
  };

  // Navbar transition on scrolling
  useEffect(()=>{
    const handleScroll = () => {
      setSticky(window.scrollY > 250);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // calling handleScroll on mount to prevent issues with page refresh

    return () => window.removeEventListener('scroll', handleScroll);
  },[])

  // Handle user header dropdown closing when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mobile navbar menu toggle
  const [mobileMenu, setMobileMenu] = useState(false);
  const toggleMenu = ()=>{
    mobileMenu? setMobileMenu(false) : setMobileMenu(true);
  }

  // Toggle profile dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }

  // Handle logout
  const handleLogout = () => {
    logoutUser();
    navigate('/signin'); // '/'
  }

  return (
    <nav className={`container ${sticky || location !== ''? 'dark-nav' : ''}`}>
      {location === '' ? ( // Refers to the main page navbar representation (probably excess code)
        <>
          <ScrollLink to='hero' smooth={true} offset={0} duration={500}><img src={logo} alt="" className='logo'/></ScrollLink>
          <ul className={mobileMenu?'':'hide-mobile-menu'}>
            <li><ScrollLink to='features' smooth={true} offset={-260} duration={500}>Features</ScrollLink></li>
            <li><ScrollLink to='steps' smooth={true} offset={-260} duration={500}>About</ScrollLink></li>
            <li><ScrollLink to='demo' smooth={true} offset={-260} duration={500}>Demo</ScrollLink></li>
            <li><ScrollLink to='faqs' smooth={true} offset={-260} duration={500}>FAQ</ScrollLink></li>
            <li><ScrollLink to='feedback' smooth={true} offset={-260} duration={500}>Feedback</ScrollLink></li>
            <li><Link to='/dashboard'>Dashboard</Link></li>
            {user ? ( // Refers to whether user is signed in or not
              <li>
                <div className='nav-profile-header' onClick={toggleDropdown} ref={dropdownRef}>
                  {userData.profileImage ? (
                    <img 
                      src={userData.profileImage} 
                      alt="Profile" 
                      className="profile-image"
                    />
                  ) : (
                    <span className="material-symbols-rounded">person_off</span>
                  )}
                  <div className='profile-info'>
                    <span className='profile-name'>{user.username}</span>
                    <span className='profile-position'>{userData.position}</span>
                  </div>
                  {isOpen && (
                    <div className='profile-dropdown'>
                      <Link to="/profile" className='dropdown-item'>
                        <span class="material-symbols-rounded">person</span>My Profile
                      </Link>
                      <Link to="/settings" className='dropdown-item'>
                        <span class="material-symbols-rounded">settings</span>Settings
                      </Link>
                      <button onClick={handleLogout} className='dropdown-item logout'>
                        <span class="material-symbols-rounded">logout</span>Logout
                      </button>
                    </div>
                  )}
                  
                </div>
              </li>
            ) : (
              <li className='nav-action-buttons'>
                <Link to='/signin'><button className='btn'>Login</button></Link>
                <Link to='/signup'><button className='btn signup-btn'>Sign up</button></Link>
              </li>
            )}
          </ul>
        </>
      ) : ( // Refers to the any page navbar representation with mounted auto-scroll
        <>
          <img src={logo} onClick={() => goToPageAndScroll('hero')} alt="" className='logo'/>
          <ul className={mobileMenu?'':'hide-mobile-menu'}>
            <li onClick={() => goToPageAndScroll('features')}>Features</li>
            <li onClick={() => goToPageAndScroll('steps')}>About</li>
            <li onClick={() => goToPageAndScroll('demo')}>Demo</li>
            <li onClick={() => goToPageAndScroll('faqs')}>FAQ</li>
            <li onClick={() => goToPageAndScroll('feedback')}>Feedback</li>
            <li><Link to='/dashboard'>Dashboard</Link></li>
            {user ? ( // Refers to whether user is signed in or not
              <li>
                <div className='nav-profile-header' onClick={toggleDropdown} ref={dropdownRef}>
                  {userData.profileImage ? (
                    <img 
                      src={userData.profileImage} 
                      alt="Profile" 
                      className="profile-image"
                    />
                  ) : (
                    <span className="material-symbols-rounded">person_off</span>
                  )}
                  <div className='profile-info'>
                    <span className='profile-name'>{user.username}</span>
                    <span className='profile-position'>{userData.position}</span>
                  </div>
                  {isOpen && (
                    <div className='profile-dropdown'>
                      <Link to="/profile" className='dropdown-item'>
                        <span class="material-symbols-rounded">person</span>My Profile
                      </Link>
                      <Link to="/settings" className='dropdown-item'>
                        <span class="material-symbols-rounded">settings</span>Settings
                      </Link>
                      <button onClick={handleLogout} className='dropdown-item logout'>
                        <span class="material-symbols-rounded">logout</span>Logout
                      </button>
                    </div>
                  )}
                  
                </div>
              </li>
            ) : (
              <li className='nav-action-buttons'>
                <Link to='/signin'><button className='btn'>Login</button></Link>
                <Link to='/signup'><button className='btn signup-btn'>Sign up</button></Link>
              </li>
            )}
          </ul>
        </>
      )}
        
        <img src={menu_icon} alt="" className='menu-icon' onClick={toggleMenu}/>
    </nav>
  )
}

export default navbar