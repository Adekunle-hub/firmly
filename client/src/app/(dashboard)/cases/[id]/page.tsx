
import CaseDetailsClient from "@/components/CaseDetailsClient";

export default async function CasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CaseDetailsClient id={id} />;
}
