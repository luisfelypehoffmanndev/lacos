import { Phone, ShieldAlert } from 'lucide-react';
import { AVISO_ETICO } from '../../dados/conteudos';

/** Faixa de apoio imediato. Aparece no Início e na Psicoterapia (fichamento, item 14). */
export function ApoioCrise({ nota }: { nota?: string }) {
  return (
    <section aria-label="Apoio em crise" className="rounded-[24px] bg-noite p-5 text-white">
      <p className="t-md">Momento difícil agora?</p>
      <p className="t-sm mt-1 text-white/80">
        {nota ?? 'Você não precisa esperar uma sessão.'} Ligações gratuitas, 24 horas por dia.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <a href="tel:188" className="flex h-12 items-center justify-center gap-2 rounded-full bg-white font-semibold text-noite">
          <Phone size={17} aria-hidden />
          <span>
            CVV <span className="sr-only">, ligar para o</span> 188
          </span>
        </a>
        <a href="tel:192" className="flex h-12 items-center justify-center gap-2 rounded-full bg-white/12 font-semibold ring-1 ring-white/40">
          <Phone size={17} aria-hidden />
          <span>
            SAMU <span className="sr-only">, ligar para o</span> 192
          </span>
        </a>
      </div>
    </section>
  );
}

/** Texto obrigatório ao fim de todo conteúdo profissional (fichamento, item 16). */
export function AvisoEtico() {
  return (
    <aside className="flex gap-3 rounded-[18px] border border-linha bg-fundo p-4">
      <ShieldAlert size={20} className="mt-0.5 shrink-0 text-tinta-suave" aria-hidden />
      <p className="t-sm text-tinta-suave">{AVISO_ETICO}</p>
    </aside>
  );
}
