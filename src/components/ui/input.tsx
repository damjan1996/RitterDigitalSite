// src/components/ui/input.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { Eye, EyeOff } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

const inputVariants = cva(
  'flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'focus:ring-accent/40 focus:border-accent',
        error: 'border-red-500 focus:ring-red-500/40 focus:border-red-500 placeholder:text-red-400',
      },
      inputSize: {
        default: 'h-10',
        sm: 'h-8 px-2 text-xs',
        lg: 'h-12 px-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'default',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isPassword?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, variant, inputSize, type, leftIcon, rightIcon, isPassword = false, ...props },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    // Wenn es ein Passwortfeld ist, überschreiben wir das rightIcon
    const passwordIcon = isPassword ? (
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="flex items-center justify-center focus:outline-none"
        tabIndex={-1}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4 text-gray-500" />
        ) : (
          <Eye className="h-4 w-4 text-gray-500" />
        )}
      </button>
    ) : null;

    if (leftIcon || rightIcon || isPassword) {
      return (
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{leftIcon}</div>
          )}
          <input
            type={inputType}
            className={cn(
              inputVariants({ variant, inputSize }),
              leftIcon && 'pl-10',
              (rightIcon || isPassword) && 'pr-10',
              className
            )}
            ref={ref}
            {...props}
          />
          {(rightIcon || isPassword) && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              {isPassword ? passwordIcon : rightIcon}
            </div>
          )}
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, inputSize }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input, inputVariants };
