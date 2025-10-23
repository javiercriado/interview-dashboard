import { AppLayout } from '@/components/layout/app-layout';
import { TemplateForm } from '@/components/templates/template-form';

interface Props {
  params: {
    id: string;
  };
}

export default function EditTemplatePage({ params }: Props) {
  return (
    <AppLayout>
      <TemplateForm templateId={params.id} />
    </AppLayout>
  );
}
