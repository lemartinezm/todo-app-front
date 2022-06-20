/**
 * Inputs for use with Formik
 */
import { FormControl, FormErrorMessage, FormLabel, Input, Select, Textarea } from '@chakra-ui/react';
import { Field, FieldProps } from 'formik';

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
      {({ form: { handleChange }, meta: { error } }: FieldProps) => (
        <FormControl isInvalid={!!error}>
          <FormLabel>
            {label}
          </FormLabel>
          <Input
            id={name}
            type={type}
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
      {({ form: { handleChange }, meta: { error } }: FieldProps) => (
        <FormControl isInvalid={!!error}>
          <FormLabel>
            {label}
          </FormLabel>
          <Textarea
            id={name}
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
  values: string[]
}

export function FormSelectInput({
  name,
  label,
  placeholder,
  values
}: FormSelectInputProps) {
  return (
    <Field name={name} >
      {({ meta: { error }, form: { handleChange } }: FieldProps) => (
        <FormControl isInvalid={!!error}>
          <FormLabel>
            {label}
          </FormLabel>
          <Select id={name} placeholder={placeholder} onChange={handleChange}>
            {
              values.map((value, index) => (
                <option key={index} value={value}>{value}</option>
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
