import { useState, FC, ChangeEvent } from "react";

interface Props {
  title: String;
  defaultValue: number;
  onChange: (value: number) => void;
}

const SizeInput: FC<Props> = ({ title, defaultValue, onChange }) => {
  const [value, setValue] = useState(defaultValue);
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setValue(parseInt(event.target.value, 10));
    onChange(parseInt(event.target.value, 10));
  }

  return (
    <li>
      <span className="info">
        <span className="info-title">{title}</span>
        <input type="number" required value={value} onChange={handleChange} />
      </span>
    </li>
  );
};

export default SizeInput;
