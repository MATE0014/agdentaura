import {
  faAward,
  faBolt,
  faBroom,
  faChild,
  faClock,
  faCircleCheck,
  faCrown,
  faFaceSmile,
  faHouseMedical,
  faEnvelope,
  faLocationDot,
  faMagnifyingGlass,
  faMicroscope,
  faPaintbrush,
  faPhone,
  faScrewdriver,
  faShieldHeart,
  faStethoscope,
  faSyringe,
  faTeeth,
  faTeethOpen,
  faTooth,
  faUserDoctor,
  faStar,
  faKitMedical,
  faHandshake,
  faWandSparkles,
  faXRay,
} from "@fortawesome/free-solid-svg-icons"
import { faFacebook, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons"
import type {
  BookingServiceOption,
  ClinicStat,
  ClinicValue,
  ContactDetail,
  NavLink,
  ServiceCard,
  ServiceTabItem,
  SocialLink,
  Testimonial,
} from "@/types"

export const siteConfig = {
  name: "AG Dentaura Dental Clinic",
  shortName: "AG Dentaura",
  tagline: "Care You Can Trust, Smile You Deserve",
  description:
    "AG Dentaura Dental Clinic in Mansarovar, Jaipur, led by Dr. Akash Garhwal (B.D.S. Cosmetic Dentist, Dental & Oral Surgeon), offers preventive, cosmetic, restorative, pediatric, and emergency dentistry with painless procedures, digital diagnostics, and easy online appointment booking.",
  url: "https://www.agdentaura.in",
  locale: "en_IN",
  telephone: "+91-9352696621",
  email: "info@agdentaura.in",
  address: {
    street: "Shop No. C-76, C-Block, Narayan Vihar, Near Narayan Vihar Police Station, Mansarovar",
    city: "Jaipur",
    region: "Rajasthan",
    postalCode: "302020",
    country: "IN",
  },
  hours: ["Mo-Sa 09:30-14:00", "Mo-Sa 17:00-20:00"],
  geo: { latitude: 26.8894208, longitude: 75.759616 },
  doctor: {
    name: "Dr. Akash Garhwal",
    qualification: "B.D.S. Cosmetic Dentist, Dental & Oral Surgeon",
    registrationNumber: "A-9526",
  },
  sameAs: [
    "https://www.instagram.com/",
    "https://www.facebook.com/",
    "https://wa.me/919352696621",
  ],
  keywords: [
    "dentist in Jaipur",
    "dental clinic in Jaipur",
    "dentist in Mansarovar Jaipur",
    "best dentist in Mansarovar",
    "dental clinic in Mansarovar",
    "tooth doctor in Jaipur",
    "root canal treatment in Jaipur",
    "dental implants in Jaipur",
    "teeth whitening in Jaipur",
    "pediatric dentist in Jaipur",
    "emergency dentist Jaipur",
    "cosmetic dentist Jaipur",
    "Narayan Vihar dentist",
    "dental clinic",
    "dentist",
    "teeth whitening",
    "dental implants",
    "braces and clear aligners",
    "root canal treatment",
    "cosmetic dentistry",
    "pediatric dentistry",
    "emergency dental care",
    "online dental appointment",
    "AG Dentaura",
  ],
} as const

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact Us" },
]

export const footerLinks: NavLink[] = navLinks

export const socialLinks: SocialLink[] = [
  { href: "#", label: "Instagram", icon: faInstagram },
  { href: "#", label: "Facebook", icon: faFacebook },
  { href: "https://wa.me/919352696621", label: "WhatsApp", icon: faWhatsapp },
]

export const serviceCategories: BookingServiceOption[] = [
  { value: "dental-checkups-consultation", label: "Dental Check-ups & Consultation" },
  { value: "teeth-cleaning-gum-care", label: "Teeth Cleaning & Gum Care" },
  { value: "tooth-colored-fillings", label: "Tooth-Colored Fillings" },
  { value: "root-canal-treatment", label: "Root Canal Treatment" },
  { value: "crowns-bridges", label: "Crowns & Bridges" },
  { value: "teeth-whitening-smile-design", label: "Teeth Whitening & Smile Design" },
  { value: "braces-clear-aligners", label: "Braces & Clear Aligners" },
  { value: "dental-implants", label: "Dental Implants" },
  { value: "tooth-extraction-wisdom-tooth-removal", label: "Tooth Extraction & Wisdom Tooth Removal" },
  { value: "kids-dental-care", label: "Kids Dental Care" },
  { value: "digital-xrays-oral-scanning", label: "Digital X-rays & Oral Scanning" },
  { value: "emergency-dental-care", label: "Emergency Dental Care" },
]

