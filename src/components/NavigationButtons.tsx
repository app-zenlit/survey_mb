import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationButtonsProps {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  disabledNext?: boolean;
}

export function NavigationButtons({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  disabledNext = false,
}: NavigationButtonsProps) {
  return (
    <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
      <button
        onClick={onPrev}
        disabled={currentPage === 0}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
          currentPage === 0
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 active:scale-95'
        }`}
      >
        <ChevronLeft size={20} />
        Back
      </button>

      <div className="text-sm text-gray-500 font-medium">
        Page {currentPage + 1} of {totalPages}
      </div>

      <button
        onClick={onNext}
        disabled={disabledNext || currentPage === totalPages - 1}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
          disabledNext || currentPage === totalPages - 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
        }`}
      >
        Next
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
