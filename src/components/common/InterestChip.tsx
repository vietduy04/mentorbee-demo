import React from 'react';

interface InterestChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
}

export const InterestChip: React.FC<InterestChipProps> = ({
  label,
  selected = false,
  onClick,
  onRemove,
}) => {
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
        selected
          ? 'bg-primary-100 text-primary-800 border-2 border-primary-600'
          : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
      } ${onClick ? 'cursor-pointer' : ''}`}
    >
      <span>{label}</span>
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 hover:text-primary-900"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};
