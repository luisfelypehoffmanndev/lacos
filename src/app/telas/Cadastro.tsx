import { useId, useState, type InputHTMLAttributes } from 'react';
import { ArrowLeft, Camera } from 'lucide-react';
import { useLoja, type ErrosCadastro } from '../../estado/loja';
import { GENEROS, type Genero } from '../../estado/tipos';
import { useNavegacao } from '../navegacao';
import { Avatar } from '../componentes/Avatar';
import { Opcoes } from '../componentes/Opcoes';

/** Reduz a foto para 256 px antes de guardar (o localStorage é pequeno). */
function lerFoto(arquivo: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onerror = () => reject(leitor.error);
    leitor.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const lado = 256;
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = lado;
        const menor = Math.min(img.width, img.height);
        canvas
          .getContext('2d')!
          .drawImage(img, (img.width - menor) / 2, (img.height - menor) / 2, menor, menor, 0, 0, lado, lado);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.src = leitor.result as string;
    };
    leitor.readAsDataURL(arquivo);
  });
}

function Campo({ rotulo, erro, ...input }: { rotulo: string; erro?: string } & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="t-sm font-semibold">
        {rotulo}
      </label>
      <input
        id={id}
        aria-invalid={erro ? true : undefined}
        aria-describedby={erro ? `${id}-erro` : undefined}
        className="t-corpo mt-1 w-full border-b-2 placeholder:text-tinta-suave/60 border-linha bg-transparent py-2 outline-none focus:border-azul aria-invalid:border-erro"
        {...input}
      />
      {erro && (
        <p id={`${id}-erro`} className="t-legenda mt-1.5 text-erro">
          {erro}
        </p>
      )}
    </div>
  );
}

const TEXTOS = {
  criar: { titulo: 'Criar cadastro', botao: 'Entrar no Laços' },
  entrar: { titulo: 'Entrar', botao: 'Entrar no Laços' },
  editar: { titulo: 'Editar perfil', botao: 'Salvar alterações' },
};

/** Tela 2 — ref. 03. Só nome e e-mail são obrigatórios (fichamento, item 13). */
export function Cadastro({ modo }: { modo?: 'entrar' | 'editar' }) {
  const { voltar, podeVoltar, recomecar, ir, avisar } = useNavegacao();
  const usuario = useLoja((s) => s.usuario);
  const cadastrar = useLoja((s) => s.cadastrar);
  const textos = TEXTOS[modo ?? 'criar'];

  const [nome, setNome] = useState(usuario.nome);
  const [email, setEmail] = useState(usuario.email);
  const [genero, setGenero] = useState<Genero | null>(modo ? usuario.genero : null);
  const [foto, setFoto] = useState(usuario.foto);
  const [erros, setErros] = useState<ErrosCadastro>({});

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    const resultado = cadastrar({ nome, email, genero: genero ?? 'Prefiro não informar', foto });
    setErros(resultado);
    if (Object.keys(resultado).length > 0) return;
    if (modo === 'editar') {
      avisar('Perfil atualizado.');
      voltar();
    } else {
      recomecar({ tela: 'inicio' });
    }
  };

  return (
    <div className="sem-barra min-h-0 flex-1 overflow-y-auto bg-fundo">
      <div className="relative rounded-t-[inherit] bg-ciano-claro px-4 pt-[var(--topo-seguro)] pb-24">
        <div className="flex h-14 items-center">
          {podeVoltar ? (
            <button type="button" onClick={voltar} aria-label="Voltar" className="grid size-11 place-items-center rounded-full bg-white">
              <ArrowLeft size={20} />
            </button>
          ) : (
            <span className="size-11" />
          )}
          <span className="mx-auto flex items-center gap-2">
            <img src={`${import.meta.env.BASE_URL}marca/simbolo.png`} alt="" className="h-10 w-auto" />
            <img src={`${import.meta.env.BASE_URL}marca/letreiro.png`} alt="laços" className="h-9 w-auto" />
          </span>
          <span className="size-11" />
        </div>
        <p className="t-sm mx-auto mt-4 max-w-[28ch] text-center text-tinta-suave">
          {modo === 'editar' ? 'Mude o que quiser. Só nome e e-mail são obrigatórios.' : 'Leva menos de um minuto. Só pedimos o necessário.'}
        </p>
        <svg aria-hidden viewBox="0 0 390 60" preserveAspectRatio="none" className="absolute inset-x-0 -bottom-px h-14 w-full text-fundo">
          <path d="M0 60 L0 40 C 120 70 260 0 390 18 L390 60 Z" fill="currentColor" />
        </svg>
      </div>

      <form
        noValidate
        onSubmit={enviar}
        className="relative z-10 mx-5 -mt-20 space-y-5 rounded-[28px] bg-superficie p-6 shadow-[0_18px_40px_-18px_rgba(14,31,85,0.35)]"
      >
        <h1 className="t-lg text-center">{textos.titulo}</h1>

        <Campo rotulo="Como quer ser chamado(a)?" autoComplete="nickname" placeholder="Seu nome ou apelido" value={nome} onChange={(e) => setNome(e.target.value)} erro={erros.nome} />
        <Campo rotulo="E-mail" type="email" autoComplete="email" inputMode="email" placeholder="nome@provedor.com" value={email} onChange={(e) => setEmail(e.target.value)} erro={erros.email} />

        {modo !== 'entrar' && (
          <>
            <div>
              <p className="t-sm font-semibold">
                Foto de perfil <span className="font-normal text-tinta-suave">(opcional)</span>
              </p>
              <div className="mt-2 flex items-center gap-3">
                <Avatar nome={nome || '?'} foto={foto} tamanho={56} />
                <label className="t-sm flex h-11 cursor-pointer items-center gap-2 rounded-full border border-linha px-4 font-medium has-focus-visible:outline-2 has-focus-visible:outline-tinta">
                  <Camera size={17} aria-hidden />
                  {foto ? 'Trocar foto' : 'Escolher foto'}
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={async (e) => {
                      const arquivo = e.target.files?.[0];
                      if (arquivo) setFoto(await lerFoto(arquivo));
                    }}
                  />
                </label>
                {foto && (
                  <button type="button" onClick={() => setFoto(null)} className="t-sm h-11 px-2 text-tinta-suave">
                    Remover
                  </button>
                )}
              </div>
            </div>
            <Opcoes rotulo="Gênero" valor={genero} aoMudar={(v) => setGenero(v as Genero)} opcoes={GENEROS.map((g) => ({ valor: g, rotulo: g }))} />
          </>
        )}

        <button type="submit" className="tocavel h-14 w-full rounded-full bg-tinta text-[17px] font-semibold text-white">
          {textos.botao}
        </button>
      </form>

      <p className="t-sm mx-auto mt-5 max-w-[30ch] text-center text-tinta-suave">
        Nesta demonstração, seus dados ficam só neste aparelho.
      </p>
      {modo !== 'editar' && (
        <p className="t-sm mt-3 pb-[calc(24px+var(--base-segura))] text-center">
          {modo === 'entrar' ? 'Ainda não tem cadastro? ' : 'Já tem cadastro? '}
          <button
            type="button"
            onClick={() => ir(modo === 'entrar' ? { tela: 'cadastro' } : { tela: 'cadastro', modo: 'entrar' })}
            className="min-h-11 font-semibold text-azul underline underline-offset-4"
          >
            {modo === 'entrar' ? 'Criar cadastro' : 'Entrar'}
          </button>
        </p>
      )}
    </div>
  );
}
