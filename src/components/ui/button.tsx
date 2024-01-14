import React from 'react';
import { cn } from '../../lib/utils';

type ButtonProps = React.ComponentPropsWithoutRef<'button'>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ disabled, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'rounded-lg px-4 py-4 text-2xl font-bold text-white transition hover:bg-neutral-light hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 sm:px-10',
          {
            'bg-primary-dark': !disabled,
            'bg-gray-400': disabled,
          },
          className,
        )}
        disabled={disabled}
        {...props}
      />
    );
  },
);
