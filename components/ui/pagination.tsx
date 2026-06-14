import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from './button';

interface PaginationProps {
  total: number;
  page: number;
  onChange: (page: number) => void;
  siblings?: number;
  className?: string;
}

export const Pagination = ({
  total,
  page,
  onChange,
  siblings = 1,
  className = '',
}: PaginationProps) => {
  if (total <= 1) return null;

  const getPageNumbers = () => {
    const totalNumbers = siblings * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (total > totalBlocks) {
      const startPage = Math.max(2, page - siblings);
      const endPage = Math.min(total - 1, page + siblings);

      let pages: (number | string)[] = [1];

      if (startPage > 2) {
        pages.push('ellipsis-start');
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < total - 1) {
        pages.push('ellipsis-end');
      }

      pages.push(total);
      return pages;
    }

    return Array.from({ length: total }, (_, i) => i + 1);
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <Button
        variant="ghost"
        isIconOnly
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {getPageNumbers().map((pageNumber, index) => {
        if (typeof pageNumber === 'string') {
          return (
            <div key={`${pageNumber}-${index}`} className="flex items-center justify-center w-8 h-8 text-ui-text-muted">
              <MoreHorizontal className="w-4 h-4" />
            </div>
          );
        }

        return (
          <Button
            key={index}
            variant={pageNumber === page ? 'primary' : 'ghost'}
            className={`w-10 ${pageNumber === page ? '' : 'text-ui-text-main'}`}
            onClick={() => onChange(pageNumber)}
          >
            {pageNumber}
          </Button>
        );
      })}

      <Button
        variant="ghost"
        isIconOnly
        onClick={() => onChange(Math.min(total, page + 1))}
        disabled={page === total}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};
