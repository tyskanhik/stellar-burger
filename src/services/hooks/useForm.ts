import { ChangeEvent, useState } from 'react';

type FormState = {
  email: string;
  password: string;
};

type FormChangeEvent = (e: ChangeEvent<HTMLInputElement>) => void;

export const useForm = (
  initialState: FormState
): [FormState, FormChangeEvent] => {
  const [values, setValues] = useState(initialState);

  const handleChange: FormChangeEvent = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  return [values, handleChange];
};
