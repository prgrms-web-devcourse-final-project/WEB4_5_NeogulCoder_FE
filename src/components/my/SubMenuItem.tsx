'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';

type SubnavItemProps = {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  className?: string;
};

export default function SubMenuItem({
  children,
  isActive,
  onClick,
  className,
}: SubnavItemProps) {
  const subMenuBasicStyle =
    'relative px-6 h-[48px] t3 text-text1 text-center whitespace-nowrap group';

  const animatedBorderStyle = `
    after:content-['']
    after:absolute
    after:bottom-0
    after:left-0
    after:h-[3px]
    after:bg-main
    after:origin-left
    after:transition-transform
    after:duration-300
    after:w-full
    ${isActive ? 'after:scale-x-100' : 'after:scale-x-0'}
  `;

  const textStyle = isActive
    ? 'text-text1'
    : 'text-text1 opacity-40 hover:opacity-100';

  const style = twMerge(
    subMenuBasicStyle,
    animatedBorderStyle,
    textStyle,
    className
  );

  return (
    <button className={style} onClick={onClick}>
      {children}
    </button>
  );
}
