import React from 'react';

interface IconProps {
  className?: string;
}

export const ArchiveBoxIcon: React.FC<IconProps> = ({ className }) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h12A2.25 2.25 0 0020.25 14.25V3m-16.5 0h16.5m-16.5 0H3.75m16.5 0H20.25m0 0A2.25 2.25 0 0118 5.25v9A2.25 2.25 0 0115.75 16.5H8.25A2.25 2.25 0 016 14.25v-9A2.25 2.25 0 018.25 3m7.5 0h-7.5m7.5 0c.621 0 1.125.504 1.125 1.125V5.25c0 .621-.504 1.125-1.125 1.125h-7.5c-.621 0-1.125-.504-1.125-1.125V4.125c0-.621.504-1.125 1.125-1.125M12 16.5v-3.75m0 0h-1.5m1.5 0h1.5M12 12.75v3.75" />
</svg>
);
