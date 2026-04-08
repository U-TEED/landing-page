'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface HeaderProps {
  onNavClick: (id: string) => void;
}

export default function Header({ onNavClick }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isDetailPage = pathname?.startsWith('/detail');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogoClick = () => {
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
    }
  };

  return (
    <header className="main-header">
      <div className="header-content">
        <span 
          className="header-logo" 
          style={{ cursor: 'pointer' }} 
          onClick={handleLogoClick}
        >
          U-TEED
        </span>
        {isDetailPage ? (
          <>
            <nav className="header-nav">
              <button onClick={() => onNavClick('service')}>서비스</button>
              <button onClick={() => onNavClick('beta')}>베타</button>
              <button onClick={() => onNavClick('partner')}>파트너</button>
            </nav>
            <div className="header-cta">
              <a
                className="header-cta-btn"
                href="mailto:site@u-teed.co.kr?subject=%5BSITE%5D%20%ED%8C%8C%ED%8A%B8%EB%84%88%20%EB%AF%B8%ED%8C%85%20%EC%9A%94%EC%B2%AD"
              >
                파트너 미팅 요청
              </a>
            </div>
          </>
        ) : (
          <nav className="header-nav">
            <div 
              className="header-dropdown"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <button className="header-dropdown-btn">서비스</button>
              {showDropdown && (
                <div className="header-dropdown-menu">
                  <button onClick={() => { router.push('/detail/1'); setShowDropdown(false); }}>
                    SITE
                    <span className="dropdown-desc">픽업게임 운영 플랫폼</span>
                  </button>
                  <button onClick={() => { router.push('/detail/2'); setShowDropdown(false); }}>
                    BeepBeep
                    <span className="dropdown-desc">경도인지장애 조기 발견</span>
                  </button>
                </div>
              )}
            </div>
            <button onClick={() => onNavClick('section-2')}>프로젝트 의뢰하기</button>
            <a
              className="header-nav-link"
              href="https://accounts.zoho.com/signin?servicename=VirtualOffice&signupurl=https://www.zoho.com/mail/zohomail-pricing.html&serviceurl=https://mail.zoho.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              이메일 바로가기
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}

