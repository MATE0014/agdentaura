"use client"

export function GoogleMap(): React.JSX.Element {
  return (
    <div className="overflow-hidden rounded-[30px] border border-border bg-card shadow-[var(--shadow-card)]">
      <iframe
        title="AG Dentaura Dental Clinic location"
        src="https://www.google.com/maps?q=AG+Dentaura+Dental+Clinic,+Shop+No.+C-76,+C-Block,+Narayan+Vihar,+Mansarovar,+Jaipur+302020&output=embed"
        className="h-[360px] w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}
