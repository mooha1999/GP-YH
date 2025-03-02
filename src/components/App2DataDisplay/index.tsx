interface App2DataDisplayProps {
  hospitals: {
    name: string;
    inputs: {
      name: string;
      value: number;
    }[];
    outputs: {
      name: string;
      value: number;
    }[];
  }[];
}

export default function App2DataDisplay({ hospitals }: App2DataDisplayProps) {
  // the data will be used to display the following tables:
  // - Table 1:
  //   -

  return (
    <div>
      {hospitals.map((hospital, index) => (
        <div key={index}>
          <h2>{hospital.name}</h2>
          <div>
            <h3>Inputs</h3>
            {hospital.inputs.map((input, inputIndex) => (
              <div key={inputIndex}>
                <span>{input.name}:</span>
                <span>{input.value}</span>
              </div>
            ))}
          </div>
          <div>
            <h3>Outputs</h3>
            {hospital.outputs.map((output, outputIndex) => (
              <div key={outputIndex}>
                <span>{output.name}:</span>
                <span>{output.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
