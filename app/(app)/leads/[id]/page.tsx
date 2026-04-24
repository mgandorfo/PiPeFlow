import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Mail, Phone, Building2, Calendar, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LeadStatusBadge } from '@/components/leads/lead-status-badge'
import { ActivityTimeline } from '@/components/leads/activity-timeline'
import { LeadDetailActions } from '@/components/leads/lead-detail-actions'
import { FAKE_LEADS } from '@/lib/data/leads'

interface Props {
  params: { id: string }
}

export default function LeadDetailPage({ params }: Props) {
  const lead = FAKE_LEADS.find((l) => l.id === params.id)
  if (!lead) notFound()

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Back + header */}
      <div className="flex items-start gap-4">
        <Link href="/leads">
          <Button
            variant="ghost"
            size="icon"
            className="mt-0.5 text-slate-400 hover:text-white hover:bg-slate-700"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/20 flex items-center justify-center text-blue-300 font-bold text-base shrink-0">
              {lead.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-semibold text-white truncate">{lead.name}</h1>
              <p className="text-sm text-slate-400 truncate">{lead.company}</p>
            </div>
            <LeadStatusBadge status={lead.status} />
          </div>
        </div>

        {/* Edit button — client component to open sheet */}
        <LeadDetailActions lead={lead} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left — info */}
        <div className="md:col-span-1 space-y-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3 pt-4 px-4">
              <CardTitle className="text-sm font-semibold text-slate-300">Informações de contato</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-3">
              <div className="flex items-center gap-2.5 text-sm">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <a
                  href={`mailto:${lead.email}`}
                  className="text-blue-400 hover:underline truncate"
                >
                  {lead.email}
                </a>
              </div>
              {lead.phone && (
                <div className="flex items-center gap-2.5 text-sm">
                  <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                  <span className="text-slate-300">{lead.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-2.5 text-sm">
                <Building2 className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="text-slate-300">{lead.company}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="text-slate-400">
                  Criado em{' '}
                  {new Date(lead.createdAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </CardContent>
          </Card>

          {lead.notes && (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-3 pt-4 px-4">
                <CardTitle className="text-sm font-semibold text-slate-300">Notas</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <p className="text-sm text-slate-400 leading-relaxed">{lead.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right — timeline */}
        <div className="md:col-span-2">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <ActivityTimeline activities={lead.activities} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
