import {
  bulkCreateCandidates,
  createCandidate,
  getCandidate,
  getCandidates,
  updateCandidate,
} from '@/lib/api';
import type { Candidate, CandidateFilters } from '@/lib/types';
// frontend/src/lib/hooks/use-candidates.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useCandidates(filters?: CandidateFilters) {
  return useQuery({
    queryKey: ['candidates', filters],
    queryFn: () => getCandidates(filters),
  });
}

export function useCandidate(id: string) {
  return useQuery({
    queryKey: ['candidates', id],
    queryFn: () => getCandidate(id),
    enabled: !!id,
  });
}

export function useCreateCandidate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Candidate>) => createCandidate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
    },
  });
}

export function useUpdateCandidate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Candidate> }) =>
      updateCandidate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
    },
  });
}

export function useBulkCreateCandidates() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (candidates: Partial<Candidate>[]) => bulkCreateCandidates(candidates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
    },
  });
}
