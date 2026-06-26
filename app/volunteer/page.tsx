"use client"

import { useState } from "react"
import { PageShell } from "@/components/page-shell"
import { ArrowRight, CheckCircle2, Eye, EyeOff } from "lucide-react"
import PhoneInput from "react-phone-number-input"
import "react-phone-number-input/style.css"
import zxcvbn from "zxcvbn"
import Select from "react-select"
import CreatableSelect from "react-select/creatable"
import { usePlacesWidget } from "react-google-autocomplete"
import { toast } from "sonner"

const requirements = [
  "18 years of age or older",
  "Able to pass a background check",
  "Available for minimum 2-week deployment",
  "Physically capable of field conditions",
  "Prior experience in relevant field preferred",
]

const languagesList = [
  "English", "Mandarin Chinese", "Hindi", "Spanish", "French", "Modern Standard Arabic",
  "Bengali", "Russian", "Portuguese", "Urdu", "Indonesian", "German", "Japanese", "Marathi",
  "Telugu", "Turkish", "Tamil", "Yue Chinese (Cantonese)", "Vietnamese", "Tagalog", "Wu Chinese",
  "Korean", "Persian", "Hausa", "Egyptian Arabic", "Swahili", "Javanese", "Italian", "Punjabi", "Gujarati"
].map(l => ({ value: l, label: l }))

const usStates = [
  { value: "AL", label: "Alabama (AL)" }, { value: "AK", label: "Alaska (AK)" }, { value: "AZ", label: "Arizona (AZ)" }, { value: "AR", label: "Arkansas (AR)" }, { value: "CA", label: "California (CA)" }, { value: "CO", label: "Colorado (CO)" }, { value: "CT", label: "Connecticut (CT)" }, { value: "DE", label: "Delaware (DE)" }, { value: "FL", label: "Florida (FL)" }, { value: "GA", label: "Georgia (GA)" }, { value: "HI", label: "Hawaii (HI)" }, { value: "ID", label: "Idaho (ID)" }, { value: "IL", label: "Illinois (IL)" }, { value: "IN", label: "Indiana (IN)" }, { value: "IA", label: "Iowa (IA)" }, { value: "KS", label: "Kansas (KS)" }, { value: "KY", label: "Kentucky (KY)" }, { value: "LA", label: "Louisiana (LA)" }, { value: "ME", label: "Maine (ME)" }, { value: "MD", label: "Maryland (MD)" }, { value: "MA", label: "Massachusetts (MA)" }, { value: "MI", label: "Michigan (MI)" }, { value: "MN", label: "Minnesota (MN)" }, { value: "MS", label: "Mississippi (MS)" }, { value: "MO", label: "Missouri (MO)" }, { value: "MT", label: "Montana (MT)" }, { value: "NE", label: "Nebraska (NE)" }, { value: "NV", label: "Nevada (NV)" }, { value: "NH", label: "New Hampshire (NH)" }, { value: "NJ", label: "New Jersey (NJ)" }, { value: "NM", label: "New Mexico (NM)" }, { value: "NY", label: "New York (NY)" }, { value: "NC", label: "North Carolina (NC)" }, { value: "ND", label: "North Dakota (ND)" }, { value: "OH", label: "Ohio (OH)" }, { value: "OK", label: "Oklahoma (OK)" }, { value: "OR", label: "Oregon (OR)" }, { value: "PA", label: "Pennsylvania (PA)" }, { value: "RI", label: "Rhode Island (RI)" }, { value: "SC", label: "South Carolina (SC)" }, { value: "SD", label: "South Dakota (SD)" }, { value: "TN", label: "Tennessee (TN)" }, { value: "TX", label: "Texas (TX)" }, { value: "UT", label: "Utah (UT)" }, { value: "VT", label: "Vermont (VT)" }, { value: "VA", label: "Virginia (VA)" }, { value: "WA", label: "Washington (WA)" }, { value: "WV", label: "West Virginia (WV)" }, { value: "WI", label: "Wisconsin (WI)" }, { value: "WY", label: "Wyoming (WY)" }
]

const defaultSkills = [
  "First Aid", "CPR", "BLS (Basic Life Support)", "AED Operation", "Search and Rescue", 
  "Logistics Coordination", "Heavy Machinery Operation", "Forklift Certified",
  "Crisis Counseling", "Data Entry", "Radio Communications", "Crowd Control",
  "Debris Removal", "Carpentry", "Plumbing", "Electrical Repair", 
  "Food Preparation", "Water Filtration", "Driving/Transport", "Translation/Interpretation"
].map(s => ({ value: s, label: s }))

