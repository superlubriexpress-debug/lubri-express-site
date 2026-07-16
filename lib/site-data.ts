import type { ComponentType, SVGProps } from "react";
import {
  Award,
  BatteryCharging,
  CheckCircle2,
  CircleDot,
  ClipboardCheck,
  Cog,
  Cpu,
  Droplets,
  Facebook,
  Filter,
  Gauge,
  Instagram,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
  Star,
  Target,
  Thermometer,
  Timer,
  Waves,
  Wrench,
  Zap,
} from "lucide-react";

import { TireIcon } from "@/components/icons";

export type SiteIcon = ComponentType<SVGProps<SVGSVGElement>>;

export const company = {
  name: "Lubri Express Auto Center",
  shortName: "Lubri Express",
  tagline: "Troca de óleo, revisão e diagnóstico em Itapetininga.",
  description:
    "Centro automotivo em Itapetininga para troca de óleo, câmbio automático, revisão preventiva, diagnóstico eletrônico, freios, suspensão, alinhamento e balanceamento.",
  phoneDisplay: "+55 (15) 99196-4535",
  phoneHref: "5515991964535",
  address: "Rua Quintino Bocaiuva, 318 - Centro, Itapetininga - SP",
  city: "Itapetininga - SP",
  hours: "Seg a Sex, 08:00 às 18:00",
  mapsUrl: "https://maps.app.goo.gl/LcuwnvZdwe3rb6ts5",
  instagram: "https://www.instagram.com/lubriexpress2/",
  facebook: "https://www.facebook.com/LubriExpress2/",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lubriexpress.com.br",
};

