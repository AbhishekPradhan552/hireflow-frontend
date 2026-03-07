"use client"



export default function UsageBar({ used, limit }) {
  const percent = Math.min((used / limit) * 100, 100);

  return (
    <div className="border rounded p-3 bg-gray-50">
      <p className="text-sm text-gray-700">
        {used} / {limit} resumes parsed this month
      </p>

      <div className="w-full h-2 bg-gray-200 rounded mt-2">
        <div
          className="h-2 bg-blue-600 rounded"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}


