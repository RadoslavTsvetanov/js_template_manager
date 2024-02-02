'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface InputData {
  label: string;
  type?: string;
  name: string;
}

interface FormData {
  [key: string]: string;
}

interface FormProps {
  button_text: string;
  input_data_arr: InputData[];
}

function Form({ button_text, input_data_arr }: FormProps) {
    const [formData, setFormData] = useState<FormData>({});
  
    const handleInputChange = (inputName: string, value: string) => {
      setFormData({
        ...formData,
        [inputName]: value,
      });
    };
  
    const handleSubmit = (event: FormEvent) => {
      event.preventDefault();
      console.log('Form submitted with data:', Object.entries(formData));
    };
  
    return (
      <form onSubmit={handleSubmit}>
        {input_data_arr.map((input, index) => (
          <div key={index}>
            <label>{input.label}</label>
            <input
              type={input.type || 'text'}
              value={formData[input.name] || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange(input.name, e.target.value)
              }
            />
          </div>
        ))}
        <button type="submit">{button_text}</button>
      </form>
    );
  }
  
export default Form;
