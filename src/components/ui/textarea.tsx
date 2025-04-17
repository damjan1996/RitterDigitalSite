// src/components/ui/textarea.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const textareaVariants = cva(
  'flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'focus:ring-accent/40 focus:border-accent',
        error: 'border-red-500 focus:ring-red-500/40 focus:border-red-500',
      },
      resize: {
        none: 'resize-none',
        vertical: 'resize-y',
        horizontal: 'resize-x',
        both: 'resize',
      },
    },
    defaultVariants: {
      variant: 'default',
      resize: 'vertical',
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  wrapperClassName?: string;
  counter?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, resize, wrapperClassName, counter = false, maxLength, ...props }, ref) => {
    const [charCount, setCharCount] = React.useState(0);

    // Aktualisiere den Zeichenzähler bei Änderungen
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      props.onChange?.(e);
    };

    // Initialisiere den Zähler mit dem Standardwert
    React.useEffect(() => {
      if (props.value && typeof props.value === 'string') {
        setCharCount(props.value.length);
      }
    }, [props.value]);

    return (
      <div className={cn('relative', wrapperClassName)}>
        <textarea
          className={cn(textareaVariants({ variant, resize }), className)}
          ref={ref}
          maxLength={maxLength}
          onChange={handleChange}
          {...props}
        />
        {counter && maxLength && (
          <div className="absolute bottom-2 right-3 text-xs text-gray-400">
            {charCount}/{maxLength}
          </div>
        )}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea, textareaVariants };
