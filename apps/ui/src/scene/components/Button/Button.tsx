import { ReactNode } from 'react';
import './Button.scss';
import { Link } from 'react-router-dom';
export function Button({
  onClick,
  children,
  variant = 'regular',
  className,
  type = 'button',
  form,
}: {
  onClick?: () => void;
  children: ReactNode;
  variant?: 'blue' | 'regular' | 'dark' | 'green';
  className?: string;
  type?: 'button' | 'submit';
  form?: string;
}) {
  return (
    <button
      className={`button ${variant} ${className}`}
      onClick={onClick}
      type={type}
      form={form}
    >
      {children}
    </button>
  );
}
export function AnchorButton({
  children,
  variant = 'regular',
  className,
  type = 'button',
  href,
}: {
  children: ReactNode;
  variant?: 'blue' | 'regular' | 'dark' | 'green' | 'salmon';
  className?: string;
  type?: 'button' | 'submit';
  href: string;
}) {
  return (
    <Link to={href} className={`button ${variant} ${className}`} type={type}>
      {children}
    </Link>
  );
}
