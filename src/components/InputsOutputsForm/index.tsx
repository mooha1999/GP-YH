import { useFieldArray, useForm } from "react-hook-form";

import styles from "./index.module.css";
import { useEffect, useState } from "react";
import App2DataDisplay, {
  App2DataDisplayProps,
  EvaluationRate,
} from "../App2DataDisplay";

interface InputsOutputsFormProps {
  hospitalsCount: number;
  inputs: {
    name: string;
  }[];
  outputs: {
    name: string;
  }[];
}

export default function InputsOutputsForm({
  hospitalsCount,
  inputs,
  outputs,
}: InputsOutputsFormProps) {
  const [formValue, setFormValue] = useState<App2DataDisplayProps | null>(null);
  const [evaluationRate, setEvaluationRate] = useState<EvaluationRate>("BOTH");
  const { control: controlHospitalNames, handleSubmit } =
    useForm<HospitalsData>({
      defaultValues: {
        hospitals: Array.from({ length: hospitalsCount }, () => ({
          name: "",
          inputs: inputs.map((input) => ({ name: input.name, value: 0 })),
          outputs: outputs.map((output) => ({ name: output.name, value: 0 })),
        })),
      },
    });

  const { fields: hospitalsNamesFields, replace } = useFieldArray({
    name: "hospitals",
    control: controlHospitalNames,
  });

  useEffect(() => {
    replace(
      Array.from({ length: hospitalsCount }, () => ({
        name: "",
        inputs: inputs.map((input) => ({ name: input.name, value: 0 })),
        outputs: outputs.map((output) => ({ name: output.name, value: 0 })),
      }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hospitalsCount, inputs, outputs]);

  const submitHandler = handleSubmit((data) => {
    setFormValue({
      hospitals: data.hospitals.map((hospital, index) => ({
        ...hospital,
        id: index.toString(),
      })),
      evaluationRate: "BOTH",
    });
  });

  return (
    <>
      <form className={styles["inputs-outputs-form"]} onSubmit={submitHandler}>
        <h2>Hospitals</h2>
        {hospitalsNamesFields.map((hospitalField, index) => (
          <div key={hospitalField.id}>
            <label>
              Hospital {index + 1} name:
              <input
                type="text"
                {...controlHospitalNames.register(`hospitals.${index}.name`, {
                  required: "This field is required",
                })}
              />
            </label>
            <div>
              <h3>Inputs</h3>
              {hospitalField.inputs.map((inputField, inputIndex) => (
                <label key={inputField.name}>
                  {inputField.name}:
                  <input
                    type="number"
                    {...controlHospitalNames.register(
                      `hospitals.${index}.inputs.${inputIndex}.value`,
                      {
                        valueAsNumber: true,
                      }
                    )}
                  />
                </label>
              ))}
            </div>
            <div>
              <h3>Outputs</h3>
              {hospitalField.outputs.map((outputField, outputIndex) => (
                <label key={outputField.name}>
                  {outputField.name}:
                  <input
                    type="number"
                    {...controlHospitalNames.register(
                      `hospitals.${index}.outputs.${outputIndex}.value`,
                      {
                        valueAsNumber: true,
                      }
                    )}
                  />
                </label>
              ))}
            </div>
          </div>
        ))}
        <div>
          <h2>Evaluation rate</h2>
          <label>
            <input
              type="radio"
              name="evaluationRate"
              value="INPUT"
              checked={evaluationRate === "INPUT"}
              onChange={() => setEvaluationRate("INPUT")}
            />
            Inputs
          </label>
          <label>
            <input
              type="radio"
              name="evaluationRate"
              value="OUTPUT"
              checked={evaluationRate === "OUTPUT"}
              onChange={() => setEvaluationRate("OUTPUT")}
            />
            Outputs
          </label>
          <label>
            <input
              type="radio"
              name="evaluationRate"
              value="BOTH"
              checked={evaluationRate === "BOTH"}
              onChange={() => setEvaluationRate("BOTH")}
            />
            Both
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>

      {formValue && (
        <App2DataDisplay
          hospitals={formValue.hospitals}
          evaluationRate={formValue.evaluationRate}
        />
      )}
    </>
  );
}

interface HospitalsData {
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
