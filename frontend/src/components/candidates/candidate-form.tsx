'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useCreateCandidate, useUpdateCandidate } from '@/lib/hooks/use-candidates';
import { type CreateCandidateInput, createCandidateSchema } from '@/lib/schemas';
import type { Candidate } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface CandidateFormProps {
  candidate?: Candidate;
  onSuccess?: () => void;
}

export function CandidateForm({ candidate, onSuccess }: CandidateFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const createCandidate = useCreateCandidate();
  const updateCandidate = useUpdateCandidate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<CreateCandidateInput>({
    resolver: zodResolver(createCandidateSchema),
    defaultValues: {
      name: candidate?.name || '',
      email: candidate?.email || '',
      phone: candidate?.phone || '',
      appliedFor: candidate?.appliedFor || '',
      source: candidate?.source || 'Direct',
    },
  });

  const sourceValue = watch('source');

  const onSubmit = async (data: CreateCandidateInput) => {
    try {
      if (candidate) {
        await updateCandidate.mutateAsync({ id: candidate.id, data });
        toast({
          title: 'Success',
          description: 'Candidate has been updated successfully',
          variant: 'success',
        });
      } else {
        await createCandidate.mutateAsync(data);
        toast({
          title: 'Success',
          description: 'Candidate has been created successfully',
          variant: 'success',
        });
      }
      onSuccess?.();
      router.push('/candidates');
    } catch (error) {
      console.error('Failed to save candidate:', error);
      toast({
        title: 'Error',
        description: `Failed to ${candidate ? 'update' : 'create'} candidate. Please try again.`,
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      {/* Name */}
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Full Name <span className="text-red-500">*</span>
        </label>
        <Input
          id="name"
          {...register('name')}
          placeholder="John Doe"
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email <span className="text-red-500">*</span>
        </label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder="john.doe@example.com"
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium">
          Phone Number
        </label>
        <Input
          id="phone"
          type="tel"
          {...register('phone')}
          placeholder="+1 (555) 000-0000"
          className={errors.phone ? 'border-red-500' : ''}
        />
        {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
      </div>

      {/* Applied For */}
      <div className="space-y-2">
        <label htmlFor="appliedFor" className="text-sm font-medium">
          Position Applied For <span className="text-red-500">*</span>
        </label>
        <Input
          id="appliedFor"
          {...register('appliedFor')}
          placeholder="Senior Software Engineer"
          className={errors.appliedFor ? 'border-red-500' : ''}
        />
        {errors.appliedFor && <p className="text-sm text-red-500">{errors.appliedFor.message}</p>}
      </div>

      {/* Source */}
      <div className="space-y-2">
        <label htmlFor="source" className="text-sm font-medium">
          Source <span className="text-red-500">*</span>
        </label>
        <Select value={sourceValue} onValueChange={(value) => setValue('source', value)}>
          <SelectTrigger className={errors.source ? 'border-red-500' : ''}>
            <SelectValue placeholder="Select source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Direct">Direct Application</SelectItem>
            <SelectItem value="LinkedIn">LinkedIn</SelectItem>
            <SelectItem value="Indeed">Indeed</SelectItem>
            <SelectItem value="Referral">Referral</SelectItem>
            <SelectItem value="Agency">Agency</SelectItem>
            <SelectItem value="Career Fair">Career Fair</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.source && <p className="text-sm text-red-500">{errors.source.message}</p>}
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : candidate ? 'Update Candidate' : 'Add Candidate'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
