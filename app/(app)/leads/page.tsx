import { PageHeader } from '@/components/layout/page-header'
import { LeadList } from '@/components/leads/lead-list'

export default function LeadsPage() {
  return (
    <div className="p-6">
      <PageHeader title="Leads" description="Gerencie seus contatos e oportunidades" />
      <LeadList />
    </div>
  )
}
