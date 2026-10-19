import { Container } from "@/components/ui/container";
import { IndexLabel } from "@/components/ui/index-label";
import { EnquiryInbox } from "@/components/admin/enquiry-inbox";
import { LOCAL_ENQUIRIES } from "@/data/enquiries";
import { Enquiry } from "@/domain/enquiry";
import { createAdminClient } from "@/lib/supabase/server";

export default async function AdminEnquiryPage() {
  let enquiries: Enquiry[] = LOCAL_ENQUIRIES;

  const isSupabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  if (isSupabaseConfigured) {
    try {
      const supabase = createAdminClient();
      const { data, error } = await supabase
        .from("enquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        enquiries = data.map((row) => ({
          id: row.id,
          name: row.name,
          email: row.email,
          phone: row.phone || undefined,
          projectTypes: row.project_types || [],
          location: row.location,
          timeline: row.timeline || undefined,
          budget: (row.budget as Enquiry["budget"]) || undefined,
          hasBuilder: (row.has_builder as Enquiry["hasBuilder"]) || undefined,
          builderNote: row.builder_note || undefined,
          brief: row.brief || undefined,
          source: (row.source as Enquiry["source"]) || undefined,
          refProject: row.ref_project || undefined,
          status: row.status,
          ipHash: row.ip_hash || undefined,
          createdAt: row.created_at,
        }));
      }
    } catch {
      // Fallback gracefully to local mock dataset
    }
  }

  return (
    <Container className="flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-ink-hairline">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <IndexLabel index="02" />
            <span className="font-mono text-label uppercase tracking-widest text-graphite">
              Kotak Masuk Konsultasi
            </span>
          </div>
          <h1 className="font-sans text-3xl sm:text-4xl font-medium tracking-tight text-ink">
            Permintaan Perancangan
          </h1>
        </div>

        <div className="font-mono text-xs text-stone">
          Total {enquiries.length} formulir tercatat
        </div>
      </div>

      {/* Main Inbox Interface */}
      <EnquiryInbox initialEnquiries={enquiries} />
    </Container>
  );
}
