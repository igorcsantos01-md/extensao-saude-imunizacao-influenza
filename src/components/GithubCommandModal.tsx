import React, { useState } from 'react';
import { X, Copy, Check, Terminal } from 'lucide-react';
import { CERTIFICATE_08_DATA } from '../data/campaignData';

interface GithubCommandModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GithubCommandModal: React.FC<GithubCommandModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const cert = CERTIFICATE_08_DATA;

  if (!isOpen) return null;

  const fullPrompt = `# COMANDO OPERACIONAL COMPLETO PARA REPOSITÓRIO GITHUB / DEPLOY VERCEL — CERTIFICADO Nº 08 (CAMPANHA DE IMUNIZAÇÃO CONTRA INFLUENZA)

## 1. OBJETIVO DO SISTEMA E ARQUITETURA DA PLATAFORMA
Construa uma aplicação web completa, interativa e responsiva em React + TypeScript + Tailwind CSS + jsPDF + QRCode dedicada à comprovação acadêmica, exposição editorial e validação pública do **Certificado de Atividade de Extensão Nº 08** emitido conjuntamente pela **Editora Mente e Saúde (CNPJ: 51.372.335/0001-71)** e pelo **Centro Profissionalizante Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83)** para o médico **Dr. Lucas Gonçalves Silveira (CPF: 702.794.941-57 | Centro Universitário de Anápolis - UNIFAN)**.

## 2. TEMA CENTRAL DA AÇÃO EXTENSIONISTA (MODELO Nº 08 — ITEM 08 DO EDITAL FUBOG)
- **Título Oficial**: "${cert.title}"
- **Enquadramento Curricular (Item 08)**: "${cert.curriculumFramingLine1} ${cert.curriculumFramingLine2}"
- **Modalidade (Frente)**: "${cert.modalityFront}"
- **Período de Realização**: ${cert.period} | **Data de Emissão**: ${cert.issueLocationAndDate}
- **Carga Horária Total**: ${cert.totalHoursText} (${cert.totalHoursNumeric})
- **Registro Oficial**: Certificado Nº ${cert.certNumber} · Livro de Extensão nº ${cert.bookNumber}, Folha ${cert.pageNumber}
- **Código de Autenticidade**: ${cert.code}
- **Chave de Controle / Dígito**: ${cert.controlKey}
- **Hash Criptográfico SHA-256**: ${cert.sha256}
- **URL de Verificação Direta via QR Code**: https://extensao-saude-influenza.vercel.app/?codigo=${cert.code}#validador

## 3. PALETA DE CORES CRIATIVA E IDENTIDADE VISUAL
1. **Interface do Portal da Campanha**:
   - Fundo Alabastro Solar Quente (#FCF9F2) e Superfícies Creme Editorial (#F5EFE4)
   - Estrutura Institucional em Azul Petróleo Profundo (#0B2E36 e #0F4C5C)
   - Destaques em Âmbar Solar (#D97706 / #F59E0B) e Coral Imune (#E05A47)
   - Tipografia: 'Fraunces' (títulos editoriais), 'Plus Jakarta Sans' (corpo) e 'JetBrains Mono' (códigos, hashes e métricas).
2. **Certificado Nº 08 (Padrão A4 Paisagem 297mm x 210mm — 2 Laudas)**:
   - Fundo Creme Acadêmico (#FFFDF9 / #FAF9F6)
   - Moldura Tripla: Verde Institucional (#064E3B), Filete Dourado (#D97706) e Azul Marinho (#0A1D56)
   - Logotipos oficiais higienizados com fundo 100% transparente (Editora Mente e Saúde à esquerda; Centro Profissionalizante Maria Dalva de Araújo à direita, sem telefones e sem cantoneiras)
   - Assinaturas limpas em fundo transparente: Bárbara Lima dos Santos (Editora-Chefe e Coordenadora de Extensão Editorial) e James Araújo de Santana (Coordenador de Extensão e Projetos Educativos — CNPJ: 51.269.112/0001-83)
   - Selo Oficial Dourado de Fé Pública + QR Code escaneável + Caixa de Autenticação Pública Manual.

## 4. TEXTO OFICIAL DO CERTIFICADO Nº 08 (FRENTE E VERSO)
### LAUDA 1 (FRENTE):
"A Editora Mente e Saúde (CNPJ: 51.372.335/0001-71), em parceria institucional com o Centro Profissionalizante Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83), certifica para os devidos fins de comprovação curricular e acadêmica que LUCAS GONÇALVES SILVEIRA (Médico | CPF: 702.794.941-57 | Centro Universitário de Anápolis - UNIFAN) ${cert.frontBodyParagraph1}
${cert.frontBodyParagraph2}"

### LAUDA 2 (VERSO — MEMORIAL DESCRITIVO E MATRIZ DE 10 HORAS):
- **Eixo I (02h 30min)**: ${cert.axes[0].titleLine1} ${cert.axes[0].titleLine2} — ${cert.axes[0].descriptionLine1} ${cert.axes[0].descriptionLine2}
- **Eixo II (03h 00min)**: ${cert.axes[1].titleLine1} ${cert.axes[1].titleLine2} — ${cert.axes[1].descriptionLine1} ${cert.axes[1].descriptionLine2}
- **Eixo III (02h 30min)**: ${cert.axes[2].titleLine1} ${cert.axes[2].titleLine2} — ${cert.axes[2].descriptionLine1} ${cert.axes[2].descriptionLine2}
- **Eixo IV (02h 00min)**: ${cert.axes[3].titleLine1} ${cert.axes[3].titleLine2} — ${cert.axes[3].descriptionLine1} ${cert.axes[3].descriptionLine2}

## 5. FUNCIONALIDADES OBRIGATÓRIAS DO SITE
1. **Visualizador PDF Integrado (Frente e Verso)** com controle de zoom, alternância de laudas e botão de download direto em PDF vetorial A4 Paisagem de 2 páginas.
2. **Sistema Validador de Autenticidade (#validador)** que lê automaticamente o parâmetro \`?codigo=${cert.code}\` da URL e exibe o laudo completo de conformidade e hash SHA-256.
3. **Verificador Interativo de Grupos Prioritários PNI/SUS** (Idosos 60+, Gestantes/Puérperas, Doentes Crônicos, Crianças < 6 anos e Trabalhadores da Saúde/Educação).
4. **Leitor Interativo de 4 Páginas do Folheto Comunitário** com modo de acessibilidade (fonte ampliada e alto contraste para idosos).
5. **Quiz Populacional de Mitos e Verdades sobre a Vacina da Gripe** comparando as respostas com a coleta populacional (n = 486 participantes).
6. **Simulador da Caderneta de Vacinação do Adulto/Idoso** e guia passo a passo do aplicativo Meu SUS Digital.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#0B2E36] text-[#FCF9F2] border border-[#F59E0B]/40 rounded-2xl max-w-4xl w-full max-h-[88vh] flex flex-col shadow-2xl overflow-hidden">
        <div className="px-6 py-4 bg-[#071F25] border-b border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Terminal className="w-5 h-5 text-[#F59E0B]" />
            <h3 className="font-bold text-base">
              Comando Estruturado para Repositório GitHub / Deploy (Certificado Nº 08)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Comando Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Comando Completo</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto font-mono text-xs leading-relaxed text-[#FCF9F2]/90 whitespace-pre-wrap bg-[#09242B]">
          {fullPrompt}
        </div>
      </div>
    </div>
  );
};
