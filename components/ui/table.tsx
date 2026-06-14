import React from 'react';

export const Table = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`w-full overflow-x-auto rounded-lg border border-ui-border shadow-sm bg-ui-surface ${className}`}>
    <table className="w-full text-sm text-left text-ui-text-main">
      {children}
    </table>
  </div>
);

export const TableHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <thead className={`text-xs text-ui-text-muted uppercase bg-ui-bg border-b border-ui-border ${className}`}>
    <tr>{children}</tr>
  </thead>
);

export const TableColumn = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <th scope="col" className={`px-6 py-3 font-medium whitespace-nowrap ${className}`}>
    {children}
  </th>
);

export const TableBody = ({ children, className = '', emptyContent }: { children: React.ReactNode; className?: string; emptyContent?: React.ReactNode }) => {
  const hasChildren = React.Children.toArray(children).some(
    (child) => React.isValidElement(child) && child.type === TableRow
  );

  return (
    <tbody className={`divide-y divide-ui-border ${className}`}>
      {children}
      {!hasChildren && emptyContent && (
        <tr>
          <td colSpan={100} className="px-6 py-8 text-center text-ui-text-muted">
            {emptyContent}
          </td>
        </tr>
      )}
    </tbody>
  );
};

export const TableRow = ({ children, className = '', onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => (
  <tr 
    onClick={onClick} 
    className={`bg-ui-surface hover:bg-ui-bg transition-colors duration-150 ${onClick ? 'cursor-pointer' : ''} ${className}`}
  >
    {children}
  </tr>
);

export const TableCell = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <td className={`px-6 py-4 whitespace-nowrap ${className}`}>
    {children}
  </td>
);
