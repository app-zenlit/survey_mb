interface Question7Props {
  valueA: string;
  valueB: number;
  onChangeA: (value: string) => void;
  onChangeB: (value: number) => void;
}

export function Question7({ valueA, valueB, onChangeA, onChangeB }: Question7Props) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        7a. Do you have any product-related problem statements that could be solved through digitalization?
      </h2>
      <textarea
        value={valueA}
        onChange={(e) => onChangeA(e.target.value)}
        placeholder="Describe your problem statement..."
        className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none min-h-32 text-gray-700"
      />

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          7b. How big an impact would solving this problem have?
        </h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Low Impact</span>
            <span className="text-2xl font-bold text-blue-600">{valueB}</span>
            <span className="text-sm text-gray-600">High Impact</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={valueB}
            onChange={(e) => onChangeB(Number(e.target.value))}
            className="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <span key={num}>{num}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
