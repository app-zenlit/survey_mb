interface Question10Props {
  value: string[];
  elaborate: string;
  onChange: (value: string[]) => void;
  onElaborateChange: (value: string) => void;
}

export function Question10({ value, elaborate, onChange, onElaborateChange }: Question10Props) {
  const options = [
    "Copy-pasting data between files or systems",
    "Manual report generation",
    "Approving or routing documents",
    "Responding to common queries",
    "Data cleaning or reformatting",
    "Scheduling meetings or reminders",
    "Monitoring dashboards or logs",
    "Sorting/tagging emails or files",
    "Preparing presentations or status updates",
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
        10. Which repetitive tasks take up the most time in your work?
      </h2>
      <p className="text-sm text-gray-600 mb-4">Select all that apply</p>
      <div className="space-y-3 mb-6">
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

      <div>
        <label className="block text-base font-medium text-gray-700 mb-3">
          Elaborate on repetitive tasks:
        </label>
        <textarea
          value={elaborate}
          onChange={(e) => onElaborateChange(e.target.value)}
          placeholder="Provide additional details about your repetitive tasks..."
          className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none min-h-32 text-gray-700"
        />
      </div>
    </div>
  );
}
