import { getAnalytics } from '@/lib/api';
// frontend/src/lib/hooks/use-analytics.ts
import { useQuery } from '@tanstack/react-query';

export function useAnalytics() {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: () => getAnalytics(),
    staleTime: 2 * 60 * 1000, // 2 minutes for analytics
  });
}
