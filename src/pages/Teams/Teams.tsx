import { Button, Flex, Spinner, useDisclosure } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { CustomDrawer, TeamItem } from '../../components';
import { LoginContext } from '../../context/LoginContext';
import { ITeamResponse } from '../../services/interfaces/team';
import { ITeam } from '../../models/Teams/teams.model';
import { createNewTeam, getMyTeams } from '../../services/teams.service';
import { AddIcon } from '@chakra-ui/icons';
import { NewTeamForm } from './components/NewTeamForm';
import { TeamDescription } from './components/TeamDescription';

export function Teams() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [currentTeam, setCurrentTeam] = useState<ITeam>();
  const { token } = useContext(LoginContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    getMyTeams(token)
      .then((res: ITeamResponse) => {
        console.log(res);
        setTeams(res.teams ? res.teams : []);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, [isLoading]);

  function handleSubmit(values: any) {
    createNewTeam(token, values)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      {
        isLoading
          ? <Flex>
            <Spinner />
          </Flex>
          : <Flex gap='16px' w='100%'>
            <Flex flexDir='column' gap='16px' p='16px'>
              <Button
                bgColor='blue.500'
                _hover={{ bgColor: 'blue.700' }}
                leftIcon={<AddIcon />}
                w='fit-content'
                onClick={() => {
                  console.log('onClick');
                  onOpen();
                }}
              >
                Create New Team
              </Button>
              {
                teams.map((team, index) => (
                  <TeamItem
                    key={`team-${index}`}
                    team={team}
                    selectTeam={setCurrentTeam}
                  />
                ))
              }

              <CustomDrawer
                isOpen={isOpen}
                onClose={onClose}
                title={'Create Team'}
              >
                <NewTeamForm onSubmit={handleSubmit} />
              </CustomDrawer>
            </Flex>
            {
              currentTeam
                ? <TeamDescription team={currentTeam} />
                : <Flex justify='center' align='center' w='100%' h='100%'>
                  Select a Team
                </Flex>
            }
          </Flex>
      }
    </>
  );
}
