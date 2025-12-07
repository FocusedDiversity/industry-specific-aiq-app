import { ReportPageClient } from './ReportPageClient';

// Pre-render pages for static export
export function generateStaticParams() {
  return [
    { id: 'demo' },
    { id: 'results' },
  ];
}

export default async function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ReportPageClient id={id} />;
}