const defaultSpecializations = [
  "Medical Response", "Logistics", "Incident Management", "Communications", 
  "Search & Rescue", "Damage Assessment", "Debris Management", "Public Information",
  "Shelter Management", "Mass Care / Feeding", "Mental Health Support", 
  "Supply Chain Management", "Traffic Control", "IT / Telecom Recovery",
  "Animal Rescue", "Hazardous Materials (Hazmat)", "Heavy Rescue", 
  "Aviation Support", "Water Rescue", "Wildland Firefighting"
].map(s => ({ value: s, label: s }))

const defaultMedicalConditions = [
  "Asthma", "Diabetes", "Hypertension", "Heart Disease", "Epilepsy",
  "Thyroid Disorder", "Arthritis", "Chronic Kidney Disease", "COPD",
  "Migraines", "Anemia", "Bleeding Disorder", "Cancer (in remission)",
  "Autoimmune Disorder", "Celiac Disease", "IBS/Crohn's", "Sleep Apnea",
  "Depression", "Anxiety", "None"
].map(s => ({ value: s, label: s }))

const defaultAllergies = [
  "Penicillin", "Sulfa Drugs", "Aspirin", "Ibuprofen", "Anticonvulsants",
  "Latex", "Peanuts", "Tree Nuts", "Dairy / Lactose", "Eggs",
  "Soy", "Wheat / Gluten", "Fish", "Shellfish", "Bee Stings",
  "Wasp Stings", "Pollen", "Dust Mites", "Mold", "None"
].map(s => ({ value: s, label: s }))

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "unknown"]

