function SearchInput({ value, onChange, placeholder }) {
  return (
    <div className="mb-3">
      <label className="sr-only" htmlFor="search-input">
        Search
      </label>
      <input
        id="search-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs outline-none focus:ring-2 focus:ring-slate-900"
      />
    </div>
  )
}

export default SearchInput
