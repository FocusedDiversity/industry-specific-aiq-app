import { ReportPageClient } from './ReportPageClient';

// Required for static export - pre-generate demo page
export function generateStaticParams() {
  return [{ id: 'demo' }];
}

export default function ReportPage({ params }: { params: { id: string } }) {
  return <ReportPageClient id={params.id} />;
}
