import type { LucideIcon } from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

export interface TrustItem {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
}

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  icon: LucideIcon;
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface RegionFeature {
  id: string;
  text: string;
}

export type ServiceOptionValue =
  | ""
  | "wohnungsraeumung"
  | "verlassenschaft"
  | "geschaeftsaufloesung"
  | "keller-garage"
  | "messie-raeumung"
  | "sonstiges";

export interface ServiceOption {
  value: ServiceOptionValue;
  label: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  service: ServiceOptionValue;
  message: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface ContactInfoItem {
  id: string;
  label: string;
  href?: string;
  icon: LucideIcon;
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface LeistungItem {
  slug: string;
  title: string;
  description: string;
  href: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
