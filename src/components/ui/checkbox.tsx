// src/components/ui/checkbox.tsx
import { Check } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

// Vereinfachte Checkbox ohne Radix UI Abhängigkeit
const Checkbox = React.forwardRef<
  HTMLInputElement,
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    indeterminate?: boolean;
  }
>(({ className, indeterminate, ...props }, ref) => {
  const innerRef = React.useRef<HTMLInputElement | null>(null);

  // Kombinierte ref-Funktion
  const setRefs = React.useCallback(
    (node: HTMLInputElement | null) => {
      // Setze den übergebenen ref
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
      }

      // Setze den innerRef
      innerRef.current = node;
    },
    [ref]
  );

  // Indeterminate-Status setzen
  React.useEffect(() => {
    if (innerRef.current) {
      innerRef.current.indeterminate = !!indeterminate;
    }
  }, [indeterminate]);

  return (
    <div className='relative inline-flex items-center justify-center'>
      <input
        type='checkbox'
        ref={setRefs}
        className={cn(
          'peer h-5 w-5 shrink-0 appearance-none rounded-sm border border-primary ring-offset-background',
          'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'checked:bg-primary checked:text-white',
          className
        )}
        {...props}
      />
      <Check className='absolute h-4 w-4 text-white opacity-0 peer-checked:opacity-100' />
    </div>
  );
});
Checkbox.displayName = 'Checkbox';

const CheckboxWithLabel = React.forwardRef<
  HTMLInputElement,
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    label: string;
    description?: string;
    error?: string;
    indeterminate?: boolean;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
>(({ className, label, description, error, ...props }, ref) => (
  <div className='space-y-2'>
    <div className='flex items-start space-x-2'>
      <Checkbox ref={ref} className='mt-1' {...props} />
      <div className='grid gap-1'>
        <label
          htmlFor={props.id}
          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
        >
          {label}
        </label>
        {description && <p className='text-sm text-secondary'>{description}</p>}
      </div>
    </div>
    {error && <p className='text-sm text-red-500'>{error}</p>}
  </div>
));
CheckboxWithLabel.displayName = 'CheckboxWithLabel';

export { Checkbox, CheckboxWithLabel };
