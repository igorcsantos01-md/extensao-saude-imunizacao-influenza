import React, { useEffect, useRef, useState } from 'react';
import {
  Download,
  ZoomIn,
  ZoomOut,
  FileCheck2,
  Printer,
  Layers,
  FileText,
  ExternalLink,
  CheckCircle2,
  Edit3,
  SlidersHorizontal,
  RotateCcw,
  Link2,
  Globe,
  Sparkles,
} from 'lucide-react';
import { CERT_ASSETS } from '../data/certAssets';
import { CertificateData } from '../data/campaignData';
import {
  buildFullVerificationUrl,
  formatDisplayBaseUrl,
  generateCertificate08Pdf,
  generateQrCodeDataUrl,
} from '../utils/pdfGenerator';

interface CertificateViewerProps {
  cert: CertificateData;
  onUpdateCert: (updater: (prev: CertificateData) => CertificateData) => void;
  onResetCert: () => void;
  onJumpToValidator?: () => void;
}

/**
 * Helper component for inline direct editing on the A4 Certificate sheet.
 */
interface EditableSpanProps {
  value: string;
  onChange: (val: string) => void;
  isEditing: boolean;
  className?: string;
  style?: React.CSSProperties;
  multiline?: boolean;
}

const EditableSpan: React.FC<EditableSpanProps> = ({
  value,
  onChange,
  isEditing,
  className = '',
  style,
}) => {
  if (!isEditing) {
    return (
      <span className={className} style={style}>
        {value}
      </span>
    );
  }

  return (
    <span
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => {
        const newText = e.currentTarget.innerText.trim();
        if (newText !== value) {
          onChange(newText);
        }
      }}
      title="Clique para editar este texto diretamente no certificado"
      className={`${className} outline-1 outline-dashed outline-[#D97706] bg-[#FEF3C7]/60 hover:bg-[#FDE68A]/70 focus:bg-white focus:outline-2 focus:outline-[#0F4C5C] px-0.5 rounded-xs cursor-text transition-colors`}
      style={style}
    >
      {value}
    </span>
  );
};

