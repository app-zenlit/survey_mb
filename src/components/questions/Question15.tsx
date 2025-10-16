interface Question15Props {
  value: string | null;
  onChange: (value: string) => void;
}

export function Question15({ value, onChange }: Question15Props) {
  const options = [
    "Yes, I am interested to learn and develop digitalization solutions",
    "Yes, I am interested to learn for upskilling",
    "Not interested"
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        15. Are you interested in learning and participating in digitalization solutions?
      </h2>
      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option}
            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
              value === option
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
            }`}
          >
            <input
              type="radio"
              name="q15"
              value={option}
              checked={value === option}
              onChange={(e) => onChange(e.target.value)}
              className="w-5 h-5 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
