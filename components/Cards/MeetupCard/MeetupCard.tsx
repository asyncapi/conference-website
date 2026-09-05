import { memo } from 'react';
import Paragraph from '../../Typography/paragraph';

export interface MeetupCardProps {
  id: number;
  color: string;
  label: string;
  description: string;
  image: string;
  isDesktop?: boolean;
}

function MeetupCard({ color, label, description, image, isDesktop = true }: MeetupCardProps) {
  const gradientStyle = `linear-gradient(to bottom, transparent 60%, ${color}), url(${image})`;

  if (isDesktop) {
    return (
      <div className="relative h-150 w-100 rounded-2xl border lg:h-140 lg:w-96">
        <div
          className="h-88 w-full rounded-t-2xl bg-cover bg-center lg:h-80"
          style={{
            backgroundImage: gradientStyle,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="z-10 p-6 lg:p-5">
          <h3 className="text-3xl font-semibold text-white lg:text-2xl">
            {label}
          </h3>
          <Paragraph typeStyle="body-md" className="mt-4">
            {description}
          </Paragraph>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/5">
      <div
        className="h-56 w-full bg-cover bg-center"
        style={{
          backgroundImage: gradientStyle,
        }}
      />
      <div className="p-5">
        <h3 className="text-2xl font-semibold text-white">{label}</h3>
        <Paragraph typeStyle="body-md" className="mt-3">
          {description}
        </Paragraph>
      </div>
    </div>
  );
}

export default memo(MeetupCard);
