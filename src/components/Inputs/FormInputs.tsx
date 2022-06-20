/**
 * Inputs for use with Formik
 */
import { CalendarIcon } from '@chakra-ui/icons';
import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement, Select, Textarea } from '@chakra-ui/react';
import { Field, FieldProps } from 'formik';
import DatePicker from 'react-datepicker';

// Styles for date picker
import 'react-datepicker/dist/react-datepicker.css';

export type FormTextInputProps = {
  name: string,
  label: string,
  type: string,
  placeholder: string
}

export function FormTextInput({
  name,
  label,
  type,
  placeholder
}: FormTextInputProps) {
  return (
    <Field name={name} >
      {({ form: { handleChange }, meta: { error }, field: { value } }: FieldProps) => (
        <FormControl isInvalid={!!error}>
          <FormLabel>
            {label}
          </FormLabel>
          <Input
            id={name}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
          />
          {
            error
              ? <FormErrorMessage>{error}</FormErrorMessage>
              : null
          }
        </FormControl>
      )}
    </Field>
  );
}

export type FormTextareaInputProps = {
  name: string,
  label: string,
  placeholder: string
}

export function FormTextareaInput({
  name,
  label,
  placeholder
}: FormTextareaInputProps) {
  return (
    <Field name={name} >
      {({ form: { handleChange }, meta: { error }, field: { value } }: FieldProps) => (
        <FormControl isInvalid={!!error}>
          <FormLabel>
            {label}
          </FormLabel>
          <Textarea
            id={name}
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
          />
          {
            error
              ? <FormErrorMessage>{error}</FormErrorMessage>
              : null
          }
        </FormControl>
      )}
    </Field>
  );
}

export type FormSelectInputProps = {
  name: string,
  label: string,
  placeholder: string,
  values: string[],
  valuesLabels?: string[]
}

export function FormSelectInput({
  name,
  label,
  placeholder,
  values,
  valuesLabels
}: FormSelectInputProps) {
  return (
    <Field name={name} >
      {({ meta: { error }, form: { handleChange }, field: { value } }: FieldProps) => (
        <FormControl isInvalid={!!error}>
          <FormLabel>
            {label}
          </FormLabel>
          <Select id={name} placeholder={placeholder} onChange={handleChange} defaultValue={value}>
            {
              values.map((value, index) => (
                <option key={index} value={value}>
                  {
                    valuesLabels ? valuesLabels[index] || value : value
                  }
                </option>
              ))
            }
          </Select>
          {
            error
              ? <FormErrorMessage>{error}</FormErrorMessage>
              : null
          }
        </FormControl>
      )}
    </Field>
  );
}

export type FormDatePickerProps = {
  name: string,
  label: string
}

export function FormDatePicker({
  name,
  label
}: FormDatePickerProps) {
  return (
    <Field name={name}>
      {({ meta: { error }, form: { setFieldValue }, field: { value } }: FieldProps) => (
        <FormControl>
          <FormLabel>
            {label}
          </FormLabel>
          <InputGroup>
            <Input
              as={DatePicker}
              id={name}
              selected={value}
              onChange={date => setFieldValue(name, date)}
            />
            <InputRightElement>
              <CalendarIcon />
            </InputRightElement>
          </InputGroup>
          {
            error
              ? <FormErrorMessage>{error}</FormErrorMessage>
              : null
          }
        </FormControl>
      )}

    </Field>

  );
}
