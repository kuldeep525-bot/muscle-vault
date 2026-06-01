// =============================================
// BUTTON COMPONENT — Reusable button
// Poori app mein same style ka button use hoga
// Alag alag variants hain — primary, outline, danger
// =============================================

const Button = ({
  children,        // Button ke andar text
  onClick,         // Click hone pe kya karna hai
  type = 'button', // button, submit, reset
  variant = 'primary', // primary, outline, danger
  size = 'md',     // sm, md, lg
  disabled = false,// disable karna ho toh
  fullWidth = false,// poori width leni ho toh
  loading = false, // loading state
}) => {

  // =============================================
  // VARIANTS — Alag alag button styles
  // =============================================
  const variants = {
    primary: 'bg-red-600 hover:bg-Replace: red-700
 text-white border border-red-600',
    outline: 'bg-transparent hover:bg-red-600 text-red-600 hover:text-white border border-red-600',
    danger:  'bg-red-600 hover:bg-red-700 text-white border border-red-600',
    ghost:   'bg-transparent hover:bg-white/10 text-white border border-white/20',
  }

  // =============================================
  // SIZES — Alag alag button sizes
  // =============================================
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        font-medium tracking-widest uppercase
        rounded transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center gap-2
        cursor-pointer
      `}
    >
      {/* Loading spinner */}
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12" cy="12" r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
      )}
      {children}
    </button>
  )
}

export default Button
