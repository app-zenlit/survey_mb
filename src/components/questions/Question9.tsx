interface Question9Props {
  value: string | null;
  onChange: (value: string) => void;
}

export function Question9({ value, onChange }: Question9Props) {
  const options = [
    "I don't check / I just trust it",
    "I sometimes check but not sure what to look for",
    "I check sender, links, and security indicators",
    "I apply multiple checks and also use security tools"
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        9. How do you usually check if a website or email is safe/authentic?
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
              name="q9"
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
