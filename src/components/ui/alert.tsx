// src/components/ui/alert.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle, Info, X, XCircle } from "lucide-react";

const alertVariants = cva(
    "relative w-full rounded-lg border p-4 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
    {
        variants: {
            variant: {
                default: "bg-background text-foreground",
                info: "border-blue-200 bg-blue-50 text-blue-800 [&>svg]:text-blue-500",
                success: "border-green-200 bg-green-50 text-green-800 [&>svg]:text-green-500",
                warning: "border-yellow-200 bg-yellow-50 text-yellow-800 [&>svg]:text-yellow-500",
                error: "border-red-200 bg-red-50 text-red-800 [&>svg]:text-red-500",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

const Alert = React.forwardRef
HTMLDivElement,
React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants> & {
    onClose?: () => void;
}
>(({ className, variant, children, onClose, ...props }, ref) => {
    // Icon entsprechend der Variante wählen
    const Icon = React.useMemo(() => {
        switch (variant) {
            case "info":
                return Info;
            case "success":
                return CheckCircle;
            case "warning":
            case "error":
                return AlertCircle;
            default:
                return null;
        }
    }, [variant]);

    return (
        <div
            ref={ref}
            role="alert"
            className={cn(alertVariants({ variant }), className)}
            {...props}
        >
            {Icon && <Icon className="h-4 w-4" />}
            <div className="flex-1">{children}</div>
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none"
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Schließen</span>
                </button>
            )}
        </div>
    );
});
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef
HTMLParagraphElement,
React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h5
        ref={ref}
        className={cn("mb-1 font-medium leading-none tracking-tight", className)}
        {...props}
    />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef
HTMLParagraphElement,
React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("text-sm [&_p]:leading-relaxed", className)}
        {...props}
    />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };