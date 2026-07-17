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
  Filter,
  Gauge,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  Target,
  Thermometer,
  Timer,
  Waves,
  Wrench,
  Zap,
} from "lucide-react";

import { FacebookIcon, InstagramIcon, TireIcon } from "@/components/icons";

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
  hours: "Seg a Sex: 08:00 às 18:00 | Sábado: 08:00 às 13:00 | Domingo: fechado",
  mapsUrl: "https://maps.app.goo.gl/LcuwnvZdwe3rb6ts5",
  instagram: "https://www.instagram.com/lubriexpress2/",
  facebook: "https://www.facebook.com/LubriExpress2/",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lubriexpress.vercel.app",
};

export const navItems = [
  { label: "Serviços", href: "/#servicos" },
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Oficina", href: "/#oficina" },
  { label: "Orçamento", href: "/#orcamento" },
  { label: "Contato", href: "/#contato" },
];

export const assets = {
  logo: "/assets/brand/logo.png",
  signature: "/assets/brand/assinatura.png",
  hero: "/assets/real/atendimento.jpg",
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

export const serviceCategories = [
  {
    id: "oleos-fluidos",
    serviceId: "oleo-motor",
    icon: Droplets,
    title: "Óleos e fluidos",
    desc: "Aplicação correta, equipamentos específicos e fluidos compatíveis com cada veículo.",
    img: assets.oilChange,
    items: [
      "Óleo de motor",
      "Óleo de câmbio automático com máquina especializada",
      "Óleo de câmbio manual",
      "Fluido de freio",
      "Fluido de direção hidráulica",
    ],
  },
  {
    id: "mecanica",
    serviceId: "mecanica",
    icon: Wrench,
    title: "Mecânica preventiva e corretiva",
    desc: "Inspeção técnica, orientação clara e reparos para preservar segurança e confiabilidade.",
    img: assets.brakes,
    items: [
      "Troca de correia dentada",
      "Freios",
      "Suspensão",
      "Arrefecimento",
      "Revisão preventiva",
      "Manutenção corretiva",
    ],
  },
  {
    id: "diagnostico-injecao",
    serviceId: "diagnostico",
    icon: Cpu,
    title: "Diagnóstico e injeção eletrônica",
    desc: "Scanner automotivo e avaliação criteriosa antes de indicar qualquer intervenção.",
    img: assets.diagnostic,
    items: ["Diagnóstico eletrônico", "Injeção eletrônica", "Limpeza de bicos"],
  },
  {
    id: "eletrica",
    serviceId: "eletrica",
    icon: Zap,
    title: "Elétrica automotiva completa",
    desc: "Diagnóstico e instalação elétrica para sistemas essenciais e acessórios do veículo.",
    items: [
      "Motor de partida e alternador",
      "Troca de lâmpadas",
      "Instalação de som, travas e alarmes",
      "Instalação de buzinas a ar",
    ],
  },
  {
    id: "rodas-climatizacao",
    serviceId: "alinhamento",
    icon: Gauge,
    title: "Pneus e climatização",
    desc: "Serviços para rodagem segura, conforto e qualidade do ar dentro do veículo.",
    img: assets.alignment,
    items: [
      "Alinhamento",
      "Balanceamento",
      "Alinhamento grátis para pneus comprados no Tenda",
      "Limpeza e higienização de ar-condicionado",
    ],
  },
];

export const serviceOptions = [
  { id: "oleo-motor", label: "Óleo de motor", icon: Droplets },
  { id: "cambio-automatico", label: "Câmbio automático com máquina", icon: Cog },
  { id: "cambio-manual", label: "Óleo de câmbio manual", icon: Cog },
  { id: "fluidos", label: "Fluidos de freio ou direção", icon: Droplets },
  { id: "diagnostico", label: "Diagnóstico eletrônico", icon: Cpu },
  { id: "injecao", label: "Injeção eletrônica e limpeza de bicos", icon: Zap },
  { id: "mecanica", label: "Mecânica geral", icon: Wrench },
  { id: "correia", label: "Troca de correia dentada", icon: Cog },
  { id: "freios", label: "Freios", icon: CircleDot },
  { id: "suspensao", label: "Suspensão", icon: Waves },
  { id: "arrefecimento", label: "Arrefecimento", icon: Thermometer },
  { id: "eletrica", label: "Elétrica automotiva", icon: BatteryCharging },
  { id: "partida-alternador", label: "Motor de partida ou alternador", icon: BatteryCharging },
  { id: "acessorios", label: "Som, travas, alarmes ou buzina a ar", icon: Zap },
  { id: "alinhamento", label: "Alinhamento", icon: Gauge },
  { id: "balanceamento", label: "Balanceamento", icon: Target },
  { id: "ar-condicionado", label: "Higienização de ar-condicionado", icon: Filter },
];

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
  { value: "15+", label: "soluções automotivas" },
  { value: "08h–18h", label: "segunda a sexta" },
  { value: "Leves", label: "nacionais e importados" },
  { value: "1 oficina", label: "atendimento em Itapetininga" },
];

