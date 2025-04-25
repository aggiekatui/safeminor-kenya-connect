import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, ShieldCheck, Phone, HelpCircle, Clock } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavLink {
  name: string;
  href: string;
  icon: React.ElementType;
}

const navLinks: NavLink[] = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Report Case', href: '/report', icon: ShieldCheck },
  { name: 'Delayed Cases', href: '/delayed-cases', icon: Clock },
  { name: 'Resources', href: '/resources', icon: HelpCircle },
  { name: 'Contact', href: '/contact', icon: Phone },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <span className="h-8 w-auto sm:h-10 text-safeminor-primary font-bold text-xl">SafeMinor</span>
              </Link>
            </div>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-safeminor-primary hover:bg-gray-50"
              >
                <div className="flex items-center gap-1">
                  <link.icon className="h-4 w-4" />
                  <span>{link.name}</span>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="hidden md:ml-6 md:flex md:items-center">
            <Button asChild variant="default" className="bg-safeminor-primary hover:bg-safeminor-secondary">
              <Link to="/login">Login</Link>
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="inline-flex items-center justify-center"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-safeminor-primary hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center gap-2">
                <link.icon className="h-5 w-5" />
                <span>{link.name}</span>
              </div>
            </Link>
          ))}
          <div className="mt-4">
            <Button asChild variant="default" className="w-full bg-safeminor-primary hover:bg-safeminor-secondary">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
