'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase, Creative, Swipe, OFFERS, ANGLES, FORMATS, STATUSES, PLATFORMS, TYPES, STATUS_COLORS, SWIPE_ANGLES, SWIPE_PLATFORMS, SWIPE_FORMATS } from '@/lib/supabase'
import { generateCreatives, generateVideoPrompts } from '@/lib/templates'
import { Image as ImageIcon, Video, FileText, Wand2, Plus, X, Copy, Check, ChevronDown, BarChart3, Sparkles, Film, Library as LibraryIcon, Search, BookOpen, Shuffle } from 'lucide-react'

type Tab = 'library' | 'swipes' | 'generate' | 'prompts' | 'analytics'

const TYPE_ICONS: Record<string, React.ReactNode> = {
  image: <ImageIcon size={14} />,
  video: <Video size={14} />,
  copy: <FileText size={14} />,
  prompt: <Wand2 size={14} />,
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
      className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-[#1a1a1a] hover:bg-[#252525] transition-colors duration-150"
    >
      {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}

const EMPTY_CREATIVE: Creative = {
  name: '', type: 'copy', format: 'static', offer: 'windows', angle: 'urgency',
  hook: '', body_copy: '', cta: '', video_prompt: '', asset_url: '', thumbnail_url: '',
  status: 'draft', platform: 'meta', performance_notes: '', metadata: {},
}

export default function Home() {
  const [tab, setTab] = useState<Tab>('library')
  const [creatives, setCreatives] = useState<Creative[]>([])
  const [loading, setLoading] = useState(true)
  const [dbError, setDbError] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editCreative, setEditCreative] = useState<Creative | null>(null)
  const [formData, setFormData] = useState<Creative>({ ...EMPTY_CREATIVE })

  // Filters
  const [filterOffer, setFilterOffer] = useState('')
  const [filterAngle, setFilterAngle] = useState('')
  const [filterFormat, setFilterFormat] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  // Generate tab
  const [genOffer, setGenOffer] = useState('windows')
  const [genAngle, setGenAngle] = useState('urgency')
  const [genFormat, setGenFormat] = useState('static')
  const [genPlatform, setGenPlatform] = useState('meta')
  const [genResults, setGenResults] = useState<ReturnType<typeof generateCreatives> | null>(null)

  // Prompts tab
  const [promptOffer, setPromptOffer] = useState('windows')
  const [promptAngle, setPromptAngle] = useState('urgency')
  const [promptStyle, setPromptStyle] = useState('talking-head')
  const [promptDuration, setPromptDuration] = useState('30s')
  const [promptTone, setPromptTone] = useState('professional')
  const [promptResults, setPromptResults] = useState<ReturnType<typeof generateVideoPrompts> | null>(null)

  // Swipes tab
  const EMPTY_SWIPE: Swipe = { name: '', source_url: '', screenshot_url: '', offer: '', platform: '', hook: '', angle: '', body_copy: '', cta: '', why_it_works: '', target_audience: '', emotional_trigger: '', format: 'static', tags: '', notes: '', metadata: {} }
  const [swipes, setSwipes] = useState<Swipe[]>([])
  const [swipeForm, setSwipeForm] = useState<Swipe>({ ...EMPTY_SWIPE })
  const [showSwipeForm, setShowSwipeForm] = useState(false)
  const [swipeFilterOffer, setSwipeFilterOffer] = useState('')
  const [swipeFilterAngle, setSwipeFilterAngle] = useState('')
  const [swipeFilterPlatform, setSwipeFilterPlatform] = useState('')
  const [selectedSwipe, setSelectedSwipe] = useState<Swipe | null>(null)

  const fetchSwipes = useCallback(async () => {
    const { data } = await supabase.from('swipes').select('*').order('created_at', { ascending: false })
    setSwipes(data || [])
  }, [])

  const saveSwipe = async () => {
    const payload = { ...swipeForm, created_at: new Date().toISOString() }
    await supabase.from('swipes').insert(payload)
    setSwipeForm({ ...EMPTY_SWIPE })
    setShowSwipeForm(false)
    fetchSwipes()
  }

  const deleteSwipe = async (id: string) => {
    await supabase.from('swipes').delete().eq('id', id)
    setSelectedSwipe(null)
    fetchSwipes()
  }

  const remixSwipe = (s: Swipe) => {
    setGenOffer(s.offer || 'windows')
    setGenAngle(s.angle || 'urgency')
    setTab('generate')
    setSelectedSwipe(null)
  }

  const filteredSwipes = swipes.filter(s => {
    if (swipeFilterOffer && s.offer !== swipeFilterOffer) return false
    if (swipeFilterAngle && s.angle !== swipeFilterAngle) return false
    if (swipeFilterPlatform && s.platform !== swipeFilterPlatform) return false
    return true
  })

  const fetchCreatives = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase.from('creatives').select('*').order('created_at', { ascending: false })
    if (error) {
      console.error(error)
      setDbError(true)
      setCreatives([])
    } else {
      setDbError(false)
      setCreatives(data || [])
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    let mounted = true
    supabase.from('creatives').select('*').order('created_at', { ascending: false }).then(({ data, error }) => {
      if (!mounted) return
      if (error) { setDbError(true); setCreatives([]) }
      else { setDbError(false); setCreatives(data || []) }
      setLoading(false)
    })
    supabase.from('swipes').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      if (!mounted) return
      setSwipes(data || [])
    })
    return () => { mounted = false }
  }, [])

  const saveCreative = async (c: Creative) => {
    const now = new Date().toISOString()
    const dateStr = new Date().toISOString().split('T')[0].replace(/-/g, '')
    const autoName = c.name || `${dateStr}_${c.offer}_${c.angle}_${c.format}_v1`
    const payload = { ...c, name: autoName, updated_at: now }
    if (c.id) {
      await supabase.from('creatives').update(payload).eq('id', c.id)
    } else {
      await supabase.from('creatives').insert({ ...payload, created_at: now })
    }
    fetchCreatives()
    setShowModal(false)
    setEditCreative(null)
    setFormData({ ...EMPTY_CREATIVE })
  }

  const setupDb = async () => {
    const sample: Creative = {
      ...EMPTY_CREATIVE,
      name: 'sample_windows_urgency_static_v1',
      hook: 'Your Windows License Expires Soon',
      body_copy: 'Act now to upgrade.',
      cta: 'Upgrade Now',
      status: 'draft',
    }
    const { error } = await supabase.from('creatives').insert(sample)
    if (error) {
      alert('Table creation failed. Please create the "creatives" table in Supabase with the required columns.')
    } else {
      fetchCreatives()
    }
  }

  const filteredCreatives = creatives.filter(c => {
    if (filterOffer && c.offer !== filterOffer) return false
    if (filterAngle && c.angle !== filterAngle) return false
    if (filterFormat && c.format !== filterFormat) return false
    if (filterStatus && c.status !== filterStatus) return false
    if (searchQuery && !c.name?.toLowerCase().includes(searchQuery.toLowerCase()) && !c.hook?.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  // Analytics calculations
  const stats = {
    total: creatives.length,
    byStatus: STATUSES.reduce((acc, s) => ({ ...acc, [s]: creatives.filter(c => c.status === s).length }), {} as Record<string, number>),
    byOffer: OFFERS.reduce((acc, o) => ({ ...acc, [o]: creatives.filter(c => c.offer === o).length }), {} as Record<string, number>),
    byAngle: ANGLES.reduce((acc, a) => ({ ...acc, [a]: creatives.filter(c => c.angle === a).length }), {} as Record<string, number>),
    byFormat: FORMATS.reduce((acc, f) => ({ ...acc, [f]: creatives.filter(c => c.format === f).length }), {} as Record<string, number>),
    winRateByAngle: ANGLES.reduce((acc, a) => {
      const total = creatives.filter(c => c.angle === a && (c.status === 'winner' || c.status === 'loser')).length
      const wins = creatives.filter(c => c.angle === a && c.status === 'winner').length
      return { ...acc, [a]: total > 0 ? Math.round((wins / total) * 100) : 0 }
    }, {} as Record<string, number>),
    winRateByFormat: FORMATS.reduce((acc, f) => {
      const total = creatives.filter(c => c.format === f && (c.status === 'winner' || c.status === 'loser')).length
      const wins = creatives.filter(c => c.format === f && c.status === 'winner').length
      return { ...acc, [f]: total > 0 ? Math.round((wins / total) * 100) : 0 }
    }, {} as Record<string, number>),
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'library', label: 'Library', icon: <LibraryIcon size={14} /> },
    { id: 'swipes', label: 'Swipes', icon: <BookOpen size={14} /> },
    { id: 'generate', label: 'Generate', icon: <Sparkles size={14} /> },
    { id: 'prompts', label: 'Prompts', icon: <Film size={14} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={14} /> },
  ]

  return (
    <div className="min-h-screen" style={{ background: '#000' }}>
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-3 border-b border-white/[0.04]" style={{ background: '#050505' }}>
        <div className="flex items-center gap-1.5">
          <span className="text-[16px] font-bold tracking-tight">XAds</span>
          <span className="text-[13px]" style={{ color: '#666' }}>Creative Engine</span>
        </div>
        <button
          onClick={() => { setFormData({ ...EMPTY_CREATIVE }); setEditCreative(null); setShowModal(true) }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-white text-[13px] font-medium transition-all duration-150 hover:brightness-110"
          style={{ background: '#7c3aed' }}
        >
          <Plus size={14} /> New Creative
        </button>
      </header>

      {/* Tabs */}
      <nav className="flex gap-0 px-5 border-b border-white/[0.04]" style={{ background: '#050505' }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-medium transition-colors duration-150 border-b-2"
            style={{
              color: tab === t.id ? '#e5e5e5' : '#666',
              borderColor: tab === t.id ? '#7c3aed' : 'transparent',
            }}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </nav>

      <main className="px-5 py-4 max-w-[1400px] mx-auto">
        {/* LIBRARY TAB */}
        {tab === 'library' && (
          <div>
            {dbError && (
              <div className="mb-4 p-4 rounded-lg border border-yellow-500/20 bg-yellow-500/5 text-sm">
                <p className="text-yellow-400 mb-2">Table not found. Create the &quot;creatives&quot; table in Supabase or click below to attempt auto-setup.</p>
                <button onClick={setupDb} className="px-3 py-1.5 rounded text-xs font-medium text-white" style={{ background: '#7c3aed' }}>
                  Setup Database
                </button>
              </div>
            )}

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]" />
                <input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-8 w-48"
                />
              </div>
              <FilterSelect label="Offer" value={filterOffer} onChange={setFilterOffer} options={OFFERS as unknown as string[]} />
              <FilterSelect label="Angle" value={filterAngle} onChange={setFilterAngle} options={ANGLES as unknown as string[]} />
              <FilterSelect label="Format" value={filterFormat} onChange={setFilterFormat} options={FORMATS as unknown as string[]} />
              <FilterSelect label="Status" value={filterStatus} onChange={setFilterStatus} options={STATUSES as unknown as string[]} />
            </div>

            {/* Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="skeleton h-40 rounded-lg" />
                ))}
              </div>
            ) : filteredCreatives.length === 0 ? (
              <div className="text-center py-20 text-[#555] text-sm">
                {creatives.length === 0 ? 'No creatives yet. Click "New Creative" to get started.' : 'No creatives match your filters.'}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {filteredCreatives.map(c => (
                  <div
                    key={c.id}
                    onClick={() => { setEditCreative(c); setFormData(c); setShowModal(true) }}
                    className="rounded-lg border cursor-pointer transition-all duration-150 hover:border-white/[0.08] hover:brightness-110"
                    style={{ background: '#0a0a0a', borderColor: 'rgba(255,255,255,0.03)' }}
                  >
                    <div className="h-1 rounded-t-lg" style={{ background: STATUS_COLORS[c.status] || '#525252' }} />
                    <div className="p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[#888]">{TYPE_ICONS[c.type] || <FileText size={14} />}</span>
                        <span className="text-[12px] font-bold truncate flex-1">{c.name}</span>
                      </div>
                      <div className="flex gap-1.5 mb-2">
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/[0.05] text-[#888]">{c.offer}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/[0.05] text-[#888]">{c.angle}</span>
                      </div>
                      {c.hook && (
                        <p className="text-[11px] leading-tight mb-2 line-clamp-2" style={{ color: '#888' }}>{c.hook}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px]" style={{ color: '#555' }}>
                          {c.created_at ? new Date(c.created_at).toLocaleDateString() : ''}
                        </span>
                        <span
                          className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                          style={{ background: `${STATUS_COLORS[c.status]}20`, color: STATUS_COLORS[c.status] }}
                        >
                          {c.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SWIPES TAB */}
        {tab === 'swipes' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold">Swipe File</h2>
              <button
                onClick={() => setShowSwipeForm(!showSwipeForm)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-white text-[13px] font-medium transition-all duration-150 hover:brightness-110"
                style={{ background: '#7c3aed' }}
              >
                <Plus size={14} /> Add Swipe
              </button>
            </div>

            {showSwipeForm && (
              <div className="mb-4 p-4 rounded-lg border" style={{ background: '#0a0a0a', borderColor: 'rgba(255,255,255,0.06)' }}>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
                  <Field label="Name"><input value={swipeForm.name} onChange={e => setSwipeForm({ ...swipeForm, name: e.target.value })} className="w-full" placeholder="Ad name" /></Field>
                  <Field label="Source URL"><input value={swipeForm.source_url} onChange={e => setSwipeForm({ ...swipeForm, source_url: e.target.value })} className="w-full" placeholder="https://..." /></Field>
                  <Field label="Offer"><input value={swipeForm.offer} onChange={e => setSwipeForm({ ...swipeForm, offer: e.target.value })} className="w-full" placeholder="windows, solar..." /></Field>
                  <Field label="Platform">
                    <select value={swipeForm.platform} onChange={e => setSwipeForm({ ...swipeForm, platform: e.target.value })} className="w-full">
                      <option value="">Select</option>
                      {SWIPE_PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </Field>
                  <Field label="Format">
                    <select value={swipeForm.format} onChange={e => setSwipeForm({ ...swipeForm, format: e.target.value })} className="w-full">
                      {SWIPE_FORMATS.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </Field>
                  <Field label="Angle">
                    <select value={swipeForm.angle} onChange={e => setSwipeForm({ ...swipeForm, angle: e.target.value })} className="w-full">
                      <option value="">Select</option>
                      {SWIPE_ANGLES.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </Field>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <Field label="Hook"><textarea value={swipeForm.hook} onChange={e => setSwipeForm({ ...swipeForm, hook: e.target.value })} className="w-full h-16" placeholder="Opening hook..." /></Field>
                  <Field label="Body Copy"><textarea value={swipeForm.body_copy} onChange={e => setSwipeForm({ ...swipeForm, body_copy: e.target.value })} className="w-full h-16" placeholder="Main copy..." /></Field>
                  <Field label="CTA"><input value={swipeForm.cta} onChange={e => setSwipeForm({ ...swipeForm, cta: e.target.value })} className="w-full" placeholder="Call to action" /></Field>
                  <Field label="Why It Works"><textarea value={swipeForm.why_it_works} onChange={e => setSwipeForm({ ...swipeForm, why_it_works: e.target.value })} className="w-full h-16" placeholder="Analysis..." /></Field>
                  <Field label="Target Audience"><input value={swipeForm.target_audience} onChange={e => setSwipeForm({ ...swipeForm, target_audience: e.target.value })} className="w-full" placeholder="Who is this for?" /></Field>
                  <Field label="Emotional Trigger"><input value={swipeForm.emotional_trigger} onChange={e => setSwipeForm({ ...swipeForm, emotional_trigger: e.target.value })} className="w-full" placeholder="Fear, FOMO, hope..." /></Field>
                </div>
                <Field label="Tags"><input value={swipeForm.tags} onChange={e => setSwipeForm({ ...swipeForm, tags: e.target.value })} className="w-full" placeholder="Comma separated tags" /></Field>
                <div className="flex gap-2 mt-3">
                  <button onClick={saveSwipe} className="px-4 py-2 rounded-md text-white text-[13px] font-medium hover:brightness-110" style={{ background: '#7c3aed' }}>Save Swipe</button>
                  <button onClick={() => { setShowSwipeForm(false); setSwipeForm({ ...EMPTY_SWIPE }) }} className="px-4 py-2 rounded-md text-[#888] text-[13px] bg-[#1a1a1a] hover:bg-[#252525]">Cancel</button>
                </div>
              </div>
            )}

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-4">
              <FilterSelect label="Offer" value={swipeFilterOffer} onChange={setSwipeFilterOffer} options={[...new Set(swipes.map(s => s.offer).filter(Boolean))]} />
              <FilterSelect label="Angle" value={swipeFilterAngle} onChange={setSwipeFilterAngle} options={[...SWIPE_ANGLES]} />
              <FilterSelect label="Platform" value={swipeFilterPlatform} onChange={setSwipeFilterPlatform} options={[...SWIPE_PLATFORMS]} />
            </div>

            {/* Grid */}
            {filteredSwipes.length === 0 ? (
              <div className="text-center py-20 text-[#555] text-sm">
                {swipes.length === 0 ? 'No swipes yet. Click "Add Swipe" to start building your swipe file.' : 'No swipes match your filters.'}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {filteredSwipes.map(s => (
                  <div
                    key={s.id}
                    onClick={() => setSelectedSwipe(s)}
                    className="rounded-lg border cursor-pointer transition-all duration-150 hover:border-white/[0.08] hover:brightness-110 p-3"
                    style={{ background: '#0a0a0a', borderColor: 'rgba(255,255,255,0.03)' }}
                  >
                    <div className="text-[13px] font-bold truncate mb-2">{s.name || 'Untitled'}</div>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {s.offer && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/[0.05] text-[#888]">{s.offer}</span>}
                      {s.platform && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/[0.05] text-[#888]">{s.platform}</span>}
                      {s.angle && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-500/20 text-violet-400">{s.angle}</span>}
                    </div>
                    {s.hook && <p className="text-[11px] leading-tight mb-2 line-clamp-2" style={{ color: '#888' }}>{s.hook}</p>}
                    {s.why_it_works && <p className="text-[10px] leading-tight mb-2 line-clamp-2" style={{ color: '#666' }}>{s.why_it_works}</p>}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/[0.05] text-[#666]">{s.format}</span>
                      <span className="text-[10px]" style={{ color: '#555' }}>{s.created_at ? new Date(s.created_at).toLocaleDateString() : ''}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Swipe Detail Modal */}
        {selectedSwipe && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 px-4" style={{ background: 'rgba(0,0,0,0.8)' }} onClick={() => setSelectedSwipe(null)}>
            <div className="w-full max-w-lg rounded-xl border p-5 max-h-[85vh] overflow-y-auto" style={{ background: '#0a0a0a', borderColor: 'rgba(255,255,255,0.06)' }} onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold">{selectedSwipe.name || 'Untitled Swipe'}</h3>
                <button onClick={() => setSelectedSwipe(null)} className="text-[#555] hover:text-white"><X size={16} /></button>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {selectedSwipe.offer && <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/[0.05] text-[#888]">{selectedSwipe.offer}</span>}
                {selectedSwipe.platform && <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/[0.05] text-[#888]">{selectedSwipe.platform}</span>}
                {selectedSwipe.angle && <span className="text-[11px] px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-400">{selectedSwipe.angle}</span>}
                {selectedSwipe.format && <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/[0.05] text-[#666]">{selectedSwipe.format}</span>}
              </div>
              {selectedSwipe.source_url && <div className="mb-3"><label className="text-[11px] text-[#555] block mb-1">Source</label><a href={selectedSwipe.source_url} target="_blank" rel="noopener noreferrer" className="text-[12px] text-violet-400 hover:underline break-all">{selectedSwipe.source_url}</a></div>}
              {selectedSwipe.hook && <div className="mb-3"><label className="text-[11px] text-[#555] block mb-1">Hook</label><p className="text-[12px] text-[#ccc]">{selectedSwipe.hook}</p></div>}
              {selectedSwipe.body_copy && <div className="mb-3"><label className="text-[11px] text-[#555] block mb-1">Body Copy</label><p className="text-[12px] text-[#ccc] whitespace-pre-wrap">{selectedSwipe.body_copy}</p></div>}
              {selectedSwipe.cta && <div className="mb-3"><label className="text-[11px] text-[#555] block mb-1">CTA</label><p className="text-[12px] text-[#ccc]">{selectedSwipe.cta}</p></div>}
              {selectedSwipe.why_it_works && <div className="mb-3"><label className="text-[11px] text-[#555] block mb-1">Why It Works</label><p className="text-[12px] text-[#ccc] whitespace-pre-wrap">{selectedSwipe.why_it_works}</p></div>}
              {selectedSwipe.target_audience && <div className="mb-3"><label className="text-[11px] text-[#555] block mb-1">Target Audience</label><p className="text-[12px] text-[#ccc]">{selectedSwipe.target_audience}</p></div>}
              {selectedSwipe.emotional_trigger && <div className="mb-3"><label className="text-[11px] text-[#555] block mb-1">Emotional Trigger</label><p className="text-[12px] text-[#ccc]">{selectedSwipe.emotional_trigger}</p></div>}
              {selectedSwipe.tags && <div className="mb-3"><label className="text-[11px] text-[#555] block mb-1">Tags</label><div className="flex flex-wrap gap-1">{selectedSwipe.tags.split(',').map((t, i) => <span key={i} className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/[0.05] text-[#888]">{t.trim()}</span>)}</div></div>}
              <div className="flex gap-2 pt-3 border-t border-white/[0.04]">
                <button onClick={() => remixSwipe(selectedSwipe)} className="flex items-center gap-1.5 px-4 py-2 rounded-md text-white text-[13px] font-medium hover:brightness-110" style={{ background: '#7c3aed' }}>
                  <Shuffle size={14} /> Remix
                </button>
                <button onClick={() => { if (selectedSwipe.id) deleteSwipe(selectedSwipe.id) }} className="px-4 py-2 rounded-md text-red-400 text-[13px] bg-red-500/10 hover:bg-red-500/20">Delete</button>
                <button onClick={() => setSelectedSwipe(null)} className="px-4 py-2 rounded-md text-[#888] text-[13px] bg-[#1a1a1a] hover:bg-[#252525]">Close</button>
              </div>
            </div>
          </div>
        )}

        {/* GENERATE TAB */}
        {tab === 'generate' && (
          <div className="max-w-3xl">
            <h2 className="text-sm font-bold mb-4">Generate Ad Creatives</h2>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-[11px] text-[#888] mb-1 block">Offer</label>
                <PillSelect options={['windows', 'solar', 'medicare']} value={genOffer} onChange={setGenOffer} />
              </div>
              <div>
                <label className="text-[11px] text-[#888] mb-1 block">Platform</label>
                <PillSelect options={['meta', 'google', 'tiktok']} value={genPlatform} onChange={setGenPlatform} />
              </div>
              <div className="col-span-2">
                <label className="text-[11px] text-[#888] mb-1 block">Angle</label>
                <PillSelect options={[...ANGLES]} value={genAngle} onChange={setGenAngle} />
              </div>
              <div className="col-span-2">
                <label className="text-[11px] text-[#888] mb-1 block">Format</label>
                <PillSelect options={['static', 'video', 'carousel', 'story', 'reel']} value={genFormat} onChange={setGenFormat} />
              </div>
            </div>
            <button
              onClick={() => setGenResults(generateCreatives(genOffer, genAngle))}
              className="px-4 py-2 rounded-md text-white text-[13px] font-medium transition-all duration-150 hover:brightness-110 flex items-center gap-2"
              style={{ background: '#7c3aed' }}
            >
              <Sparkles size={14} /> Generate
            </button>

            {genResults && (
              <div className="mt-6 space-y-6">
                <Section title="Headlines">
                  {genResults.headlines.map((h, i) => (
                    <ResultRow key={i} text={h} onSave={() => {
                      const c: Creative = { ...EMPTY_CREATIVE, offer: genOffer, angle: genAngle, format: genFormat, platform: genPlatform, hook: h, type: 'copy', name: '' }
                      saveCreative(c)
                    }} />
                  ))}
                </Section>
                <Section title="Primary Text">
                  {genResults.bodyTexts.map((b, i) => (
                    <ResultRow key={i} text={b} onSave={() => {
                      const c: Creative = { ...EMPTY_CREATIVE, offer: genOffer, angle: genAngle, format: genFormat, platform: genPlatform, body_copy: b, type: 'copy', name: '' }
                      saveCreative(c)
                    }} />
                  ))}
                </Section>
                <Section title="CTAs">
                  {genResults.ctas.map((c2, i) => (
                    <ResultRow key={i} text={c2} onSave={() => {
                      const c: Creative = { ...EMPTY_CREATIVE, offer: genOffer, angle: genAngle, format: genFormat, platform: genPlatform, cta: c2, type: 'copy', name: '' }
                      saveCreative(c)
                    }} />
                  ))}
                </Section>
                <Section title="Image Descriptions">
                  {genResults.imageDescs.map((d, i) => (
                    <ResultRow key={i} text={d} onSave={() => {
                      const c: Creative = { ...EMPTY_CREATIVE, offer: genOffer, angle: genAngle, format: genFormat, platform: genPlatform, body_copy: d, type: 'image', name: '' }
                      saveCreative(c)
                    }} />
                  ))}
                </Section>
              </div>
            )}
          </div>
        )}

        {/* PROMPTS TAB */}
        {tab === 'prompts' && (
          <div className="max-w-4xl">
            <h2 className="text-sm font-bold mb-4">Video Prompt Generator</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              <div>
                <label className="text-[11px] text-[#888] mb-1 block">Offer</label>
                <PillSelect options={['windows', 'solar', 'medicare']} value={promptOffer} onChange={setPromptOffer} />
              </div>
              <div>
                <label className="text-[11px] text-[#888] mb-1 block">Duration</label>
                <PillSelect options={['15s', '30s', '60s']} value={promptDuration} onChange={setPromptDuration} />
              </div>
              <div>
                <label className="text-[11px] text-[#888] mb-1 block">Tone</label>
                <PillSelect options={['professional', 'casual', 'urgent', 'friendly']} value={promptTone} onChange={setPromptTone} />
              </div>
              <div className="col-span-2 sm:col-span-3">
                <label className="text-[11px] text-[#888] mb-1 block">Angle</label>
                <PillSelect options={[...ANGLES]} value={promptAngle} onChange={setPromptAngle} />
              </div>
              <div className="col-span-2 sm:col-span-3">
                <label className="text-[11px] text-[#888] mb-1 block">Style</label>
                <PillSelect
                  options={['talking-head', 'screen-recording', 'cinematic-broll', 'text-overlay', 'before-after', 'ugc-style']}
                  value={promptStyle}
                  onChange={setPromptStyle}
                />
              </div>
            </div>
            <button
              onClick={() => setPromptResults(generateVideoPrompts(promptOffer, promptAngle, promptStyle, promptDuration, promptTone))}
              className="px-4 py-2 rounded-md text-white text-[13px] font-medium transition-all duration-150 hover:brightness-110 flex items-center gap-2"
              style={{ background: '#7c3aed' }}
            >
              <Film size={14} /> Generate Prompts
            </button>

            {promptResults && (
              <div className="mt-6 space-y-6">
                <Section title="Scene Breakdown">
                  <div className="space-y-2">
                    {promptResults.sceneBreakdown.map((s, i) => (
                      <div key={i} className="p-3 rounded-lg" style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.03)' }}>
                        <div className="text-[11px] font-bold text-[#7c3aed] mb-1">{s.label}</div>
                        <div className="text-[12px] text-[#888]">{s.desc}</div>
                      </div>
                    ))}
                  </div>
                </Section>

                <Section title="Script / Voiceover">
                  <div className="p-3 rounded-lg text-[12px] text-[#ccc] whitespace-pre-wrap" style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.03)' }}>
                    {promptResults.script}
                  </div>
                  <div className="mt-2"><CopyButton text={promptResults.script} /></div>
                </Section>

                {(['kling', 'runway', 'hailuoai', 'pika'] as const).map(tool => (
                  <Section key={tool} title={tool === 'hailuoai' ? 'Hailuoai (MiniMax)' : tool === 'kling' ? 'Kling AI' : tool === 'runway' ? 'Runway Gen-3' : 'Pika'}>
                    <div className="p-3 rounded-lg text-[12px] text-[#ccc] whitespace-pre-wrap" style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.03)' }}>
                      {promptResults.prompts[tool]}
                    </div>
                    <div className="mt-2 flex gap-2">
                      <CopyButton text={promptResults.prompts[tool]} />
                      <button
                        onClick={() => {
                          const c: Creative = { ...EMPTY_CREATIVE, offer: promptOffer, angle: promptAngle, format: 'video', platform: 'meta', video_prompt: promptResults.prompts[tool], type: 'prompt', name: '' }
                          saveCreative(c)
                        }}
                        className="text-[11px] px-2 py-1 rounded bg-[#1a1a1a] hover:bg-[#252525] transition-colors duration-150"
                      >
                        Save to Library
                      </button>
                    </div>
                  </Section>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ANALYTICS TAB */}
        {tab === 'analytics' && (
          <div className="max-w-4xl">
            <h2 className="text-sm font-bold mb-4">Analytics</h2>

            {/* Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <StatCard label="Total Creatives" value={stats.total} />
              <StatCard label="Winners" value={stats.byStatus.winner || 0} color="#10b981" />
              <StatCard label="Testing" value={stats.byStatus.testing || 0} color="#3b82f6" />
              <StatCard label="Losers" value={stats.byStatus.loser || 0} color="#ef4444" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <BarSection title="By Offer" data={stats.byOffer} max={stats.total} />
              <BarSection title="By Angle" data={stats.byAngle} max={stats.total} />
              <BarSection title="Win Rate by Angle" data={stats.winRateByAngle} max={100} suffix="%" color="#10b981" />
              <BarSection title="Win Rate by Format" data={stats.winRateByFormat} max={100} suffix="%" color="#10b981" />
              <BarSection title="By Status" data={stats.byStatus} max={stats.total} colorMap={STATUS_COLORS} />
              <BarSection title="By Format" data={stats.byFormat} max={stats.total} />
            </div>
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 px-4" style={{ background: 'rgba(0,0,0,0.8)' }} onClick={() => setShowModal(false)}>
          <div
            className="w-full max-w-lg rounded-xl border p-5 max-h-[85vh] overflow-y-auto"
            style={{ background: '#0a0a0a', borderColor: 'rgba(255,255,255,0.06)' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold">{editCreative ? 'Edit Creative' : 'New Creative'}</h3>
              <button onClick={() => setShowModal(false)} className="text-[#555] hover:text-white"><X size={16} /></button>
            </div>
            <div className="space-y-3">
              <Field label="Name (auto-generated if empty)">
                <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full" placeholder="Auto: DATE_OFFER_ANGLE_FORMAT_v1" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Type">
                  <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} className="w-full">
                    {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </Field>
                <Field label="Format">
                  <select value={formData.format} onChange={e => setFormData({ ...formData, format: e.target.value })} className="w-full">
                    {FORMATS.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </Field>
                <Field label="Offer">
                  <select value={formData.offer} onChange={e => setFormData({ ...formData, offer: e.target.value })} className="w-full">
                    {OFFERS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </Field>
                <Field label="Angle">
                  <select value={formData.angle} onChange={e => setFormData({ ...formData, angle: e.target.value })} className="w-full">
                    {ANGLES.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </Field>
                <Field label="Status">
                  <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full">
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="Platform">
                  <select value={formData.platform} onChange={e => setFormData({ ...formData, platform: e.target.value })} className="w-full">
                    {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Hook / Headline">
                <input value={formData.hook} onChange={e => setFormData({ ...formData, hook: e.target.value })} className="w-full" />
              </Field>
              <Field label="Body Copy">
                <textarea value={formData.body_copy} onChange={e => setFormData({ ...formData, body_copy: e.target.value })} className="w-full h-20" />
              </Field>
              <Field label="CTA">
                <input value={formData.cta} onChange={e => setFormData({ ...formData, cta: e.target.value })} className="w-full" />
              </Field>
              <Field label="Video Prompt">
                <textarea value={formData.video_prompt} onChange={e => setFormData({ ...formData, video_prompt: e.target.value })} className="w-full h-20" />
              </Field>
              <Field label="Performance Notes">
                <textarea value={formData.performance_notes} onChange={e => setFormData({ ...formData, performance_notes: e.target.value })} className="w-full h-16" />
              </Field>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => saveCreative(formData)}
                  className="px-4 py-2 rounded-md text-white text-[13px] font-medium transition-all duration-150 hover:brightness-110"
                  style={{ background: '#7c3aed' }}
                >
                  {editCreative ? 'Update' : 'Save'}
                </button>
                {editCreative && (
                  <button
                    onClick={async () => {
                      if (editCreative.id) {
                        await supabase.from('creatives').delete().eq('id', editCreative.id)
                        fetchCreatives()
                        setShowModal(false)
                      }
                    }}
                    className="px-4 py-2 rounded-md text-red-400 text-[13px] bg-red-500/10 hover:bg-red-500/20 transition-colors duration-150"
                  >
                    Delete
                  </button>
                )}
                <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-md text-[#888] text-[13px] bg-[#1a1a1a] hover:bg-[#252525] transition-colors duration-150">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Sub-components
function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div className="relative">
      <select value={value} onChange={e => onChange(e.target.value)} className="appearance-none pr-7 text-[12px] min-w-[100px]">
        <option value="">All {label}s</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#555] pointer-events-none" />
    </div>
  )
}

function PillSelect({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map(o => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className="px-2.5 py-1 rounded-full text-[11px] font-medium transition-all duration-150"
          style={{
            background: value === o ? '#7c3aed' : '#1a1a1a',
            color: value === o ? '#fff' : '#888',
          }}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[12px] font-bold text-[#888] uppercase tracking-wider mb-2">{title}</h3>
      {children}
    </div>
  )
}

function ResultRow({ text, onSave }: { text: string; onSave: () => void }) {
  return (
    <div className="flex items-start gap-2 p-3 rounded-lg mb-2" style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.03)' }}>
      <p className="flex-1 text-[12px] text-[#ccc]">{text}</p>
      <div className="flex gap-1.5 shrink-0">
        <CopyButton text={text} />
        <button onClick={onSave} className="text-[11px] px-2 py-1 rounded bg-[#1a1a1a] hover:bg-[#252525] transition-colors duration-150">Save</button>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[11px] text-[#888] mb-1 block">{label}</label>
      {children}
    </div>
  )
}

function StatCard({ label, value, color }: { label: string; value: number; color?: string }) {
  return (
    <div className="p-3 rounded-lg border" style={{ background: '#0a0a0a', borderColor: 'rgba(255,255,255,0.03)' }}>
      <div className="text-[24px] font-bold" style={{ color: color || '#e5e5e5' }}>{value}</div>
      <div className="text-[11px] text-[#888]">{label}</div>
    </div>
  )
}

function BarSection({ title, data, max, suffix, color, colorMap }: { title: string; data: Record<string, number>; max: number; suffix?: string; color?: string; colorMap?: Record<string, string> }) {
  const safeMax = max || 1
  return (
    <div>
      <h3 className="text-[12px] font-bold text-[#888] uppercase tracking-wider mb-3">{title}</h3>
      <div className="space-y-2">
        {Object.entries(data).map(([key, val]) => (
          <div key={key}>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-[#888]">{key}</span>
              <span className="text-[#ccc]">{val}{suffix || ''}</span>
            </div>
            <div className="h-2 rounded-full bg-[#1a1a1a] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.max((val / safeMax) * 100, 0)}%`, background: colorMap?.[key] || color || '#7c3aed' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
