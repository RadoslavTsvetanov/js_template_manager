import React from 'react';
import Link from 'next/link';

interface LinkButtonProps {
  name: string;
  href: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ name, href }) => {
  return (
    <Link className="bg-blue-500 text-white font-bold py-2 px-4 rounded" href={href}>
        {name}
    </Link>
  );
}

export default LinkButton;