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
    'relative max-[1024px]:mr-2 py-[6px] px-6 lg:h-[48px] t4 lg:t3 text-text1 text-center border-border3 border-[1.5px] rounded-[50px] lg:border-none whitespace-nowrap group';

  const animatedBorderStyle = `
    lg:after:content-['']
    lg:after:absolute
    lg:after:bottom-0
    lg:after:left-0
    lg:after:h-[3px]
    lg:after:bg-main
    lg:after:origin-left
    lg:after:transition-transform
    lg:after:duration-300
    lg:after:w-full
    ${isActive ? 'lg:after:scale-x-100' : 'lg:after:scale-x-0'}
  `;

  const textStyle = isActive
    ? 'text-text1 max-[1024px]:bg-main max-[1024px]:text-white max-[1024px]:border-main'
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
