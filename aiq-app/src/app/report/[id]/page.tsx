import { ReportPageClient } from './ReportPageClient';

// Required for static export - the actual ID is extracted client-side from the URL
export function generateStaticParams() {
  return [{ id: 'demo' }];
}

export default async function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ReportPageClient id={id} />;
}
