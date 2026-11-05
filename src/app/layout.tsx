import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import HashLink from '@/components/HashLink';
import { meta } from '@/content/site';
// Pretendard 하나로 한글·라틴 모두. 쓰는 굵기(400·600·700)의 @font-face만 사이트에서 직접 제공한다
import './pretendard.css';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://u-teed.co.kr'),
  title: {
    default: meta.homeTitle,
    template: '%s | U-TEED',
  },
  description: meta.homeDescription,
  alternates: { canonical: '/' },
  icons: {
    icon: '/images/U-TEED.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: 'U-TEED',
    url: '/',
    title: meta.homeTitle,
    description: meta.homeDescription,
  },
  twitter: {
    card: 'summary',
    title: meta.homeTitle,
    description: meta.homeDescription,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const licenseUrl = 'https://creativecommons.org/licenses/by-nc-nd/4.0/';

  return (
    <html lang="ko">
      <head>
        <link rel="license" href={licenseUrl} />
        {/* 글꼴 파일(woff2)만 jsDelivr 고정 버전 주소에서 받는다 */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
      </head>
      <body>
        {/* 기본 해시 이동은 Next 라우터가 모르는 히스토리 항목을 만들어 뒤로 가기를 멈추게 하므로 HashLink로 */}
        <HashLink href="#main" className="skip-link">
          본문 바로가기
        </HashLink>
        {children}
      </body>
    </html>
  );
}
