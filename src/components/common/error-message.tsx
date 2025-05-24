// src/components/common/error-message.tsx
import { AlertCircle } from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/utils';

interface ErrorMessageProps {
  message?: string;
  className?: string;
  showIcon?: boolean;
}

/**
 * Komponente zur einheitlichen Darstellung von Fehlermeldungen
 * in der gesamten Anwendung
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  className,
  showIcon = true,
}) => {
  if (!message) return null;

  return (
    <div className={cn('mt-1 flex items-center text-sm text-red-600', className)}>
      {showIcon && <AlertCircle className="mr-1.5 h-4 w-4" />}
      <span>{message}</span>
    </div>
  );
};

// Eine Variante für Formularfelder, die mit react-hook-form verwendet werden kann
export const FormErrorMessage: React.FC<{
  error?: { message?: string } | undefined;
  className?: string;
}> = ({ error, className }) => {
  return error?.message ? <ErrorMessage message={error.message} className={className} /> : null;
};

export default ErrorMessage;
