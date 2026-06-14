import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  isInvalid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = '',
      label,
      errorMessage,
      startContent,
      endContent,
      isInvalid,
      ...props
    },
    ref
  ) => {
    const errorClass = isInvalid || errorMessage ? 'border-ui-danger focus:ring-ui-danger' : 'border-ui-border focus:ring-ui-primary focus:border-ui-primary';
    const paddingLeftClass = startContent ? 'pl-10' : 'pl-4';
    const paddingRightClass = endContent ? 'pr-10' : 'pr-4';

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-ui-text-main">
            {label}
          </label>
        )}
        <div className="relative flex items-center w-full">
          {startContent && (
            <div className="absolute left-3 text-ui-text-muted flex items-center justify-center pointer-events-none">
              {startContent}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full h-10 bg-ui-surface text-ui-text-main rounded-lg border outline-none transition-all duration-200 focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:bg-ui-bg disabled:cursor-not-allowed ${errorClass} ${paddingLeftClass} ${paddingRightClass} ${className}`}
            {...props}
          />
          {endContent && (
            <div className="absolute right-3 text-ui-text-muted flex items-center justify-center">
              {endContent}
            </div>
          )}
        </div>
        {errorMessage && (
          <span className="text-xs text-ui-danger mt-0.5">{errorMessage}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
