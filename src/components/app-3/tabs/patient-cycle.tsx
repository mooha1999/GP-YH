import { useCallback } from "react";
import { ClinicInputs, ClinicOutputs } from "../app-3-result";

interface Props {
  inputs: ClinicInputs;
  metrics: ClinicOutputs;
}

export default function PatientCycleTab({ inputs, metrics }: Props) {
  // calculate the following:
  // cycle waiting time %age
  //  -> mean waiting time / (mean time customer in system * 60)
  // cycle service time %age
  //  -> mean service time / ( 60 * mean time customer in system)

  const cycleWaitingTimePercentage = inputs.meansWaitingTime.value.map(
    (time, i) => {
      return time / (metrics.meanTimeCustomerInSystem.value[i] * 60);
    }
  );

  const cycleServiceTimePercentage = inputs.meansServiceTime.value.map(
    (time, i) => {
      return time / (60 * metrics.meanTimeCustomerInSystem.value[i]);
    }
  );

  const displayData = {
    type: inputs.type,
    meansWaitingTime: inputs.meansWaitingTime,
    meansServiceTime: inputs.meansServiceTime,
    meanTimeCustomerInSystem: metrics.meanTimeCustomerInSystem,
    cycleWaitingTimePercentage: {
      label: "cycle waiting time %age",
      value: cycleWaitingTimePercentage,
    },
    cycleServiceTimePercentage: {
      label: "cycle service time %age",
      value: cycleServiceTimePercentage,
    },
  };

  // calculate the min, max, and avg of: meanWaitingTime, meanServiceTime, and meanCustomersInSystem, cycleWaitingTimePercentage, cycleServiceTimePercentage

  const getMinMaxAvg = useCallback((arr: number[]) => {
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;
    let avg = 0;
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
    return [min, max, avg] as const;
  }, []);

  const minMaxAvg = {
    meansWaitingTime: {
      label: "mean waiting statistics",
      value: getMinMaxAvg(inputs.meansWaitingTime.value),
    },
    meansServiceTime: {
      label: "mean service statistics",
      value: getMinMaxAvg(inputs.meansServiceTime.value),
    },
    meanCustomersInSystem: {
      label: "mean customers in system statistics",
      value: getMinMaxAvg(metrics.meanTimeCustomerInSystem.value),
    },
    cycleWaitingTimePercentage: {
      label: "cycle waiting time %age statistics",
      value: getMinMaxAvg(cycleWaitingTimePercentage),
    },
    cycleServiceTimePercentage: {
      label: "cycle service time %age statistics",
      value: getMinMaxAvg(cycleServiceTimePercentage),
    },
  };

  return (
    <div className="w-full  ">
      <h2 className="text-lg font-semibold mb-4">Patient Cycle Metrics</h2>
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
        </tbody>
      </table>
      <h2 className="text-lg font-semibold mt-8 mb-4">
        Patient Cycle Metrics Statistics
      </h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-sm">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-300">
            <th className="px-4 py-2 text-left">Statistic</th>
            {Object.entries(minMaxAvg).map(([key, { label }]) => (
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
          <tr className="border-b">
            <td className="px-4 py-2">Min</td>
            {Object.entries(minMaxAvg).map(([key, { value }]) => (
              <td key={key} className="px-4 py-2">
                {value[0]}
              </td>
            ))}
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2">Max</td>
            {Object.entries(minMaxAvg).map(([key, { value }]) => (
              <td key={key} className="px-4 py-2">
                {value[1]}
              </td>
            ))}
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2">Avg</td>
            {Object.entries(minMaxAvg).map(([key, { value }]) => (
              <td key={key} className="px-4 py-2">
                {value[2]}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
