import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { SiteConfig } from '../types';

interface HeaderProps {
  config: SiteConfig;
}

const Header: React.FC<HeaderProps> = ({ config }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('sms_auth_token'));
  const location = useLocation();
  const navigate = useNavigate();
  const logoUrl = config.logo || "https://lwfiles.mycourse.app/62a6cd5-public/6efdd5e.png";

  useEffect(() => {
    const checkAuth = () => setIsLoggedIn(!!localStorage.getItem('sms_auth_token'));
    window.addEventListener('authChange', checkAuth);
    window.addEventListener('storage', checkAuth);
    return () => {
      window.removeEventListener('authChange', checkAuth);
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('sms_auth_token');
    localStorage.removeItem('sms_auth_user');
    setIsLoggedIn(false);
    window.dispatchEvent(new Event('authChange'));
    navigate('/');
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) => 
    `relative text-[11px] font-black uppercase tracking-widest transition-all duration-300 py-2 group focus-visible:outline-none ${
      isActive ? 'text-emerald-600' : 'text-slate-600 hover:text-emerald-600'
    }`;

  const btnNavAction = "px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-2xl active:scale-95";

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 z-[100] h-24 md:h-32 transition-all duration-300">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 md:gap-6 group">
          <div className="w-16 h-16 md:w-40 md:h-28 flex items-center justify-center transition-all group-hover:scale-105">
            <img src={logoUrl} alt="" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-black text-lg md:text-3xl text-emerald-600 tracking-tighter uppercase whitespace-nowrap">{config.name}</span>
            <span className="text-[8px] md:text-xs text-emerald-600 font-black uppercase tracking-[0.2em] md:tracking-[0.3em] mt-0.5 md:mt-1">{config.tagline}</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center space-x-10">
          {config.navigation.map((item) => (
            <NavLink key={item.label} to={item.path} className={navLinkClasses} end={item.path === '/'}>
              {item.label}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100"></span>
            </NavLink>
          ))}
          
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Link
                to="/admin"
                className={`${btnNavAction} ${location.pathname === '/admin' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-white hover:bg-emerald-600'}`}
              >
                <i className="fa-solid fa-gauge-high mr-2"></i> Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all active:scale-90"
              >
                <i className="fa-solid fa-power-off"></i>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className={`${btnNavAction} ${location.pathname === '/login' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-white hover:bg-emerald-600'}`}
            >
              <i className="fa-solid fa-lock mr-2"></i> {config.loginLabel || "Login"}
            </Link>
          )}
        </nav>

        <button className="lg:hidden w-12 h-12 bg-slate-50 border border-slate-200 rounded-xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-24 md:top-32 bg-white border-t border-slate-100 shadow-3xl z-[90]">
          <div className="flex flex-col p-8 space-y-4">
            {config.navigation.map((item) => (
              <NavLink key={item.label} to={item.path} className="font-black text-lg uppercase tracking-widest px-6 py-5 rounded-2xl" onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </NavLink>
            ))}
            {isLoggedIn ? (
              <>
                <Link to="/admin" className="bg-emerald-600 text-white font-black py-6 rounded-3xl text-center uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                <button onClick={handleLogout} className="bg-red-50 text-red-600 font-black py-6 rounded-3xl text-center uppercase tracking-widest">Logout</button>
              </>
            ) : (
              <Link to="/login" className="bg-slate-900 text-white font-black py-6 rounded-3xl text-center uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>Institutional Login</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;