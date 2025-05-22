// src/components/ui/tabs.tsx
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const Tabs = TabsPrimitive.Root;

const tabsListVariants = cva('inline-flex items-center justify-center', {
  variants: {
    variant: {
      default: 'rounded-md bg-gray-100 p-1',
      underlined: 'space-x-4 border-b border-gray-200',
      pills: 'space-x-1',
      cards: 'gap-2',
    },
    fullWidth: {
      true: 'w-full',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    fullWidth: false,
  },
});

type ElementRef<T> =
  T extends React.ForwardRefExoticComponent<React.RefAttributes<infer U>>
    ? U
    : never;

interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

const TabsList = React.forwardRef<
  ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant, fullWidth, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants({ variant, fullWidth }), className)}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const tabsTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm',
        underlined:
          'border-b-2 border-transparent px-1 pb-3 data-[state=active]:border-accent data-[state=active]:text-accent',
        pills:
          'rounded-full px-3 py-1.5 text-secondary data-[state=active]:bg-accent data-[state=active]:text-white',
        cards:
          'rounded-md border border-transparent px-4 py-2 hover:bg-gray-50 data-[state=active]:border-gray-200 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm',
      },
      fullWidth: {
        true: 'flex-1',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      fullWidth: false,
    },
  }
);

interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {}

const TabsTrigger = React.forwardRef<
  ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, fullWidth, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants({ variant, fullWidth }), className)}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'focus-visible:ring-ring mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  type TabsTriggerProps,
  type TabsListProps,
};
