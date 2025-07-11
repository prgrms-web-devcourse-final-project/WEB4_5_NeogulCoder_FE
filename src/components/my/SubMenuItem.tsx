'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';

type SubnavItemProps = {
  children: React.ReactNode;
  isActive: boolean;
  onClick?: () => void;
  className?: string;
};

export default function SubMenuItem({
  children,
  isActive,
  onClick,
  className,
}: SubnavItemProps) {
  const subMenuBasicStyle = 'w-[120px] h-[48px] t2 text-text1 text-center';

  const activeStyle = 'border-b-3 border-main text-text1';
  const inactiveStyle = 'text-text1 opacity-40 hover:opacity-100';

  const style = twMerge(
    subMenuBasicStyle,
    isActive ? activeStyle : inactiveStyle,
    className
  );

  return (
    <button className={style} onClick={onClick}>
      {children}
    </button>
  );
}
