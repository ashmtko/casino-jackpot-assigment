import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGameStore } from '../stores/game.store';
import { gameApiService } from '../api/game.api';

export function useGame() {
  const queryClient = useQueryClient();

  const gameStore = useGameStore()

  const spinMutation = useMutation({
    mutationFn: gameApiService.spin.bind<typeof gameApiService.spin>(gameApiService),
    onSuccess: (res) => {
      gameStore.setCredits(res.credits);
      gameStore.setReels(res.symbols);

      if (res.lineHit) {
        gameStore.setMessage(`You won ${res.reward} credits!`);
      }
    },
    onMutate: () => {
      gameStore.setPending(true)
      gameStore.clearMessage()
    },
    onError: (e: any) => {
      gameStore.setMessage(e?.message ?? 'Error starting session')
    },
    onSettled: () => {
      gameStore.setPending(false)
    }
  });

  const cashoutMutation = useMutation({
    mutationFn: gameApiService.cashOut.bind<typeof gameApiService.cashOut>(gameApiService),
    onSuccess: () => {
      gameStore.setCredits(0);
      gameStore.setMessage('Cashed out successfully!');
      gameStore.resetState();
      
      queryClient.invalidateQueries({ queryKey: ['session-check'] });
    },
    onError: (e: any) => {
      gameStore.setMessage(e?.message ?? 'Error starting session')
    }
  });

  const spin = () => {
    spinMutation.mutate()
  }
  const cashout = () => {
    cashoutMutation.mutate();
  }

  return { spin, cashout, store: gameStore.state, resetState: gameStore.resetState };
}


