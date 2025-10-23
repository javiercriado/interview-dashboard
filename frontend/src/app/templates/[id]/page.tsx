'use client';

import { AppLayout } from '@/components/layout/app-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useInterviewTemplate } from '@/lib/hooks/use-templates';
import { ArrowLeft, Clock, Edit, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
  params: {
    id: string;
  };
}

export default function TemplateViewPage({ params }: Props) {
  const router = useRouter();
  const { data: template, isLoading } = useInterviewTemplate(params.id);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" disabled>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <div className="h-8 bg-muted rounded w-64 animate-pulse" />
              </div>
            </div>
          </div>
          <Card>
            <CardHeader>
              <div className="space-y-2">
                <div className="h-6 bg-muted rounded w-48 animate-pulse" />
                <div className="h-4 bg-muted rounded w-32 animate-pulse" />
              </div>
            </CardHeader>
          </Card>
        </div>
      </AppLayout>
    );
  }

  if (!template) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.push('/templates')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Template Not Found</h1>
            </div>
          </div>
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Template not found</h3>
              <p className="text-muted-foreground text-center mb-4">
                The template you're looking for doesn't exist.
              </p>
              <Button onClick={() => router.push('/templates')}>Back to Templates</Button>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.push('/templates')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Template Details</h1>
              <p className="text-muted-foreground mt-1">View interview template</p>
            </div>
          </div>
          <Button onClick={() => router.push(`/templates/${params.id}/edit`)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Template
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{template.name}</CardTitle>
                <p className="text-muted-foreground mt-1">{template.jobPosition}</p>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-2 h-4 w-4" />
                {template.duration} minutes
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <FileText className="mr-2 h-4 w-4" />
                {template.questions.length} questions
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Competencies</h3>
              <div className="flex flex-wrap gap-2">
                {template.competencies.map((comp) => (
                  <Badge key={comp} variant="secondary">
                    {comp}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Interview Questions</h3>
              <div className="space-y-4">
                {template.questions.map((question, index) => (
                  <div key={question.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">Question {index + 1}</h4>
                      <Badge variant="outline">{question.competency}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">{question.text}</p>
                    {question.followUps.length > 0 && (
                      <div className="mt-3 pl-4 border-l-2 border-muted">
                        <p className="text-sm font-medium mb-2">Follow-up questions:</p>
                        <ul className="space-y-1">
                          {question.followUps.map((followUp, followUpIndex) => (
                            <li
                              key={`${question.id}-fu-${followUpIndex}`}
                              className="text-sm text-muted-foreground"
                            >
                              • {followUp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
