import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { getSingleGame } from '../../utils/data/gameData';
import GameForm from '../../components/game/GameForm';

export default function EditSingleGame() {
  const [editGame, setEditGame] = useState({});
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  console.warn('editGame', editGame);
  useEffect(() => {
    getSingleGame(id).then(setEditGame);
  }, [id]);

  return (
    <GameForm user={user} obj={editGame} />
  );
}

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { useAuth } from '../../utils/context/authContext';
// import { getSingleGame } from '../../utils/data/gameData';
// import GameForm from '../../components/game/GameForm';

// const UpdateGame = () => {
//   const router = useRouter();
//   const { user } = useAuth();
//   const { id } = router.query;
//   const [game, setGame] = useState({});
//   console.warn('game', game);
//   useEffect(() => {
//     getSingleGame(id).then(setGame);
//   }, [id]);

//   return (
//     <div>
//       <h2>Update Game</h2>
//       <GameForm user={user} id={game.id} title={game.title} maker={game.maker} numberOfPlayers={game.number_of_players} skillLevel={game.skill_level} gameType={game.game_type?.id} />
//     </div>
//   );
// };

// export default UpdateGame;
