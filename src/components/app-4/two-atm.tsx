export default function TwoATMs() {
  const atmData = [];
  const randoms: {
    a: number;
    b: number;
  }[] = [];
  const iterations = 100;
  let previousCompletionTimeATM1 = 0;
  let previousCompletionTimeATM2 = 0;
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

    // Choose which ATM is available first
    const earliestATM =
      previousCompletionTimeATM1 <= previousCompletionTimeATM2 ? 1 : 2;
    const previousCompletionTime =
      earliestATM === 1
        ? previousCompletionTimeATM1
        : previousCompletionTimeATM2;

    const serviceStartTime =
      i === 0 || arrivalTime >= previousCompletionTime
        ? arrivalTime
        : previousCompletionTime;

    const waitingTime =
      i === 0 || serviceStartTime >= previousCompletionTime
        ? 0
        : previousCompletionTime - arrivalTime;

    // NORMINV(b, 2, 0.5) approximation using Box-Muller (mean=2, std=0.5)
    const serviceTime =
      2 + 0.5 * (Math.sqrt(-2 * Math.log(b)) * Math.cos(2 * Math.PI * b));

    const completionTime = serviceStartTime + serviceTime;
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
      atm: earliestATM,
    });

    totalServiceTime += serviceTime;
    totalWaitingTime += waitingTime;
    totalInterarrivalTime += interarrivalTime;
    totalTimeInSystem += timeInSystem;
    previousArrivalTime = arrivalTime;

    // Update the ATM that was used
    if (earliestATM === 1) {
      previousCompletionTimeATM1 = completionTime;
    } else {
      previousCompletionTimeATM2 = completionTime;
    }
  }

  return (
    <div>
      <h1>Two ATMs Simulation</h1>
      <div className="flex gap-8">
        <table className="border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-2 py-1">a</th>
              <th className="border border-gray-300 px-2 py-1">b</th>
              <th className="border border-gray-300 px-2 py-1">
                Customer Number
              </th>
              <th className="border border-gray-300 px-2 py-1">ATM</th>
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
            {atmData.map((data, idx) => (
              <tr key={data.customerNumber}>
                <td className="border border-gray-300 px-2 py-1">
                  {randoms[idx].a.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  {randoms[idx].b.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  {data.customerNumber}
                </td>
                <td className="border border-gray-300 px-2 py-1">{data.atm}</td>
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
              <td colSpan={4} className="border border-gray-300 px-2 py-1">
                Totals
              </td>
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
              <td colSpan={4} className="border border-gray-300 px-2 py-1">
                Averages
              </td>
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
    </div>
  );
}