export const navItems = [
  { label: "Serviços", href: "#servicos" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Oficina", href: "#oficina" },
  { label: "Orçamento", href: "#orcamento" },
  { label: "Contato", href: "#contato" },
];

export const assets = {
  logo: "/assets/brand/logo.png",
  signature: "/assets/brand/assinatura.png",
  hero: "/assets/real/oficina.jpg",
  store: "/assets/real/loja.jpg",
  serviceDesk: "/assets/real/atendimento.jpg",
  front: "/assets/real/fachada.jpg",
  transmission: "/assets/services/transmission.jpg",
  oilChange: "/assets/services/oil-change.jpg",
  alignment: "/assets/services/alignment.jpg",
  diagnostic: "/assets/services/diagnostic.jpg",
  brakes: "/assets/services/brakes.jpg",
};

export const services = [
  {
    id: "troca-oleo",
    icon: Droplets,
    title: "Troca de óleo",
    desc: "Óleos sintéticos e minerais com aplicação correta para máxima proteção do motor.",
    img: assets.oilChange,
  },
  {
    id: "cambio-automatico",
    icon: Cog,
    title: "Câmbio automático com máquina",
    desc: "Troca completa do fluido com equipamento especializado e procedimento seguro.",
    img: assets.transmission,
  },
  {
    id: "diagnostico",
    icon: Cpu,
    title: "Diagnóstico eletrônico",
    desc: "Scanner automotivo para identificar falhas com precisão antes do reparo.",
    img: assets.diagnostic,
  },
  {
    id: "injecao",
    icon: Zap,
    title: "Injeção eletrônica",
    desc: "Limpeza, análise e manutenção do sistema de alimentação do veículo.",
  },
  {
    id: "mecanica",
    icon: Wrench,
    title: "Mecânica geral",
    desc: "Manutenção preventiva e corretiva para veículos nacionais e importados.",
  },
  {
    id: "eletrica",
    icon: BatteryCharging,
    title: "Elétrica automotiva",
    desc: "Diagnóstico e reparo do sistema elétrico com orientação clara.",
  },
  {
    id: "alinhamento",
    icon: Gauge,
    title: "Alinhamento",
    desc: "Correção de geometria para estabilidade, segurança e melhor dirigibilidade.",
    img: assets.alignment,
  },
  {
    id: "balanceamento",
    icon: Target,
    title: "Balanceamento",
    desc: "Rodagem mais suave, menor vibração e maior vida útil dos pneus.",
  },
  {
    id: "suspensao",
    icon: Waves,
    title: "Suspensão",
    desc: "Avaliação de amortecedores, buchas, molas e componentes de conforto.",
  },
  {
    id: "freios",
    icon: CircleDot,
    title: "Freios",
    desc: "Pastilhas, discos e fluido revisados para uma frenagem confiável.",
    img: assets.brakes,
  },
  {
    id: "arrefecimento",
    icon: Thermometer,
    title: "Arrefecimento",
    desc: "Limpeza, fluido e inspeção para manter a temperatura no ponto certo.",
  },
  {
    id: "filtros",
    icon: Filter,
    title: "Filtros",
    desc: "Troca de filtros de óleo, ar, combustível e cabine conforme o veículo.",
  },
  {
    id: "revisao",
    icon: ClipboardCheck,
    title: "Revisão preventiva",
    desc: "Checklist completo para evitar surpresas e preservar o carro.",
  },
  {
    id: "corretiva",
    icon: ShieldCheck,
    title: "Manutenção corretiva",
    desc: "Reparos objetivos com avaliação técnica e transparência no orçamento.",
  },
  {
    id: "pneus",
    icon: TireIcon,
    title: "Pneus",
    desc: "Inspeção, orientação e serviços para manter performance e segurança.",
  },
];

export const serviceOptions = services.map(({ id, title, icon }) => ({ id, label: title, icon }));

export const differentials = [
  { icon: Cpu, title: "Equipamentos modernos" },
  { icon: Search, title: "Diagnóstico computadorizado" },
  { icon: Award, title: "Profissionais especializados" },
  { icon: Droplets, title: "Óleos e filtros de qualidade" },
  { icon: Cog, title: "Câmbio automático com máquina" },
  { icon: ShieldCheck, title: "Garantia dos serviços" },
  { icon: Timer, title: "Atendimento rápido" },
  { icon: Target, title: "Preço justo" },
];

export const trustItems = [
  "Veículos nacionais",
  "Veículos importados",
  "Garantia dos serviços",
  "Peças e fluidos de qualidade",
  "Atendimento especializado",
];

export const stats = [
  { value: "+10k", label: "serviços realizados" },
  { value: "4.9", label: "avaliação média" },
  { value: "100%", label: "foco em garantia" },
  { value: "15+", label: "soluções automotivas" },
];

export const brands = [
  "Mobil",
  "Shell",
  "Motul",
  "Castrol",
  "Petronas",
  "Lubrax",
  "Valvoline",
  "Mann Filter",
  "Tecfil",
  "Mahle",
  "Bosch",
  "Fram",
];

export const brandLogos = [
  { name: "Mobil", logo: "/assets/brands/mobil.svg" },
  { name: "Shell", logo: "/assets/brands/shell.svg" },
  { name: "Motul", logo: "/assets/brands/motul.svg" },
  { name: "Castrol", logo: "/assets/brands/castrol.svg" },
  { name: "Petronas", logo: "/assets/brands/petronas.svg" },
  { name: "Lubrax", logo: "/assets/brands/lubrax.svg" },
  { name: "Valvoline", logo: "/assets/brands/valvoline.png" },
  { name: "Mann Filter", logo: "/assets/brands/mann-filter.svg" },
  { name: "Tecfil", logo: "/assets/brands/tecfil.svg" },
  { name: "Mahle", logo: "/assets/brands/mahle.png" },
  { name: "Bosch", logo: "/assets/brands/bosch.svg" },
  { name: "Fram", logo: "/assets/brands/fram.jpg" },
];

export const gallery = [
  { src: assets.hero, alt: "Oficina Lubri Express com elevadores automotivos", label: "Oficina Lubri Express", span: "md:col-span-2" },
  { src: assets.store, alt: "Área interna da loja Lubri Express", label: "Loja de produtos" },
  { src: assets.front, alt: "Fachada da Lubri Express em Itapetininga", label: "Fachada" },
  { src: assets.serviceDesk, alt: "Atendimento da Lubri Express", label: "Atendimento" },
  { src: assets.transmission, alt: "Serviço de câmbio automático", label: "Câmbio automático" },
  { src: assets.diagnostic, alt: "Diagnóstico eletrônico automotivo", label: "Diagnóstico eletrônico", span: "md:col-span-2" },
];

export const reviews = [
  {
    name: "Carlos Mendes",
    role: "Proprietário BMW 320i",
    text: "Atendimento impecável. Fizeram a troca do óleo do câmbio automático com máquina e o carro ficou muito mais suave.",
  },
  {
    name: "Juliana Freitas",
    role: "Proprietária Jeep Compass",
    text: "Ambiente organizado e profissionais que explicam tudo com clareza. Confio meu carro na Lubri Express.",
  },
  {
    name: "Rafael Andrade",
    role: "Proprietário Toyota Corolla",
    text: "Diagnóstico preciso, atendimento rápido e preço honesto. Já indiquei para amigos.",
  },
];

export const faqs = [
  {
    q: "Quando devo trocar o óleo do motor?",
    a: "O intervalo varia conforme o óleo, o uso e a recomendação do fabricante. A equipe confere o manual e orienta o prazo correto para o seu veículo.",
  },
  {
    q: "Quando trocar o óleo do câmbio automático?",
    a: "Em muitos veículos a troca preventiva fica entre 40.000 e 60.000 km. A Lubri Express avalia o modelo e usa máquina especializada quando indicado.",
  },
  {
    q: "Vocês atendem veículos nacionais e importados?",
    a: "Sim. A oficina atende veículos nacionais e importados com diagnóstico, revisão, troca de óleo, freios, suspensão e câmbio automático.",
  },
  {
    q: "Dá para pedir orçamento pelo WhatsApp?",
    a: "Sim. O formulário monta uma mensagem com serviço, veículo e dados de contato para enviar diretamente ao WhatsApp da loja.",
  },
];

export const socialLinks = [
  { label: "Instagram", href: company.instagram, icon: Instagram },
  { label: "Facebook", href: company.facebook, icon: Facebook },
  { label: "Localização", href: company.mapsUrl, icon: MapPin },
  { label: "WhatsApp", href: `https://wa.me/${company.phoneHref}`, icon: MessageCircle },
];

export const processSteps = [
  {
    icon: MessageCircle,
    title: "Você chama no WhatsApp",
    desc: "Conte o que o carro precisa ou selecione os serviços no formulário.",
  },
  {
    icon: ClipboardCheck,
    title: "A equipe organiza o atendimento",
    desc: "Conferimos veículo, prioridade, melhor horário e peças ou fluidos necessários.",
  },
  {
    icon: CheckCircle2,
    title: "Serviço com orientação clara",
    desc: "Você recebe diagnóstico, orçamento e próximos passos sem complicação.",
  },
];

export const heroHighlights = [
  { icon: Timer, label: company.hours },
  { icon: MessageCircle, label: company.phoneDisplay },
  { icon: ShieldCheck, label: "Revisão e diagnóstico" },
];

export const ratingStars = [Star, Star, Star, Star, Star];
