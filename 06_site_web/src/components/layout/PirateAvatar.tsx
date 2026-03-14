'use client';

interface PirateAvatarProps {
  skinId: string;
  size?: number;
  className?: string;
}

export function PirateAvatar({ skinId, size = 48, className = '' }: PirateAvatarProps) {
  return (
    <div
      className={`rounded-lg overflow-hidden flex-shrink-0 ${className}`}
      style={{ width: size, height: size, background: 'var(--bg-card)' }}
    >
      <img
        src={`/avatars/${skinId}.svg`}
        alt="Avatar pirate"
        width={size}
        height={size}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/avatars/pirate_base.svg';
        }}
      />
    </div>
  );
}