export const bookingServiceOptions: BookingServiceOption[] = [...serviceCategories]

export const homepageServiceTabOrder = serviceCategories.map((service) => service.label)

export const homepageServiceTabs: Record<string, ServiceTabItem[]> = {
  "Dental Check-ups & Consultation": [
    { icon: faTooth, title: "Dental Check-ups & Consultation", description: "Comprehensive check-ups and tailored consultations." },
  ],
  "Teeth Cleaning & Gum Care": [
    { icon: faShieldHeart, title: "Teeth Cleaning & Gum Care", description: "Professional cleaning and periodontal care to maintain oral health." },
  ],
  "Tooth-Colored Fillings": [
    { icon: faTeeth, title: "Tooth-Colored Fillings", description: "Aesthetic composite restorations for small to medium cavities." },
  ],
  "Root Canal Treatment": [
    { icon: faMicroscope, title: "Root Canal Treatment", description: "Precise endodontic therapy to relieve pain and preserve teeth." },
  ],
  "Crowns & Bridges": [
    { icon: faHouseMedical, title: "Crowns & Bridges", description: "Durable restorations to protect and replace damaged or missing teeth." },
  ],
  "Teeth Whitening & Smile Design": [
    { icon: faStar, title: "Teeth Whitening & Smile Design", description: "Cosmetic treatments to enhance shade, shape, and overall smile aesthetics." },
  ],
  "Braces & Clear Aligners": [
    { icon: faFaceSmile, title: "Braces & Clear Aligners", description: "Orthodontic options for alignment including fixed braces and invisible aligners." },
  ],
  "Dental Implants": [
    { icon: faSyringe, title: "Dental Implants", description: "Implant solutions for single and multiple missing teeth." },
  ],
  "Tooth Extraction & Wisdom Tooth Removal": [
    { icon: faTooth, title: "Tooth Extraction & Wisdom Tooth Removal", description: "Safe extractions and post-op care for complicated cases." },
  ],
  "Kids Dental Care": [
    { icon: faChild, title: "Kids Dental Care", description: "Child-focused preventive and restorative dental care." },
  ],
  "Digital X-rays & Oral Scanning": [
    { icon: faMagnifyingGlass, title: "Digital X-rays & Oral Scanning", description: "High-resolution imaging and intraoral scans for accurate diagnosis." },
  ],
  "Emergency Dental Care": [
    { icon: faBolt, title: "Emergency Dental Care", description: "Urgent care for pain, trauma, and unexpected dental issues." },
  ],
}

export const featuredServices: ServiceCard[] = [
  {
    icon: faTeeth,
    title: "General Check-up & Cleaning",
    description: "Structured preventive care that identifies issues early and keeps routine maintenance simple.",
  },
  {
    icon: faStar,
    title: "Teeth Whitening",
    description: "Clinical whitening sessions for a brighter smile with balanced, predictable results.",
  },
  {
    icon: faSyringe,
    title: "Dental Implants",
    description: "Durable replacement options for missing teeth with a secure feel and natural appearance.",
  },
  {
    icon: faFaceSmile,
    title: "Braces & Orthodontics",
    description: "Comprehensive tooth alignment plans for long-term function, comfort, and symmetry.",
  },
]

export const whyChooseUs = [
  {
    icon: faUserDoctor,
    title: "Experienced Specialists",
    description: "Dental care is led by clinicians who combine precision treatment with a calm chairside manner.",
  },
  {
    icon: faMicroscope,
    title: "Modern Equipment",
    description: "We use digital diagnostics and contemporary instruments to make care faster, cleaner, and more accurate.",
  },
  {
    icon: faAward,
    title: "Painless Procedures",
    description: "Comfort-first planning, local anesthesia, and careful technique help reduce anxiety and discomfort.",
  },
  {
    icon: faBolt,
    title: "Affordable Care",
    description: "Transparent treatment planning keeps essential dentistry accessible without compromising quality.",
  },
]

