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
  const [teamIndex, setTeamIndex] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { token } = useContext(LoginContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    getMyTeams(token, undefined, currentPage)
      .then((res: ITeamResponse) => {
        setTeams(res.teams ? res.teams : []);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, [isLoading, currentPage]);

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
            <Flex flexDir='column' w='270px' gap='16px' p='16px' overflowY='auto' overflowX='hidden' boxSizing='border-box'>
              <Button
                bgColor='blue.500'
                _hover={{ bgColor: 'blue.700' }}
                leftIcon={<AddIcon />}
                px='16px'
                minH='40px'
                onClick={() => {
                  onOpen();
                }}
              >
                Create Team
              </Button>
              {
                teams.map((team, index) => (
                  <TeamItem
                    key={`team-${index}`}
                    team={team}
                    setTeamIndex={() => setTeamIndex(index)}
                  />
                ))
              }
            </Flex>

            {
              teamIndex !== undefined
                ? <TeamDescription team={teams[teamIndex]} updateCurrentPage={setCurrentPage} />
                : <Flex justify='center' align='center' w='100%' h='100%'>
                  Select a Team
                </Flex>
            }

            <CustomDrawer
              isOpen={isOpen}
              onClose={onClose}
              title={'Create Team'}
            >
              <NewTeamForm onSubmit={handleSubmit} />
            </CustomDrawer>
          </Flex>
      }
    </>
  );
}
