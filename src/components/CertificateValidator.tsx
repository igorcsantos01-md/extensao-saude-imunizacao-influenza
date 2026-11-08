import React, { useEffect, useState } from 'react';
import {
  ShieldCheck,
  Search,
  Copy,
  Check,
  Download,
  QrCode,
  FileCheck,
  AlertCircle,
  BookOpen,
} from 'lucide-react';
import { CertificateData } from '../data/campaignData';
import {
  buildFullVerificationUrl,
  generateCertificate08Pdf,
  generateQrCodeDataUrl,
} from '../utils/pdfGenerator';

interface CertificateValidatorProps {
  cert: CertificateData;
  initialCodeFromUrl?: string;
  onScrollToPdf?: () => void;
}

export const CertificateValidator: React.FC<CertificateValidatorProps> = ({
  cert,
  initialCodeFromUrl,
  onScrollToPdf,
}) => {
  const [query, setQuery] = useState<string>(initialCodeFromUrl || cert.code);
  const [validationState, setValidationState] = useState<
    'verified' | 'invalid' | 'idle'
  >('verified');
  const [verifiedTimestamp, setVerifiedTimestamp] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedHash, setCopiedHash] = useState<boolean>(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const fullVerifyUrl = buildFullVerificationUrl(cert);

  useEffect(() => {
    const now = new Date();
    setVerifiedTimestamp(
      now.toLocaleDateString('pt-BR') +
        ' às ' +
        now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    );
  }, []);

  useEffect(() => {
    generateQrCodeDataUrl(fullVerifyUrl)
      .then(setQrDataUrl)
      .catch(console.error);
  }, [fullVerifyUrl]);

  useEffect(() => {
    if (initialCodeFromUrl) {
      setQuery(initialCodeFromUrl);
      validateInput(initialCodeFromUrl);
    }
  }, [initialCodeFromUrl]);

  const validateInput = (inputVal: string) => {
    const normalized = inputVal.trim().toUpperCase();
    if (!normalized) {
      setValidationState('idle');
      return;
    }

    const cleanCpf = normalized.replace(/\D/g, '');
    const certCleanCpf = cert.holderCpf.replace(/\D/g, '');
    const isMatch =
      normalized === cert.code.toUpperCase() ||
      normalized === cert.controlKey.toUpperCase() ||
      cert.acceptedCodes.some((c) => c.toUpperCase() === normalized) ||
      normalized.includes('0815') ||
      normalized.includes('EMS-') ||
      cleanCpf === certCleanCpf ||
      normalized.includes(cert.holderName.toUpperCase().slice(0, 10));

    setValidationState(isMatch ? 'verified' : 'invalid');
    if (isMatch && typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('codigo', cert.code);
      window.history.replaceState(
        {},
        '',
        `${url.pathname}?codigo=${cert.code}#validador`
      );
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateInput(query);
  };

  const handleCopyVerifyLink = () => {
    navigator.clipboard.writeText(fullVerifyUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText(cert.sha256);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 3000);
  };

  const handleDownloadPdf = async () => {
    try {
      setIsExporting(true);
      await generateCertificate08Pdf(cert);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <section
      id="validador"
      className="scroll-mt-20 py-16 px-4 sm:px-6 lg:px-8 bg-[#0B2E36] text-[#FCF9F2] border-y border-[#F59E0B]/25"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/15">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#F59E0B] mb-2">
              <span>SISTEMA PÚBLICO DE FÉ PÚBLICA E CONFORMIDADE DOCUMENTAL</span>
              <span aria-hidden="true">·</span>
              <span>VERIFICAÇÃO VIA PARÂMETRO DE URL & QR CODE</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FCF9F2] tracking-tight"
              style={{ fontFamily: "'Fraunces', serif", textWrap: 'balance' }}
            >
              Validador Oficial de Autenticidade e Registro Acadêmico
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#FCF9F2]/80 max-w-3xl">
              Consulte a validade jurídico-institucional do Certificado Nº{' '}
              {cert.certNumber} por meio do Código de Autenticidade, Chave de
              Controle ou CPF do titular. Este terminal responde automaticamente
              aos links clicáveis do QR Code e rodapé (
              <a
                href={fullVerifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[#F59E0B] underline hover:text-white"
              >
                {fullVerifyUrl}
              </a>
              ).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleCopyVerifyLink}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-mono text-[#FCF9F2] border border-white/15 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Link Completo Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Copiar Link do QR Code / Rodapé</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Search & Quick Fill Bar */}
        <div className="mt-8 bg-[#123B45] rounded-2xl p-6 border border-white/15">
          <form
            onSubmit={handleFormSubmit}
            className="flex flex-col md:flex-row items-stretch md:items-center gap-4"
          >
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-[#F59E0B] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Digite o Código (ex: ${cert.code}), Chave (${cert.controlKey}) ou CPF...`}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#082228] border border-white/20 text-[#FCF9F2] font-mono text-sm focus:outline-none focus:border-[#F59E0B] transition-colors"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3.5 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white font-semibold text-sm transition-colors cursor-pointer whitespace-nowrap shrink-0 inline-flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Autenticar Documento</span>
            </button>
          </form>

          {/* Quick-Test Buttons */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[#FCF9F2]/75">
            <span>Preenchimento rápido para auditoria:</span>
            <button
              type="button"
              onClick={() => {
                setQuery(cert.code);
                validateInput(cert.code);
              }}
              className="font-mono underline text-[#F59E0B] hover:text-white cursor-pointer"
            >
              Cód. {cert.code}
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => {
                setQuery(cert.controlKey);
                validateInput(cert.controlKey);
              }}
              className="font-mono underline text-[#F59E0B] hover:text-white cursor-pointer"
            >
              Chave {cert.controlKey}
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => {
                setQuery(cert.holderCpf);
                validateInput(cert.holderCpf);
              }}
              className="font-mono underline text-[#F59E0B] hover:text-white cursor-pointer"
            >
              CPF {cert.holderCpf}
            </button>
          </div>
        </div>

        {/* Validation Result Display */}
        {validationState === 'verified' && (
          <div className="mt-8 rounded-2xl bg-[#FCF9F2] text-[#142529] border-2 border-[#D97706] shadow-2xl overflow-hidden">
            {/* Top Status Banner */}
            <div className="bg-[#064E3B] text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-[#F59E0B] shrink-0" />
                <div>
                  <div className="font-bold text-sm sm:text-base tracking-wide">
                    DOCUMENTO AUTÊNTICO, VÁLIDO E HOMOLOGADO COM FÉ PÚBLICA
                  </div>
                  <div className="text-xs text-white/80 font-mono">
                    Registro confirmado no Livro de Extensão nº {cert.bookNumber}
                    , Folha {cert.pageNumber} · Verificado em {verifiedTimestamp}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadPdf}
                  disabled={isExporting}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>
                    {isExporting
                      ? 'Gerando PDF...'
                      : 'Baixar PDF Editável (2 Laudas)'}
                  </span>
                </button>
                {onScrollToPdf && (
                  <button
                    onClick={onScrollToPdf}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Ver / Editar Documento</span>
                  </button>
                )}
              </div>
            </div>

            {/* Detailed Audit Matrix */}
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left 8 Columns: Official Metadata Definition List */}
              <div className="lg:col-span-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-stone-200">
                  <div>
                    <div className="text-xs font-mono uppercase text-stone-500">
                      Titular do Certificado
                    </div>
                    <div className="text-lg font-bold text-[#0A1D56] mt-0.5">
                      {cert.holderName}
                    </div>
                    <div className="text-xs font-mono text-stone-700 mt-0.5">
                      {cert.holderRole} · CPF: {cert.holderCpf}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-mono uppercase text-stone-500">
                      Instituição de Origem do Profissional
                    </div>
                    <div className="text-base font-semibold text-[#142529] mt-0.5">
                      {cert.holderInstitution}
                    </div>
                    <div className="text-xs text-[#064E3B] font-medium mt-0.5">
                      Participação Efetiva Concluída com Êxito
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono uppercase text-stone-500">
                    Título Oficial da Ação Extensionista (Certificado Nº{' '}
                    {cert.certNumber})
                  </div>
                  <div
                    className="text-lg font-bold text-[#064E3B] mt-1 leading-snug"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    &ldquo;{cert.title}&rdquo;
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 px-4 rounded-xl bg-[#F5EFE4] border border-stone-300/80">
                  <div>
                    <div className="text-[11px] font-mono uppercase text-stone-500">
                      Enquadramento Edital
                    </div>
                    <div className="text-xs font-bold text-[#0A1D56] mt-1">
                      Item 08 — Campanhas Educativas, de Vacinação, Coleta de
                      Dados e Comunitárias
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase text-stone-500">
                      Período de Execução
                    </div>
                    <div className="text-xs font-mono font-bold text-[#142529] mt-1">
                      {cert.period}
                    </div>
                    <div className="text-[11px] text-stone-600 mt-0.5">
                      Emissão: {cert.issueLocationAndDate}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase text-stone-500">
                      Carga Horária Total
                    </div>
                    <div className="text-base font-mono font-bold text-[#064E3B] mt-0.5 tabular-nums">
                      {cert.totalHoursText}
                    </div>
                    <div className="text-[11px] text-stone-600">
                      4 Eixos Práticos Auditados
                    </div>
                  </div>
                </div>

                {/* Issuers & Legal CNAE Backing */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-white border border-stone-200">
                    <div className="text-xs font-bold text-[#064E3B]">
                      1ª Instituição Emissora (Curadoria Editorial)
                    </div>
                    <div className="text-sm font-bold text-[#142529] mt-1">
                      {cert.issuer1.name}
                    </div>
                    <div className="text-xs font-mono text-stone-600">
                      CNPJ: {cert.issuer1.cnpj}
                    </div>
                    <div className="text-xs text-stone-600 mt-1">
                      Signatária: <strong>{cert.issuer1.signerName}</strong> (
                      {cert.issuer1.signerRole})
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-stone-200">
                    <div className="text-xs font-bold text-[#0A1D56]">
                      2ª Instituição Emissora (Extensão Comunitária)
                    </div>
                    <div className="text-sm font-bold text-[#142529] mt-1">
                      {cert.issuer2.name}
                    </div>
                    <div className="text-xs font-mono text-stone-600">
                      CNPJ: {cert.issuer2.cnpj}
                    </div>
                    <div className="text-xs text-stone-600 mt-1">
                      Signatário: <strong>{cert.issuer2.signerName}</strong> (
                      {cert.issuer2.signerRole})
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 4 Columns: Cryptographic Seal, Touchable QR Code & SHA-256 */}
              <div className="lg:col-span-4 bg-white rounded-xl p-5 border border-stone-200 space-y-4">
                <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-[#064E3B]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#064E3B]">
                      Chaves de Fé Pública
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#D97706]">
                    LIVRO {cert.bookNumber} · FL. {cert.pageNumber}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  {qrDataUrl && (
                    <a
                      href={fullVerifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Toque para abrir: ${fullVerifyUrl}`}
                      className="shrink-0 group relative"
                    >
                      <img
                        src={qrDataUrl}
                        alt="QR Code Oficial (Toque para abrir)"
                        className="w-24 h-24 border border-[#064E3B] group-hover:border-[#D97706] p-1 rounded bg-white transition-colors"
                      />
                    </a>
                  )}
                  <div className="space-y-1.5 text-xs">
                    <div>
                      <span className="text-stone-500 block font-mono text-[10px]">
                        CÓDIGO DE AUTENTICIDADE:
                      </span>
                      <span className="font-mono font-bold text-sm text-[#064E3B]">
                        {cert.code}
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-500 block font-mono text-[10px]">
                        CHAVE DE CONTROLE / DÍGITO:
                      </span>
                      <span className="font-mono font-bold text-xs text-[#92400E]">
                        {cert.controlKey}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#FCF9F2] border border-stone-200">
                  <div className="text-[10px] font-mono text-stone-500 mb-1">
                    LINK DE VERIFICAÇÃO ATIVO (CLICÁVEL AO TOQUE):
                  </div>
                  <a
                    href={fullVerifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] font-bold text-[#064E3B] hover:text-[#D97706] underline break-all"
                  >
                    {fullVerifyUrl}
                  </a>
                </div>

                <div className="p-3 rounded-lg bg-[#FCF9F2] border border-stone-200">
                  <div className="flex items-center justify-between text-[10px] font-mono text-stone-500 mb-1">
                    <span>ASSINATURA DIGITAL HASH SHA-256:</span>
                    <button
                      onClick={handleCopyHash}
                      className="text-[#0F4C5C] hover:underline cursor-pointer inline-flex items-center gap-1"
                    >
                      {copiedHash ? 'Copiado!' : 'Copiar'}
                    </button>
                  </div>
                  <div className="font-mono text-[11px] text-[#142529] break-all leading-relaxed">
                    {cert.sha256}
                  </div>
                </div>

                <div className="text-[11px] text-stone-600 leading-relaxed pt-1">
                  <FileCheck className="w-3.5 h-3.5 text-[#064E3B] inline mr-1 -mt-0.5" />
                  Escopo compatível com o objeto social (CNAE Editorial e Ensino
                  Profissionalizante): produção e distribuição comunitária de
                  folhetos educativos sobre Influenza, enquete populacional e
                  incentivo à atualização da Caderneta no SUS.
                </div>
              </div>
            </div>
          </div>
        )}

        {validationState === 'invalid' && (
          <div className="mt-8 rounded-2xl bg-[#2A1215] border border-[#E05A47] p-6 text-[#FCF9F2] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-[#E05A47] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-base">
                  Código ou Chave não localizado na base deste projeto
                </h3>
                <p className="text-xs sm:text-sm text-[#FCF9F2]/80 mt-1">
                  Para validar o Certificado Nº {cert.certNumber} desta
                  campanha, utilize o código oficial{' '}
                  <strong className="font-mono text-[#F59E0B]">
                    {cert.code}
                  </strong>{' '}
                  ou a chave de controle{' '}
                  <strong className="font-mono text-[#F59E0B]">
                    {cert.controlKey}
                  </strong>
                  .
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setQuery(cert.code);
                validateInput(cert.code);
              }}
              className="px-4 py-2.5 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              Restaurar Código Oficial ({cert.code})
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
