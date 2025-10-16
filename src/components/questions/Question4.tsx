interface Question4Props {
  value: string | null;
  onChange: (value: string) => void;
}

export function Question4({ value, onChange }: Question4Props) {
  const options = [
    "I tend to postpone using new tools because they often change or don't stick around.",
    "I need guidance from someone else.",
    "I can manage with a tutorial or quick help guide.",
    "I enjoy figuring it out myself and experimenting."
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        4. How do you feel to use a new app, tool, or digital solutions?
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
              name="q4"
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
