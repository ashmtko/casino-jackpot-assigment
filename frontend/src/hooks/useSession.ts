import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useGameStore } from '../stores/game.store';
import { useEffect } from 'react';
import { sessionApiService } from '../api/session.api';

export function useSession() {
  const queryClient = useQueryClient();
  const gameStore = useGameStore()

  const startSessionMutation = useMutation({
    mutationFn: sessionApiService.startSession.bind<typeof sessionApiService.startSession>(sessionApiService),
    onSuccess: (data) => {
      gameStore.setCredits(data.credits);
      
      queryClient.invalidateQueries({ queryKey: ['session-check'] });
    },
    onError: (e: any) => {
      gameStore.setMessage(e?.message ?? 'Error starting session')
    },
  });

  const getSessionQuery = useQuery({
    queryKey: ['session-check'],
    queryFn: sessionApiService.getSession.bind<typeof sessionApiService.getSession>(sessionApiService),
    staleTime: 5 * 60 * 1000,
  });

  const startSession = () => startSessionMutation.mutate();

  useEffect(() => {
    gameStore.setCredits(getSessionQuery.data?.credits ?? 0)
    gameStore.setUser(getSessionQuery.data?.user ?? '')
  }, [getSessionQuery.data?.active])

  return { startSession, isActiveSession: !!getSessionQuery.data?.active };
}
