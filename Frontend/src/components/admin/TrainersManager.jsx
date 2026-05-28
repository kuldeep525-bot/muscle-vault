import { useState, useEffect } from 'react'
import API from '../../utils/api'
import toast from 'react-hot-toast'

const defaultForm = {
  name: '',
  specialty: '',
  experience: '',
  bio: '',
  certifications: '',
  photo: '',
  isActive: true,
}

const TrainersManager = () => {
  const [trainers, setTrainers]     = useState([])
  const [loading, setLoading]       = useState(true)
  const [showModal, setShowModal]   = useState(false)
  const [editingTrainer, setEditingTrainer] = useState(null)
  const [form, setForm]             = useState(defaultForm)
  const [saving, setSaving]         = useState(false)

  const fetchTrainers = async () => {
    try {
      setLoading(true)
      const { data } = await API.get('/trainers')
      setTrainers(data.data)
    } catch {
      toast.error('Trainers load nahi hue!')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchTrainers() }, [])

  const handleAdd = () => {
    setEditingTrainer(null)
    setForm(defaultForm)
    setShowModal(true)
  }

  const handleEdit = (trainer) => {
    setEditingTrainer(trainer)
    setForm({
      name:           trainer.name,
      specialty:      trainer.specialty?.join(', ') || '',
      experience:     trainer.experience || '',
      bio:            trainer.bio || '',
      certifications: trainer.certifications?.join('\n') || '',
      photo:          trainer.photo || '',
      isActive:       trainer.isActive,
    })
    setShowModal(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!form.name || !form.specialty) {
      toast.error('Name aur specialty required hain!')
      return
    }
    try {
      setSaving(true)
      const payload = {
        ...form,
        experience:     Number(form.experience),
        specialty:      form.specialty.split(',').map(s => s.trim()).filter(Boolean),
        certifications: form.certifications.split('\n').map(c => c.trim()).filter(Boolean),
      }
      if (editingTrainer) {
        await API.put(`/trainers/${editingTrainer._id}`, payload)
        toast.success('Trainer updated!')
      } else {
        await API.post('/trainers', payload)
        toast.success('Trainer added!')
      }
      setShowModal(false)
      fetchTrainers()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save nahi hua!')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Yeh trainer delete karna chahte ho?')) return
    try {
      await API.delete(`/trainers/${id}`)
      toast.success('Trainer deleted!')
      fetchTrainers()
    } catch {
      toast.error('Delete nahi hua!')
    }
  }

  return (
    <div>

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-bebas text-2xl tracking-wider text-white">
            TRAINERS
          </h2>
          <p className="text-gray-500 text-xs mt-0.5">
            {trainers.length} trainers total
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="
            flex items-center gap-2 px-5 py-2.5
            bg-red-600 hover:bg-Replace: red-700

            text-white text-xs tracking-widest uppercase font-medium
            rounded-lg transition-all duration-300
          "
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Trainer
        </button>
      </div>

      {/* TRAINERS GRID */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-[#111] border border-white/5 rounded-xl overflow-hidden animate-pulse">
              <div className="h-48 bg-white/5"/>
              <div className="p-5">
                <div className="h-4 bg-white/5 rounded w-2/3 mb-2"/>
                <div className="h-3 bg-white/5 rounded w-1/2 mb-4"/>
                <div className="h-3 bg-white/5 rounded mb-2"/>
                <div className="h-3 bg-white/5 rounded w-3/4"/>
              </div>
            </div>
          ))}
        </div>
      ) : trainers.length === 0 ? (
        <div className="bg-[#111] border border-white/5 rounded-xl p-16 text-center">
          <div className="text-4xl mb-3">💪</div>
          <div className="text-gray-500 text-sm">Koi trainer nahi hai abhi</div>
          <button
            onClick={handleAdd}
            className="
              mt-4 px-6 py-2.5
              border border-red-600 text-red-600
              hover:bg-red-600 hover:text-white
              text-xs tracking-widest uppercase rounded-lg
              transition-all duration-300
            "
          >
            Pehla Trainer Add Karo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {trainers.map((trainer) => (
            <div
              key={trainer._id}
              className={`
                bg-[#111] border border-white/5 rounded-xl overflow-hidden
                hover:border-white/10 transition-all duration-300
                hover:-translate-y-0.5
                ${!trainer.isActive ? 'opacity-50' : ''}
              `}
            >
              {/* Photo */}
              <div className="relative h-48 bg-[#1a1a1a] overflow-hidden">
                {trainer.photo ? (
                  <img
                    src={trainer.photo}
                    alt={trainer.name}
                    className="w-full h-full object-cover opacity-80"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="
                      w-20 h-20 rounded-full
                      bg-red-600/20 border-2 border-red-600/30
                      flex items-center justify-center
                      font-bebas text-4xl text-red-600
                    ">
                      {trainer.name?.charAt(0)}
                    </div>
                  </div>
                )}

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent"/>

                {/* Status badge */}
                <div className="absolute top-3 right-3">
                  <span className={`
                    text-xs px-2.5 py-1 rounded-full border font-medium
                    ${trainer.isActive
                      ? 'bg-green-500/10 text-green-400 border-green-500/20'
                      : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
                    }
                  `}>
                    {trainer.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>

                {/* Experience badge */}
                <div className="absolute bottom-3 left-3">
                  <span className="text-xs px-2.5 py-1 rounded bg-red-600/80 text-white">
                    {trainer.experience} yrs exp
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-bebas text-xl tracking-wider text-white mb-0.5">
                  {trainer.name}
                </h3>
                <div className="text-red-600 text-xs tracking-widest uppercase mb-3">
                  {trainer.specialty?.join(' · ')}
                </div>

                {/* Bio */}
                {trainer.bio && (
                  <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">
                    {trainer.bio}
                  </p>
                )}

                {/* Certifications */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {trainer.certifications?.slice(0, 2).map((cert, i) => (
                    <span
                      key={i}
                      className="text-xs text-gray-500 border border-white/10 px-2 py-0.5 rounded"
                    >
                      {cert}
                    </span>
                  ))}
                  {trainer.certifications?.length > 2 && (
                    <span className="text-xs text-gray-600 px-2 py-0.5">
                      +{trainer.certifications.length - 2}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 border-t border-white/5 pt-4">
                  <button
                    onClick={() => handleEdit(trainer)}
                    className="
                      flex-1 py-2 text-xs tracking-wider uppercase
                      border border-white/10 text-gray-400
                      hover:border-red-600 hover:text-red-600
                      rounded-lg transition-all duration-200
                      flex items-center justify-center gap-2
                    "
                  >
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(trainer._id)}
                    className="
                      w-9 h-9 rounded-lg
                      border border-white/10 text-gray-500
                      hover:border-red-500/30 hover:text-red-400
                      flex items-center justify-center
                      transition-all duration-200
                    "
                  >
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                      <path d="M10 11v6M14 11v6"/>
                      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD/EDIT MODAL */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bebas text-xl tracking-wider text-white">
                {editingTrainer ? 'EDIT TRAINER' : 'ADD TRAINER'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSave} className="flex flex-col gap-4">

              {/* Name */}
              <div>
                <label className="text-xs tracking-widest uppercase text-gray-500 mb-2 block">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Rajveer Singh"
                  className="
                    w-full bg-[#0d0d0d] border border-white/10
                    rounded-lg px-4 py-3 text-white text-sm
                    placeholder-gray-600
                    focus:outline-none focus:border-red-600
                    transition-colors duration-300
                  "
                />
              </div>

              {/* Specialty + Experience */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs tracking-widest uppercase text-gray-500 mb-2 block">
                    Specialty * (comma separated)
                  </label>
                  <input
                    type="text"
                    value={form.specialty}
                    onChange={(e) => setForm({ ...form, specialty: e.target.value })}
                    placeholder="Strength, Cardio"
                    className="
                      w-full bg-[#0d0d0d] border border-white/10
                      rounded-lg px-4 py-3 text-white text-sm
                      placeholder-gray-600
                      focus:outline-none focus:border-red-600
                      transition-colors duration-300
                    "
                  />
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase text-gray-500 mb-2 block">
                    Experience (years)
                  </label>
                  <input
                    type="number"
                    value={form.experience}
                    onChange={(e) => setForm({ ...form, experience: e.target.value })}
                    placeholder="5"
                    min="0"
                    className="
                      w-full bg-[#0d0d0d] border border-white/10
                      rounded-lg px-4 py-3 text-white text-sm
                      placeholder-gray-600
                      focus:outline-none focus:border-red-600
                      transition-colors duration-300
                    "
                  />
                </div>
              </div>

              {/* Photo URL */}
              <div>
                <label className="text-xs tracking-widest uppercase text-gray-500 mb-2 block">
                  Photo URL
                </label>
                <input
                  type="text"
                  value={form.photo}
                  onChange={(e) => setForm({ ...form, photo: e.target.value })}
                  placeholder="https://example.com/photo.jpg"
                  className="
                    w-full bg-[#0d0d0d] border border-white/10
                    rounded-lg px-4 py-3 text-white text-sm
                    placeholder-gray-600
                    focus:outline-none focus:border-red-600
                    transition-colors duration-300
                  "
                />
              </div>

              {/* Bio */}
              <div>
                <label className="text-xs tracking-widest uppercase text-gray-500 mb-2 block">
                  Bio
                </label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  rows={3}
                  placeholder="Trainer ke baare mein short description..."
                  className="
                    w-full bg-[#0d0d0d] border border-white/10
                    rounded-lg px-4 py-3 text-white text-sm
                    placeholder-gray-600
                    focus:outline-none focus:border-red-600
                    transition-colors duration-300 resize-none
                  "
                />
              </div>

              {/* Certifications */}
              <div>
                <label className="text-xs tracking-widest uppercase text-gray-500 mb-2 block">
                  Certifications (ek line mein ek)
                </label>
                <textarea
                  value={form.certifications}
                  onChange={(e) => setForm({ ...form, certifications: e.target.value })}
                  rows={3}
                  placeholder={`NSCA Certified\nACE Personal Trainer\nYoga Alliance RYT`}
                  className="
                    w-full bg-[#0d0d0d] border border-white/10
                    rounded-lg px-4 py-3 text-white text-sm
                    placeholder-gray-600
                    focus:outline-none focus:border-red-600
                    transition-colors duration-300 resize-none
                  "
                />
              </div>

              {/* Active Toggle */}
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setForm({ ...form, isActive: !form.isActive })}
                  className={`
                    w-11 h-6 rounded-full relative
                    transition-colors duration-300 cursor-pointer
                    ${form.isActive ? 'bg-green-500' : 'bg-white/10'}
                  `}
                >
                  <div className={`
                    absolute top-1 w-4 h-4 rounded-full bg-white
                    transition-all duration-300
                    ${form.isActive ? 'left-6' : 'left-1'}
                  `}/>
                </div>
                <span className="text-gray-400 text-sm">Active Trainer</span>
              </label>

              {/* Save */}
              <button
                type="submit"
                disabled={saving}
                className="
                  w-full py-3.5 mt-2
                  bg-red-600 hover:bg-Replace: red-700

                  disabled:opacity-50 disabled:cursor-not-allowed
                  text-white text-xs tracking-widest uppercase font-medium
                  rounded-lg transition-all duration-300
                  flex items-center justify-center gap-2
                "
              >
                {saving ? (
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                ) : (
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
                {editingTrainer ? 'Update Trainer' : 'Add Trainer'}
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  )
}

export default TrainersManager
