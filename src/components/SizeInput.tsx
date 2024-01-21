import { useState, FC, ChangeEvent } from "react";

interface Props {
  title: String;
  defaultValue: number;
  onChange: (value: number) => void;
}

const SizeInput: FC<Props> = ({ title, defaultValue, onChange }) => {
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    onChange(parseInt(event.target.value, 10));
  }

  return (
    <li>
      <span className="info">
        <span className="info-title">{title}</span>
        <input
          type="number"
          required
          value={defaultValue}
          onChange={handleChange}
        />
      </span>
    </li>
  );
};

export default SizeInput;
