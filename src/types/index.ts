// ─── Roles ───────────────────────────────────────────────────────────────────

export type UserRole = 'owner' | 'cfo' | 'manager' | 'employee' | 'agent'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

// ─── Payment ─────────────────────────────────────────────────────────────────

export type PaymentStatus =
  | 'draft'
  | 'pending_approval'
  | 'approved'
  | 'rejected'
  | 'executing'
  | 'completed'
  | 'failed'
  | 'frozen'

export type PaymentCategory =
  | 'payroll'
  | 'vendor'
  | 'operations'
  | 'marketing'
  | 'infrastructure'
  | 'legal'
  | 'other'

export type ApprovalTier = 'auto' | 'manager' | 'cfo'

export interface Payment {
  id: string
  beneficiaryId: string
  beneficiaryName: string
  beneficiaryAddress: string
  amount: number          // USDC (6-decimal display value)
  purpose: string
  category: PaymentCategory
  scheduledDate: string   // ISO date
  createdBy: string
  createdAt: string
  status: PaymentStatus
  approvalTier: ApprovalTier
  approvals: Approval[]
  txHash?: string
  blockNumber?: number
  notes?: string
}

export interface Approval {
  id: string
  paymentId: string
  approver: string
  role: UserRole
  action: 'approved' | 'rejected' | 'pending'
  timestamp: string
  notes?: string
}

// ─── Beneficiary ─────────────────────────────────────────────────────────────

export type BeneficiaryStatus = 'active' | 'pending' | 'disabled'

export interface Beneficiary {
  id: string
  name: string
  address: string
  email?: string
  company?: string
  status: BeneficiaryStatus
  paymentLimit?: number
  totalPaid: number
  paymentCount: number
  addedBy: string
  addedAt: string
  tags: string[]
}

// ─── Policy ──────────────────────────────────────────────────────────────────

export interface ApprovalPolicy {
  id: string
  name: string
  autoApproveBelow: number
  managerApproveBelow: number
  cfoApproveAbove: number
  requireApprovedBeneficiary: boolean
  emergencyFreezeActive: boolean
  maxDailySpend: number
}

// ─── Audit ───────────────────────────────────────────────────────────────────

export type AuditEventType =
  | 'user_action'
  | 'agent_action'
  | 'policy_evaluation'
  | 'approval'
  | 'rejection'
  | 'contract_interaction'
  | 'blockchain_confirmation'
  | 'freeze'
  | 'system'

export interface AuditEvent {
  id: string
  type: AuditEventType
  actor: string
  actorRole?: UserRole | 'system' | 'agent'
  action: string
  detail: string
  paymentId?: string
  txHash?: string
  blockNumber?: number
  timestamp: string
  result: 'success' | 'failure' | 'pending' | 'info'
}

// ─── Treasury ────────────────────────────────────────────────────────────────

export interface TreasuryStats {
  totalBalance: number
  availableBalance: number
  pendingOutflow: number
  pendingInflow: number
  todayInflow: number
  todayOutflow: number
  monthlyInflow: number
  monthlyOutflow: number
  scheduledPayments: number
}

// ─── AI Agent ────────────────────────────────────────────────────────────────

export type AgentMessageRole = 'user' | 'agent' | 'system'

export interface AgentMessage {
  id: string
  role: AgentMessageRole
  content: string
  timestamp: string
  action?: AgentAction
}

export interface AgentAction {
  type: 'suggest_payment' | 'flag_anomaly' | 'policy_check' | 'report'
  payload: Record<string, unknown>
  requiresApproval: boolean
  status: 'pending' | 'approved' | 'rejected' | 'executed'
}

// ─── Analytics ───────────────────────────────────────────────────────────────

export interface MonthlyData {
  month: string
  inflow: number
  outflow: number
  net: number
}

export interface CategorySpend {
  category: PaymentCategory
  amount: number
  count: number
  pct: number
}

export interface VendorSpend {
  name: string
  amount: number
  count: number
}

// ─── Settlement ──────────────────────────────────────────────────────────────

export interface SettlementRoute {
  id: string
  name: string
  fromChain: string
  toChain: string
  fromChainId: number
  toChainId: number
  estimatedTime: string
  fee: number
  status: 'available' | 'degraded' | 'unavailable'
}
