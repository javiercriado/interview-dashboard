import { createInterviewTemplate, getInterviewTemplate, getInterviewTemplates } from '@/lib/api';
import type { InterviewTemplate } from '@/lib/types';
// frontend/src/lib/hooks/use-templates.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useInterviewTemplates() {
  return useQuery({
    queryKey: ['interview-templates'],
    queryFn: () => getInterviewTemplates(),
  });
}

export function useInterviewTemplate(id: string) {
  return useQuery({
    queryKey: ['interview-templates', id],
    queryFn: () => getInterviewTemplate(id),
    enabled: !!id,
  });
}

export function useCreateInterviewTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<InterviewTemplate>) => createInterviewTemplate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interview-templates'] });
    },
  });
}
