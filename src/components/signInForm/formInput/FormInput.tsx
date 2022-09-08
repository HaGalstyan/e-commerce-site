export interface IInputOptions {
  name: string;
  type: string;
  required: boolean;
  value: string;
  onChange: (event: any) => void;
}
export interface IFormInput {
  label: string;
  inputOptions: IInputOptions;
}

const FormInput = ({ label, inputOptions }: IFormInput) => {
  return (
    <div className="group">
      <input className="form-input" {...inputOptions} />
      {label && (
        <label
          className={`${
            inputOptions.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
