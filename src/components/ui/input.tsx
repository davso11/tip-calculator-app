import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  id?: string;
  label?: string;
  Icon?: LucideIcon;
  container?: React.ComponentPropsWithoutRef<'div'>;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { id, label, Icon, type = 'number', container, className, error, ...props },
    ref,
  ) => {
    if (!id || !label) {
      return (
        <input
          ref={ref}
          type={type}
          min={0}
          className={cn('input', className)}
          {...props}
        />
      );
    }

    return (
      <div
        className={cn('flex flex-col space-y-2', container?.className)}
        {...container}
      >
        <div className="flex items-center justify-between gap-x-4">
          <label htmlFor={id}>{label}</label>
          {error ? <p className="text-orange-600">{error}</p> : null}
        </div>
        <div className="relative grow">
          <input
            id={id}
            ref={ref}
            type={type}
            min={0}
            className={cn(
              'input w-full pl-14',
              {
                'focus-visible:ring-orange-600': !!error,
              },
              className,
            )}
            {...props}
          />
          {!!Icon && (
            <Icon
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 transform text-neutral"
            />
          )}
        </div>
      </div>
    );
  },
);