export const testimonials: Testimonial[] = [
  {
    quote:
      "The doctor explained each step clearly and made my treatment feel far less stressful than I expected.",
    name: "Ananya Rao",
    role: "Cosmetic dentistry patient",
  },
  {
    quote:
      "My son actually looks forward to visits now. The pediatric approach here is patient and reassuring.",
    name: "Rahul Mehta",
    role: "Parent",
  },
  {
    quote:
      "I appreciated the honest plan, the digital scans, and the way the implant timeline was explained.",
    name: "Priya Nair",
    role: "Implant patient",
  },
]

export const clinicStats: ClinicStat[] = [
  { value: "2000+", label: "Patients" },
  { value: "15+", label: "Years Experience" },
  { value: "10+", label: "Specialists" },
  { value: "4.9★", label: "Rating" },
]

export const clinicValues: ClinicValue[] = [
  {
    icon: faHandshake,
    title: "Patient First",
    description: "Every recommendation starts with your comfort, your goals, and a treatment path that makes sense.",
  },
  {
    icon: faShieldHeart,
    title: "Integrity",
    description: "We explain options honestly so you can make confident decisions without pressure.",
  },
  {
    icon: faAward,
    title: "Excellence",
    description: "From diagnostics to follow-up care, we hold the experience to a consistently high standard.",
  },
]

export const contactDetails: ContactDetail[] = [
  {
    icon: faLocationDot,
    label: "Address",
    value:
      "Shop No. C-76, C-Block, Narayan Vihar, Near Narayan Vihar Police Station, Mansarovar, Jaipur-302020",
  },
  { icon: faPhone, label: "Phone", value: "+91-9352696621" },
  { icon: faEnvelope, label: "Email", value: "info@agdentaura.in" },
  { icon: faClock, label: "Hours", value: "Morning: 9:30 AM – 2:00 PM · Evening: 5:00 PM – 8:00 PM" },
]

export const serviceCards: ServiceCard[] = [
  {
    icon: faStethoscope,
    title: "Dental Check-ups & Consultation",
    description: "Comprehensive examinations and personalized consultations to assess oral health and plan care.",
  },
  {
    icon: faBroom,
    title: "Teeth Cleaning & Gum Care",
    description: "Professional scaling, polishing, and periodontal maintenance to support healthy gums and enamel.",
  },
  {
    icon: faPaintbrush,
    title: "Tooth-Colored Fillings",
    description: "Aesthetic composite restorations that match natural tooth color while restoring function.",
  },
  {
    icon: faTooth,
    title: "Root Canal Treatment",
    description: "Endodontic care to relieve pain, remove infection, and preserve the natural tooth structure.",
  },
  {
    icon: faCrown,
    title: "Crowns & Bridges",
    description: "Durable ceramic and porcelain restorations to protect damaged teeth and replace missing ones.",
  },
  {
    icon: faWandSparkles,
    title: "Teeth Whitening & Smile Design",
    description: "Cosmetic treatments and tailored smile plans to enhance whiteness, shape, and overall aesthetics.",
  },
  {
    icon: faTeeth,
    title: "Braces & Clear Aligners",
    description: "Orthodontic options including fixed braces and discreet clear aligners for alignment and bite correction.",
  },
  {
    icon: faScrewdriver,
    title: "Dental Implants",
    description: "Precision-planned implants to replace missing teeth with natural-looking, long-lasting results.",
  },
  {
    icon: faTeethOpen,
    title: "Tooth Extraction & Wisdom Tooth Removal",
    description: "Safe extractions performed with attention to comfort, healing, and post-op guidance.",
  },
  {
    icon: faChild,
    title: "Kids Dental Care",
    description: "Child-focused preventive and restorative care that builds healthy habits and positive experiences.",
  },
  {
    icon: faXRay,
    title: "Digital X-rays & Oral Scanning",
    description: "Modern imaging and intraoral scanning for precise diagnosis and improved treatment planning.",
  },
  {
    icon: faKitMedical,
    title: "Emergency Dental Care",
    description: "Prompt attention for urgent issues like severe pain, trauma, and acute infections.",
  },
]
