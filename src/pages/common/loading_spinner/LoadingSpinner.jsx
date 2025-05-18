import './LoadingSpinner.css'

export function LoadingSpinner({ fullScreen = false }) {
  return (
    <div className={`loading-container ${fullScreen ? 'full-screen' : 'inline'}`}>
      <div className="elegant-spinner"></div>
    </div>
  )
} 