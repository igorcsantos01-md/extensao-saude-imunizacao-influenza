import React, { useEffect, useState } from 'react';
import {
  Download,
  ShieldCheck,
  FileText,
  Terminal,
} from 'lucide-react';
import { CERT_ASSETS } from './data/certAssets';
import { CERTIFICATE_08_DATA, CertificateData } from './data/campaignData';
import {
  buildFullVerificationUrl,
  generateCertificate08Pdf,
} from './utils/pdfGenerator';
import { CertificateViewer } from './components/CertificateViewer';
import { CertificateValidator } from './components/CertificateValidator';
import { CampaignInteractiveModules } from './components/CampaignInteractiveModules';
import { GithubCommandModal } from './components/GithubCommandModal';

const STORAGE_KEY = 'ems_cert_08_editable_v1';

export default function App() {
  const [cert, setCert] = useState<CertificateData>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) {
          return { ...CERTIFICATE_08_DATA, ...JSON.parse(saved) };
        }
      } catch (e) {
        console.error(e);
      }
    }
    return CERTIFICATE_08_DATA;
  });

  const [urlCode, setUrlCode] = useState<string | undefined>(undefined);
  const [isDownloadingHero, setIsDownloadingHero] = useState<boolean>(false);
  const [isGithubModalOpen, setIsGithubModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cert));
      } catch (e) {
        console.error(e);
      }
    }
  }, [cert]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const codeParam =
      params.get('codigo') || params.get('code') || params.get('chave');
    if (codeParam) {
      setUrlCode(codeParam);
    }

    if (window.location.hash === '#validador' || codeParam) {
      setTimeout(() => {
        const el = document.getElementById('validador');
        if (el && window.location.hash === '#validador') {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 250);
    }
  }, []);

  const handleHeroDownload = async () => {
    try {
      setIsDownloadingHero(true);
      await generateCertificate08Pdf(cert);
    } finally {
      setIsDownloadingHero(false);
    }
  };

  const handleResetCert = () => {
    setCert(CERTIFICATE_08_DATA);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fullVerifyUrl = buildFullVerificationUrl(cert);

  return (
    <div
      className="min-h-screen bg-[#FCF9F2] text-[#142529] flex flex-col"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* =====================================================================
          TOP NAVIGATION BAR (Strict 3-Zone Contract)
         ===================================================================== */}
      <header className="sticky top-0 z-40 bg-[#0B2E36]/95 backdrop-blur-md border-b border-white/10 text-[#FCF9F2]">
        <div className="max-w-[1360px] mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 py-3.5">
          {/* Zone 1: Single Text Element Brand Wordmark */}
          <a
            href="#topo"
            className="text-base sm:text-lg font-bold tracking-tight text-[#FCF9F2] whitespace-nowrap shrink-0"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Extensão Saúde · Imunização
          </a>

          {/* Zone 2: 5 Concise Single-Line Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#FCF9F2]/80">
            <a
              href="#certificado-pdf"
              className="hover:text-[#F59E0B] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Certificado Nº 08 (PDF Editável)
            </a>
            <a
              href="#validador"
              className="hover:text-[#F59E0B] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Validador Oficial
            </a>
            <a
              href="#grupos-prioritarios"
              className="hover:text-[#F59E0B] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Grupos Prioritários
            </a>
            <a
              href="#folheto-comunitario"
              className="hover:text-[#F59E0B] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Folheto Comunitário
            </a>
            <a
              href="#simulador-caderneta"
              className="hover:text-[#F59E0B] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Caderneta & SUS
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action Button */}
          <div className="flex items-center shrink-0">
            <button
              onClick={handleHeroDownload}
              disabled={isDownloadingHero}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#D97706] hover:bg-[#B45309] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {isDownloadingHero ? 'Exportando PDF...' : 'Baixar PDF Nº 08'}
            </button>
          </div>
        </div>
      </header>

      <main id="topo" className="flex-1">
        {/* ===================================================================
            HERO SECTION: CAMPAIGN CONTEXT & INSTITUTIONAL CREDENTIALS
           =================================================================== */}
        <section className="bg-[#0B2E36] text-[#FCF9F2] pt-12 pb-14 px-4 sm:px-6 lg:px-8 border-b border-[#F59E0B]/25">
          <div className="max-w-[1360px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              {/* Left 7 Columns: Editorial Narrative */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#F59E0B]">
                    <span>PROGRAMA INTERINSTITUCIONAL DE EXTENSÃO EM SAÚDE</span>
                    <span aria-hidden="true">·</span>
                    <span>CERTIFICADO Nº {cert.certNumber}</span>
                    <span aria-hidden="true">·</span>
                    <span>CÓD. {cert.code}</span>
                  </div>

                  <h1
                    className="mt-4 text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-[#FCF9F2] leading-[1.15]"
                    style={{
                      fontFamily: "'Fraunces', serif",
                      textWrap: 'balance',
                    }}
                  >
                    {cert.title}
                  </h1>

                  <p className="mt-4 text-base sm:text-lg text-[#FCF9F2]/85 leading-relaxed max-w-2xl">
                    Ação extensionista de educação comunitária, combate à
                    desinformação vacinal e coleta de dados populacionais sobre a
                    vacina anual contra a gripe (Influenza A/H1N1, A/H3N2 e
                    linhagem B), prevenção de Síndrome Respiratória Aguda Grave
                    (SRAG) e conferência ativa da Caderneta de Vacinação no SUS.
                  </p>
                </div>

                {/* Primary Hero Actions */}
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <button
                    onClick={() => scrollToSection('certificado-pdf')}
                    className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white font-semibold text-sm shadow-lg transition-all cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Ver e Editar Certificado Nº 08 (Frente e Verso)</span>
                  </button>

                  <button
                    onClick={handleHeroDownload}
                    disabled={isDownloadingHero}
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#FCF9F2] border border-white/20 font-semibold text-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Download className="w-4 h-4 text-[#F59E0B]" />
                    <span>
                      {isDownloadingHero
                        ? 'Gerando PDF...'
                        : 'Baixar PDF Editável'}
                    </span>
                  </button>

                  <button
                    onClick={() => scrollToSection('validador')}
                    className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-[#123B45] hover:bg-[#174954] text-[#F59E0B] border border-[#F59E0B]/30 font-mono text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Autenticar ({cert.code})</span>
                  </button>
                </div>
              </div>

              {/* Right 5 Columns: Institutional & Extensionist Dossier Card */}
              <div className="lg:col-span-5 rounded-2xl bg-[#123B45] border border-white/15 p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/15">
                    <div className="flex items-center gap-3">
                      <img
                        src={CERT_ASSETS.logoEms}
                        alt="Logo Editora Mente e Saúde"
                        className="w-12 h-12 rounded-lg bg-white p-1 object-contain"
                      />
                      <img
                        src={CERT_ASSETS.logoCpmda}
                        alt="Logo Centro Profissionalizante Maria Dalva de Araújo"
                        className="w-12 h-12 rounded-lg bg-white p-1 object-contain"
                      />
                    </div>
                    <div className="text-right font-mono text-xs">
                      <div className="text-[#F59E0B] font-bold">
                        FÉ PÚBLICA INTERINSTITUCIONAL
                      </div>
                      <div className="text-[#FCF9F2]/75">
                        Livro nº {cert.bookNumber} · Folha {cert.pageNumber}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-xs sm:text-sm">
                    <div>
                      <span className="font-mono text-[11px] uppercase text-[#F59E0B] block">
                        Profissional Extensionista Titular
                      </span>
                      <div className="font-bold text-lg text-white mt-0.5">
                        {cert.holderName}
                      </div>
                      <div className="font-mono text-xs text-[#FCF9F2]/80">
                        {cert.holderRole} · CPF: {cert.holderCpf} ·{' '}
                        {cert.holderInstitution}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10">
                      <span className="font-mono text-[11px] uppercase text-[#F59E0B] block">
                        Enquadramento Curricular (Item 08 do Edital)
                      </span>
                      <div className="font-medium text-[#FCF9F2]/95 mt-0.5 leading-snug">
                        Atividades de Extensão: Campanhas educativas, de
                        vacinação, coleta de dados populacionais e atividades
                        comunitárias.
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-4 font-mono text-xs">
                      <div>
                        <span className="text-[#FCF9F2]/60 block text-[10px]">
                          PERÍODO & CARGA HORÁRIA
                        </span>
                        <span className="font-bold text-white">
                          {cert.period} · {cert.totalHoursNumeric}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#FCF9F2]/60 block text-[10px]">
                          CHAVE DE CONTROLE
                        </span>
                        <span className="font-bold text-[#F59E0B]">
                          {cert.controlKey}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-[#FCF9F2]/80">
                  <span>Emissão: {cert.issueLocationAndDate}</span>
                  <button
                    onClick={() => setIsGithubModalOpen(true)}
                    className="inline-flex items-center gap-1.5 font-mono text-[#F59E0B] hover:underline cursor-pointer"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Ver Comando GitHub</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column Quantitative Proof Row Below Hero Split */}
            <div className="mt-10 pt-8 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#0F3842] rounded-xl p-4 border border-white/10">
                <div className="font-mono text-xs text-[#F59E0B]">
                  CARGA HORÁRIA AUDITADA
                </div>
                <div className="font-mono text-2xl font-bold text-white mt-1 tabular-nums">
                  {cert.totalHoursNumeric} (4 Eixos)
                </div>
                <div className="text-xs text-[#FCF9F2]/75 mt-1">
                  Curadoria editorial, enquete digital, combate a fake news e
                  ação comunitária.
                </div>
              </div>

              <div className="bg-[#0F3842] rounded-xl p-4 border border-white/10">
                <div className="font-mono text-xs text-[#F59E0B]">
                  COLETA DE DADOS POPULACIONAIS
                </div>
                <div className="font-mono text-2xl font-bold text-white mt-1 tabular-nums">
                  n = 486 Cidadãos
                </div>
                <div className="text-xs text-[#FCF9F2]/75 mt-1">
                  Levantamento comunitário sobre cobertura vacinal e hesitação
                  em grupos prioritários.
                </div>
              </div>

              <div className="bg-[#0F3842] rounded-xl p-4 border border-white/10">
                <div className="font-mono text-xs text-[#F59E0B]">
                  INTENÇÃO PÓS-EDUCAÇÃO EM SAÚDE
                </div>
                <div className="font-mono text-2xl font-bold text-white mt-1 tabular-nums">
                  96,4% Adesão Vacinal
                </div>
                <div className="text-xs text-[#FCF9F2]/75 mt-1">
                  Participantes que confirmaram atualização da caderneta após
                  leitura do folheto.
                </div>
              </div>

              <div className="bg-[#0F3842] rounded-xl p-4 border border-white/10">
                <div className="font-mono text-xs text-[#F59E0B]">
                  REGISTRO DE FÉ PÚBLICA
                </div>
                <div className="font-mono text-xl font-bold text-white mt-1 tabular-nums">
                  {cert.code}
                </div>
                <div className="text-xs text-[#FCF9F2]/75 mt-1">
                  Certificado de 2 laudas com validação via QR Code clicável e
                  hash SHA-256.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 1: INTERACTIVE PDF VIEWER, EDITOR & DOWNLOADER
           =================================================================== */}
        <CertificateViewer
          cert={cert}
          onUpdateCert={setCert}
          onResetCert={handleResetCert}
          onJumpToValidator={() => scrollToSection('validador')}
        />

        {/* ===================================================================
            SECTION 2: OFFICIAL PUBLIC AUTHENTICATOR (#validador)
           =================================================================== */}
        <CertificateValidator
          cert={cert}
          initialCodeFromUrl={urlCode}
          onScrollToPdf={() => scrollToSection('certificado-pdf')}
        />

        {/* ===================================================================
            SECTION 3: EXPLANATION & INTERACTIVE MODULES OF THE CAMPAIGN
           =================================================================== */}
        <CampaignInteractiveModules />
      </main>

      {/* =====================================================================
          INSTITUTIONAL FOOTER (With Touchable Verification Link)
         ===================================================================== */}
      <footer className="bg-[#081F25] text-[#FCF9F2]/80 border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-white/10">
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={CERT_ASSETS.logoEms}
                alt="Editora Mente e Saúde"
                className="w-10 h-10 rounded bg-white p-0.5 object-contain"
              />
              <img
                src={CERT_ASSETS.logoCpmda}
                alt="Centro Profissionalizante Maria Dalva de Araújo"
                className="w-10 h-10 rounded bg-white p-0.5 object-contain"
              />
              <span
                className="font-bold text-base text-white"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                Programa Interinstitucional de Extensão em Saúde
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#FCF9F2]/70 max-w-md">
              Plataforma pública de divulgação científica, entrega de materiais
              educativos comunitários e verificação de autenticidade documental
              de Atividades de Extensão Universitária e Comunitária (Item 08).
            </p>
            <div className="pt-1 text-xs font-mono">
              <span className="text-[#F59E0B] block">
                Link Oficial de Verificação (Toque p/ acessar):
              </span>
              <a
                href={fullVerifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline hover:text-[#F59E0B] break-all"
              >
                {fullVerifyUrl}
              </a>
            </div>
          </div>

          <div className="md:col-span-4 space-y-1.5 text-xs">
            <div className="font-mono uppercase text-[#F59E0B] font-bold mb-2">
              Instituições Certificadoras Homologadas
            </div>
            <div className="text-white font-semibold">{cert.issuer1.name}</div>
            <div className="font-mono text-[11px] text-[#FCF9F2]/70">
              CNPJ: {cert.issuer1.cnpj} · {cert.issuer1.department}
            </div>
            <div className="text-white font-semibold pt-2">
              {cert.issuer2.name}
            </div>
            <div className="font-mono text-[11px] text-[#FCF9F2]/70">
              CNPJ: {cert.issuer2.cnpj} · Coordenação de Projetos Educativos
            </div>
          </div>

          <div className="md:col-span-3 space-y-2.5 text-xs">
            <div className="font-mono uppercase text-[#F59E0B] font-bold mb-2">
              Acesso Rápido e Exportação
            </div>
            <div>
              <button
                onClick={handleHeroDownload}
                className="hover:text-white underline cursor-pointer inline-flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Baixar PDF Editável (Certificado Nº {cert.certNumber})</span>
              </button>
            </div>
            <div>
              <button
                onClick={() => scrollToSection('validador')}
                className="hover:text-white underline cursor-pointer inline-flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Validador Público ({cert.code})</span>
              </button>
            </div>
            <div>
              <button
                onClick={() => setIsGithubModalOpen(true)}
                className="hover:text-white underline cursor-pointer inline-flex items-center gap-1.5"
              >
                <Terminal className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Copiar Comando / Especificação GitHub</span>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FCF9F2]/60 font-mono">
          <div>
            Certificado Nº {cert.certNumber} · Livro {cert.bookNumber}, Folha{' '}
            {cert.pageNumber} ·{' '}
            <a
              href={fullVerifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F59E0B] underline hover:text-white"
            >
              Cód. {cert.code} (Toque p/ Validar)
            </a>
          </div>
          <div>
            Titular: {cert.holderName} (CPF: {cert.holderCpf})
          </div>
        </div>
      </footer>

      {/* Optional Modal with the Full GitHub Repository Command */}
      <GithubCommandModal
        isOpen={isGithubModalOpen}
        onClose={() => setIsGithubModalOpen(false)}
      />
    </div>
  );
}
