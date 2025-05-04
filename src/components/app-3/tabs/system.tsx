import Plot from "react-plotly.js";
import { ClinicInputs, ClinicOutputs } from "../app-3-result";

interface Props {
  inputs: ClinicInputs;
  metrics: ClinicOutputs;
}

export default function SystemTab({ inputs, metrics }: Props) {
  // calculate the following for each meanCustomersInSystem and meanTimeCustomerInSystem:
  // min, max, avg, std deviation

  const getMinMaxAvgSd = (arr: number[]) => {
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;
    let avg = 0;
    let sd = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] < min) {
        min = arr[i];
      }
      if (arr[i] > max) {
        max = arr[i];
      }
      avg += arr[i];
    }
    avg /= arr.length;
    for (let i = 0; i < arr.length; i++) {
      sd += Math.pow(arr[i] - avg, 2);
    }
    sd = Math.sqrt(sd / arr.length);
    return [min, max, avg, sd] as const;
  };

  const meanCustomersInSystemStats = getMinMaxAvgSd(
    metrics.meanCustomersInSystem.value
  );
  const meanTimeCustomerInSystemStats = getMinMaxAvgSd(
    metrics.meanTimeCustomerInSystem.value
  );

  const displayData = {
    type: inputs.type,
    meanCustomersInSystem: metrics.meanCustomersInSystem,
    type2: inputs.type,
    meanTimeCustomerInSystem: metrics.meanTimeCustomerInSystem,
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">System Metrics</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-sm">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-300">
            {Object.entries(displayData).map(([key, { label }]) => (
              <th
                key={key}
                className="px-4 py-2 text-left border-r border-gray-300 last:border-r-0"
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {inputs.type.value.map((_, index) => (
            <tr key={index} className="border-b">
              {Object.entries(displayData).map(([key, { value }]) => (
                <td key={key} className="px-4 py-2">
                  {value[index]}
                </td>
              ))}
            </tr>
          ))}
          <tr className="border-b">
            <td className="px-4 py-2">Mean</td>
            <td className="px-4 py-2">{meanCustomersInSystemStats[2]}</td>
            <td className="px-4 py-2"></td>
            <td className="px-4 py-2">{meanTimeCustomerInSystemStats[2]}</td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2">SD</td>
            <td className="px-4 py-2">{/*meanCustomersInSystemStats[3]*/}</td>
            <td className="px-4 py-2"></td>
            <td className="px-4 py-2">{meanTimeCustomerInSystemStats[3]}</td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2">Max</td>
            <td className="px-4 py-2">{meanCustomersInSystemStats[1]}</td>
            <td className="px-4 py-2"></td>
            <td className="px-4 py-2">{meanTimeCustomerInSystemStats[1]}</td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2">Min</td>
            <td className="px-4 py-2">{meanCustomersInSystemStats[0]}</td>
            <td className="px-4 py-2"></td>
            <td className="px-4 py-2">{meanTimeCustomerInSystemStats[0]}</td>
          </tr>
        </tbody>
      </table>
      <Plot
        data={[
          {
            x: inputs.type.value,
            y: metrics.meanCustomersInSystem.value,
            type: "bar",
            name: "Mean Customers in System",
          },
        ]}
        layout={{
          title: "System Metrics",
          xaxis: { title: "Type" },
          yaxis: { title: "Value" },
        }}
        config={{ responsive: true, displayModeBar: false }}
      />
      <Plot
        data={[
          {
            x: inputs.type.value,
            y: metrics.meanTimeCustomerInSystem.value,
            type: "bar",
            name: "Mean Time Customer in System",
          },
        ]}
        layout={{
          title: "System Metrics",
          xaxis: { title: "Type" },
          yaxis: { title: "Value" },
        }}
        config={{ responsive: true, displayModeBar: false }}
      />
    </div>
  );
}
