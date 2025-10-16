interface Question12Props {
  value: string | null;
  onChange: (value: string) => void;
}

export function Question12({ value, onChange }: Question12Props) {
  const options = [
    "Not interested",
    "Curious but skeptical",
    "Interested and open to learning",
    "Very excited and already exploring them"
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        12. How excited are you about future technologies (e.g., AI, automation, digital twins, AR/VR in design)?
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
              name="q12"
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
