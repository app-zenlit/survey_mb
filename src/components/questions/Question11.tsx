interface Question11Props {
  value: string;
  onChange: (value: string) => void;
}

export function Question11({ value, onChange }: Question11Props) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        11. If you could automate your most tedious, manual, or challenging task, which ones would you automate?
      </h2>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Describe the tasks you would like to automate..."
        className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none min-h-40 text-gray-700"
      />
    </div>
  );
}
