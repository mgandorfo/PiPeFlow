'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import type { Lead, LeadStatus } from '@/lib/data/leads'

const schema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  company: z.string().min(1, 'Empresa é obrigatória'),
  phone: z.string().optional(),
  status: z.enum(['novo', 'contatado', 'qualificado', 'proposta', 'perdido']),
  notes: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface LeadSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  lead?: Lead | null
  onSave: (data: Omit<Lead, 'id' | 'createdAt' | 'activities' | 'owner'>) => void
  onDelete?: (id: string) => void
  saving?: boolean
}

export function LeadSheet({ open, onOpenChange, lead, onSave, onDelete, saving }: LeadSheetProps) {
  const isEditing = !!lead

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { status: 'novo' },
  })

  const statusValue = watch('status')

  useEffect(() => {
    if (open) {
      reset({
        name: lead?.name ?? '',
        email: lead?.email ?? '',
        company: lead?.company ?? '',
        phone: lead?.phone ?? '',
        status: lead?.status ?? 'novo',
        notes: lead?.notes ?? '',
      })
    }
  }, [open, lead, reset])

  function onSubmit(data: FormData) {
    onSave(data as Omit<Lead, 'id' | 'createdAt' | 'activities' | 'owner'>)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg bg-slate-900 border-slate-700 overflow-y-auto">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-white">
            {isEditing ? 'Editar lead' : 'Novo lead'}
          </SheetTitle>
          <SheetDescription className="text-slate-400">
            {isEditing
              ? 'Atualize as informações do lead abaixo.'
              : 'Preencha os dados do novo lead.'}
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-slate-200">Nome completo *</Label>
            <Input
              id="name"
              placeholder="João da Silva"
              className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 focus-visible:ring-blue-500"
              {...register('name')}
            />
            {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-slate-200">E-mail *</Label>
            <Input
              id="email"
              type="email"
              placeholder="joao@empresa.com.br"
              className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 focus-visible:ring-blue-500"
              {...register('email')}
            />
            {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
          </div>

          {/* Company */}
          <div className="space-y-1.5">
            <Label htmlFor="company" className="text-slate-200">Empresa *</Label>
            <Input
              id="company"
              placeholder="Empresa Ltda"
              className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 focus-visible:ring-blue-500"
              {...register('company')}
            />
            {errors.company && <p className="text-xs text-red-400">{errors.company.message}</p>}
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-slate-200">Telefone</Label>
            <Input
              id="phone"
              placeholder="(11) 99999-9999"
              className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 focus-visible:ring-blue-500"
              {...register('phone')}
            />
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <Label className="text-slate-200">Status *</Label>
            <Select
              value={statusValue}
              onValueChange={(val) => setValue('status', val as LeadStatus)}
            >
              <SelectTrigger className="bg-slate-800 border-slate-600 text-white focus:ring-blue-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="novo" className="text-slate-200 focus:bg-slate-700">Novo</SelectItem>
                <SelectItem value="contatado" className="text-slate-200 focus:bg-slate-700">Contatado</SelectItem>
                <SelectItem value="qualificado" className="text-slate-200 focus:bg-slate-700">Qualificado</SelectItem>
                <SelectItem value="proposta" className="text-slate-200 focus:bg-slate-700">Proposta</SelectItem>
                <SelectItem value="perdido" className="text-slate-200 focus:bg-slate-700">Perdido</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <Label htmlFor="notes" className="text-slate-200">Notas</Label>
            <Textarea
              id="notes"
              placeholder="Observações sobre o lead..."
              rows={3}
              className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 focus-visible:ring-blue-500 resize-none"
              {...register('notes')}
            />
          </div>

          <SheetFooter className="pt-4 flex-col sm:flex-row gap-2">
            {isEditing && onDelete && (
              <Button
                type="button"
                variant="destructive"
                className="sm:mr-auto"
                onClick={() => onDelete(lead!.id)}
                disabled={saving}
              >
                Excluir lead
              </Button>
            )}
            <Button
              type="button"
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
              onClick={() => onOpenChange(false)}
              disabled={saving}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700"
              disabled={saving}
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : isEditing ? (
                'Salvar alterações'
              ) : (
                'Criar lead'
              )}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
