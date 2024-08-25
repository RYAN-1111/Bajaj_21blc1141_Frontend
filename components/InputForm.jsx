"use client";
import { useState } from "react";

export default function InputForm() {
  const [jsonInput, setJsonInput] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const parsedInput = JSON.parse(jsonInput);
      if (!Array.isArray(parsedInput.data)) {
        throw new Error("Invalid JSON format");
      }

      const res = await fetch("https://bajaj-backend-21bce1845.onrender.com/bfhl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: parsedInput.data }),
      });

      const data = await res.json();
      setResponse(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setResponse(null);
    }
  };

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOptions(
      selectedOptions.includes(value)
        ? selectedOptions.filter((opt) => opt !== value)
        : [...selectedOptions, value]
    );
  };

  const filteredResponse = () => {
    if (!response) return {};

    const filteredData = {};
    if (selectedOptions.includes("Numbers")) {
      filteredData.numbers = response.numbers;
    }
    if (selectedOptions.includes("Alphabets")) {
      filteredData.alphabets = response.alphabets;
    }
    if (selectedOptions.includes("Highest Lowercase Alphabet")) {
      filteredData.highestLowercaseAlphabet =
        response.highest_lowercase_alphabet;
    }
    return filteredData;
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4 text-black">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">JSON Input</label>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            rows="4"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            placeholder='{ "data": ["A","B","z"] }'
          ></textarea>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div>
          <label className="block text-gray-700">Select Filters</label>
          <div className="mt-2 space-y-2">
            {["Numbers", "Alphabets", "Highest Lowercase Alphabet"].map(
              (option) => (
                <div key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    value={option}
                    checked={selectedOptions.includes(option)}
                    onChange={handleOptionChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    {option}
                  </label>
                </div>
              )
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {response && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900">Response:</h3>
          <pre className="mt-2 p-4 bg-gray-100 rounded-md">
            {JSON.stringify(filteredResponse(), null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}