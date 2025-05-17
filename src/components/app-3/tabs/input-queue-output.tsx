import { ClinicInputs, ClinicOutputs } from "../app-3-result";

interface Props {
  inputs: ClinicInputs;
  metrics: ClinicOutputs;
}

export default function InputQueueOutputTab({ inputs, metrics }: Props) {
  const meanInterarrivalTime = metrics.meanInterarrivalTime.value;

  // calculate the min, max, and avg of the mean interarrival time
  const minMeanInterarrivalTime = Math.min(...meanInterarrivalTime);
  const maxMeanInterarrivalTime = Math.max(...meanInterarrivalTime);
  const avgMeanInterarrivalTime =
    meanInterarrivalTime.reduce((acc, curr) => acc + curr, 0) /
    meanInterarrivalTime.length;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">Queue Metrics</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-sm">
        <thead>
          <tr className="bg-gray-100">
            {Object.entries(inputs).map(([key, { label }]) => (
              <th key={key} className="px-4 py-2 text-left">
                {label}
              </th>
            ))}
            {Object.entries(metrics).map(([key, { label }]) => (
              <th key={key} className="px-4 py-2 text-left">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {inputs.type.value.map((_, index) => (
            <tr key={index} className="border-b">
              {Object.entries(inputs).map(([key, { value }]) => (
                <td key={key} className="px-4 py-2">
                  {value[index]}
                </td>
              ))}
              {Object.entries(metrics).map(([key, { value }]) => (
                <td key={key} className="px-4 py-2">
                  {value[index]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="text-lg font-semibold mt-8 mb-4">
        Mean Interarrival Time Statistics
      </h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Statistic</th>
            <th className="px-4 py-2 text-left">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="px-4 py-2">Min</td>
            <td className="px-4 py-2">{minMeanInterarrivalTime}</td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2">Max</td>
            <td className="px-4 py-2">{maxMeanInterarrivalTime}</td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2">Avg</td>
            <td className="px-4 py-2">{avgMeanInterarrivalTime}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
