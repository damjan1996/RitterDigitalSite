// src/components/ui/container.tsx
import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: "sm" | "md" | "lg" | "xl" | "full";
    paddingY?: "none" | "sm" | "md" | "lg" | "xl";
    paddingX?: "none" | "sm" | "md" | "lg" | "xl";
    as?: React.ElementType;
}

/**
 * Container-Komponente für konsistentes Layout
 * Steuert die maximale Breite sowie den horizontalen und vertikalen Abstand
 */
export const Container: React.FC<ContainerProps> = ({
                                                        children,
                                                        className,
                                                        size = "xl",
                                                        paddingY = "md",
                                                        paddingX = "md",
                                                        as: Component = "div",
                                                        ...props
                                                    }) => {
    // Container-Größen
    const sizeClasses = {
        sm: "max-w-screen-sm",
        md: "max-w-screen-md",
        lg: "max-w-screen-lg",
        xl: "max-w-screen-xl",
        full: "max-w-full",
    };

    // Vertikaler Abstand
    const paddingYClasses = {
        none: "py-0",
        sm: "py-4",
        md: "py-8",
        lg: "py-12",
        xl: "py-16",
    };

    // Horizontaler Abstand
    const paddingXClasses = {
        none: "px-0",
        sm: "px-4",
        md: "px-4 sm:px-6",
        lg: "px-4 sm:px-8",
        xl: "px-4 sm:px-10",
    };

    return (
        <Component
            className={cn(
                "mx-auto w-full",
                sizeClasses[size],
                paddingYClasses[paddingY],
                paddingXClasses[paddingX],
                className
            )}
            {...props}
        >
            {children}
        </Component>
    );
};

export default Container;