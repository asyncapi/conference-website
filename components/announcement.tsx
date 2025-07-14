import React, { JSX } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

function Announcement(): JSX.Element {
  const { t } = useTranslation('common');
  return (
    <Link href="/venue/London">
      <div className="cursor-pointer border text-white min-w-[300px] rounded-lg p-1 text-center text-lg">
        {t('announcement.callForSpeakers')}
      </div>
    </Link>
  );
}

export default Announcement;
