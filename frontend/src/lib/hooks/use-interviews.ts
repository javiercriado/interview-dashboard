import { createInterview, getInterview, getInterviews } from '@/lib/api';
import type { Interview, InterviewFilters } from '@/lib/types';
// frontend/src/lib/hooks/use-interviews.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useInterviews(filters?: InterviewFilters) {
  return useQuery({
    queryKey: ['interviews', filters],
    queryFn: () => getInterviews(filters),
  });
}

export function useInterview(id: string) {
  return useQuery({
    queryKey: ['interviews', id],
    queryFn: () => getInterview(id),
    enabled: !!id,
  });
}

export function useCreateInterview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Interview>) => createInterview(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interviews'] });
    },
  });
}
