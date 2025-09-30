export type UserRole =
  | "potential_client"
  | "existing_client"
  | "admin"
  | "staff"
  | "partner";

export type ProjectStatus =
  | "inquiry"
  | "quoted"
  | "active"
  | "on_hold"
  | "completed"
  | "cancelled";

export type ServiceType =
  | "architectural_design"
  | "interior_design"
  | "urban_planning"
  | "project_management";

export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";

export type PaymentStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed"
  | "refunded";

export type PaymentMethod = "mpesa" | "stripe" | "bank_transfer";

// Database Types
export interface Profile {
  id: string;
  user_id: string;
  email: string;
  full_name: string;
  phone?: string;
  role: UserRole;
  avatar_url?: string;
  company_name?: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  client_id: string;
  title: string;
  description: string;
  service_type: ServiceType;
  status: ProjectStatus;
  budget_range?: string;
  start_date?: string;
  end_date?: string;
  assigned_staff_id?: string;
  progress_percentage: number;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  client_id: string;
  service_type: ServiceType;
  preferred_date: string;
  preferred_time: string;
  status: AppointmentStatus;
  notes?: string;
  meeting_link?: string;
  staff_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Quote {
  id: string;
  client_id: string;
  project_title: string;
  service_type: ServiceType;
  description: string;
  budget_range?: string;
  timeline?: string;
  status: "pending" | "sent" | "accepted" | "rejected";
  quoted_amount?: number;
  valid_until?: string;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  project_id: string;
  client_id: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  transaction_id?: string;
  mpesa_receipt?: string;
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  file_url: string;
  file_type: string;
  file_size: number;
  uploaded_by: string;
  created_at: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  service_type: ServiceType;
  images: string[];
  featured: boolean;
  client_name?: string;
  completion_date?: string;
  location?: string;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "new" | "read" | "responded";
  created_at: string;
}

// Form Types
export interface QuoteRequestForm {
  full_name: string;
  email: string;
  phone: string;
  company_name?: string;
  service_type: ServiceType;
  project_title: string;
  description: string;
  budget_range?: string;
  timeline?: string;
  location?: string;
}

export interface AppointmentBookingForm {
  full_name: string;
  email: string;
  phone: string;
  service_type: ServiceType;
  preferred_date: string;
  preferred_time: string;
  notes?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  code?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Dashboard Types
export interface DashboardStats {
  total_projects: number;
  active_projects: number;
  completed_projects: number;
  pending_quotes: number;
  upcoming_appointments: number;
  total_revenue?: number;
  monthly_revenue?: number;
}

export interface NotificationItem {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  link?: string;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  details?: Record<string, unknown>;
  created_at: string;
}
