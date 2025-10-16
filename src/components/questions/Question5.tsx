interface Question5Props {
  value: string | null;
  onChange: (value: string) => void;
}

export function Question5({ value, onChange }: Question5Props) {
  const options = [
    "Call IT/tech support immediately",
    "Try a few basic things, but give up quickly",
    "Search online or ask peers and test possible solutions",
    "Troubleshoot systematically until I solve it"
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        5. When you encounter an unfamiliar error or issue, what do you usually do?
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
              name="q5"
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
