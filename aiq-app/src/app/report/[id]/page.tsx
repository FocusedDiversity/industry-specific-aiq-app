import { ReportPageClient } from './ReportPageClient';

// Pre-render the demo page for static export
export function generateStaticParams() {
  return [{ id: 'demo' }];
}

export default async function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ReportPageClient id={id} />;
}
