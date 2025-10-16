interface Question13Props {
  value: string[];
  onChange: (value: string[]) => void;
}

export function Question13({ value, onChange }: Question13Props) {
  const options = [
    "Trial and error",
    "Tutorials or guides",
    "Formal training/workshops",
    "AI Tools (like Direct chat, ChatGPT)",
    "Asking colleagues/mentors",
    "Online forums/communities",
    "Other (please specify)"
  ];

  const handleToggle = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        13. How do you usually learn new digital tools?
      </h2>
      <p className="text-sm text-gray-600 mb-4">Select all that apply</p>
      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option}
            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
              value.includes(option)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
            }`}
          >
            <input
              type="checkbox"
              checked={value.includes(option)}
              onChange={() => handleToggle(option)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
