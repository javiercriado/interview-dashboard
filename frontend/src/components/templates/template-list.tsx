'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  useCreateInterviewTemplate,
  useDeleteInterviewTemplate,
  useInterviewTemplates,
} from '@/lib/hooks/use-templates';
import type { InterviewTemplate } from '@/lib/types';
import { Clock, Copy, Edit, FileText, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function TemplateList() {
  const router = useRouter();
  const { data: templates, isLoading } = useInterviewTemplates();
  const deleteMutation = useDeleteInterviewTemplate();
  const duplicateMutation = useCreateInterviewTemplate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setTemplateToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (templateToDelete) {
      deleteMutation.mutate(templateToDelete, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setTemplateToDelete(null);
        },
      });
    }
  };

  const handleDuplicate = (template: InterviewTemplate) => {
    const duplicated: Partial<InterviewTemplate> = {
      name: `${template.name} (Copy)`,
      jobPosition: template.jobPosition,
      duration: template.duration,
      questions: template.questions.map((q) => ({
        id: q.id,
        text: q.text,
        competency: q.competency,
        followUps: [...q.followUps],
      })),
      competencies: [...template.competencies],
    };

    duplicateMutation.mutate(duplicated, {
      onSuccess: (newTemplate) => {
        router.push(`/templates/${newTemplate.id}/edit`);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Interview Templates</h1>
          <Button onClick={() => router.push('/templates/new')} disabled>
            <Plus className="mr-2 h-4 w-4" />
            Create Template
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/2 mt-2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded" />
                  <div className="h-4 bg-muted rounded w-5/6" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Interview Templates</h1>
          <p className="text-muted-foreground mt-1">
            Manage interview templates for different positions
          </p>
        </div>
        <Button onClick={() => router.push('/templates/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Create Template
        </Button>
      </div>

      {templates?.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No templates yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Create your first interview template to get started
            </p>
            <Button onClick={() => router.push('/templates/new')}>
              <Plus className="mr-2 h-4 w-4" />
              Create Template
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {templates?.map((template) => (
            <Card key={template.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{template.name}</CardTitle>
                <CardDescription>{template.jobPosition}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4" />
                    {template.duration} minutes
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <FileText className="mr-2 h-4 w-4" />
                    {template.questions.length} questions
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {template.competencies.slice(0, 3).map((comp) => (
                      <Badge key={comp} variant="secondary" className="text-xs">
                        {comp}
                      </Badge>
                    ))}
                    {template.competencies.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{template.competencies.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1"
                  onClick={() => router.push(`/templates/${template.id}`)}
                >
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/templates/${template.id}/edit`)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDuplicate(template)}
                  disabled={duplicateMutation.isPending}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(template.id)}
                  disabled={deleteMutation.isPending}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Template</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this template? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
