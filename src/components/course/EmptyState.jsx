function EmptyState({ title = "Nothing here yet", message }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-muted/20 px-4 py-8 text-center">
      <p className="text-sm font-medium text-white">{title}</p>
      {message && (
        <p className="mt-1 max-w-xs text-xs text-slate-500">{message}</p>
      )}
    </div>
  )
}

export default EmptyState
