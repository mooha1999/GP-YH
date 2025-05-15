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
  //      if service start time >= previous completion time((we will mention this later) if not first, if first 0):
  //        then waiting time = 0, else waiting time = previous completion time - arrival time
  //    service time: NORMINV(b,2,0.5)
  //    completion time: service time + service start time
  //    time in system: completion time - arrival time
  // 3. the totals and the averages of the following:
  //    interarrival time
  //    waiting time
  //    service time
  //    time in system

  const atmData = [];
  const randoms: {
    a: number;
    b: number;
  }[] = [];
  const iterations = 100;
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
      i === 0 || serviceStartTime >= previousCompletionTime
        ? 0
        : previousCompletionTime - arrivalTime;
    const serviceTime = Math.sqrt(-2 * Math.log(b)) * Math.cos(2 * Math.PI * b);
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

  // display the 2 arrays in 2 tables beside each other
  // the first table will the data and the second table will be the randoms

  return (
    <div>
      <h1>ATM Simulation</h1>
      <div className="flex gap-8">
        <table className="border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-2 py-1">a</th>
              <th className="border border-gray-300 px-2 py-1">b</th>
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
              <td colSpan={3} className="border border-gray-300 px-2 py-1">
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
              <td colSpan={3} className="border border-gray-300 px-2 py-1">
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

      {/* display the randoms table */}
    </div>
  );
}
