"use client"

export function GoogleMap(): React.JSX.Element {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-slate-50 shadow-sm dark:bg-slate-800/80">
      <iframe
        title="AG Dentaura location"
        src="https://www.google.com/maps?q=123%20Dental%20Street%20Your%20City%20000000&output=embed"
        className="h-[360px] w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}
