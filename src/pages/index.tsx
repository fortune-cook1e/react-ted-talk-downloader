import Image from 'next/image';
import { Inter } from 'next/font/google';

import { useMemo, useState } from 'react';
import Ted from '@/components/Ted';
import Economist from '@/components/Economist';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

const LINKS = [
  {
    url: 'ted',
    text: 'TED Talk',
  },
  {
    url: 'economist',
    text: 'Enonomist',
  },
];

export default function Home() {
  const router = useRouter();

  const cardClick = (url: string) => {
    router.push(url);
  };

  return (
    <main className={`grid gap-x-8 gap-y-4 grid-cols-2 p-6 ${inter.className}`}>
      {LINKS.map(l => {
        return (
          <div
            key={l.url}
            onClick={() => cardClick(l.url)}
            className="p-8 rounded flex justify-center items-center bg-slate-500 hover:bg-slate-700 cursor-pointer"
          >
            {l.text}
          </div>
        );
      })}
    </main>
  );
}
