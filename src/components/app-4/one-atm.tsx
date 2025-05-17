import { useState } from "react";
import Plot from "react-plotly.js";

export default function OneATM() {
  // step by step we will a loop with 100 iterations
  // each iteration we will:
  // 1. generate 2 random numbers (a and b) between 0 and 1
  // 2. calculate the following:
  //    customer number: index of the iteration + 1
  //    interarrival time: a * 5
  //    arrival time: interarrival time + previous arrival time if not first, if first 0
  //    service start time:
  //      if arrival time >= previous completion time((we will mention this later) if not first, if first 0):
  //        then service start time = arrival time, else service start time = previous completion time
  //    waiting time:
  //      if arrival time >= previous completion time((we will mention this later) if not first, if first 0):
  //        then waiting time = 0, else waiting time = previous completion time - arrival time
  //    service time: NORMINV(b,2,0.5)
  //    completion time: service time + service start time
  //    time in system: completion time - arrival time
  // 3. the totals and the averages of the following:
  //    interarrival time
  //    waiting time
  //    service time
  //    time in system

  const [iterations, setIterations] = useState(100);

  return (
    <div className="flex flex-col gap-4">
      <label>
        Number of iterations:
        <input
          type="number"
          value={iterations}
          onChange={(e) => setIterations(Number(e.target.value))}
          className="border border-gray-300 rounded px-2 py-1"
        />
      </label>
      <Data iterations={iterations} />
    </div>
  );
}