export default function VolunteerPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: "" })
  const [emailError, setEmailError] = useState("")
  const [passwordMatchError, setPasswordMatchError] = useState("")

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", password: "", confirmPassword: "",
    dateOfBirth: "", gender: "prefer_not_to_say", bloodGroup: "unknown",
    street: "", city: "", state: "", zipCode: "", country: "United States",
    skills: [] as any[], specializations: [] as any[], languages: [] as any[],
    expYears: 0, expDescription: "",
    availability: "available", preferredWorkAreas: [] as any[],
    willingToTravel: false, maxTravelDistance: 0,
    weekdays: false, weekends: false, nights: false, preferredShift: "any",
    ecName: "", ecPhone: "", ecRelation: "", ecEmail: "",
    medicalConditions: [] as any[], allergies: [] as any[], physicallyFit: true,
    hasOwnVehicle: false, vehicleType: "none"
  })

  const { ref: placesRef } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    onPlaceSelected: (place) => {
      if (!place.address_components) return;
      let streetNumber = "", route = "", city = "", state = "", zipCode = "", country = "United States";
      for (const component of place.address_components) {
        const types = component.types;
        if (types.includes("street_number")) streetNumber = component.long_name;
        if (types.includes("route")) route = component.long_name;
        if (types.includes("locality")) city = component.long_name;
        if (types.includes("administrative_area_level_1")) state = component.short_name;
        if (types.includes("postal_code")) zipCode = component.long_name;
        if (types.includes("country")) country = component.long_name;
      }
      setForm(prev => ({
        ...prev,
        street: `${streetNumber} ${route}`.trim(),
        city, state, zipCode, country
      }));
    },
    options: { types: ["address"] },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.type === "checkbox" ? target.checked : target.value;
    
    if (target.id === "password") {
      const result = zxcvbn(value as string)
      const labels = ["Weak", "Fair", "Good", "Strong", "Very Strong"]
      setPasswordStrength({ score: result.score, label: labels[result.score] })
      
      if (form.confirmPassword) {
        setPasswordMatchError(value !== form.confirmPassword ? "Passwords do not match" : "")
      }
    }

    if (target.id === "confirmPassword") {
      setPasswordMatchError(value !== form.password ? "Passwords do not match" : "")
    }

    if (target.id === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value as string)) {
        setEmailError("Invalid email format")
      } else {
        setEmailError("")
      }
    }

    if (target.id === "dateOfBirth") {
      const selectedDate = new Date(value as string);
      const today = new Date();
      let age = today.getFullYear() - selectedDate.getFullYear();
      const m = today.getMonth() - selectedDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < selectedDate.getDate())) {
        age--;
      }
      if (age < 18) {
        toast.error("You must be at least 18 years old to volunteer.");
        return;
      }
    }

    setForm(prev => ({ ...prev, [target.id]: value }))
  }

  const handlePhoneChange = (val: string, field: string) => {
    setForm(prev => ({ ...prev, [field]: val || "" }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address")
      return
    }

    setLoading(true)

    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      password: form.password,
      dateOfBirth: form.dateOfBirth || undefined,
      gender: form.gender,
      bloodGroup: form.bloodGroup,
      address: {
        street: form.street,
        city: form.city,
        state: form.state,
        zipCode: form.zipCode,
        country: form.country,
      },
      skills: form.skills.map(s => s.value),
      specializations: form.specializations.map(s => s.value),
      languages: form.languages.map(l => l.value),
      experience: {
        years: Number(form.expYears),
        description: form.expDescription,
      },
      availability: "available",
      availabilitySchedule: {
        weekdays: form.weekdays,
        weekends: form.weekends,
        nights: form.nights,
        preferredShift: form.preferredShift,
      },
      preferredWorkAreas: form.preferredWorkAreas.map(s => s.value),
      willingToTravel: form.willingToTravel,
      maxTravelDistance: Number(form.maxTravelDistance),
      emergencyContact: {
        name: form.ecName,
        phone: form.ecPhone,
        relation: form.ecRelation,
        email: form.ecEmail,
      },
      healthInfo: {
        medicalConditions: form.medicalConditions.map(c => c.value),
        allergies: form.allergies.map(a => a.value),
        physicallyFit: form.physicallyFit,
      },
      hasOwnVehicle: form.hasOwnVehicle,
      vehicleType: form.vehicleType,
      status: "PENDING"
    }

    try {
      toast.loading("Submitting application...", { id: "submit" })
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        toast.success("Application submitted successfully!", { id: "submit" })
        setSubmitted(true)
      } else {
        toast.error(data.message || "Failed to register.", { id: "submit" })
      }
    } catch (err) {
      toast.error("An unexpected error occurred.", { id: "submit" })
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <PageShell breadcrumbs={[{ label: "Volunteer" }]} eyebrow="Get Involved" title="Application Submitted">
        <div className="max-w-2xl mx-auto px-6 py-32 text-center">
          <CheckCircle2 size={64} className="text-brand-red mx-auto mb-8" />
          <h2 className="text-3xl font-black text-foreground mb-4">Thank you, {form.firstName}.</h2>
          <p className="text-brand-muted-text leading-relaxed mb-8">
            Your volunteer application has been received and a confirmation email has been sent. Our team will review your submission and reach out
            within 5–7 business days.
          </p>
          <a href="/" className="inline-flex items-center gap-2 bg-brand-red text-primary-foreground text-sm font-bold px-7 py-3.5 tracking-widest uppercase hover:bg-brand-red/90 transition-all duration-200">
            Return Home
          </a>
        </div>
      </PageShell>
    )
  }

  const selectStyles = {
    control: (base: any) => ({
      ...base,
      backgroundColor: "var(--color-brand-surface)",
      borderColor: "var(--color-border)",
      borderRadius: 0,
      minHeight: "46px",
      boxShadow: "none",
      "&:hover": { borderColor: "var(--color-border)" }
    }),
    menu: (base: any) => ({ ...base, borderRadius: 0, zIndex: 50 }),
    multiValue: (base: any) => ({ ...base, backgroundColor: "var(--color-brand-red)", opacity: 0.9 }),
    multiValueLabel: (base: any) => ({ ...base, color: "white" }),
    multiValueRemove: (base: any) => ({ ...base, color: "white", "&:hover": { backgroundColor: "black" } })
  }

  return (
    <PageShell breadcrumbs={[{ label: "Volunteer" }]} eyebrow="Get Involved" title="Volunteer With R3sults" subtitle="We need skilled professionals ready to serve when disaster strikes.">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-3 gap-16">
          <aside className="lg:col-span-1">
            <div className="sticky top-28 space-y-8">
              <div>
                <h3 className="text-xs font-black tracking-widest uppercase text-foreground mb-4">Volunteer Requirements</h3>
                <ul className="space-y-3">
                  {requirements.map((req) => (
                    <li key={req} className="flex items-start gap-3 text-sm text-brand-muted-text">
                      <span className="w-1.5 h-1.5 bg-brand-red rounded-full flex-shrink-0 mt-1.5" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              <fieldset>
                <legend className="text-xs font-black tracking-widest uppercase text-foreground mb-6 pb-3 border-b border-border w-full">Personal Information</legend>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-xs font-bold tracking-wide text-foreground mb-2">First Name *</label>
                    <input id="firstName" type="text" required value={form.firstName} onChange={handleChange} className="w-full bg-brand-surface border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-brand-red transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-xs font-bold tracking-wide text-foreground mb-2">Last Name *</label>
                    <input id="lastName" type="text" required value={form.lastName} onChange={handleChange} className="w-full bg-brand-surface border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-brand-red transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold tracking-wide text-foreground mb-2">Email *</label>
                    <input id="email" type="email" required value={form.email} onChange={handleChange} className={`w-full bg-brand-surface border ${emailError ? "border-red-500 focus:border-red-500" : "border-border focus:border-brand-red"} px-4 py-3 text-sm text-foreground outline-none transition-colors`} />
                    {emailError && <p className="text-red-500 text-xs mt-1 font-bold">{emailError}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold tracking-wide text-foreground mb-2">Phone *</label>
                    <PhoneInput defaultCountry="US" value={form.phone} onChange={(v) => handlePhoneChange(v as string, "phone")} className="w-full bg-brand-surface border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-brand-red transition-colors" />
                  </div>
                  <div className="relative">
                    <label htmlFor="password" className="block text-xs font-bold tracking-wide text-foreground mb-2">Password *</label>
                    <div className="relative">
                      <input id="password" type={showPassword ? "text" : "password"} required value={form.password} onChange={handleChange} className="w-full bg-brand-surface border border-border px-4 py-3 pr-10 text-sm text-foreground outline-none focus:border-brand-red transition-colors" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-brand-muted-text">
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {form.password && (
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex gap-1 w-full mr-4">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className={`h-1 flex-1 rounded-full ${passwordStrength.score >= i ? (passwordStrength.score >= 3 ? "bg-green-500" : passwordStrength.score === 2 ? "bg-yellow-500" : "bg-red-500") : "bg-border"}`} />
                          ))}
                        </div>
                        <span className="text-xs font-bold">{passwordStrength.label}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-xs font-bold tracking-wide text-foreground mb-2">Re-enter Password *</label>
                    <div className="relative">
                      <input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} required value={form.confirmPassword} onChange={handleChange} className={`w-full bg-brand-surface border ${passwordMatchError ? "border-red-500 focus:border-red-500" : "border-border focus:border-brand-red"} px-4 py-3 pr-10 text-sm text-foreground outline-none transition-colors`} />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3.5 text-brand-muted-text">
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {passwordMatchError && <p className="text-red-500 text-xs mt-1 font-bold">{passwordMatchError}</p>}
                    {!passwordMatchError && form.confirmPassword && form.password && (
                      <p className="text-green-500 text-xs mt-1 font-bold">Passwords match ✓</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="dateOfBirth" className="block text-xs font-bold tracking-wide text-foreground mb-2">Date of Birth</label>
                    <input id="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]} className="w-full bg-brand-surface border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-brand-red transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="gender" className="block text-xs font-bold tracking-wide text-foreground mb-2">Gender</label>
                    <select id="gender" value={form.gender} onChange={handleChange} className="w-full bg-brand-surface border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-brand-red transition-colors">
                      <option value="male">Male</option><option value="female">Female</option><option value="other">Other</option><option value="prefer_not_to_say">Prefer not to say</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="bloodGroup" className="block text-xs font-bold tracking-wide text-foreground mb-2">Blood Group</label>
                    <select id="bloodGroup" value={form.bloodGroup} onChange={handleChange} className="w-full bg-brand-surface border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-brand-red transition-colors">
                      {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                    </select>
                  </div>
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-xs font-black tracking-widest uppercase text-foreground mb-6 pb-3 border-b border-border w-full">Address</legend>
                <div className="mb-4">
                  <label className="block text-xs font-bold tracking-wide text-foreground mb-2">Search Address</label>
                  <input type="text" ref={placesRef as any} placeholder="Start typing your address..." className="w-full bg-brand-surface border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-brand-red transition-colors" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label htmlFor="street" className="block text-xs font-bold tracking-wide text-foreground mb-2">Street</label>
                    <input id="street" type="text" value={form.street} onChange={handleChange} className="w-full bg-brand-surface border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-brand-red transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-xs font-bold tracking-wide text-foreground mb-2">City</label>
                    <input id="city" type="text" value={form.city} onChange={handleChange} className="w-full bg-brand-surface border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-brand-red transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-xs font-bold tracking-wide text-foreground mb-2">State</label>
                    <input id="state" type="text" value={form.state} onChange={handleChange} className="w-full bg-brand-surface border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-brand-red transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-xs font-bold tracking-wide text-foreground mb-2">Zip Code</label>
                    <input id="zipCode" type="text" value={form.zipCode} onChange={handleChange} className="w-full bg-brand-surface border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-brand-red transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-xs font-bold tracking-wide text-foreground mb-2">Country</label>
                    <input id="country" type="text" value={form.country} onChange={handleChange} className="w-full bg-brand-surface border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-brand-red transition-colors" />
                  </div>
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-xs font-black tracking-widest uppercase text-foreground mb-6 pb-3 border-b border-border w-full">Skills & Experience</legend>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold tracking-wide text-foreground mb-2">Skills</label>
                    <CreatableSelect isMulti options={defaultSkills} styles={selectStyles} placeholder="Select or type custom skills..." value={form.skills} onChange={(v) => setForm({...form, skills: v as any})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-wide text-foreground mb-2">Specializations</label>
                    <CreatableSelect isMulti options={defaultSpecializations} styles={selectStyles} placeholder="Select or type specializations..." value={form.specializations} onChange={(v) => setForm({...form, specializations: v as any})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-wide text-foreground mb-2">Languages</label>
                    <Select isMulti options={languagesList} styles={selectStyles} placeholder="Select languages..." value={form.languages} onChange={(v) => setForm({...form, languages: v as any})} />
                  </div>
                  <div className="grid sm:grid-cols-4 gap-4">
                    <div className="sm:col-span-1">
                      <label htmlFor="expYears" className="block text-xs font-bold tracking-wide text-foreground mb-2">Years of Exp</label>
                      <input id="expYears" type="number" min="0" value={form.expYears} onChange={handleChange} className="w-full bg-brand-surface border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-brand-red transition-colors" />
                    </div>
                    <div className="sm:col-span-3">
                      <label htmlFor="expDescription" className="block text-xs font-bold tracking-wide text-foreground mb-2">Experience Description</label>
                      <input id="expDescription" type="text" placeholder="Briefly describe your relevant experience." value={form.expDescription} onChange={handleChange} className="w-full bg-brand-surface border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-brand-red transition-colors" />
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-xs font-black tracking-widest uppercase text-foreground mb-6 pb-3 border-b border-border w-full">Availability & Travel</legend>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="availability" className="block text-xs font-bold tracking-wide text-foreground mb-2">Availability Status</label>
                      <input id="availability" type="text" readOnly value="Available" className="w-full bg-brand-surface border border-border px-4 py-3 text-sm text-foreground outline-none opacity-60 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wide text-foreground mb-2">Preferred Work Areas (US States)</label>
                      <Select isMulti options={usStates} styles={selectStyles} placeholder="Select states..." value={form.preferredWorkAreas} onChange={(v) => setForm({...form, preferredWorkAreas: v as any})} />
                    </div>
                  </div>
                  
                  <div className="flex gap-6 pt-2">
                    <label className="flex items-center gap-2 text-sm text-foreground">
                      <input id="willingToTravel" type="checkbox" checked={form.willingToTravel} onChange={handleChange} className="accent-brand-red" /> Willing to Travel
                    </label>
                    {form.willingToTravel && (
                      <div className="flex-1 flex items-center gap-3">
                        <label htmlFor="maxTravelDistance" className="text-sm text-foreground shrink-0">Max Miles:</label>
                        <input id="maxTravelDistance" type="number" min="0" value={form.maxTravelDistance} onChange={handleChange} className="w-24 bg-brand-surface border border-border px-3 py-1.5 text-sm text-foreground outline-none focus:border-brand-red transition-colors" />
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="block text-xs font-bold tracking-wide text-foreground mb-3">Availability Schedule</p>
                    <div className="flex flex-wrap gap-6 mb-3">
                      <label className="flex items-center gap-2 text-sm text-foreground"><input id="weekdays" type="checkbox" checked={form.weekdays} onChange={handleChange} className="accent-brand-red" /> Weekdays</label>
                      <label className="flex items-center gap-2 text-sm text-foreground"><input id="weekends" type="checkbox" checked={form.weekends} onChange={handleChange} className="accent-brand-red" /> Weekends</label>
                      <label className="flex items-center gap-2 text-sm text-foreground"><input id="nights" type="checkbox" checked={form.nights} onChange={handleChange} className="accent-brand-red" /> Nights</label>
                    </div>
                    <div>
                      <label htmlFor="preferredShift" className="block text-xs font-bold tracking-wide text-foreground mb-2">Preferred Shift</label>
                      <select id="preferredShift" value={form.preferredShift} onChange={handleChange} className="w-full bg-brand-surface border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-brand-red transition-colors">
                        <option value="any">Any</option><option value="day">Day</option><option value="night">Night</option>
                      </select>
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-xs font-black tracking-widest uppercase text-foreground mb-6 pb-3 border-b border-border w-full">Emergency Contact</legend>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="ecName" className="block text-xs font-bold tracking-wide text-foreground mb-2">Name</label>
                    <input id="ecName" type="text" value={form.ecName} onChange={handleChange} className="w-full bg-brand-surface border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-brand-red transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="ecPhone" className="block text-xs font-bold tracking-wide text-foreground mb-2">Phone</label>
                    <PhoneInput defaultCountry="US" value={form.ecPhone} onChange={(v) => handlePhoneChange(v as string, "ecPhone")} className="w-full bg-brand-surface border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-brand-red transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="ecRelation" className="block text-xs font-bold tracking-wide text-foreground mb-2">Relation</label>
                    <input id="ecRelation" type="text" value={form.ecRelation} onChange={handleChange} className="w-full bg-brand-surface border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-brand-red transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="ecEmail" className="block text-xs font-bold tracking-wide text-foreground mb-2">Email</label>
                    <input id="ecEmail" type="email" value={form.ecEmail} onChange={handleChange} className="w-full bg-brand-surface border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-brand-red transition-colors" />
                  </div>
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-xs font-black tracking-widest uppercase text-foreground mb-6 pb-3 border-b border-border w-full">Health & Vehicle</legend>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold tracking-wide text-foreground mb-2">Medical Conditions</label>
                    <CreatableSelect isMulti options={defaultMedicalConditions} styles={selectStyles} placeholder="Select or type conditions..." value={form.medicalConditions} onChange={(v) => setForm({...form, medicalConditions: v as any})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-wide text-foreground mb-2">Allergies</label>
                    <CreatableSelect isMulti options={defaultAllergies} styles={selectStyles} placeholder="Select or type allergies..." value={form.allergies} onChange={(v) => setForm({...form, allergies: v as any})} />
                  </div>
                  <div className="flex items-center gap-2 pt-2 pb-4">
                    <input id="physicallyFit" type="checkbox" checked={form.physicallyFit} onChange={handleChange} className="accent-brand-red" />
                    <label htmlFor="physicallyFit" className="text-sm text-foreground">I confirm I am physically fit for volunteer work.</label>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 h-full pt-4">
                      <input id="hasOwnVehicle" type="checkbox" checked={form.hasOwnVehicle} onChange={handleChange} className="accent-brand-red" />
                      <label htmlFor="hasOwnVehicle" className="text-sm text-foreground">I have my own vehicle.</label>
                    </div>
                    <div>
                      <label htmlFor="vehicleType" className="block text-xs font-bold tracking-wide text-foreground mb-2">Vehicle Type</label>
                      <select id="vehicleType" value={form.vehicleType} onChange={handleChange} disabled={!form.hasOwnVehicle} className="w-full bg-brand-surface border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-brand-red transition-colors disabled:opacity-50">
                        <option value="none">None</option><option value="car">Car</option><option value="suv">SUV</option><option value="truck">Truck</option><option value="van">Van</option><option value="motorcycle">Motorcycle</option>
                      </select>
                    </div>
                  </div>
                </div>
              </fieldset>

              <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-2 bg-brand-red text-primary-foreground text-sm font-bold px-8 py-4 tracking-widest uppercase hover:bg-brand-red/90 active:scale-95 transition-all duration-200 disabled:opacity-50 group">
                {loading ? "Submitting..." : "Submit Application"}
                {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
              </button>
              <p className="text-xs text-brand-muted-text text-center">
                By submitting, you agree to our{" "}
                <a href="/privacy" className="underline underline-offset-4 hover:text-foreground transition-colors">Privacy Policy</a>.
                We will never share your information.
              </p>
            </form>
          </div>
        </div>
      </div>
    </PageShell>
  )
}

