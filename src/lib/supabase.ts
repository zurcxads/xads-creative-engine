import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Creative {
  id?: string
  name: string
  type: string
  format: string
  offer: string
  angle: string
  hook: string
  body_copy: string
  cta: string
  video_prompt: string
  asset_url: string
  thumbnail_url: string
  status: string
  platform: string
  performance_notes: string
  metadata: Record<string, unknown>
  created_at?: string
  updated_at?: string
}

export const OFFERS = ['windows', 'solar', 'medicare'] as const
export const ANGLES = ['urgency', 'social-proof', 'fear', 'curiosity', 'benefit', 'testimonial', 'question'] as const
export const FORMATS = ['static', 'video', 'carousel', 'story', 'reel'] as const
export const STATUSES = ['draft', 'ready', 'testing', 'winner', 'loser', 'archived'] as const
export const PLATFORMS = ['meta', 'google', 'tiktok'] as const
export const TYPES = ['image', 'video', 'copy', 'prompt'] as const

export interface Swipe {
  id?: string
  name: string
  source_url: string
  screenshot_url: string
  offer: string
  platform: string
  hook: string
  angle: string
  body_copy: string
  cta: string
  why_it_works: string
  target_audience: string
  emotional_trigger: string
  format: string
  tags: string
  notes: string
  metadata: Record<string, unknown>
  created_at?: string
}

export const SWIPE_ANGLES = ['urgency', 'social-proof', 'fear', 'curiosity', 'benefit', 'testimonial', 'question'] as const
export const SWIPE_PLATFORMS = ['meta', 'google', 'tiktok', 'youtube', 'native', 'email', 'other'] as const
export const SWIPE_FORMATS = ['static', 'video', 'carousel', 'story'] as const

export const STATUS_COLORS: Record<string, string> = {
  winner: '#10b981',
  loser: '#ef4444',
  testing: '#3b82f6',
  draft: '#525252',
  ready: '#7c3aed',
  archived: '#525252',
}