function Data({ iterations }: { iterations: number }) {
  const atmData = [];
  const randoms: {
    a: number;
    b: number;
  }[] = [];
  let previousCompletionTime = 0;
  let previousArrivalTime = 0;
  let totalServiceTime = 0;
  let totalWaitingTime = 0;
  let totalInterarrivalTime = 0;
  let totalTimeInSystem = 0;
  for (let i = 0; i < iterations; i++) {
    const a = Math.random();
    const b = Math.random();
    randoms.push({ a, b });
    const interarrivalTime = a * 5;
    const arrivalTime = i === 0 ? 0 : interarrivalTime + previousArrivalTime;
    const serviceStartTime =
      i === 0 || arrivalTime >= previousCompletionTime
        ? arrivalTime
        : previousCompletionTime;
    const waitingTime =
      i === 0 || arrivalTime >= previousCompletionTime
        ? 0
        : previousCompletionTime - arrivalTime;
    // NORMINV(b, 2, 0.5) approximation using Box-Muller (mean=2, std=0.5)
    const serviceTime =
      2 + 0.5 * (Math.sqrt(-2 * Math.log(b)) * Math.cos(2 * Math.PI * b));
    const completionTime = serviceTime + serviceStartTime;
    const timeInSystem = completionTime - arrivalTime;
    atmData.push({
      customerNumber: i + 1,
      interarrivalTime: interarrivalTime.toFixed(2),
      arrivalTime: arrivalTime.toFixed(2),
      serviceStartTime: serviceStartTime.toFixed(2),
      waitingTime: waitingTime.toFixed(2),
      serviceTime: serviceTime.toFixed(2),
      completionTime: completionTime.toFixed(2),
      timeInSystem: timeInSystem.toFixed(2),
    });
    previousCompletionTime = completionTime;
    previousArrivalTime = arrivalTime;
    totalServiceTime += serviceTime;
    totalWaitingTime += waitingTime;
    totalInterarrivalTime += interarrivalTime;
    totalTimeInSystem += timeInSystem;
  }

  // create something for storing the frequincies of the waiting time
  const waitingTimeFrequencies: {
    [key: string]: number;
    0: number;
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    7: number;
    8: number;
    9: number;
    10: number;
    More: number;
  } = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    More: 0,
  };

  // loop through the waiting time and count the frequencies
  for (let i = 0; i < iterations; i++) {
    const waitingTime = Math.floor(Number(atmData[i].waitingTime));
    console.log(waitingTime);
    if (waitingTime >= 10) {
      waitingTimeFrequencies["More"]++;
    } else {
      waitingTimeFrequencies[waitingTime]++;
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h1>ATM Simulation</h1>
      <div className="flex gap-8">
        <table className="border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-2 py-1">
                Customer Number
              </th>
              <th className="border border-gray-300 px-2 py-1">
                Interarrival Time
              </th>
              <th className="border border-gray-300 px-2 py-1">Arrival Time</th>
              <th className="border border-gray-300 px-2 py-1">
                Service Start Time
              </th>
              <th className="border border-gray-300 px-2 py-1">Waiting Time</th>
              <th className="border border-gray-300 px-2 py-1">Service Time</th>
              <th className="border border-gray-300 px-2 py-1">
                Completion Time
              </th>
              <th className="border border-gray-300 px-2 py-1">
                Time in System
              </th>
            </tr>
          </thead>
          <tbody>
            {atmData.map((data) => (
              <tr key={data.customerNumber}>
                <td className="border border-gray-300 px-2 py-1">
                  {data.customerNumber}
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  {data.interarrivalTime}
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  {data.arrivalTime}
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  {data.serviceStartTime}
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  {data.waitingTime}
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  {data.serviceTime}
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  {data.completionTime}
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  {data.timeInSystem}
                </td>
              </tr>
            ))}
            <tr>
              <td className="border border-gray-300 px-2 py-1">Totals</td>
              <td className="border border-gray-300 px-2 py-1">
                {totalInterarrivalTime.toFixed(2)}
              </td>
              <td className="border border-gray-300 px-2 py-1"></td>
              <td className="border border-gray-300 px-2 py-1"></td>
              <td className="border border-gray-300 px-2 py-1">
                {totalWaitingTime.toFixed(2)}
              </td>
              <td className="border border-gray-300 px-2 py-1">
                {totalServiceTime.toFixed(2)}
              </td>
              <td className="border border-gray-300 px-2 py-1"></td>
              <td className="border border-gray-300 px-2 py-1">
                {totalTimeInSystem.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-2 py-1">Averages</td>
              <td className="border border-gray-300 px-2 py-1">
                {(totalInterarrivalTime / iterations).toFixed(2)}
              </td>
              <td className="border border-gray-300 px-2 py-1"></td>
              <td className="border border-gray-300 px-2 py-1"></td>
              <td className="border border-gray-300 px-2 py-1">
                {(totalWaitingTime / iterations).toFixed(2)}
              </td>
              <td className="border border-gray-300 px-2 py-1">
                {(totalServiceTime / iterations).toFixed(2)}
              </td>
              <td className="border border-gray-300 px-2 py-1"></td>
              <td className="border border-gray-300 px-2 py-1">
                {(totalTimeInSystem / iterations).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex gap-8 overflow-auto">
        <h2 className="text-lg font-semibold mt-8 mb-4">
          Waiting Time Frequencies
        </h2>
        <table className="border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-2 py-1">Waiting Time</th>
              <th className="border border-gray-300 px-2 py-1">Frequency</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(waitingTimeFrequencies).map(([key, value]) => (
              <tr key={key}>
                <td className="border border-gray-300 px-2 py-1">{key}</td>
                <td className="border border-gray-300 px-2 py-1">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Plot
          data={[
            {
              x: Object.keys(waitingTimeFrequencies),
              y: Object.values(waitingTimeFrequencies),
              type: "bar",
              marker: { color: "blue" },
              name: "Waiting Time Frequencies",
              mode: "lines+markers",
              line: { color: "blue", width: 2 },
              text: Object.values(waitingTimeFrequencies).map((val) =>
                val.toFixed(0)
              ),
              textposition: "auto",
              hoverinfo: "text",
            },
          ]}
          layout={{
            title: "Waiting Time Frequencies",
            xaxis: {
              title: "Waiting Time",
            },
            yaxis: {
              title: "Frequency",
            },
          }}
          config={{
            responsive: true,
            displayModeBar: false,
          }}
          style={{ width: "100%", height: "400px" }}
        />
      </div>
    </div>
  );
}
