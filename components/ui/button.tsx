import React from 'react';
import { Spinner } from './spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'flat';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isIconOnly?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading,
      isIconOnly,
      startContent,
      endContent,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed outline-none focus:ring-2 focus:ring-ui-ring focus:ring-offset-2 focus:ring-offset-ui-bg active:scale-[0.98]';
    
    const variants = {
      primary: 'bg-ui-primary text-ui-primary-text hover:bg-ui-primary-hover shadow-sm',
      secondary: 'bg-ui-surface text-ui-text-main border border-ui-border hover:bg-ui-border',
      danger: 'bg-ui-danger text-white hover:bg-red-600 shadow-sm',
      ghost: 'bg-transparent text-ui-text-main hover:bg-ui-border',
      flat: 'bg-ui-primary/10 text-ui-primary hover:bg-ui-primary/20',
    };

    const sizes = {
      sm: 'text-sm px-3 py-1.5 h-8',
      md: 'text-sm px-4 py-2 h-10',
      lg: 'text-base px-6 py-3 h-12',
    };

    const iconOnlySizes = {
      sm: 'h-8 w-8 p-0',
      md: 'h-10 w-10 p-0',
      lg: 'h-12 w-12 p-0',
    };

    const classes = [
      baseStyles,
      variants[variant],
      isIconOnly ? iconOnlySizes[size] : sizes[size],
      className
    ].join(' ');

    return (
      <button ref={ref} className={classes} disabled={disabled || isLoading} {...props}>
        {isLoading && <Spinner className="mr-2" />}
        {!isLoading && startContent && <span className="mr-2 flex items-center">{startContent}</span>}
        {children}
        {!isLoading && endContent && <span className="ml-2 flex items-center">{endContent}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
