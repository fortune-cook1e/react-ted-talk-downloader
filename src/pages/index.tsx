import Image from 'next/image';
import { Inter } from 'next/font/google';

import { useMemo, useState } from 'react';
import Ted from '@/components/Ted';
import Economist from '@/components/Economist';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={`flex min-h-screen  p-6 ${inter.className}`}>
      <div className="flex-1 h-full">
        <Ted />
      </div>
      {/* <div className="flex-1">
        <Economist />
      </div> */}
    </main>
  );
}
