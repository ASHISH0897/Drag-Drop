import React, { useState } from 'react';
import { Container, Stack, Flex, List, ListItem, Heading } from "@chakra-ui/react";
import Player from './components/Player';
import { useDrop } from 'react-dnd';
const App = () => {
  const [players, setPlayer] = useState([
    { name: "Player 1" },
    { name: "Player 2" },
    { name: "Player 3" },
    { name: "Player 4" },
    { name: "Player 5" },
  ]);
  const [team, setTeam] = useState([]);

  const [{ isOver }, addToTeamRef] = useDrop({
    accept: "player",
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });
  const [{ isOver: isPlayerOver }, removeFromTeamRef] = useDrop({
    accept: "team",
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });

const movePlayerToTeam = (item) => {
  console.log(item);
  setPlayer((prev) => prev.filter((_, i) => i !== item.index));
  setTeam((prev) => [...prev, item]);
};
const removePlayerFromTeam = (item) => {
  setTeam((prev) => prev.filter((_, i) => i !== item.index));
  setPlayer((prev) => [...prev, item]);
}

  return (
  <Container maxW="800px">
    <Heading p="2" align="center" color="BlackText">
      React Drag & Drop
    </Heading>
    <Flex justify="space-between" height="90vh" align="center">
    <Stack width="300px">
      <Heading fontSize="3x1" color="yellow.800" textAlign="center">
        Players
        </Heading>
      <List 
        p="4" 
        minH="70vh" 
        boxShadow="x1" 
        borderRadius="md" 
        ref={removeFromTeamRef}
        bgGradient={
          isPlayerOver
            ? "linear(to-b, yellow.300, yellow.500)"
            : "linear(to-b, yellow.100, yellow.200)"
        }
       >
        {players.map((e, i) => (
          <Player 
          key={e.name} 
          item={e} 
          type="player" 
          index={i} 
          onDropPlayer={movePlayerToTeam} 
          />
        ))}
      </List>
    </Stack>
    <Stack width="300px">
    <Heading fontSize="3x1" color="teal.800" textAlign="center">
        TEAM
        </Heading>
      <List 
        bgGradient={
          isOver
            ? "linear(to-b, teal.300, teal.500)"
            : "linear(to-b, teal.100, teal.200)"
        }
        p="4" 
        minH="70vh" 
        boxShadow="x1" 
        borderRadius="md" 
        ref={addToTeamRef}
      >
      {" "}
      {team.map((e, i) => (
          <Player
            key={e.name} 
            item={e} 
            type="team" 
            index={i} 
            onDropPlayer={removePlayerFromTeam} 
          />
        ))}
      </List>
    </Stack>
    </Flex>
  </Container>
  );
};

export default App;