export const brands = [
  "Mobil",
  "Mobil Super",
  "Mobil 1",
  "Motul",
  "Shell Helix",
  "Castrol",
  "Petronas",
  "Lubrax",
  "Valvoline",
  "TotalEnergies",
  "ELF",
  "Ipiranga",
  "YPF",
  "Texaco Havoline",
  "Mann Filter",
  "Tecfil",
  "Mahle",
  "Bosch",
  "Fram",
  "Wega",
  "Vox",
  "Hengst",
  "Sakura",
  "Donaldson",
  "NGK",
  "Denso",
  "SKF",
  "Schaeffler",
  "Gates",
  "Continental",
  "Dayco",
  "TRW",
  "Cofap",
  "Monroe",
  "Nakata",
];

type BrandLogo = {
  name: string;
  logo: string;
  scale?: number;
};

export const brandLogos: BrandLogo[] = [
  { name: "Mobil", logo: "/brands/mobil.png", scale: 2.8 },
  { name: "Mobil Super", logo: "/brands/mobil-super.svg", scale: 1.25 },
  { name: "Mobil 1", logo: "/brands/mobil-1.svg", scale: 1.08 },
  { name: "Castrol", logo: "/brands/castrol.png", scale: 1.6 },
  { name: "Lubrax", logo: "/brands/lubrax.png", scale: 3 },
  { name: "Petronas", logo: "/brands/petronas.svg" },
  { name: "Valvoline", logo: "/brands/valvoline.png", scale: 1.9 },
  { name: "Motul", logo: "/brands/motul.svg" },
  { name: "Shell Helix", logo: "/brands/shell-helix.png", scale: 3.35 },
  { name: "TotalEnergies", logo: "/brands/totalenergies.svg" },
  { name: "ELF", logo: "/brands/elf.svg" },
  { name: "Ipiranga", logo: "/brands/ipiranga.svg" },
  { name: "YPF", logo: "/brands/ypf.svg" },
  { name: "Texaco Havoline", logo: "/brands/texaco-havoline.png" },
  { name: "Mann Filter", logo: "/brands/mann-filter.svg" },
  { name: "Tecfil", logo: "/brands/tecfil.svg" },
  { name: "Mahle", logo: "/brands/mahle.png" },
  { name: "Fram", logo: "/brands/fram.jpg" },
  { name: "Bosch", logo: "/brands/bosch.svg" },
  { name: "Wega", logo: "/brands/wega.png" },
  { name: "Vox", logo: "/brands/vox.png" },
  { name: "Hengst", logo: "/brands/hengst.svg" },
  { name: "Sakura", logo: "/brands/sakura.png" },
  { name: "Donaldson", logo: "/brands/donaldson.svg" },
  { name: "NGK", logo: "/brands/ngk.svg" },
  { name: "Denso", logo: "/brands/denso.svg" },
  { name: "SKF", logo: "/brands/skf.svg" },
  { name: "Schaeffler", logo: "/brands/schaeffler.jpg" },
  { name: "Gates", logo: "/brands/gates.png" },
  { name: "Continental", logo: "/brands/continental.png" },
  { name: "Dayco", logo: "/brands/dayco.webp" },
  { name: "TRW", logo: "/brands/trw.svg" },
  { name: "Cofap", logo: "/brands/cofap.svg" },
  { name: "Monroe", logo: "/brands/monroe.png" },
  { name: "Nakata", logo: "/brands/nakata.png" },
];

export const gallery = [
  { src: assets.hero, alt: "Oficina Lubri Express com elevadores automotivos", label: "Oficina Lubri Express", span: "md:col-span-2" },
  { src: assets.store, alt: "Área interna da loja Lubri Express", label: "Loja de produtos" },
  { src: assets.front, alt: "Fachada da Lubri Express em Itapetininga", label: "Fachada" },
  { src: assets.serviceDesk, alt: "Atendimento da Lubri Express", label: "Atendimento" },
  { src: assets.transmission, alt: "Serviço de câmbio automático", label: "Câmbio automático" },
  { src: assets.diagnostic, alt: "Diagnóstico eletrônico automotivo", label: "Diagnóstico eletrônico", span: "md:col-span-2" },
];

export const faqs = [
  {
    q: "Quando devo trocar o óleo do motor?",
    a: "O intervalo varia conforme o óleo, o uso e a recomendação do fabricante. A equipe confere o manual e orienta o prazo correto para o seu veículo.",
  },
  {
    q: "Quando trocar o óleo do câmbio automático?",
    a: "O intervalo depende do fabricante, do fluido e das condições de uso. A Lubri Express confere a especificação do veículo e utiliza máquina especializada quando o procedimento é indicado.",
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
  {
    label: "Instagram",
    href: company.instagram,
    icon: InstagramIcon,
    className: "border-transparent bg-[linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)] text-white",
  },
  {
    label: "Facebook",
    href: company.facebook,
    icon: FacebookIcon,
    className: "border-[#0866ff] bg-[#0866ff] text-white",
  },
  {
    label: "Localização",
    href: company.mapsUrl,
    icon: MapPin,
    className: "border-accent bg-accent text-ink",
  },
];

export const processSteps = [
  {
    icon: Search,
    title: "Você descreve o que precisa",
    desc: "Escolha um serviço ou conte os sintomas do carro no formulário.",
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
  { icon: Phone, label: company.phoneDisplay },
  { icon: ShieldCheck, label: "Revisão e diagnóstico" },
];