export const CertificateViewer: React.FC<CertificateViewerProps> = ({
  cert,
  onUpdateCert,
  onResetCert,
  onJumpToValidator,
}) => {
  const [viewMode, setViewMode] = useState<'both' | 'front' | 'back'>('both');
  const [zoom, setZoom] = useState<number>(1);
  const [qrUrl, setQrUrl] = useState<string>('');
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [isInlineEditMode, setIsInlineEditMode] = useState<boolean>(false);
  const [showFieldsPanel, setShowFieldsPanel] = useState<boolean>(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(1160);

  const displayBaseUrl = formatDisplayBaseUrl(cert);
  const fullVerifyUrl = buildFullVerificationUrl(cert);

  useEffect(() => {
    generateQrCodeDataUrl(fullVerifyUrl)
      .then(setQrUrl)
      .catch(console.error);
  }, [fullVerifyUrl]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const updateWidth = () => {
      setContainerWidth(el.clientWidth);
    };
    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleDownloadPdf = async () => {
    try {
      setIsDownloading(true);
      await generateCertificate08Pdf(cert);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleTouchLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isInlineEditMode) {
      e.preventDefault();
      return;
    }
    if (
      typeof window !== 'undefined' &&
      fullVerifyUrl.startsWith(window.location.origin) &&
      onJumpToValidator
    ) {
      e.preventDefault();
      const url = new URL(window.location.href);
      url.searchParams.set('codigo', cert.code);
      window.history.replaceState(
        {},
        '',
        `${url.pathname}?codigo=${cert.code}#validador`
      );
      onJumpToValidator();
    }
  };

  const updateField = <K extends keyof CertificateData>(
    key: K,
    val: CertificateData[K]
  ) => {
    onUpdateCert((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const updateAxis = (
    idx: number,
    key: keyof CertificateData['axes'][number],
    val: string
  ) => {
    onUpdateCert((prev) => {
      const nextAxes = [...prev.axes];
      nextAxes[idx] = { ...nextAxes[idx], [key]: val };
      return { ...prev, axes: nextAxes };
    });
  };

  // Exact A4 landscape dimensions in pixels at 96 DPI: 1122px x 794px (297mm x 210mm)
  const PAGE_W = 1122;
  const PAGE_H = 794;
  const baseScale = Math.min(1, Math.max(0.3, (containerWidth - 48) / PAGE_W));
  const effectiveScale = Number((baseScale * zoom).toFixed(3));

  return (
    <section
      id="certificado-pdf"
      className="scroll-mt-20 py-14 px-4 sm:px-6 lg:px-8 max-w-[1360px] mx-auto"
    >
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6 pb-6 border-b border-[#0B2E36]/15">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#0F4C5C] mb-2">
            <span>DOCUMENTO OFICIAL HOMOLOGADO & EDITÁVEL</span>
            <span aria-hidden="true">·</span>
            <span>MODELO Nº 08 (ITEM 08)</span>
            <span aria-hidden="true">·</span>
            <span>LINKS DE QR CODE E RODAPÉ CLICÁVEIS AO TOQUE</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B2E36] tracking-tight"
            style={{ fontFamily: "'Fraunces', serif", textWrap: 'balance' }}
          >
            Certificado de Atividade de Extensão Nº 08 — Visualizador e Editor PDF
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#142529]/80 max-w-3xl">
            Personalize abaixo o link do QR Code/rodapé (ex: seu domínio{' '}
            <span className="font-mono text-[#0F4C5C]">.vercel.app</span>),
            edite qualquer texto diretamente no certificado ou no painel de
            campos, e baixe o <strong>PDF Vetorial Editável (2 Laudas A4)</strong>{' '}
            com links clicáveis ao toque.
          </p>
        </div>

        {/* Primary PDF Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white font-semibold text-sm shadow-sm transition-all cursor-pointer disabled:opacity-60 whitespace-nowrap shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>
              {isDownloading
                ? 'Gerando PDF Vetorial...'
                : downloadSuccess
                  ? 'PDF Editável Baixado!'
                  : 'Baixar PDF Editável (2 Laudas)'}
            </span>
          </button>

          {onJumpToValidator && (
            <button
              onClick={onJumpToValidator}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#0B2E36] hover:bg-[#0F4C5C] text-[#FCF9F2] font-medium text-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <FileCheck2 className="w-4 h-4 text-[#F59E0B]" />
              <span>Testar no Validador</span>
            </button>
          )}
        </div>
      </div>

      {/* =====================================================================
          INSTANT CUSTOM LINK (.VERCEL.APP) & EDITING CONTROL BAR
         ===================================================================== */}
      <div className="mb-6 rounded-2xl bg-[#F5EFE4] border border-[#0B2E36]/20 p-4 sm:p-5 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* Custom URL Input for QR Code & Footer Links */}
          <div className="lg:col-span-7 space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <label
                htmlFor="custom-verify-url"
                className="flex items-center gap-1.5 text-xs font-mono uppercase font-bold text-[#0B2E36]"
              >
                <Link2 className="w-3.5 h-3.5 text-[#D97706]" />
                <span>
                  Link Base do QR Code, Caixa Manual e Rodapé (Atualiza na Hora):
                </span>
              </label>
              {typeof window !== 'undefined' && (
                <button
                  type="button"
                  onClick={() =>
                    updateField(
                      'verificationBaseUrl',
                      `${window.location.origin}/`
                    )
                  }
                  className="text-[11px] font-mono text-[#0F4C5C] hover:underline cursor-pointer inline-flex items-center gap-1"
                >
                  <Globe className="w-3 h-3" />
                  <span>Usar URL Atual deste Site</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                id="custom-verify-url"
                type="url"
                value={cert.verificationBaseUrl}
                onChange={(e) =>
                  updateField('verificationBaseUrl', e.target.value)
                }
                placeholder="https://extensao-saude-influenza.vercel.app/"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 font-mono text-xs sm:text-sm text-[#0B2E36] focus:outline-none focus:border-[#D97706]"
              />
            </div>

            <div className="text-[11px] font-mono text-stone-600 truncate">
              Destino ao tocar no QR Code / Rodapé:{' '}
              <a
                href={fullVerifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleTouchLinkClick}
                className="text-[#064E3B] font-bold underline hover:text-[#D97706]"
              >
                {fullVerifyUrl}
              </a>
            </div>
          </div>

          {/* Editing Mode Controls */}
          <div className="lg:col-span-5 flex flex-wrap items-center lg:justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setIsInlineEditMode((v) => !v)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                isInlineEditMode
                  ? 'bg-[#D97706] text-white border-[#D97706] shadow-sm'
                  : 'bg-white text-[#0B2E36] border-stone-300 hover:bg-[#FCF9F2]'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>
                {isInlineEditMode
                  ? 'Edição na Folha: ATIVA'
                  : 'Editar Direto na Folha'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setShowFieldsPanel((v) => !v)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                showFieldsPanel
                  ? 'bg-[#0B2E36] text-white border-[#0B2E36]'
                  : 'bg-white text-[#0B2E36] border-stone-300 hover:bg-[#FCF9F2]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>
                {showFieldsPanel ? 'Fechar Painel de Campos' : 'Painel de Campos'}
              </span>
            </button>

            <button
              type="button"
              onClick={onResetCert}
              title="Restaurar todos os textos para o padrão oficial do Certificado Nº 08"
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar Padrão</span>
            </button>
          </div>
        </div>

        {isInlineEditMode && (
          <div className="mt-3 pt-3 border-t border-stone-300/80 flex items-center gap-2 text-xs text-[#92400E] font-medium">
            <Sparkles className="w-4 h-4 text-[#D97706] shrink-0" />
            <span>
              <strong>Modo Edição Direta Ativo:</strong> Clique sobre qualquer
              texto destacado na Lauda 1 ou Lauda 2 abaixo para alterar o
              conteúdo. Ao terminar, clique em{' '}
              <strong>&ldquo;Baixar PDF Editável (2 Laudas)&rdquo;</strong> para
              exportar o PDF vetorial atualizado.
            </span>
          </div>
        )}

        {/* Structured Full Field Editor Panel */}
        {showFieldsPanel && (
          <div className="mt-5 pt-5 border-t border-stone-300 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-[#0B2E36] uppercase font-mono">
                Editor Estruturado de Campos do Certificado Nº 08 (Sincronizado
                com o PDF e QR Code)
              </h3>
              <span className="text-xs text-stone-600">
                Todas as alterações são salvas automaticamente
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
                  Nome do Titular
                </label>
                <input
                  type="text"
                  value={cert.holderName}
                  onChange={(e) => updateField('holderName', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
                  CPF Registrado
                </label>
                <input
                  type="text"
                  value={cert.holderCpf}
                  onChange={(e) => updateField('holderCpf', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
                  Qualificação Profissional
                </label>
                <input
                  type="text"
                  value={cert.holderRole}
                  onChange={(e) => updateField('holderRole', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
                  Instituição de Origem
                </label>
                <input
                  type="text"
                  value={cert.holderInstitution}
                  onChange={(e) =>
                    updateField('holderInstitution', e.target.value)
                  }
                  className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
                  Código de Autenticidade
                </label>
                <input
                  type="text"
                  value={cert.code}
                  onChange={(e) => updateField('code', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs font-mono font-bold text-[#064E3B]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
                  Chave de Controle / Dígito
                </label>
                <input
                  type="text"
                  value={cert.controlKey}
                  onChange={(e) => updateField('controlKey', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
                  Nº Certificado / Livro / Folha
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  <input
                    type="text"
                    value={cert.certNumber}
                    onChange={(e) => updateField('certNumber', e.target.value)}
                    title="Nº Certificado"
                    className="px-2 py-2 rounded-lg bg-white border border-stone-300 text-xs font-mono text-center"
                  />
                  <input
                    type="text"
                    value={cert.bookNumber}
                    onChange={(e) => updateField('bookNumber', e.target.value)}
                    title="Livro"
                    className="px-2 py-2 rounded-lg bg-white border border-stone-300 text-xs font-mono text-center"
                  />
                  <input
                    type="text"
                    value={cert.pageNumber}
                    onChange={(e) => updateField('pageNumber', e.target.value)}
                    title="Folha"
                    className="px-2 py-2 rounded-lg bg-white border border-stone-300 text-xs font-mono text-center"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
                  Período e Carga Horária
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  <input
                    type="text"
                    value={cert.period}
                    onChange={(e) => updateField('period', e.target.value)}
                    className="col-span-2 px-2.5 py-2 rounded-lg bg-white border border-stone-300 text-xs"
                  />
                  <input
                    type="text"
                    value={cert.totalHoursNumeric}
                    onChange={(e) =>
                      updateField('totalHoursNumeric', e.target.value)
                    }
                    className="px-2 py-2 rounded-lg bg-white border border-stone-300 text-xs font-mono text-center"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
                  1º Parágrafo do Corpo (Frente da Lauda 1)
                </label>
                <textarea
                  rows={3}
                  value={cert.frontBodyParagraph1}
                  onChange={(e) =>
                    updateField('frontBodyParagraph1', e.target.value)
                  }
                  className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
                  2º Parágrafo do Corpo (Atuação Prática na Frente da Lauda 1)
                </label>
                <textarea
                  rows={3}
                  value={cert.frontBodyParagraph2}
                  onChange={(e) =>
                    updateField('frontBodyParagraph2', e.target.value)
                  }
                  className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs leading-relaxed"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
                  Local e Data de Emissão
                </label>
                <input
                  type="text"
                  value={cert.issueLocationAndDate}
                  onChange={(e) =>
                    updateField('issueLocationAndDate', e.target.value)
                  }
                  className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
                  Hash Criptográfico SHA-256 (Verso)
                </label>
                <input
                  type="text"
                  value={cert.sha256}
                  onChange={(e) => updateField('sha256', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs font-mono"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* PDF Reader Chrome / Toolbar */}
      <div className="rounded-2xl overflow-hidden border border-[#0B2E36]/20 bg-[#152227] shadow-xl">
        {/* Top PDF Reader Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-4 sm:px-6 py-3.5 bg-[#0B2E36] border-b border-white/10 text-[#FCF9F2]">
          {/* Left: File name and status */}
          <div className="flex items-center gap-3 min-w-0">
            <FileText className="w-4 h-4 text-[#F59E0B] shrink-0" />
            <span className="font-mono text-xs sm:text-sm truncate text-[#FCF9F2]/90">
              Certificado_Extensao_{cert.certNumber}_{cert.code}_LUCAS_GONCALVES_SILVEIRA.pdf
            </span>
            <span className="hidden md:inline-block text-xs text-white/40">
              ·
            </span>
            <span className="hidden md:inline-block font-mono text-xs text-[#F59E0B]">
              PDF Vetorial Editável · Links Ativos
            </span>
          </div>

          {/* Center: Page Filter Segmented Control */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-[#152227] border border-white/10">
            <button
              onClick={() => setViewMode('both')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                viewMode === 'both'
                  ? 'bg-[#D97706] text-white'
                  : 'text-[#FCF9F2]/75 hover:text-white'
              }`}
            >
              <span className="inline-flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                Ambas as Laudas (1 e 2)
              </span>
            </button>
            <button
              onClick={() => setViewMode('front')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                viewMode === 'front'
                  ? 'bg-[#D97706] text-white'
                  : 'text-[#FCF9F2]/75 hover:text-white'
              }`}
            >
              Lauda 1 · Frente
            </button>
            <button
              onClick={() => setViewMode('back')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                viewMode === 'back'
                  ? 'bg-[#D97706] text-white'
                  : 'text-[#FCF9F2]/75 hover:text-white'
              }`}
            >
              Lauda 2 · Verso (Memorial)
            </button>
          </div>

          {/* Right: Zoom & Quick Download */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-[#152227] border border-white/10 rounded-lg px-2 py-1">
              <button
                onClick={() =>
                  setZoom((z) => Math.max(0.75, Number((z - 0.1).toFixed(2))))
                }
                title="Reduzir Zoom"
                className="p-1 text-[#FCF9F2]/75 hover:text-white transition-colors cursor-pointer"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-xs px-1.5 text-[#FCF9F2] tabular-nums">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() =>
                  setZoom((z) => Math.min(1.25, Number((z + 0.1).toFixed(2))))
                }
                title="Ampliar Zoom"
                className="p-1 text-[#FCF9F2]/75 hover:text-white transition-colors cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              {zoom !== 1 && (
                <button
                  onClick={() => setZoom(1)}
                  className="text-[11px] font-mono text-[#F59E0B] hover:underline px-1 cursor-pointer"
                >
                  100%
                </button>
              )}
            </div>

            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Printer className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Exportar PDF</span>
            </button>
          </div>
        </div>

        {/* Main Dark PDF Canvas Stage */}
        <div
          ref={stageRef}
          className="p-4 sm:p-8 flex flex-col items-center gap-10 overflow-x-auto bg-[#182429]"
        >
          {/* ===================================================================
              LAUDA 1 — FRENTE DO CERTIFICADO (Exact 1122px x 794px A4 Landscape)
             =================================================================== */}
          {(viewMode === 'both' || viewMode === 'front') && (
            <div className="flex flex-col items-center">
              <div className="w-full flex items-center justify-between text-xs font-mono text-[#FCF9F2]/70 mb-2 px-1">
                <span>PÁGINA 1 DE 2 — FRENTE OFICIAL DO CERTIFICADO</span>
                <span>
                  TOQUE NO QR CODE OU NO LINK DO RODAPÉ PARA ACESSAR O VALIDADOR
                </span>
              </div>

              <div
                style={{
                  width: `${Math.round(PAGE_W * effectiveScale)}px`,
                  height: `${Math.round(PAGE_H * effectiveScale)}px`,
                }}
                className="relative shadow-2xl select-text overflow-hidden bg-[#FFFDF9]"
              >
                <div
                  style={{
                    width: `${PAGE_W}px`,
                    height: `${PAGE_H}px`,
                    transform: `scale(${effectiveScale})`,
                    transformOrigin: 'top left',
                  }}
                  className="relative bg-[#FFFDF9] text-[#0F172A]"
                >
                  {/* Triple Institutional Frame */}
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      left: '19px',
                      top: '19px',
                      width: '1084px',
                      height: '756px',
                      border: '3px solid #064E3B',
                    }}
                  />
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      left: '26px',
                      top: '26px',
                      width: '1070px',
                      height: '742px',
                      border: '1.4px solid #D97706',
                    }}
                  />
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      left: '31px',
                      top: '31px',
                      width: '1060px',
                      height: '732px',
                      border: '2px solid #0A1D56',
                    }}
                  />

                  {/* Header Row */}
                  <div
                    className="absolute flex items-center justify-between"
                    style={{
                      left: '53px',
                      top: '45px',
                      width: '1016px',
                      height: '80px',
                    }}
                  >
                    {/* Left Institution: Editora Mente e Saúde */}
                    <div className="flex items-center gap-3.5">
                      <img
                        src={CERT_ASSETS.logoEms}
                        alt="Logo Editora Mente e Saúde"
                        className="w-[76px] h-[76px] object-contain shrink-0"
                      />
                      <div className="leading-tight">
                        <div className="font-bold text-[12.5px] text-[#064E3B] tracking-tight">
                          <EditableSpan
                            value={cert.issuer1.name}
                            isEditing={isInlineEditMode}
                            onChange={(v) =>
                              updateField('issuer1', {
                                ...cert.issuer1,
                                name: v,
                              })
                            }
                          />
                        </div>
                        <div className="font-mono font-bold text-[11px] text-[#0F172A] mt-0.5">
                          CNPJ:{' '}
                          <EditableSpan
                            value={cert.issuer1.cnpj}
                            isEditing={isInlineEditMode}
                            onChange={(v) =>
                              updateField('issuer1', {
                                ...cert.issuer1,
                                cnpj: v,
                              })
                            }
                          />
                        </div>
                        <div className="text-[10.5px] text-[#0D9488] mt-0.5">
                          <EditableSpan
                            value={cert.issuer1.department}
                            isEditing={isInlineEditMode}
                            onChange={(v) =>
                              updateField('issuer1', {
                                ...cert.issuer1,
                                department: v,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    {/* Center Program Header */}
                    <div className="text-center px-2">
                      <div className="font-bold text-[12.5px] text-[#064E3B] tracking-tight leading-snug">
                        PROGRAMA INTERINSTITUCIONAL DE EXTENSÃO, COMUNICAÇÃO
                        CIENTÍFICA
                        <br />E EDUCAÇÃO EM SAÚDE
                      </div>
                      <div className="font-mono font-bold text-[11px] text-[#0A1D56] mt-1.5">
                        Certificado Nº{' '}
                        <EditableSpan
                          value={cert.certNumber}
                          isEditing={isInlineEditMode}
                          onChange={(v) => updateField('certNumber', v)}
                        />{' '}
                        · Livro de Extensão nº{' '}
                        <EditableSpan
                          value={cert.bookNumber}
                          isEditing={isInlineEditMode}
                          onChange={(v) => updateField('bookNumber', v)}
                        />{' '}
                        · Cód.{' '}
                        <EditableSpan
                          value={cert.code}
                          isEditing={isInlineEditMode}
                          onChange={(v) => updateField('code', v)}
                        />
                      </div>
                    </div>

                    {/* Right Institution: Centro Profissionalizante Maria Dalva de Araújo */}
                    <div className="flex items-center gap-3.5">
                      <div className="text-right leading-tight">
                        <div className="font-bold text-[12.5px] text-[#0A1D56] tracking-tight">
                          CENTRO PROFISSIONALIZANTE
                          <br />
                          MARIA DALVA DE ARAÚJO
                        </div>
                        <div className="font-mono font-bold text-[11px] text-[#0F172A] mt-1">
                          CNPJ:{' '}
                          <EditableSpan
                            value={cert.issuer2.cnpj}
                            isEditing={isInlineEditMode}
                            onChange={(v) =>
                              updateField('issuer2', {
                                ...cert.issuer2,
                                cnpj: v,
                              })
                            }
                          />
                        </div>
                      </div>
                      <img
                        src={CERT_ASSETS.logoCpmda}
                        alt="Logo Centro Profissionalizante Maria Dalva de Araújo"
                        className="w-[76px] h-[76px] object-contain shrink-0"
                      />
                    </div>
                  </div>

                  {/* Header Divider */}
                  <div
                    className="absolute bg-[#064E3B]"
                    style={{
                      left: '53px',
                      top: '132px',
                      width: '1016px',
                      height: '1px',
                    }}
                  />

                  {/* Main Title */}
                  <div
                    className="absolute w-full text-center"
                    style={{ top: '146px' }}
                  >
                    <h3
                      className="font-bold text-[34px] text-[#064E3B] tracking-wide"
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                      }}
                    >
                      CERTIFICADO DE ATIVIDADE DE EXTENSÃO
                    </h3>
                    <div
                      className="mx-auto mt-1 bg-[#D97706]"
                      style={{ width: '405px', height: '2px' }}
                    />
                  </div>

                  {/* Intro Statement */}
                  <div
                    className="absolute text-center text-[15px] leading-[1.45] text-[#0F172A]"
                    style={{ left: '85px', top: '208px', width: '952px' }}
                  >
                    A <strong>Editora Mente e Saúde</strong> (CNPJ:{' '}
                    {cert.issuer1.cnpj}), em parceria institucional com o{' '}
                    <strong>
                      Centro Profissionalizante Maria Dalva de Araújo
                    </strong>{' '}
                    (CNPJ:
                    <br />
                    {cert.issuer2.cnpj}), certifica para os devidos fins de
                    comprovação curricular e acadêmica que
                  </div>

                  {/* Recipient Highlight Box */}
                  <div
                    className="absolute flex flex-col items-center justify-center bg-[#EDFCF5] border border-[#D97706]"
                    style={{
                      left: '91px',
                      top: '254px',
                      width: '940px',
                      height: '80px',
                    }}
                  >
                    <div
                      className="font-bold text-[32px] text-[#0A1D56] tracking-wide leading-none"
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                      }}
                    >
                      <EditableSpan
                        value={cert.holderName}
                        isEditing={isInlineEditMode}
                        onChange={(v) => updateField('holderName', v)}
                      />
                    </div>
                    <div className="font-bold text-[14.5px] text-[#0F172A] mt-2">
                      <EditableSpan
                        value={cert.holderRole}
                        isEditing={isInlineEditMode}
                        onChange={(v) => updateField('holderRole', v)}
                      />{' '}
                      &nbsp;|&nbsp; CPF:{' '}
                      <EditableSpan
                        value={cert.holderCpf}
                        isEditing={isInlineEditMode}
                        onChange={(v) => updateField('holderCpf', v)}
                      />{' '}
                      &nbsp;|&nbsp;{' '}
                      <EditableSpan
                        value={cert.holderInstitution}
                        isEditing={isInlineEditMode}
                        onChange={(v) => updateField('holderInstitution', v)}
                      />
                    </div>
                  </div>

                  {/* Main Body Text (Paragraphs 1 and 2) */}
                  <div
                    className="absolute text-[14.5px] leading-[1.52] text-[#0F172A] text-justify"
                    style={{ left: '92px', top: '348px', width: '938px' }}
                  >
                    {isInlineEditMode ? (
                      <>
                        <p className="mb-3">
                          <EditableSpan
                            value={cert.frontBodyParagraph1}
                            isEditing={true}
                            onChange={(v) =>
                              updateField('frontBodyParagraph1', v)
                            }
                          />
                        </p>
                        <p>
                          <EditableSpan
                            value={cert.frontBodyParagraph2}
                            isEditing={true}
                            onChange={(v) =>
                              updateField('frontBodyParagraph2', v)
                            }
                          />
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="mb-3.5">{cert.frontBodyParagraph1}</p>
                        <p>{cert.frontBodyParagraph2}</p>
                      </>
                    )}
                  </div>

                  {/* Issue Location and Date */}
                  <div
                    className="absolute w-full text-center italic font-semibold text-[19px] text-[#0F172A]"
                    style={{
                      top: '496px',
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                    }}
                  >
                    <EditableSpan
                      value={cert.issueLocationAndDate}
                      isEditing={isInlineEditMode}
                      onChange={(v) => updateField('issueLocationAndDate', v)}
                    />
                  </div>

                  {/* Bottom Left Signature — Bárbara Lima dos Santos */}
                  <div
                    className="absolute flex flex-col items-center"
                    style={{ left: '56px', top: '555px', width: '295px' }}
                  >
                    <img
                      src={CERT_ASSETS.sigBarbara}
                      alt="Assinatura Bárbara Lima dos Santos"
                      className="h-[68px] w-[240px] object-contain mb-1"
                    />
                    <div className="w-full h-[1.5px] bg-[#0F172A] mb-1.5" />
                    <div className="font-bold text-[11.5px] text-[#064E3B]">
                      <EditableSpan
                        value={cert.issuer1.signerName}
                        isEditing={isInlineEditMode}
                        onChange={(v) =>
                          updateField('issuer1', {
                            ...cert.issuer1,
                            signerName: v,
                          })
                        }
                      />
                    </div>
                    <div className="text-[10px] text-[#0F172A] mt-0.5">
                      <EditableSpan
                        value={cert.issuer1.signerRole}
                        isEditing={isInlineEditMode}
                        onChange={(v) =>
                          updateField('issuer1', {
                            ...cert.issuer1,
                            signerRole: v,
                          })
                        }
                      />
                    </div>
                    <div className="font-mono font-bold text-[9px] text-[#064E3B] mt-0.5">
                      Editora Mente e Saúde (CNPJ: {cert.issuer1.cnpj})
                    </div>
                  </div>

                  {/* Center: Gold Official Seal + Touchable QR Code + Touchable Manual Verification Box */}
                  <div
                    className="absolute flex items-center gap-3"
                    style={{ left: '368px', top: '568px' }}
                  >
                    {/* Gold Seal — Touchable Link */}
                    <a
                      href={fullVerifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleTouchLinkClick}
                      title={`Toque para verificar autenticidade: ${fullVerifyUrl}`}
                      className="w-[88px] h-[88px] rounded-full bg-[#FFF2C7] border-2 border-[#D97706] hover:border-[#064E3B] flex flex-col items-center justify-center text-center shadow-inner shrink-0 transition-transform hover:scale-105 cursor-pointer"
                    >
                      <span
                        className="font-bold text-[9px] text-[#78350F] tracking-tight"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        SELO OFICIAL
                      </span>
                      <span
                        className="font-bold text-[11.5px] text-[#78350F] leading-tight my-0.5"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        FÉ PÚBLICA
                      </span>
                      <span className="font-mono font-bold text-[7.5px] text-[#78350F]">
                        {cert.code}
                      </span>
                    </a>

                    {/* QR Code Box — Touchable / Clickable Link */}
                    <a
                      href={fullVerifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleTouchLinkClick}
                      title={`Toque ou escaneie o QR Code para abrir: ${fullVerifyUrl}`}
                      className="group relative w-[94px] h-[94px] bg-white border border-[#064E3B] hover:border-[#D97706] p-1.5 flex items-center justify-center shrink-0 cursor-pointer transition-all hover:shadow-md"
                    >
                      {qrUrl ? (
                        <img
                          src={qrUrl}
                          alt="QR Code de Autenticação (Toque para abrir)"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-100 animate-pulse" />
                      )}
                      <span className="absolute inset-x-0 bottom-0 bg-[#064E3B]/90 text-white font-mono text-[7px] text-center py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        TOQUE P/ ABRIR
                      </span>
                    </a>

                    {/* Manual Verification Box — Touchable Link */}
                    <div className="w-[192px] h-[94px] bg-white border border-[#064E3B] hover:border-[#D97706] px-2.5 py-2 flex flex-col justify-between text-left shrink-0 transition-colors">
                      <div className="font-bold text-[8.8px] text-[#064E3B] tracking-tight">
                        AUTENTICAÇÃO PÚBLICA MANUAL
                      </div>
                      <div className="font-mono font-bold text-[9px] text-[#0F172A]">
                        Cód.:{' '}
                        <EditableSpan
                          value={cert.code}
                          isEditing={isInlineEditMode}
                          onChange={(v) => updateField('code', v)}
                        />
                      </div>
                      <div className="font-mono font-bold text-[9px] text-[#92400E]">
                        Chave:{' '}
                        <EditableSpan
                          value={cert.controlKey}
                          isEditing={isInlineEditMode}
                          onChange={(v) => updateField('controlKey', v)}
                        />
                      </div>
                      <div>
                        <div className="font-bold text-[7.8px] text-[#0A1D56]">
                          Endereço p/ Verificação (Toque):
                        </div>
                        <a
                          href={fullVerifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={handleTouchLinkClick}
                          className="block font-mono font-bold text-[7.2px] text-[#064E3B] hover:text-[#D97706] underline break-all leading-tight mt-0.5 cursor-pointer"
                        >
                          {displayBaseUrl}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Right Signature — James Araújo de Santana */}
                  <div
                    className="absolute flex flex-col items-center"
                    style={{ left: '766px', top: '555px', width: '300px' }}
                  >
                    <img
                      src={CERT_ASSETS.sigJames}
                      alt="Assinatura James Araújo de Santana"
                      className="h-[68px] w-[240px] object-contain mb-1"
                    />
                    <div className="w-full h-[1.5px] bg-[#0F172A] mb-1.5" />
                    <div className="font-bold text-[11.5px] text-[#0A1D56]">
                      <EditableSpan
                        value={cert.issuer2.signerName}
                        isEditing={isInlineEditMode}
                        onChange={(v) =>
                          updateField('issuer2', {
                            ...cert.issuer2,
                            signerName: v,
                          })
                        }
                      />
                    </div>
                    <div className="text-[10px] text-[#0F172A] mt-0.5">
                      <EditableSpan
                        value={cert.issuer2.signerRole}
                        isEditing={isInlineEditMode}
                        onChange={(v) =>
                          updateField('issuer2', {
                            ...cert.issuer2,
                            signerRole: v,
                          })
                        }
                      />
                    </div>
                    <div className="font-mono font-bold text-[8.6px] text-[#0A1D56] mt-0.5 whitespace-nowrap">
                      Centro Profissionalizante Maria Dalva de Araújo (CNPJ:{' '}
                      {cert.issuer2.cnpj})
                    </div>
                  </div>

                  {/* Footer Verification Instruction Line — Touchable / Clickable Link! */}
                  <div
                    className="absolute w-full text-center"
                    style={{ top: '716px' }}
                  >
                    <a
                      href={fullVerifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleTouchLinkClick}
                      title={`Toque para acessar e validar: ${fullVerifyUrl}`}
                      className="inline-flex items-center gap-1 font-mono font-bold text-[9.2px] text-[#064E3B] hover:text-[#D97706] underline decoration-[#064E3B]/50 hover:decoration-[#D97706] underline-offset-2 px-2 py-0.5 rounded cursor-pointer transition-colors"
                    >
                      <span>
                        Verifique via QR Code ou acesse {displayBaseUrl}{' '}
                        informando o Código {cert.code} ou Chave{' '}
                        {cert.controlKey}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================
              LAUDA 2 — VERSO: MEMORIAL DESCRITIVO E REGISTRO ACADÊMICO
             =================================================================== */}
          {(viewMode === 'both' || viewMode === 'back') && (
            <div className="flex flex-col items-center">
              <div className="w-full flex items-center justify-between text-xs font-mono text-[#FCF9F2]/70 mb-2 px-1">
                <span>
                  PÁGINA 2 DE 2 — VERSO OFICIAL (MEMORIAL DESCRITIVO E REGISTRO
                  SHA-256)
                </span>
                <span>
                  LINKS CLICÁVEIS AO TOQUE NO ENDEREÇO WEB, QR CODE E RODAPÉ
                </span>
              </div>

              <div
                style={{
                  width: `${Math.round(PAGE_W * effectiveScale)}px`,
                  height: `${Math.round(PAGE_H * effectiveScale)}px`,
                }}
                className="relative shadow-2xl select-text overflow-hidden bg-[#FFFDF9]"
              >
                <div
                  style={{
                    width: `${PAGE_W}px`,
                    height: `${PAGE_H}px`,
                    transform: `scale(${effectiveScale})`,
                    transformOrigin: 'top left',
                  }}
                  className="relative bg-[#FFFDF9] text-[#0F172A]"
                >
                  {/* Triple Institutional Frame */}
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      left: '19px',
                      top: '19px',
                      width: '1084px',
                      height: '756px',
                      border: '3px solid #064E3B',
                    }}
                  />
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      left: '26px',
                      top: '26px',
                      width: '1070px',
                      height: '742px',
                      border: '1.4px solid #D97706',
                    }}
                  />
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      left: '31px',
                      top: '31px',
                      width: '1060px',
                      height: '732px',
                      border: '2px solid #0A1D56',
                    }}
                  />

                  {/* Page 2 Header */}
                  <div
                    className="absolute flex items-center gap-3"
                    style={{ left: '53px', top: '44px', width: '1016px' }}
                  >
                    <img
                      src={CERT_ASSETS.logoEms}
                      alt="Logo Editora Mente e Saúde"
                      className="w-[49px] h-[49px] object-contain shrink-0"
                    />
                    <img
                      src={CERT_ASSETS.logoCpmda}
                      alt="Logo Centro Profissionalizante Maria Dalva de Araújo"
                      className="w-[49px] h-[49px] object-contain shrink-0"
                    />
                    <div className="ml-2">
                      <h3
                        className="font-bold text-[20px] text-[#064E3B] tracking-wide leading-tight"
                        style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                        }}
                      >
                        MEMORIAL DESCRITIVO E REGISTRO ACADÊMICO DE ATIVIDADE DE
                        EXTENSÃO
                      </h3>
                      <div className="text-[12.5px] text-[#0F172A] mt-0.5">
                        Verso Oficial do Certificado Nº {cert.certNumber} · Fé
                        Pública Interinstitucional e Validação Curricular
                      </div>
                    </div>
                  </div>

                  {/* Header Divider */}
                  <div
                    className="absolute bg-[#064E3B]"
                    style={{
                      left: '53px',
                      top: '105px',
                      width: '1016px',
                      height: '2px',
                    }}
                  />

                  {/* Section 1 & Section 2 Boxes */}
                  <div
                    className="absolute flex justify-between"
                    style={{
                      left: '53px',
                      top: '117px',
                      width: '1016px',
                      height: '116px',
                    }}
                  >
                    {/* Box 1: Dados de Identificação */}
                    <div
                      className="bg-white border border-[#064E3B] px-4 py-3 flex flex-col justify-between"
                      style={{ width: '586px', height: '116px' }}
                    >
                      <div className="font-bold text-[12px] text-[#064E3B]">
                        1. DADOS DE IDENTIFICAÇÃO DO PROFISSIONAL EXTENSIONISTA
                      </div>
                      <div className="text-[12.2px] text-[#0F172A] space-y-1">
                        <div>
                          Titular Certificado:{' '}
                          <strong>
                            <EditableSpan
                              value={cert.holderName}
                              isEditing={isInlineEditMode}
                              onChange={(v) => updateField('holderName', v)}
                            />
                          </strong>
                        </div>
                        <div>
                          CPF Registrado:{' '}
                          <strong>
                            <EditableSpan
                              value={cert.holderCpf}
                              isEditing={isInlineEditMode}
                              onChange={(v) => updateField('holderCpf', v)}
                            />
                          </strong>
                        </div>
                        <div>
                          Qualificação Profissional:{' '}
                          <strong>
                            <EditableSpan
                              value={cert.holderRole}
                              isEditing={isInlineEditMode}
                              onChange={(v) => updateField('holderRole', v)}
                            />
                          </strong>
                        </div>
                        <div>
                          Instituição de Origem:{' '}
                          <strong>
                            <EditableSpan
                              value={cert.holderInstitution}
                              isEditing={isInlineEditMode}
                              onChange={(v) =>
                                updateField('holderInstitution', v)
                              }
                            />
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* Box 2: Enquadramento Curricular */}
                    <div
                      className="bg-[#F0F5FF] border border-[#0A1D56] px-4 py-3 flex flex-col justify-between"
                      style={{ width: '415px', height: '116px' }}
                    >
                      <div>
                        <div className="font-bold text-[12px] text-[#0A1D56] mb-2">
                          2. ENQUADRAMENTO CURRICULAR E PONTUAÇÃO
                        </div>
                        <div className="font-bold text-[12px] text-[#0F172A] leading-snug">
                          <EditableSpan
                            value={cert.curriculumFramingLine1}
                            isEditing={isInlineEditMode}
                            onChange={(v) =>
                              updateField('curriculumFramingLine1', v)
                            }
                          />
                          <br />
                          <EditableSpan
                            value={cert.curriculumFramingLine2}
                            isEditing={isInlineEditMode}
                            onChange={(v) =>
                              updateField('curriculumFramingLine2', v)
                            }
                          />
                        </div>
                      </div>
                      <div className="font-mono font-bold text-[12px] text-[#064E3B]">
                        Período:{' '}
                        <EditableSpan
                          value={cert.period}
                          isEditing={isInlineEditMode}
                          onChange={(v) => updateField('period', v)}
                        />{' '}
                        | Total:{' '}
                        <EditableSpan
                          value={cert.totalHoursNumeric}
                          isEditing={isInlineEditMode}
                          onChange={(v) => updateField('totalHoursNumeric', v)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Matriz de Atividades Práticas (10 HORAS) */}
                  <div
                    className="absolute"
                    style={{ left: '53px', top: '245px', width: '1016px' }}
                  >
                    {/* Table Header */}
                    <div className="bg-[#EDFCF5] border border-[#064E3B] px-4 py-1.5 font-bold text-[12px] text-[#064E3B]">
                      3. MATRIZ DE ATIVIDADES PRÁTICAS E METODOLOGIA
                      EXTENSIONISTA (10 HORAS)
                    </div>

                    {/* 4 Rows */}
                    <div className="border-x border-b border-[#CCD6E0] divide-y divide-[#CCD6E0] bg-white">
                      {cert.axes.map((axis, idx) => (
                        <div
                          key={axis.id}
                          className="grid items-center"
                          style={{
                            gridTemplateColumns: '298px 1fr 96px',
                            height: '53px',
                          }}
                        >
                          <div className="px-3 py-1.5 border-r border-[#E3E8F0] h-full flex flex-col justify-center">
                            <div className="font-bold text-[10.8px] text-[#0A1D56] leading-tight">
                              <EditableSpan
                                value={axis.titleLine1}
                                isEditing={isInlineEditMode}
                                onChange={(v) =>
                                  updateAxis(idx, 'titleLine1', v)
                                }
                              />
                              <br />
                              <EditableSpan
                                value={axis.titleLine2}
                                isEditing={isInlineEditMode}
                                onChange={(v) =>
                                  updateAxis(idx, 'titleLine2', v)
                                }
                              />
                            </div>
                            <div className="text-[9.6px] text-[#475569] mt-0.5 truncate">
                              <EditableSpan
                                value={axis.subtitle}
                                isEditing={isInlineEditMode}
                                onChange={(v) => updateAxis(idx, 'subtitle', v)}
                              />
                            </div>
                          </div>

                          <div className="px-3.5 py-1.5 border-r border-[#E3E8F0] h-full flex flex-col justify-center text-[11px] text-[#0F172A] leading-snug">
                            <div>
                              <EditableSpan
                                value={axis.descriptionLine1}
                                isEditing={isInlineEditMode}
                                onChange={(v) =>
                                  updateAxis(idx, 'descriptionLine1', v)
                                }
                              />
                            </div>
                            <div>
                              <EditableSpan
                                value={axis.descriptionLine2}
                                isEditing={isInlineEditMode}
                                onChange={(v) =>
                                  updateAxis(idx, 'descriptionLine2', v)
                                }
                              />
                            </div>
                          </div>

                          <div className="px-2 h-full flex items-center justify-center font-mono font-bold text-[12px] text-[#064E3B]">
                            <EditableSpan
                              value={axis.hours}
                              isEditing={isInlineEditMode}
                              onChange={(v) => updateAxis(idx, 'hours', v)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section 4: Registro Oficial de Fé Pública (With Touchable URL & QR Code) */}
                  <div
                    className="absolute bg-[#FFFAEB] border border-[#D97706] px-4 py-2.5 flex items-center justify-between"
                    style={{
                      left: '53px',
                      top: '496px',
                      width: '1016px',
                      height: '117px',
                    }}
                  >
                    <div className="pr-4 space-y-1 max-w-[890px]">
                      <div className="font-bold text-[12px] text-[#92400E]">
                        4. REGISTRO OFICIAL DE FÉ PÚBLICA, ENDEREÇO WEB E CHAVES
                        DE VERIFICAÇÃO DE AUTENTICIDADE
                      </div>
                      <div className="text-[11.4px] text-[#0F172A] leading-tight">
                        Certificado registrado sob o{' '}
                        <strong>
                          nº {cert.certNumber} no Livro de Extensão nº{' '}
                          {cert.bookNumber}, Folha {cert.pageNumber}
                        </strong>
                        , expedido pela <strong>{cert.issuer1.name}</strong>{' '}
                        (CNPJ: {cert.issuer1.cnpj}) e{' '}
                        <strong>{cert.issuer2.name}</strong> (CNPJ:{' '}
                        {cert.issuer2.cnpj}).
                      </div>
                      <div className="font-mono font-bold text-[11px] text-[#064E3B] pt-0.5">
                        CÓDIGO DE AUTENTICIDADE: {cert.code}{' '}
                        &nbsp;&nbsp;|&nbsp;&nbsp; CHAVE DE CONTROLE / DÍGITO:{' '}
                        {cert.controlKey}
                      </div>
                      <div className="font-mono font-bold text-[10.2px] text-[#0A1D56]">
                        ENDEREÇO PARA VERIFICAÇÃO MANUAL (TOQUE P/ ABRIR):{' '}
                        <a
                          href={fullVerifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={handleTouchLinkClick}
                          className="underline text-[#064E3B] hover:text-[#D97706] cursor-pointer"
                        >
                          {fullVerifyUrl}
                        </a>
                      </div>
                      <div className="font-mono font-bold text-[10.2px] text-[#0F172A]">
                        HASH SHA-256:{' '}
                        <EditableSpan
                          value={cert.sha256}
                          isEditing={isInlineEditMode}
                          onChange={(v) => updateField('sha256', v)}
                        />
                      </div>
                    </div>

                    {/* Touchable QR Code on Back Page */}
                    <a
                      href={fullVerifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleTouchLinkClick}
                      title={`Toque para abrir o validador: ${fullVerifyUrl}`}
                      className="group relative w-[98px] h-[98px] bg-white border border-[#064E3B] hover:border-[#D97706] p-1.5 flex items-center justify-center shrink-0 cursor-pointer transition-all hover:shadow-md"
                    >
                      {qrUrl ? (
                        <img
                          src={qrUrl}
                          alt="QR Code Verso (Toque para abrir)"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-100 animate-pulse" />
                      )}
                      <span className="absolute inset-x-0 bottom-0 bg-[#064E3B]/90 text-white font-mono text-[7px] text-center py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        TOQUE P/ ABRIR
                      </span>
                    </a>
                  </div>

                  {/* Page 2 Bottom Signatures & Center Touchable Footer */}
                  <div
                    className="absolute flex items-end justify-between"
                    style={{
                      left: '68px',
                      top: '622px',
                      width: '986px',
                      height: '105px',
                    }}
                  >
                    {/* Left Signer */}
                    <div className="flex flex-col items-center w-[280px]">
                      <img
                        src={CERT_ASSETS.sigBarbara}
                        alt="Assinatura Bárbara Lima dos Santos"
                        className="h-[56px] w-[204px] object-contain mb-1"
                      />
                      <div className="w-full h-[1.4px] bg-[#0F172A] mb-1" />
                      <div className="font-bold text-[11.2px] text-[#064E3B]">
                        {cert.issuer1.signerName}
                      </div>
                      <div className="font-mono font-bold text-[9.2px] text-[#064E3B] mt-0.5">
                        Editora Mente e Saúde (CNPJ: {cert.issuer1.cnpj})
                      </div>
                    </div>

                    {/* Center Legal Summary — Touchable Link */}
                    <div className="flex flex-col items-center text-center pb-0.5">
                      <div
                        className="italic font-semibold text-[15.5px] text-[#0F172A]"
                        style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                        }}
                      >
                        {cert.issueLocationAndDate}
                      </div>
                      <div className="font-bold text-[10px] text-[#475569] mt-1">
                        Documento Oficial de 2 Laudas (Frente e Verso) · Válido
                        em Todo o Território Nacional
                      </div>
                      <a
                        href={fullVerifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleTouchLinkClick}
                        className="font-mono font-bold text-[9.2px] text-[#064E3B] hover:text-[#D97706] underline mt-0.5 cursor-pointer"
                      >
                        Registro: {cert.code} · Chave: {cert.controlKey} · Toque
                        p/ Validar
                      </a>
                    </div>

                    {/* Right Signer */}
                    <div className="flex flex-col items-center w-[280px]">
                      <img
                        src={CERT_ASSETS.sigJames}
                        alt="Assinatura James Araújo de Santana"
                        className="h-[56px] w-[204px] object-contain mb-1"
                      />
                      <div className="w-full h-[1.4px] bg-[#0F172A] mb-1" />
                      <div className="font-bold text-[11.2px] text-[#0A1D56]">
                        {cert.issuer2.signerName}
                      </div>
                      <div className="font-mono font-bold text-[9.2px] text-[#0A1D56] mt-0.5">
                        Centro Maria Dalva de Araújo (CNPJ: {cert.issuer2.cnpj})
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom PDF Reader Info Strip */}
        <div className="px-6 py-3 bg-[#0B2E36] border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#FCF9F2]/80">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0" />
            <span>
              QR Code e links de rodapé configurados com acesso direto ao toque
              para:{' '}
              <a
                href={fullVerifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleTouchLinkClick}
                className="font-mono text-[#F59E0B] underline hover:text-white"
              >
                {fullVerifyUrl}
              </a>
            </span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px] text-[#F59E0B]">
            <button
              onClick={handleDownloadPdf}
              className="underline hover:text-white cursor-pointer inline-flex items-center gap-1"
            >
              <span>Baixar PDF Vetorial Editável</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
