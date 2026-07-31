'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hide on quiz pages for distraction-free mode
  if (pathname?.startsWith('/quiz')) {
    return null;
  }

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { name: 'Quiz', href: '/quiz' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        {/* Brand */}
        <Link href="/" className={styles.brand} onClick={closeMobileMenu}>
          <span className={styles.brandAccent}>AI</span> Proof
        </Link>

        {/* Desktop Links */}
        <ul className={styles.desktopLinks} role="list">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`${styles.link} ${isActive ? styles.active : ''}`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Toggle */}
        <button
          className={styles.mobileToggle}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ''}`}></span>
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <ul className={styles.mobileLinks} role="list">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`${styles.mobileLink} ${isActive ? styles.mobileActive : ''}`}
                  onClick={closeMobileMenu}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
};
