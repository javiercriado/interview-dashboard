'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  useCreateInterviewTemplate,
  useInterviewTemplate,
  useUpdateInterviewTemplate,
} from '@/lib/hooks/use-templates';
import { type CreateInterviewTemplateInput, createInterviewTemplateSchema } from '@/lib/schemas';
import type { InterviewTemplate } from '@/lib/types';
import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, GripVertical, Plus, Trash2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import { TemplatePreview } from './template-preview';

interface TemplateFormProps {
  templateId?: string;
}

const COMMON_COMPETENCIES = [
  'Communication',
  'Problem Solving',
  'Leadership',
  'Technical Skills',
  'Teamwork',
  'Adaptability',
  'Critical Thinking',
  'Time Management',
  'Creativity',
  'Analytical Skills',
];

interface SortableQuestionProps {
  id: string;
  questionIndex: number;
  form: ReturnType<typeof useForm<CreateInterviewTemplateInput>>;
  watchedQuestions: CreateInterviewTemplateInput['questions'];
  watchedCompetencies: string[];
  fieldsLength: number;
  onRemove: (index: number) => void;
  onAddFollowUp: (index: number) => void;
  onRemoveFollowUp: (questionIndex: number, followUpIndex: number) => void;
}

function SortableQuestion({
  id,
  questionIndex,
  form,
  watchedQuestions,
  watchedCompetencies,
  fieldsLength,
  onRemove,
  onAddFollowUp,
  onRemoveFollowUp,
}: SortableQuestionProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="border rounded-lg p-4 space-y-4 bg-card">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="cursor-grab active:cursor-grabbing touch-none p-1 hover:bg-muted rounded"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </button>
          <h3 className="font-semibold">Question {questionIndex + 1}</h3>
        </div>
        <div className="flex items-center gap-2">
          {fieldsLength > 1 && (
            <Button type="button" variant="ghost" size="sm" onClick={() => onRemove(questionIndex)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`questions.${questionIndex}.text`}>Question Text</Label>
        <TextareaAutosize
          id={`questions.${questionIndex}.text`}
          {...form.register(`questions.${questionIndex}.text`)}
          placeholder="Enter the interview question..."
          minRows={3}
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
        />
        {form.formState.errors.questions?.[questionIndex]?.text && (
          <p className="text-sm text-destructive">
            {form.formState.errors.questions[questionIndex]?.text?.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor={`questions.${questionIndex}.competency`}>Competency</Label>
        <Select
          value={watchedQuestions[questionIndex]?.competency || ''}
          onValueChange={(value) => form.setValue(`questions.${questionIndex}.competency`, value)}
        >
          <SelectTrigger id={`questions.${questionIndex}.competency`}>
            <SelectValue placeholder="Select competency" />
          </SelectTrigger>
          <SelectContent>
            {watchedCompetencies?.map((comp) => (
              <SelectItem key={comp} value={comp}>
                {comp}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form.formState.errors.questions?.[questionIndex]?.competency && (
          <p className="text-sm text-destructive">
            {form.formState.errors.questions[questionIndex]?.competency?.message}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between space-x-2">
        <div className="flex items-center space-x-2">
          <Switch
            id={`questions.${questionIndex}.isRequired`}
            checked={watchedQuestions[questionIndex]?.isRequired ?? true}
            onCheckedChange={(checked) =>
              form.setValue(`questions.${questionIndex}.isRequired`, checked)
            }
          />
          <Label htmlFor={`questions.${questionIndex}.isRequired`} className="cursor-pointer">
            Required question
          </Label>
        </div>
        {!watchedQuestions[questionIndex]?.isRequired && (
          <Badge variant="outline" className="text-xs">
            Optional
          </Badge>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Follow-up Questions</Label>
          <Button type="button" size="sm" onClick={() => onAddFollowUp(questionIndex)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Follow-up
          </Button>
        </div>
        {watchedQuestions[questionIndex]?.followUps?.map(
          (followUp: string, followUpIndex: number) => (
            <div key={`${questionIndex}-${followUpIndex}-${followUp}`} className="flex gap-2">
              <TextareaAutosize
                {...form.register(`questions.${questionIndex}.followUps.${followUpIndex}`)}
                placeholder="Follow-up question..."
                minRows={2}
                className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onRemoveFollowUp(questionIndex, followUpIndex)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export function TemplateForm({ templateId }: TemplateFormProps) {
  const router = useRouter();
  const isEdit = !!templateId;
  const { data: template } = useInterviewTemplate(templateId || '');
  const createMutation = useCreateInterviewTemplate();
  const updateMutation = useUpdateInterviewTemplate();
  const [showPreview, setShowPreview] = useState(false);
  const [customCompetency, setCustomCompetency] = useState('');

  const form = useForm({
    resolver: zodResolver(createInterviewTemplateSchema),
    defaultValues: template
      ? {
          name: template.name,
          jobPosition: template.jobPosition,
          duration: template.duration,
          questions: template.questions.map((q) => ({
            id: q.id,
            text: q.text,
            competency: q.competency,
            followUps: q.followUps || [],
            isRequired: q.isRequired ?? true,
          })),
          competencies: template.competencies,
        }
      : {
          name: '',
          jobPosition: '',
          duration: 30,
          questions: [{ id: '', text: '', competency: '', followUps: [], isRequired: true }],
          competencies: [],
        },
  });

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: 'questions',
  });

  const watchedQuestions = form.watch('questions');
  const watchedCompetencies = form.watch('competencies');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      move(oldIndex, newIndex);
    }
  };

  const addCompetency = (competency: string) => {
    const current = form.getValues('competencies');
    if (!current.includes(competency)) {
      form.setValue('competencies', [...current, competency]);
    }
  };

  const removeCompetency = (competency: string) => {
    const current = form.getValues('competencies');
    form.setValue(
      'competencies',
      current.filter((c) => c !== competency),
    );
  };

  const addCustomCompetency = () => {
    if (customCompetency.trim()) {
      addCompetency(customCompetency.trim());
      setCustomCompetency('');
    }
  };

  const addFollowUp = (questionIndex: number) => {
    const currentFollowUps = form.getValues(`questions.${questionIndex}.followUps`) || [];
    form.setValue(`questions.${questionIndex}.followUps`, [...currentFollowUps, '']);
  };

  const removeFollowUp = (questionIndex: number, followUpIndex: number) => {
    const currentFollowUps = form.getValues(`questions.${questionIndex}.followUps`) || [];
    form.setValue(
      `questions.${questionIndex}.followUps`,
      currentFollowUps.filter((_, i) => i !== followUpIndex),
    );
  };

  const onSubmit = (data: CreateInterviewTemplateInput) => {
    const templateData: Partial<InterviewTemplate> = {
      name: data.name,
      jobPosition: data.jobPosition,
      duration: data.duration,
      questions: data.questions.map((q, idx) => ({
        id: q.id || `q${idx + 1}`,
        text: q.text,
        competency: q.competency,
        followUps: q.followUps || [],
        isRequired: q.isRequired ?? true,
      })),
      competencies: data.competencies,
    };

    if (isEdit && templateId) {
      updateMutation.mutate(
        { id: templateId, data: templateData },
        {
          onSuccess: () => router.push('/templates'),
        },
      );
    } else {
      createMutation.mutate(templateData, {
        onSuccess: () => router.push('/templates'),
      });
    }
  };

  if (showPreview) {
    const previewData = form.getValues();
    const templatePreview = {
      ...previewData,
      questions: previewData.questions.map((q, idx) => ({
        ...q,
        id: q.id || `q${idx + 1}`,
        followUps: q.followUps || [],
        isRequired: q.isRequired ?? true,
      })),
    };
    return (
      <TemplatePreview
        template={templatePreview}
        onClose={() => setShowPreview(false)}
        onEdit={() => setShowPreview(false)}
      />
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{isEdit ? 'Edit Template' : 'Create Template'}</h1>
          <p className="text-muted-foreground mt-1">
            {isEdit ? 'Update interview template' : 'Create a new interview template'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => setShowPreview(true)}>
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push('/templates')}>
            Cancel
          </Button>
          <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
            {isEdit ? 'Update' : 'Create'} Template
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>General details about the interview template</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Template Name</Label>
            <Input
              id="name"
              {...form.register('name')}
              placeholder="e.g., Senior Frontend Developer Interview"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobPosition">Job Position</Label>
            <Input
              id="jobPosition"
              {...form.register('jobPosition')}
              placeholder="e.g., Senior Frontend Developer"
            />
            {form.formState.errors.jobPosition && (
              <p className="text-sm text-destructive">
                {form.formState.errors.jobPosition.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              id="duration"
              type="number"
              {...form.register('duration', { valueAsNumber: true })}
              placeholder="30"
            />
            {form.formState.errors.duration && (
              <p className="text-sm text-destructive">{form.formState.errors.duration.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Competencies</CardTitle>
          <CardDescription>Select or add competencies to evaluate</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Select from common competencies</Label>
            <Select onValueChange={addCompetency}>
              <SelectTrigger>
                <SelectValue placeholder="Select a competency" />
              </SelectTrigger>
              <SelectContent>
                {COMMON_COMPETENCIES.map((comp) => (
                  <SelectItem key={comp} value={comp}>
                    {comp}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Or add custom competency</Label>
            <div className="flex gap-2">
              <Input
                value={customCompetency}
                onChange={(e) => setCustomCompetency(e.target.value)}
                placeholder="Enter custom competency"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addCustomCompetency();
                  }
                }}
              />
              <Button type="button" onClick={addCustomCompetency}>
                Add
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {watchedCompetencies?.map((comp) => (
              <Badge key={comp} variant="secondary" className="text-sm">
                {comp}
                <button
                  type="button"
                  onClick={() => removeCompetency(comp)}
                  className="ml-2 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          {form.formState.errors.competencies && (
            <p className="text-sm text-destructive">{form.formState.errors.competencies.message}</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Questions</CardTitle>
          <CardDescription>
            Add interview questions and assign competencies. Drag to reorder.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
              {fields.map((field, questionIndex) => (
                <SortableQuestion
                  key={field.id}
                  id={field.id}
                  questionIndex={questionIndex}
                  form={form}
                  watchedQuestions={watchedQuestions}
                  watchedCompetencies={watchedCompetencies}
                  fieldsLength={fields.length}
                  onRemove={remove}
                  onAddFollowUp={addFollowUp}
                  onRemoveFollowUp={removeFollowUp}
                />
              ))}
            </SortableContext>
          </DndContext>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => append({ text: '', competency: '', followUps: [], isRequired: true })}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Question
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
