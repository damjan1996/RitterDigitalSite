// src/components/ui/badge.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-white hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-white hover:bg-secondary/80',
        accent: 'border-transparent bg-accent text-white hover:bg-accent/80',
        outline: 'text-primary hover:bg-primary/10',
        success:
          'border-transparent bg-green-500 text-white hover:bg-green-500/80',
        warning:
          'border-transparent bg-yellow-500 text-white hover:bg-yellow-500/80',
        error: 'border-transparent bg-red-500 text-white hover:bg-red-500/80',
      },
      size: {
        default: 'text-xs px-2.5 py-0.5',
        sm: 'text-xs px-2 py-0.5 rounded-md',
        lg: 'text-sm px-3 py-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  onClick?: () => void;
}

function Badge({ className, variant, size, onClick, ...props }: BadgeProps) {
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events
    <div
      className={cn(
        badgeVariants({ variant, size }),
        onClick ? 'cursor-pointer' : '',
        className
      )}
      onClick={onClick}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
