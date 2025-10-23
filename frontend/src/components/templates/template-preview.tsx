'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { CreateInterviewTemplateInput } from '@/lib/schemas';
import { ArrowLeft, Clock, FileText } from 'lucide-react';

interface TemplatePreviewProps {
  template: CreateInterviewTemplateInput;
  onClose: () => void;
  onEdit: () => void;
}

export function TemplatePreview({ template, onClose, onEdit }: TemplatePreviewProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onClose}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Template Preview</h1>
            <p className="text-muted-foreground mt-1">Review your interview template</p>
          </div>
        </div>
        <Button onClick={onEdit}>Edit Template</Button>
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
                <div key={question.id || `q-${index}`} className="border rounded-lg p-4">
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
                            key={`${question.id || followUpIndex}-fu-${followUpIndex}`}
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
  );
}
