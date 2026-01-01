
import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { SiteConfig } from '../types';

interface HeaderProps {
  config: SiteConfig;
}

const Header: React.FC<HeaderProps> = ({ config }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const logoUrl = config.logo || "https://lwfiles.mycourse.app/62a6cd5-public/6efdd5e.png";

  const isInternalLink = (path: string) => {
    if (!path) return false;
    return path.startsWith('#') || path.startsWith('/') || path.includes(window.location.origin);
  };

  const getCleanPath = (path: string) => {
    if (!path) return '/';
    if (path.startsWith('#/')) return path.substring(1);
    if (path.startsWith('#') && !path.startsWith('#/')) return `/${path}`;
    return path;
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) => 
    `relative text-[11px] font-black uppercase tracking-widest transition-all duration-300 py-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg ${
      isActive 
        ? 'text-emerald-600' 
        : 'text-slate-600 hover:text-emerald-600'
    }`;

  const btnNavAction = "px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-2xl active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/30";

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 z-50 h-32 transition-all duration-300">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-6 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl" aria-label="Institute Home">
          <div className="w-40 h-28 flex items-center justify-center transition-all group-hover:scale-105">
            <img 
              src={logoUrl} 
              alt={`${config.name} Logo`} 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col leading-tight -ml-2">
            <span className="font-black text-2xl md:text-3xl text-emerald-600 tracking-tighter uppercase whitespace-nowrap">
              {config.name}
            </span>
            <span className="text-[10px] md:text-xs text-emerald-600 font-black uppercase tracking-[0.3em] mt-1">
              {config.tagline}
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center space-x-10" aria-label="Main Navigation">
          {config.navigation.map((item) => {
            const isInternal = isInternalLink(item.path);
            const cleanPath = getCleanPath(item.path);
            
            return isInternal ? (
              <NavLink
                key={item.label}
                to={cleanPath}
                className={navLinkClasses}
                end={cleanPath === '/'}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100 ${location.pathname === cleanPath ? 'scale-x-100' : ''}`}></span>
              </NavLink>
            ) : (
              <a
                key={item.label}
                href={item.path}
                className="text-slate-600 hover:text-emerald-600 font-black transition-colors text-[11px] uppercase tracking-widest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg px-2 py-1"
              >
                {item.label}
              </a>
            );
          })}
          <Link
            to="/admin"
            className={`${btnNavAction} ${
              location.pathname === '/admin' 
                ? 'bg-emerald-600 text-white shadow-emerald-600/20' 
                : 'bg-slate-900 text-white hover:bg-emerald-600 shadow-slate-900/10'
            }`}
          >
            <i className="fa-solid fa-user-gear mr-2" aria-hidden="true"></i>
            {config.loginLabel || "Login"}
          </Link>
        </nav>

        {/* Explicitly Styled Mobile Menu Toggle */}
        <button 
          className="lg:hidden w-12 h-12 flex flex-col items-center justify-center text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 focus-visible:ring-4 focus-visible:ring-emerald-500/30 transition-all group z-[60]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle Navigation Menu"
        >
          <div className="relative w-6 h-5">
            <span className={`absolute left-0 w-6 h-0.5 bg-slate-900 group-hover:bg-emerald-600 transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 top-2' : 'top-0'}`}></span>
            <span className={`absolute left-0 w-6 h-0.5 bg-slate-900 group-hover:bg-emerald-600 transform transition-all duration-300 ease-in-out top-2 ${isMenuOpen ? 'opacity-0 -translate-x-2' : 'opacity-100'}`}></span>
            <span className={`absolute left-0 w-6 h-0.5 bg-slate-900 group-hover:bg-emerald-600 transform transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 top-2' : 'top-4'}`}></span>
          </div>
        </button>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-32 left-0 right-0 bg-white/95 backdrop-blur-2xl border-t border-slate-100 shadow-3xl animate-fade-in-down overflow-y-auto max-h-[calc(100vh-8rem)]">
          <div className="flex flex-col p-10 space-y-6">
            {config.navigation.map((item) => {
              const isInternal = isInternalLink(item.path);
              const cleanPath = getCleanPath(item.path);

              return isInternal ? (
                <NavLink
                  key={item.label}
                  to={cleanPath}
                  end={cleanPath === '/'}
                  className={({ isActive }) => 
                    `font-black text-xl uppercase tracking-widest px-6 py-5 rounded-2xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                      isActive ? 'bg-emerald-50 text-emerald-600' : 'text-slate-900 hover:bg-slate-50'
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ) : (
                <a
                  key={item.label}
                  href={item.path}
                  className="text-slate-900 font-black text-xl uppercase tracking-widest px-6 py-5 hover:bg-slate-50 rounded-2xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              );
            })}
            <Link
              to="/admin"
              className="bg-slate-900 text-white font-black py-6 rounded-3xl text-center shadow-2xl mt-4 uppercase tracking-[0.3em] text-[11px] active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-900/30"
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fa-solid fa-lock mr-2" aria-hidden="true"></i> Institutional Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
