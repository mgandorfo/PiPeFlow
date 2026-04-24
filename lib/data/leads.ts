export type LeadStatus = 'novo' | 'contatado' | 'qualificado' | 'proposta' | 'perdido'

export interface Activity {
  id: string
  type: 'ligacao' | 'email' | 'reuniao' | 'nota'
  description: string
  createdAt: string
  author: string
}

export interface Lead {
  id: string
  name: string
  email: string
  company: string
  phone: string
  status: LeadStatus
  owner: string
  notes: string
  createdAt: string
  activities: Activity[]
}

export const FAKE_LEADS: Lead[] = [
  {
    id: '1',
    name: 'Carlos Eduardo Mendes',
    email: 'carlos.mendes@techsolutions.com.br',
    company: 'TechSolutions Ltda',
    phone: '(11) 98765-4321',
    status: 'qualificado',
    owner: 'Demo User',
    notes: 'Interesse em plano Pro. Decisor é o próprio Carlos.',
    createdAt: '2024-03-01',
    activities: [
      { id: 'a1', type: 'ligacao', description: 'Primeiro contato. Carlos demonstrou interesse no plano Pro.', createdAt: '2024-03-01T10:00:00', author: 'Demo User' },
      { id: 'a2', type: 'email', description: 'Enviado material de apresentação do PipeFlow.', createdAt: '2024-03-02T14:30:00', author: 'Demo User' },
      { id: 'a3', type: 'reuniao', description: 'Demo de 30min realizada. Interesse confirmado.', createdAt: '2024-03-05T16:00:00', author: 'Demo User' },
    ],
  },
  {
    id: '2',
    name: 'Fernanda Lima Rodrigues',
    email: 'fernanda.rodrigues@criativos.co',
    company: 'Criativos Co.',
    phone: '(21) 97654-3210',
    status: 'proposta',
    owner: 'Demo User',
    notes: 'Agência de marketing com equipe de 8 pessoas. Precisa de múltiplos usuários.',
    createdAt: '2024-03-03',
    activities: [
      { id: 'b1', type: 'email', description: 'Fernanda entrou em contato pelo site pedindo informações.', createdAt: '2024-03-03T09:00:00', author: 'Demo User' },
      { id: 'b2', type: 'reuniao', description: 'Call de descoberta realizada. Time de 8 pessoas.', createdAt: '2024-03-07T11:00:00', author: 'Demo User' },
      { id: 'b3', type: 'email', description: 'Proposta comercial enviada (R$ 49/mês × 8 usuários).', createdAt: '2024-03-08T15:00:00', author: 'Demo User' },
    ],
  },
  {
    id: '3',
    name: 'Ricardo Alves Souza',
    email: 'ricardo@souza-consultoria.com.br',
    company: 'Souza Consultoria',
    phone: '(31) 96543-2109',
    status: 'contatado',
    owner: 'Demo User',
    notes: 'Consultor independente. Avaliando custo-benefício.',
    createdAt: '2024-03-05',
    activities: [
      { id: 'c1', type: 'ligacao', description: 'Abordagem outbound. Ricardo pediu mais informações por e-mail.', createdAt: '2024-03-05T14:00:00', author: 'Demo User' },
      { id: 'c2', type: 'email', description: 'Enviado e-mail com comparativo Free vs Pro.', createdAt: '2024-03-06T09:30:00', author: 'Demo User' },
    ],
  },
  {
    id: '4',
    name: 'Juliana Nascimento Costa',
    email: 'juliana@nexusvendas.com.br',
    company: 'Nexus Vendas',
    phone: '(41) 95432-1098',
    status: 'novo',
    owner: 'Demo User',
    notes: 'Lead via LinkedIn. Ainda não foi contactada.',
    createdAt: '2024-03-08',
    activities: [],
  },
  {
    id: '5',
    name: 'Thiago Martins Ferreira',
    email: 'thiago.ferreira@construmax.com.br',
    company: 'Construmax Engenharia',
    phone: '(51) 94321-0987',
    status: 'perdido',
    owner: 'Demo User',
    notes: 'Optou pelo concorrente. Motivo: integração com ERP próprio.',
    createdAt: '2024-02-15',
    activities: [
      { id: 'e1', type: 'reuniao', description: 'Demo realizada. Necessidade de integração com ERP próprio.', createdAt: '2024-02-20T10:00:00', author: 'Demo User' },
      { id: 'e2', type: 'nota', description: 'Lead fechado como perdido. Prefere solução com integração nativa ao SAP.', createdAt: '2024-02-28T17:00:00', author: 'Demo User' },
    ],
  },
  {
    id: '6',
    name: 'Patrícia Oliveira Santos',
    email: 'patricia.santos@florisul.com.br',
    company: 'FloriSul Distribuidora',
    phone: '(48) 93210-9876',
    status: 'qualificado',
    owner: 'Demo User',
    notes: 'Distribuidora com equipe comercial de 5 vendedores. Alta probabilidade de fechamento.',
    createdAt: '2024-03-10',
    activities: [
      { id: 'f1', type: 'ligacao', description: 'Indicação de cliente atual. Patrícia tem urgência na adoção.', createdAt: '2024-03-10T08:00:00', author: 'Demo User' },
      { id: 'f2', type: 'reuniao', description: 'Demo com toda a equipe comercial. Muito engajados.', createdAt: '2024-03-12T14:00:00', author: 'Demo User' },
    ],
  },
  {
    id: '7',
    name: 'Bruno Carvalho Lima',
    email: 'bruno.lima@digitalwave.com.br',
    company: 'Digital Wave Agency',
    phone: '(61) 92109-8765',
    status: 'contatado',
    owner: 'Demo User',
    notes: 'Startup de tecnologia. Interessado no plano gratuito para testar.',
    createdAt: '2024-03-12',
    activities: [
      { id: 'g1', type: 'email', description: 'Bruno se cadastrou no blog e baixou o e-book de CRM.', createdAt: '2024-03-12T11:00:00', author: 'Demo User' },
      { id: 'g2', type: 'email', description: 'E-mail de nutrição enviado com case de sucesso.', createdAt: '2024-03-14T09:00:00', author: 'Demo User' },
    ],
  },
  {
    id: '8',
    name: 'Mariana Peixoto Duarte',
    email: 'mariana@inovafast.com.br',
    company: 'InovaFast Soluções',
    phone: '(71) 91098-7654',
    status: 'proposta',
    owner: 'Demo User',
    notes: 'Empresa de 20 funcionários no setor de logística. Negociação em andamento.',
    createdAt: '2024-03-06',
    activities: [
      { id: 'h1', type: 'ligacao', description: 'Retorno de anúncio no Google. Urgência alta.', createdAt: '2024-03-06T15:00:00', author: 'Demo User' },
      { id: 'h2', type: 'reuniao', description: 'Apresentação completa. Mariana é a decisora.', createdAt: '2024-03-09T10:00:00', author: 'Demo User' },
      { id: 'h3', type: 'email', description: 'Proposta enviada com desconto de onboarding.', createdAt: '2024-03-11T16:00:00', author: 'Demo User' },
      { id: 'h4', type: 'nota', description: 'Mariana pediu 1 semana para avaliar internamente.', createdAt: '2024-03-11T17:00:00', author: 'Demo User' },
    ],
  },
  {
    id: '9',
    name: 'André Felipe Gonçalves',
    email: 'andre.goncalves@vendamais.com.br',
    company: 'VendaMais Treinamentos',
    phone: '(85) 90987-6543',
    status: 'novo',
    owner: 'Demo User',
    notes: 'Lead captado em evento de vendas em Fortaleza.',
    createdAt: '2024-03-14',
    activities: [],
  },
  {
    id: '10',
    name: 'Camila Ramos Barbosa',
    email: 'camila@grupoexpansao.com.br',
    company: 'Grupo Expansão',
    phone: '(62) 99876-5432',
    status: 'qualificado',
    owner: 'Demo User',
    notes: 'Grupo com 3 empresas do ramo imobiliário. Alto potencial de MRR.',
    createdAt: '2024-03-09',
    activities: [
      { id: 'j1', type: 'reuniao', description: 'Reunião presencial em Goiânia. Camila quer centralizar 3 equipes no PipeFlow.', createdAt: '2024-03-09T14:00:00', author: 'Demo User' },
      { id: 'j2', type: 'nota', description: 'Potencial de 15 usuários. Solicitar proposta enterprise.', createdAt: '2024-03-10T09:00:00', author: 'Demo User' },
    ],
  },
  {
    id: '11',
    name: 'Rodrigo Tavares Melo',
    email: 'rodrigo.melo@setorvarejo.com.br',
    company: 'Setor Varejo Ltda',
    phone: '(81) 98765-1234',
    status: 'contatado',
    owner: 'Demo User',
    notes: 'Varejista do setor alimentício. Avaliando digitalização do processo de vendas B2B.',
    createdAt: '2024-03-11',
    activities: [
      { id: 'k1', type: 'ligacao', description: 'Primeiro contato via indicação. Mostrou interesse inicial.', createdAt: '2024-03-11T11:00:00', author: 'Demo User' },
    ],
  },
  {
    id: '12',
    name: 'Letícia Borges Fonseca',
    email: 'leticia.fonseca@mediaimagem.com.br',
    company: 'Media Imagem',
    phone: '(19) 97654-8765',
    status: 'perdido',
    owner: 'Demo User',
    notes: 'Orçamento cortado no Q1. Pode retornar no Q3.',
    createdAt: '2024-02-20',
    activities: [
      { id: 'l1', type: 'reuniao', description: 'Demo realizada. Interesse alto, mas sem budget aprovado.', createdAt: '2024-02-22T15:00:00', author: 'Demo User' },
      { id: 'l2', type: 'nota', description: 'Budget cortado. Agendar follow-up para julho.', createdAt: '2024-03-01T09:00:00', author: 'Demo User' },
    ],
  },
]
