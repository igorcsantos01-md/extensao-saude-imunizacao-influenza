import React, { useState } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Smartphone,
  FileSpreadsheet,
  Users,
  Stethoscope,
  RefreshCw,
  Eye,
  Award,
} from 'lucide-react';
import {
  PRIORITY_GROUPS_DATA,
  COMMUNITY_LEAFLET_PAGES,
  POPULATION_QUIZ_QUESTIONS,
  BOOKLET_SIMULATOR_ITEMS,
} from '../data/campaignData';

export const CampaignInteractiveModules: React.FC = () => {
  // 1. Priority Groups Verifier State
  const [selectedGroupId, setSelectedGroupId] = useState<string>(
    PRIORITY_GROUPS_DATA[0].id
  );
  const activeGroup =
    PRIORITY_GROUPS_DATA.find((g) => g.id === selectedGroupId) ||
    PRIORITY_GROUPS_DATA[0];

  // 2. Interactive Community Leaflet State
  const [currentPageIdx, setCurrentPageIdx] = useState<number>(0);
  const [highContrastLeaflet, setHighContrastLeaflet] =
    useState<boolean>(false);
  const activeLeafletPage = COMMUNITY_LEAFLET_PAGES[currentPageIdx];

  // 3. Population Quiz State (Mitos vs Verdades)
  const [userAnswers, setUserAnswers] = useState<
    Record<number, 'MITO' | 'VERDADE'>
  >({});

  // 4. Vaccination Booklet Simulator State
  const [bookletMode, setBookletMode] = useState<'outdated' | 'updated'>(
    'updated'
  );

  const handleQuizSelect = (qId: number, choice: 'MITO' | 'VERDADE') => {
    setUserAnswers((prev) => ({ ...prev, [qId]: choice }));
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
  };

  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = POPULATION_QUIZ_QUESTIONS.filter(
    (q) => userAnswers[q.id] === q.correctAnswer
  ).length;

  return (
    <div className="space-y-24 py-12">
      {/* =====================================================================
          MODULE 1: VERIFICADOR INTERATIVO DE GRUPOS PRIORITÁRIOS PNI / SUS
         ===================================================================== */}
      <section
        id="grupos-prioritarios"
        className="scroll-mt-20 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto"
      >
        <div className="pb-6 border-b border-[#0B2E36]/15 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D97706] mb-2">
              <span>EIXO I & IV DA EXTENSÃO</span>
              <span aria-hidden="true">·</span>
              <span>DIRETRIZES DO PROGRAMA NACIONAL DE IMUNIZAÇÕES (PNI/MS)</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B2E36] tracking-tight"
              style={{ fontFamily: "'Fraunces', serif", textWrap: 'balance' }}
            >
              01. Verificador Interativo de Grupos Prioritários e Multivacinação
            </h2>
          </div>
          <p className="text-sm text-[#142529]/75 max-w-md">
            Selecione um perfil prioritário abaixo para visualizar a justificativa
            clínica contra a Síndrome Respiratória Aguda Grave (SRAG) e o
            checklist de atualização conjunta da caderneta.
          </p>
        </div>

        {/* Profile Selector Tabs */}
        <div className="mt-8 flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-[#F5EFE4] border border-[#0B2E36]/15">
          {PRIORITY_GROUPS_DATA.map((group) => {
            const isSelected = group.id === selectedGroupId;
            return (
              <button
                key={group.id}
                onClick={() => setSelectedGroupId(group.id)}
                className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-[#0B2E36] text-[#FCF9F2] shadow-sm'
                    : 'text-[#142529]/80 hover:text-[#0B2E36] hover:bg-white/60'
                }`}
              >
                {group.label}
              </button>
            );
          })}
        </div>

        {/* Two-Zone Interactive Sandbox Stage */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 7 Cols: Clinical Justification & Scheme */}
          <div className="lg:col-span-7 rounded-2xl bg-white border border-stone-200/90 p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-stone-200">
                <div>
                  <span className="text-xs font-mono uppercase text-[#D97706] block">
                    PERFIL SELECIONADO NO PNI/SUS
                  </span>
                  <h3
                    className="text-xl sm:text-2xl font-bold text-[#0B2E36] mt-0.5"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    {activeGroup.label}
                  </h3>
                </div>
                <Stethoscope className="w-8 h-8 text-[#0F4C5C] shrink-0" />
              </div>

              <div className="mt-4 text-xs font-mono text-stone-600">
                CRITÉRIO DE ELEGIBILIDADE: {activeGroup.ageOrCriteria}
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#0F4C5C] font-semibold">
                    Fisiopatologia e Risco Clínico Evitado
                  </h4>
                  <p className="mt-1.5 text-sm sm:text-base text-[#142529]/90 leading-relaxed">
                    {activeGroup.clinicalRisk}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#064E3B] font-semibold">
                    Esquema Recomendado na Campanha Influenza
                  </h4>
                  <p className="mt-1.5 text-sm sm:text-base text-[#142529]/90 font-medium leading-relaxed">
                    {activeGroup.vaccineRecommendation}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FCF9F2] border border-[#D97706]/40">
                  <div className="text-xs font-mono uppercase text-[#B45309] font-bold">
                    Impacto Epidemiológico Comprovado
                  </div>
                  <p className="mt-1 text-sm text-[#142529] font-medium">
                    {activeGroup.ComplicationReduction}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-stone-200 text-xs text-stone-600 leading-relaxed">
              <strong className="text-[#0B2E36]">Abordagem Editorial:</strong>{' '}
              {activeGroup.editorialHighlight}
            </div>
          </div>

          {/* Right 5 Cols: Simultaneous Caderneta Checklist & UBS Docs */}
          <div className="lg:col-span-5 rounded-2xl bg-[#0B2E36] text-[#FCF9F2] p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-[#F59E0B]">
                  OPORTUNIDADE DE ATUALIZAÇÃO DA CADERNETA
                </div>
                <h4
                  className="text-lg sm:text-xl font-bold mt-1"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  Vacinas para Conferir na Mesma Ida à UBS
                </h4>
                <p className="text-xs text-[#FCF9F2]/75 mt-1">
                  O folheto comunitário orienta o cidadão a solicitar a revisão
                  destes imunizantes junto com a dose anual da gripe:
                </p>

                <ul className="mt-4 space-y-2.5">
                  {activeGroup.simultaneousVaccines.map((vac, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[#FCF9F2]/95 bg-white/5 p-3 rounded-xl border border-white/10"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                      <span>{vac}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-white/15">
                <div className="text-xs font-mono uppercase tracking-wider text-[#F59E0B]">
                  DOCUMENTAÇÃO RECOMENDADA NA SALA DE VACINA
                </div>
                <ul className="mt-3 space-y-2">
                  {activeGroup.requiredDocs.map((doc, i) => (
                    <li
                      key={i}
                      className="text-xs text-[#FCF9F2]/85 flex items-start gap-2"
                    >
                      <span className="font-mono text-[#F59E0B] font-bold">
                        0{i + 1}.
                      </span>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 p-3.5 rounded-xl bg-[#123B45] border border-[#F59E0B]/30 text-xs text-[#FCF9F2]/90">
              <strong className="text-[#F59E0B]">Nota de Cidadania SUS:</strong>{' '}
              A ausência da caderneta física de papel não impede a vacinação. O
              registro pode ser resgatado pelo CPF na Rede Nacional de Dados em
              Saúde (RNDS).
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          MODULE 2: PREVIEW INTERATIVO DO FOLHETO COMUNITÁRIO SOBRE INFLUENZA
         ===================================================================== */}
      <section
        id="folheto-comunitario"
        className="scroll-mt-20 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto"
      >
        <div className="pb-6 border-b border-[#0B2E36]/15 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#0F4C5C] mb-2">
              <span>PRODUTO EDITORIAL DA CAMPANHA</span>
              <span aria-hidden="true">·</span>
              <span>TIRAGEM COMUNITÁRIA FÍSICA E DIGITAL (PDF/WHATSAPP)</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B2E36] tracking-tight"
              style={{ fontFamily: "'Fraunces', serif", textWrap: 'balance' }}
            >
              02. Leitor Interativo do Folheto Comunitário (4 Laudas Educativas)
            </h2>
          </div>

          {/* Accessibility High-Contrast Mode Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setHighContrastLeaflet((v) => !v)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                highContrastLeaflet
                  ? 'bg-[#0B2E36] text-[#F59E0B] border-[#0B2E36]'
                  : 'bg-white text-[#0B2E36] border-stone-300 hover:bg-[#F5EFE4]'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>
                {highContrastLeaflet
                  ? 'Modo Leitura Ampliada Ativo (Idosos)'
                  : 'Ativar Fonte Ampliada / Alto Contraste'}
              </span>
            </button>
          </div>
        </div>

        {/* Leaflet Page Selector Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {COMMUNITY_LEAFLET_PAGES.map((p, idx) => (
              <button
                key={p.pageNumber}
                onClick={() => setCurrentPageIdx(idx)}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  idx === currentPageIdx
                    ? 'bg-[#D97706] text-white'
                    : 'bg-[#F5EFE4] text-[#142529]/80 hover:bg-[#E8DEC8]'
                }`}
              >
                Lauda 0{p.pageNumber} do Folheto
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setCurrentPageIdx((i) =>
                  i > 0 ? i - 1 : COMMUNITY_LEAFLET_PAGES.length - 1
                )
              }
              className="p-2 rounded-lg bg-white border border-stone-300 hover:bg-[#F5EFE4] text-[#0B2E36] cursor-pointer"
              title="Lauda Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs text-stone-600 px-2 tabular-nums">
              Página {activeLeafletPage.pageNumber} de{' '}
              {COMMUNITY_LEAFLET_PAGES.length}
            </span>
            <button
              onClick={() =>
                setCurrentPageIdx((i) =>
                  i < COMMUNITY_LEAFLET_PAGES.length - 1 ? i + 1 : 0
                )
              }
              className="p-2 rounded-lg bg-white border border-stone-300 hover:bg-[#F5EFE4] text-[#0B2E36] cursor-pointer"
              title="Próxima Lauda"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Leaflet Interactive Canvas */}
        <div
          className={`mt-6 rounded-2xl border-2 transition-colors p-6 sm:p-10 shadow-lg ${
            highContrastLeaflet
              ? 'bg-[#091E24] text-[#FFFDF9] border-[#F59E0B]'
              : 'bg-white text-[#142529] border-[#0F4C5C]/25'
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-current/15">
            <div>
              <div
                className={`text-xs font-mono uppercase tracking-wider ${
                  highContrastLeaflet ? 'text-[#F59E0B]' : 'text-[#D97706]'
                }`}
              >
                {activeLeafletPage.tag}
              </div>
              <h3
                className={`font-bold tracking-tight mt-1 ${
                  highContrastLeaflet
                    ? 'text-2xl sm:text-3xl text-white'
                    : 'text-xl sm:text-2xl text-[#0B2E36]'
                }`}
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                {activeLeafletPage.title}
              </h3>
              <p
                className={`mt-1 ${
                  highContrastLeaflet
                    ? 'text-base text-white/85'
                    : 'text-sm text-stone-600'
                }`}
              >
                {activeLeafletPage.subtitle}
              </p>
            </div>

            <div className="font-mono text-xs px-3.5 py-2 rounded-lg border border-current/20 shrink-0">
              EDITORA MENTE E SAÚDE · DISTRIBUIÇÃO GRATUITA
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeLeafletPage.keyPoints.map((kp, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl border flex flex-col justify-between ${
                  highContrastLeaflet
                    ? 'bg-[#11333D] border-white/20'
                    : 'bg-[#FCF9F2] border-stone-200/90'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`font-mono text-xs font-bold ${
                        highContrastLeaflet ? 'text-[#F59E0B]' : 'text-[#0F4C5C]'
                      }`}
                    >
                      TÓPICO 0{index + 1}
                    </span>
                    {kp.metric && (
                      <span
                        className={`font-mono text-xs font-bold ${
                          highContrastLeaflet
                            ? 'text-[#F59E0B]'
                            : 'text-[#D97706]'
                        }`}
                      >
                        {kp.metric}
                      </span>
                    )}
                  </div>
                  <h4
                    className={`font-bold leading-snug ${
                      highContrastLeaflet
                        ? 'text-lg sm:text-xl text-white'
                        : 'text-base text-[#0B2E36]'
                    }`}
                  >
                    {kp.heading}
                  </h4>
                  <p
                    className={`mt-2.5 leading-relaxed ${
                      highContrastLeaflet
                        ? 'text-base text-white/90'
                        : 'text-sm text-[#142529]/85'
                    }`}
                  >
                    {kp.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-5 border-t border-current/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 font-medium">
              <BookOpen className="w-4 h-4 text-[#D97706] shrink-0" />
              <span>{activeLeafletPage.footerCallout}</span>
            </div>
            <div className="font-mono opacity-75">
              Curadoria: Dr. Lucas Gonçalves Silveira · Maio/2025
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          MODULE 3: QUIZ POPULACIONAL DE MITOS E VERDADES (COLETA N = 486)
         ===================================================================== */}
      <section
        id="quiz-populacional"
        className="scroll-mt-20 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto"
      >
        <div className="pb-6 border-b border-[#0B2E36]/15 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#E05A47] mb-2">
              <span>EIXO II & III DA EXTENSÃO</span>
              <span aria-hidden="true">·</span>
              <span>INSTRUMENTO DIGITAL DE COLETA DE DADOS POPULACIONAIS (N = 486)</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B2E36] tracking-tight"
              style={{ fontFamily: "'Fraunces', serif", textWrap: 'balance' }}
            >
              03. Quiz Interativo de Letramento Vacinal e Combate a Fake News
            </h2>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right font-mono text-xs">
              <span className="text-stone-500 block">SEU DESEMPENHO:</span>
              <span className="font-bold text-sm text-[#0B2E36] tabular-nums">
                {correctCount} acertos de {answeredCount} respondidas (Total:{' '}
                {POPULATION_QUIZ_QUESTIONS.length})
              </span>
            </div>
            {answeredCount > 0 && (
              <button
                onClick={handleResetQuiz}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#F5EFE4] hover:bg-[#E8DEC8] text-xs font-medium text-[#0B2E36] transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reiniciar</span>
              </button>
            )}
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {POPULATION_QUIZ_QUESTIONS.map((q) => {
            const selected = userAnswers[q.id];
            const isAnswered = Boolean(selected);
            const isCorrect = selected === q.correctAnswer;

            return (
              <div
                key={q.id}
                className="rounded-2xl bg-white border border-stone-200/90 p-6 shadow-sm transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-2 max-w-3xl">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#0F4C5C]">
                      <span>QUESTÃO EPIDEMIOLÓGICA 0{q.id}</span>
                      <span aria-hidden="true">·</span>
                      <span>FONTE: {q.referenceSource}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#142529] leading-snug">
                      &ldquo;{q.statement}&rdquo;
                    </h3>
                  </div>

                  {/* Action Buttons: MITO or VERDADE */}
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => handleQuizSelect(q.id, 'MITO')}
                      className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                        selected === 'MITO'
                          ? q.correctAnswer === 'MITO'
                            ? 'bg-[#064E3B] text-white border-[#064E3B]'
                            : 'bg-[#E05A47] text-white border-[#E05A47]'
                          : 'bg-[#FCF9F2] text-[#142529] border-stone-300 hover:border-[#0B2E36]'
                      }`}
                    >
                      É MITO (FAKE NEWS)
                    </button>

                    <button
                      onClick={() => handleQuizSelect(q.id, 'VERDADE')}
                      className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                        selected === 'VERDADE'
                          ? q.correctAnswer === 'VERDADE'
                            ? 'bg-[#064E3B] text-white border-[#064E3B]'
                            : 'bg-[#E05A47] text-white border-[#E05A47]'
                          : 'bg-[#FCF9F2] text-[#142529] border-stone-300 hover:border-[#0B2E36]'
                      }`}
                    >
                      É VERDADE CIENTÍFICA
                    </button>
                  </div>
                </div>

                {/* Immediate Clinical Feedback & Population Survey Data Comparison */}
                {isAnswered && (
                  <div className="mt-5 pt-5 border-t border-stone-200 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-8 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold">
                        <span
                          className={
                            isCorrect ? 'text-[#064E3B]' : 'text-[#E05A47]'
                          }
                        >
                          {isCorrect
                            ? `✓ RESPOSTA CORRETA (${q.correctAnswer})`
                            : `✗ ATENÇÃO: A RESPOSTA CORRETA É ${q.correctAnswer}`}
                        </span>
                      </div>
                      <p className="text-sm text-[#142529]/90 leading-relaxed">
                        {q.clinicalExplanation}
                      </p>
                    </div>

                    <div className="lg:col-span-4 bg-[#FCF9F2] p-4 rounded-xl border border-stone-200/90">
                      <div className="flex items-center justify-between text-xs font-mono text-stone-600 mb-1.5">
                        <span>DADOS DA COLETA (n = 486):</span>
                        <span className="font-bold text-[#0F4C5C] tabular-nums">
                          {q.communitySurveyPercentCorrect}% acertaram
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden">
                        <div
                          className="h-full bg-[#D97706]"
                          style={{
                            width: `${q.communitySurveyPercentCorrect}%`,
                          }}
                        />
                      </div>
                      <p className="text-[11px] text-stone-600 mt-2 leading-snug">
                        {q.communityCommonDoubt}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          MODULE 4: SIMULADOR DE LEITURA DA CADERNETA & MEU SUS DIGITAL
         ===================================================================== */}
      <section
        id="simulador-caderneta"
        className="scroll-mt-20 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto"
      >
        <div className="pb-6 border-b border-[#0B2E36]/15 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#064E3B] mb-2">
              <span>EIXO IV · EDUCAÇÃO COMUNITÁRIA PRÁTICA</span>
              <span aria-hidden="true">·</span>
              <span>CONFERÊNCIA DE CADERNETA E INTEGRAÇÃO RNDS / MEU SUS DIGITAL</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B2E36] tracking-tight"
              style={{ fontFamily: "'Fraunces', serif", textWrap: 'balance' }}
            >
              04. Simulador de Atualização da Caderneta de Vacinação e Meu SUS Digital
            </h2>
          </div>

          {/* Toggle Before / After Campaign */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#F5EFE4] border border-[#0B2E36]/15 shrink-0">
            <button
              onClick={() => setBookletMode('outdated')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                bookletMode === 'outdated'
                  ? 'bg-[#E05A47] text-white'
                  : 'text-[#142529]/75 hover:text-[#142529]'
              }`}
            >
              1. Antes da Orientação (Com Pendências)
            </button>
            <button
              onClick={() => setBookletMode('updated')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                bookletMode === 'updated'
                  ? 'bg-[#064E3B] text-white'
                  : 'text-[#142529]/75 hover:text-[#142529]'
              }`}
            >
              2. Após Ida à Sala de Vacina (Caderneta em Dia)
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 8 Cols: Interactive Vaccination Record Table */}
          <div className="lg:col-span-8 rounded-2xl bg-white border border-stone-200/90 overflow-hidden shadow-sm">
            <div
              className={`px-6 py-4 flex flex-wrap items-center justify-between gap-2 text-white ${
                bookletMode === 'updated' ? 'bg-[#064E3B]' : 'bg-[#7C2D12]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileSpreadsheet className="w-5 h-5 text-[#F59E0B]" />
                <span className="font-bold text-sm tracking-wide">
                  ESPELHO DIDÁTICO DA CADERNETA DE VACINAÇÃO DO ADULTO E IDOSO (SUS)
                </span>
              </div>
              <span className="font-mono text-xs text-white/90">
                {bookletMode === 'updated'
                  ? 'STATUS: TODAS AS VACINAS ATUALIZADAS (MAIO/2025)'
                  : 'STATUS: 4 PENDÊNCIAS VACINAIS IDENTIFICADAS'}
              </span>
            </div>

            <div className="divide-y divide-stone-200">
              {BOOKLET_SIMULATOR_ITEMS.map((item, idx) => {
                const stateData =
                  bookletMode === 'updated'
                    ? item.updatedStatus
                    : item.outdatedStatus;

                return (
                  <div key={idx} className="p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-base text-[#0B2E36]">
                          {item.vaccineName}
                        </h3>
                        <div className="text-xs text-stone-600 mt-0.5">
                          Proteção contra: {item.targetDisease} · Esquema PNI:{' '}
                          {item.doseScheme}
                        </div>
                      </div>

                      <span
                        className={`font-mono text-xs font-bold px-3 py-1 rounded-md whitespace-nowrap shrink-0 self-start sm:self-center ${
                          bookletMode === 'updated'
                            ? 'bg-[#EDFCF5] text-[#064E3B] border border-[#064E3B]/30'
                            : 'bg-[#FFF1F2] text-[#BE123C] border border-[#BE123C]/30'
                        }`}
                      >
                        {stateData.label}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono bg-[#FCF9F2] p-3.5 rounded-xl border border-stone-200/80">
                      <div>
                        <span className="text-stone-500 block text-[10px]">
                          DATA DO REGISTRO:
                        </span>
                        <span className="font-bold text-[#142529]">
                          {stateData.lastDate}
                        </span>
                      </div>
                      <div>
                        <span className="text-stone-500 block text-[10px]">
                          LOTE / LABORATÓRIO:
                        </span>
                        <span className="font-bold text-[#0F4C5C]">
                          {stateData.batch}
                        </span>
                      </div>
                      <div>
                        <span className="text-stone-500 block text-[10px]">
                          UNIDADE / FONTE:
                        </span>
                        <span className="font-bold text-[#142529]">
                          {stateData.unit}
                        </span>
                      </div>
                    </div>

                    <p
                      className={`mt-3 text-xs font-medium ${
                        bookletMode === 'updated'
                          ? 'text-[#064E3B]'
                          : 'text-[#B45309]'
                      }`}
                    >
                      {bookletMode === 'updated'
                        ? `✓ ${item.updatedStatus.validNote}`
                        : `▲ ${item.outdatedStatus.alertNote}`}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 4 Cols: Meu SUS Digital Step-by-Step Guide */}
          <div className="lg:col-span-4 rounded-2xl bg-[#0B2E36] text-[#FCF9F2] p-6 sm:p-7 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-white/15">
              <Smartphone className="w-6 h-6 text-[#F59E0B] shrink-0" />
              <div>
                <div className="text-[11px] font-mono uppercase text-[#F59E0B]">
                  CIDADANIA DIGITAL EM SAÚDE
                </div>
                <h3
                  className="text-lg font-bold"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  Guia Rápido: App Meu SUS Digital
                </h3>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <div className="font-mono text-xs font-bold text-[#F59E0B]">
                  PASSO 01 · ACESSO GOV.BR
                </div>
                <p className="mt-1 text-[#FCF9F2]/85 leading-relaxed">
                  Instale gratuitamente o aplicativo oficial{' '}
                  <strong>Meu SUS Digital</strong> (Android/iOS) ou acesse{' '}
                  <span className="font-mono">meususdigital.saude.gov.br</span>{' '}
                  com seu CPF e senha Gov.br.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <div className="font-mono text-xs font-bold text-[#F59E0B]">
                  PASSO 02 · CARTEIRA NACIONAL DE VACINAÇÃO
                </div>
                <p className="mt-1 text-[#FCF9F2]/85 leading-relaxed">
                  No menu principal, selecione <strong>&ldquo;Vacinas&rdquo;</strong>{' '}
                  para consultar todas as doses enviadas pelas UBS à Rede
                  Nacional de Dados em Saúde (RNDS) e exportar o PDF oficial com
                  QR Code do Ministério da Saúde.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <div className="font-mono text-xs font-bold text-[#F59E0B]">
                  PASSO 03 · ADICIONAR VACINAS DO CARTÃO FÍSICO
                </div>
                <p className="mt-1 text-[#FCF9F2]/85 leading-relaxed">
                  Doses antigas aplicadas antes da informatização podem ser
                  transcritas na Sala de Vacina da sua UBS de referência mediante
                  apresentação do cartão físico.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#D97706]/20 border border-[#F59E0B]/40 text-xs text-[#FCF9F2]">
              <div className="font-bold text-[#F59E0B] mb-1">
                Canais Públicos Divulgados na Campanha:
              </div>
              <div className="font-mono space-y-1 text-[11px]">
                <div>· Disque Saúde Ministério da Saúde: 136</div>
                <div>· Portal Oficial: gov.br/saude/vacinacao</div>
                <div>· Salas de Vacina Municipais (UBS / Estratégia Saúde da Família)</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
