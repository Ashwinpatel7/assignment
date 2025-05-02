import React from 'react';
import { Field, ErrorMessage, useField } from 'formik';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  as?: string;
  children?: React.ReactNode;
  required?: boolean;
  className?: string;
}

/**
 * A reusable form field component that works with Formik
 */
const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  as,
  children,
  required = false,
  className = '',
}) => {
  const [field, meta] = useField(name);
  const hasError = meta.touched && meta.error;

  return (
    <div className={`form-group ${className}`}>
      <label htmlFor={name}>
        {label} {required && <span className="required">*</span>}
      </label>
      
      {as ? (
        <Field
          as={as}
          id={name}
          name={name}
          className={hasError ? 'input-error' : ''}
          {...field}
        >
          {children}
        </Field>
      ) : (
        <Field
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className={hasError ? 'input-error' : ''}
        />
      )}
      
      <ErrorMessage name={name} component="div" className="error" />
    </div>
  );
};

export default FormField;
