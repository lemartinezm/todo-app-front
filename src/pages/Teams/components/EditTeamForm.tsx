import { Button, Flex } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { FormMultiText, FormTextInput } from '../../../components/Inputs/FormInputs';
import { ITeam } from '../../../models/Teams/teams.model';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  participants: Yup.array().nullable(),
  todos: Yup.array().nullable()
});

export type EditTeamFormProps = {
  team: ITeam;
  onSubmit: (values: any) => any;
}

export function EditTeamForm({
  team,
  onSubmit
}: EditTeamFormProps) {
  return (
    <Formik
      initialValues={{
        name: team.name,
        participants: team.participants.map((participant) => (participant.username))
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <Flex flexDir='column' gap='30px'>
          <FormTextInput
            name='name'
            label='Name'
            placeholder='Write the team name'
            type='text'
          />

          <FormMultiText
            name='participants'
            label='Participants'
            placeholder='Write username to add'
          />

          <Button type='submit'>
            Update Team
          </Button>
        </Flex>
      </Form>
    </Formik>
  );
}
