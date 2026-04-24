'use client'

import { useState } from 'react'
import { Phone, Mail, CalendarDays, FileText, Plus, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import type { Activity } from '@/lib/data/leads'

const ACTIVITY_CONFIG = {
  ligacao: { icon: Phone, label: 'Ligação', color: 'text-green-400 bg-green-500/10 border-green-500/20' },
  email: { icon: Mail, label: 'E-mail', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
  reuniao: { icon: CalendarDays, label: 'Reunião', color: 'text-violet-400 bg-violet-500/10 border-violet-500/20' },
  nota: { icon: FileText, label: 'Nota', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
} as const

const schema = z.object({
  type: z.enum(['ligacao', 'email', 'reuniao', 'nota']),
  description: z.string().min(5, 'Descrição deve ter pelo menos 5 caracteres'),
})

type FormData = z.infer<typeof schema>

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

interface ActivityTimelineProps {
  activities: Activity[]
}

export function ActivityTimeline({ activities: initial }: ActivityTimelineProps) {
  const [activities, setActivities] = useState<Activity[]>(initial)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { type: 'nota' },
  })

  const typeValue = watch('type')

  async function onSubmit(data: FormData) {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 500))

    const newActivity: Activity = {
      id: String(Date.now()),
      type: data.type,
      description: data.description,
      createdAt: new Date().toISOString(),
      author: 'Demo User',
    }

    setActivities((prev) => [newActivity, ...prev])
    reset()
    setShowForm(false)
    setSaving(false)
    toast.success('Atividade registrada!')
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Timeline de atividades</h3>
        <Button
          size="sm"
          variant="outline"
          className="gap-1.5 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
          onClick={() => setShowForm((v) => !v)}
        >
          <Plus className="w-3.5 h-3.5" />
          Registrar atividade
        </Button>
      </div>

      {/* New activity form */}
      {showForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-lg border border-slate-700 bg-slate-800/60 p-4 space-y-3"
        >
          <div className="space-y-1.5">
            <Label className="text-slate-300 text-xs">Tipo</Label>
            <Select value={typeValue} onValueChange={(v) => setValue('type', v as FormData['type'])}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white focus:ring-blue-500 h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {(Object.keys(ACTIVITY_CONFIG) as Array<keyof typeof ACTIVITY_CONFIG>).map((t) => (
                  <SelectItem key={t} value={t} className="text-slate-200 focus:bg-slate-700 text-sm">
                    {ACTIVITY_CONFIG[t].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-slate-300 text-xs">Descrição</Label>
            <Textarea
              placeholder="Descreva a atividade..."
              rows={2}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 focus-visible:ring-blue-500 resize-none text-sm"
              {...register('description')}
            />
            {errors.description && (
              <p className="text-xs text-red-400">{errors.description.message}</p>
            )}
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-white"
              onClick={() => { setShowForm(false); reset() }}
              disabled={saving}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
              disabled={saving}
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Salvar'}
            </Button>
          </div>
        </form>
      )}

      {/* Timeline */}
      {activities.length === 0 ? (
        <div className="text-center py-10">
          <FileText className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <p className="text-slate-400 text-sm">Nenhuma atividade registrada.</p>
          <p className="text-slate-600 text-xs mt-1">Registre ligações, e-mails, reuniões e notas.</p>
        </div>
      ) : (
        <div className="relative space-y-0">
          {activities.map((activity, i) => {
            const config = ACTIVITY_CONFIG[activity.type]
            const Icon = config.icon
            const isLast = i === activities.length - 1

            return (
              <div key={activity.id} className="flex gap-3">
                {/* Timeline line + icon */}
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 ${config.color}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  {!isLast && <div className="w-px flex-1 bg-slate-700 my-1" />}
                </div>

                {/* Content */}
                <div className="flex-1 pb-4">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-medium text-slate-300">{config.label}</span>
                    <span className="text-xs text-slate-500">·</span>
                    <span className="text-xs text-slate-500">{formatDate(activity.createdAt)}</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{activity.description}</p>
                  <p className="text-xs text-slate-600 mt-0.5">por {activity.author}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
