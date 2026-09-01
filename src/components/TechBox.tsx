import React from 'react';

interface TechBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'panel' | 'button' | 'accent' | 'badge';
  interactive?: boolean;
  innerClassName?: string;
  className?: string;
  onClick?: (e?: any) => void;
  key?: React.Key;
}

export function TechBox({ children, variant = 'panel', interactive = false, innerClassName = '', className = '', ...props }: TechBoxProps) {
  const isSmall = variant === 'button' || variant === 'badge';
  const outerClip = isSmall ? 'clip-polygon-sm' : 'clip-polygon';
  const innerClip = isSmall ? 'clip-polygon-sm-inner' : 'clip-polygon-inner';

  let outerClasses = `bg-[#3f2314] p-[1px] ${outerClip}`;
  let innerClasses = `bg-[#161210] h-full w-full ${innerClip} relative flex flex-col ${innerClassName}`;

  if (variant === 'button' && interactive) {
    outerClasses += ' transition-colors hover:bg-[#ff7f41] cursor-pointer';
  } else if (variant === 'accent') {
    outerClasses = `bg-[#ff7f41] p-[1px] pl-[4px] ${outerClip}`;
  } else if (variant === 'badge') {
    outerClasses = `bg-[#3f2314] p-[1px] ${outerClip}`;
    innerClasses = `bg-[#0b0908] h-full w-full ${innerClip} relative flex flex-col ${innerClassName}`;
  }

  return (
    <div className={`${outerClasses} ${className}`} {...props}>
      <div className={innerClasses}>
        {children}
        {variant === 'panel' && (
          <div className="absolute bottom-4 right-4 w-6 h-6 border-r border-b border-[#ff7f41] opacity-50 pointer-events-none"></div>
        )}
      </div>
    </div>
  );
}
