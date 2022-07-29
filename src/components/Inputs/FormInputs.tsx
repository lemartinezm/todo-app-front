/**
 * Inputs for use with Formik
 */
import { AddIcon, CalendarIcon, ViewIcon } from '@chakra-ui/icons';
import { Flex, FormControl, FormErrorMessage, FormLabel, Icon, Input, InputGroup, InputRightElement, ListItem, Select, Text, Textarea, UnorderedList } from '@chakra-ui/react';
import { Field, FieldProps } from 'formik';
import { useState } from 'react';
import DatePicker from 'react-datepicker';

// Styles for date picker
import 'react-datepicker/dist/react-datepicker.css';
import { BiX } from 'react-icons/bi';

export type FormTextInputProps = {
  name: string,
  label: string,
  type: 'text' | 'password',
  placeholder: string
}

export function FormTextInput({
  name,
  label,
  type,
  placeholder
}: FormTextInputProps) {
  const [showPass, setShowPass] = useState<boolean>(false);

  return (
    <Field name={name} >
      {({ form: { handleChange }, meta: { error, touched }, field: { value } }: FieldProps) => (
        <FormControl isInvalid={!!error && touched}>
          <FormLabel>
            {label}
          </FormLabel>
          <InputGroup>
            <Input
              id={name}
              type={type === 'text' || showPass ? 'text' : 'password'}
              value={value}
              placeholder={placeholder}
              onChange={handleChange}
            />
            {
              type === 'password'
                ? <InputRightElement onClick={() => setShowPass(!showPass)} cursor='pointer' >
                  <ViewIcon />
                </InputRightElement>
                : null
            }
          </InputGroup>

          {
            touched && !!error
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

export type FormMultiTextProps = {
  name: string,
  label: string,
  placeholder: string
}

export function FormMultiText({
  name,
  label,
  placeholder
}: FormMultiTextProps) {
  const [tempValue, setTempValue] = useState<string>('');

  function handleAddItem(name: string, fieldValue: string[], setFieldValue: any) {
    const temp = [...fieldValue];
    temp.push(tempValue);
    setFieldValue(name, temp);
    setTempValue('');
  }

  function handleDeleteItem(name: string, index: number, fieldValue: string[], setFieldValue: any) {
    const temp = [...fieldValue];
    temp.splice(index, 1);
    setFieldValue(name, temp);
  }

  function handleOnKeyDown(e: any, name: string, fieldValue: string[], setFieldValue: any) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddItem(name, fieldValue, setFieldValue);
    }
  }

  return (
    <Field name={name} >
      {({ form: { setFieldValue }, meta: { error, touched }, field: { value: fieldValue } }: FieldProps) => (
        <FormControl isInvalid={!!error && touched}>
          <FormLabel>
            {label}
          </FormLabel>
          <InputGroup>
            <Input
              id={name}
              type='text'
              value={tempValue}
              placeholder={placeholder}
              onChange={(e) => setTempValue(e.target.value)}
              onKeyDown={(e) => handleOnKeyDown(e, name, fieldValue, setFieldValue)}
            />

            <InputRightElement onClick={() => handleAddItem(name, fieldValue, setFieldValue)} cursor='pointer' >
              <AddIcon />
            </InputRightElement>

          </InputGroup>

          {
            touched && !!error
              ? <FormErrorMessage>{error}</FormErrorMessage>
              : null
          }

          <Flex ml='16px'>
            <UnorderedList>
              {
                fieldValue.map((item: string, index: number) => (
                  <ListItem key={`item-${index}`}>
                    <Text display='flex' justifyContent='space-between' alignItems='center'>
                      {item}
                      <Icon
                        as={BiX}
                        onClick={() => handleDeleteItem(name, index, fieldValue, setFieldValue)}
                        cursor='pointer'
                        ml='5px'
                      />
                    </Text>
                  </ListItem>
                ))
              }
            </UnorderedList>
          </Flex>
        </FormControl>
      )}
    </Field>
  );
}
