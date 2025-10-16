interface Question2Props {
  value: string | null;
  onChange: (value: string) => void;
}

export function Question2({ value, onChange }: Question2Props) {
  const options = [
    "I stick to what I know.",
    "I try new tools only if someone recommends or mandates them.",
    "I explore tools if I hear they might help me.",
    "I actively seek, test, and share new tools with colleagues."
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        2. How do you usually discover or adopt new tech tools?
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
              name="q2"
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
