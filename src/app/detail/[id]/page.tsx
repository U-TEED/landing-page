'use client';

import { use } from 'react';
import SitePage from './SitePage';
import BeepBeepPage from './BeepBeepPage';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function DetailPage({ params }: PageProps) {
  const { id } = use(params);

  if (id === '2') {
    return <BeepBeepPage />;
  }

  return <SitePage />;
}
