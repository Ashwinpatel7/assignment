import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { User, UserFormData } from '../types/User';
import './UserForm.css';

interface UserFormProps {
  initialValues?: User;
  onSubmit: (values: UserFormData | User) => void;
  existingEmails: string[];
  isEdit?: boolean;
  onCancel?: () => void;
}

// Custom email field with autocomplete
const EmailField = ({ field, form, existingEmails, isEdit, initialEmail, ...props }: any) => {
  const [filteredEmails, setFilteredEmails] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  // Get users from localStorage
  React.useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  // Filter emails based on input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    form.setFieldValue(field.name, value);

    if (value.length > 0) {
      const filtered = existingEmails.filter(
        (email: string) => email.toLowerCase().includes(value.toLowerCase()) &&
        (!isEdit || email !== initialEmail)
      );
      setFilteredEmails(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredEmails([]);
      setShowSuggestions(false);
    }
  };

  // Select email from suggestions
  const selectEmail = (email: string) => {
    form.setFieldValue(field.name, email);
    setShowSuggestions(false);
  };

  return (
    <div className="autocomplete-container">
      <input
        {...field}
        {...props}
        onChange={handleInputChange}
        onBlur={() => {
          field.onBlur();
          // Delay hiding suggestions to allow for clicks
          setTimeout(() => setShowSuggestions(false), 200);
        }}
        className={form.touched[field.name] && form.errors[field.name] ? "input-error" : ""}
      />
      {showSuggestions && filteredEmails.length > 0 && (
        <div className="suggestions">
          {filteredEmails.map((email, index) => {
            const user = users.find(u => u.email === email);
            return (
              <div
                key={index}
                className="suggestion-item"
                onClick={() => selectEmail(email)}
              >
                <span>{email}</span>
                {user && <span className="user-name">{user.firstName} {user.lastName}</span>}
              </div>
            );
          })}
        </div>
      )}
      {form.touched[field.name] && form.errors[field.name] && (
        <div className="error">{form.errors[field.name]}</div>
      )}
    </div>
  );
};

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
    .required('Phone number is required'),
  role: Yup.string().required('Role is required'),
  department: Yup.string().required('Department is required'),
  location: Yup.string().required('Location is required'),
});

const UserForm = ({ initialValues, onSubmit, existingEmails, isEdit, onCancel }: UserFormProps) => {
  const initialFormValues: UserFormData | User = initialValues || {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    location: '',
  };

  return (
    <div className="user-form-container">
      <h2>{isEdit ? 'Edit User' : 'Add User'}</h2>
      <p className="form-subtitle">All fields are mandatory</p>

      <Formik
        initialValues={initialFormValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={onSubmit}
        validate={(values) => {
          const errors: Partial<Record<keyof UserFormData, string>> = {};

          // Check for duplicate email
          if (!isEdit && existingEmails.includes(values.email)) {
            errors.email = 'Email already exists';
          }

          // If editing, only check for duplicate if email changed
          if (isEdit &&
              initialValues &&
              values.email !== initialValues.email &&
              existingEmails.includes(values.email)) {
            errors.email = 'Email already exists';
          }

          return errors;
        }}
      >
        {({ errors, touched }) => (
          <Form className="user-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <Field
                  name="firstName"
                  type="text"
                  placeholder="Enter first name"
                  className={touched.firstName && errors.firstName ? "input-error" : ""}
                />
                <ErrorMessage name="firstName" component="div" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <Field
                  name="lastName"
                  type="text"
                  placeholder="Enter last name"
                  className={touched.lastName && errors.lastName ? "input-error" : ""}
                />
                <ErrorMessage name="lastName" component="div" className="error" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <Field
                  name="email"
                  component={EmailField}
                  type="email"
                  placeholder="Enter email address"
                  existingEmails={existingEmails}
                  isEdit={isEdit}
                  initialEmail={initialValues?.email}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <Field
                  name="phone"
                  type="tel"
                  placeholder="10-digit phone number"
                  className={touched.phone && errors.phone ? "input-error" : ""}
                />
                <ErrorMessage name="phone" component="div" className="error" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="role">Role *</label>
                <Field
                  name="role"
                  type="text"
                  placeholder="Enter role"
                  className={touched.role && errors.role ? "input-error" : ""}
                />
                <ErrorMessage name="role" component="div" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="location">Location *</label>
                <Field
                  name="location"
                  type="text"
                  placeholder="Enter location"
                  className={touched.location && errors.location ? "input-error" : ""}
                />
                <ErrorMessage name="location" component="div" className="error" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="department">Department *</label>
                <Field
                  name="department"
                  type="text"
                  placeholder="Enter department"
                  className={touched.department && errors.department ? "input-error" : ""}
                />
                <ErrorMessage name="department" component="div" className="error" />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {isEdit ? 'Update User' : 'Add User'}
              </button>

              {isEdit && onCancel && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onCancel}
                >
                  Cancel
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserForm;
