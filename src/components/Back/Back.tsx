import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface BackProps {
  
  className?: string
}

const Back = ({ className  }: BackProps) => {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className={`inline-flex items-center gap-1 rounded-4xl border border-transparent p-2 text-sm font-medium hover:border-white ${className}`}
    >
      <ChevronLeft size={40} aria-hidden="true" />
      
    </button>
  )
}

export default Back
