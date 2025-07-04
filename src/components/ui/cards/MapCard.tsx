import { ReactNode } from 'react';
import Link from 'next/link';

export type CradProps = {
  title?: string;
  image?: string;
  icon?: ReactNode;
  href?: string;
  className?: string;
}

const MapCard = ({ title, image, icon, href, className }: CradProps) => {
  return (
    <div className={`relative overflow-hidden rounded-md h-full ${className}`}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Link href={href ? href : ''} className="absolute inset-0 z-10">
        <span className="sr-only">Voir détails de {title}</span>
      </Link>

      <div className='absolute bottom-0 left-0 right-0 p-4 flex flex-row justify-between items-center'>
        <h4>{title}</h4>
        {icon}
      </div>
    </div>
  )
}

export default MapCard;