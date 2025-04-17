// src/components/common/cta-button.tsx
import React from 'react';
import Link from 'next/link';
import { Button, ButtonProps } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CTAButtonProps extends Omit<ButtonProps, 'asChild'> {
    href: string;
    label: string;
    icon?: boolean;
    isExternal?: boolean;
    className?: string;
}

/**
 * Eine wiederverwendbare Call-to-Action Button Komponente
 * mit optionaler Icon-Anzeige und externer/interner Link-Behandlung
 */
export const CTAButton: React.FC<CTAButtonProps> = ({
                                                        href,
                                                        label,
                                                        icon = true,
                                                        isExternal = false,
                                                        className,
                                                        variant = 'accent',
                                                        size = 'lg',
                                                        ...props
                                                    }) => {
    const buttonContent = (
        <>
            {label}
            {icon && <ArrowRight className="ml-2 h-4 w-4" />}
        </>
    );

    const buttonClassName = cn('font-medium', className);

    if (isExternal) {
        return (
            <Button
                as="a"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                variant={variant}
                size={size}
                className={buttonClassName}
                {...props}
            >
                {buttonContent}
            </Button>
        );
    }

    return (
        <Link href={href} passHref legacyBehavior>
            <Button
                as="a"
                variant={variant}
                size={size}
                className={buttonClassName}
                {...props}
            >
                {buttonContent}
            </Button>
        </Link>
    );
};

export default CTAButton;