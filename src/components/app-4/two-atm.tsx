export default function TwoATMs() {
  // step by step we will a loop with 100 iterations
  // each iteration we will:
  // 1. generate 2 random numbers (a and b) between 0 and 1
  // 2. calculate the following:
  //    customer number: index of the iteration + 1
  //    ATM: 1 or 2
  //    interarrival time: a * 5
  //    arrival time: interarrival time + previous arrival time if not first, if first 0
  //    service start time:
  //      if arrival time >= previous completion time((we will mention this later) if not first, if first 0):
  //        then service start time = arrival time, else service start time = previous completion time
  //    waiting time:
  //      if arrival time >= Min(time available ATM1(we will mention this later), time available ATM2(we will mention this later)) if not first, if first 0):
  //        then waiting time = 0, else waiting time = Min(time available ATM1, time available ATM2) - arrival time
  //    service time: NORMINV(b,2,0.5)
  //    completion time: service time + service start time
  //    time in system: completion time - arrival time
  //    time available ATM1: if first customer, then completion time, else:
  //     if previous completion time ATM1 == Min(previous completion time ATM1, previous completion time ATM2):
  //       then completion time, else:
  //       previous completion time ATM1
  //    time available ATM2: if first customer, then 0, else:
  //     if previous completion time ATM2 == Min(previous completion time ATM1, previous completion time ATM2):
  //       then completion time, else:
  //       previous completion time ATM2
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

    const serviceStartTime =
      i === 0 || arrivalTime >= previousCompletionTimeATM1
        ? arrivalTime
        : previousCompletionTimeATM1;
    const waitingTime =
      i === 0 ||
      arrivalTime >=
        Math.min(previousCompletionTimeATM1, previousCompletionTimeATM2)
        ? 0
        : Math.min(previousCompletionTimeATM1, previousCompletionTimeATM2) -
          arrivalTime;
    // NORMINV(b, 2, 0.5) approximation using Box-Muller (mean=2, std=0.5)
    const serviceTime =
      2 + 0.5 * (Math.sqrt(-2 * Math.log(b)) * Math.cos(2 * Math.PI * b));
    const completionTime = serviceTime + serviceStartTime;
    const timeInSystem = completionTime - arrivalTime;

    const atm =
      previousCompletionTimeATM1 <= previousCompletionTimeATM2 ? 1 : 2;
    if (atm === 1) {
      previousCompletionTimeATM1 = completionTime;
    } else {
      previousCompletionTimeATM2 = completionTime;
    }

    atmData.push({
      customerNumber: i + 1,
      interarrivalTime: interarrivalTime.toFixed(2),
      arrivalTime: arrivalTime.toFixed(2),
      serviceStartTime: serviceStartTime.toFixed(2),
      waitingTime: waitingTime.toFixed(2),
      serviceTime: serviceTime.toFixed(2),
      completionTime: completionTime.toFixed(2),
      timeInSystem: timeInSystem.toFixed(2),
      timeAvailableATM1: previousCompletionTimeATM1.toFixed(2),
      timeAvailableATM2: previousCompletionTimeATM2.toFixed(2),
      atm,
    });
    previousArrivalTime = arrivalTime;
    totalServiceTime += serviceTime;
    totalWaitingTime += waitingTime;
    totalInterarrivalTime += interarrivalTime;
    totalTimeInSystem += timeInSystem;
  }

  return (
    <div>
      <h1>Two ATMs Simulation</h1>
      <div className="flex gap-8">
        <table className="border border-gray-300">
          <thead>
            <tr>
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
              <th className="border border-gray-300 px-2 py-1">
                Time Available ATM1
              </th>
              <th className="border border-gray-300 px-2 py-1">
                Time Available ATM2
              </th>
            </tr>
          </thead>
          <tbody>
            {atmData.map((data) => (
              <tr key={data.customerNumber}>
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
                <td className="border border-gray-300 px-2 py-1">
                  {data.timeAvailableATM1}
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  {data.timeAvailableATM2}
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
