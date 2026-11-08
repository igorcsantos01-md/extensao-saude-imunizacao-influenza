export interface AxisItem {
  id: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  descriptionLine1: string;
  descriptionLine2: string;
  hours: string;
}

export interface CertificateData {
  certNumber: string;
  bookNumber: string;
  pageNumber: string;
  code: string;
  acceptedCodes: string[];
  controlKey: string;
  sha256: string;
  holderName: string;
  holderCpf: string;
  holderRole: string;
  holderInstitution: string;
  title: string;
  modalityFront: string;
  curriculumFramingLine1: string;
  curriculumFramingLine2: string;
  period: string;
  totalHoursNumeric: string;
  totalHoursText: string;
  issueLocationAndDate: string;
  issueDateShort: string;
  verificationBaseUrl: string;
  frontBodyParagraph1: string;
  frontBodyParagraph2: string;
  axes: AxisItem[];
  issuer1: {
    name: string;
    cnpj: string;
    department: string;
    signerName: string;
    signerRole: string;
  };
  issuer2: {
    name: string;
    cnpj: string;
    signerName: string;
    signerRole: string;
  };
}

export const CERTIFICATE_08_DATA: CertificateData = {
  certNumber: '08',
  bookNumber: '01/2025',
  pageNumber: '54',
  code: 'EMS-CDP-2025-0815',
  acceptedCodes: [
    'EMS-CDP-2025-0815',
    'EMS-VAC-2025-0815',
    'EMS-EXT-2025-0815',
    '0815-7392-6410-8E5D',
    'EMS-CDP-2024-0318',
    'EMS-CDP-2024-0614',
    'EMS-EXT-2024-0519',
    'EMS-CDP-2023-0892',
  ],
  controlKey: '0815-7392-6410-8E5D',
  sha256: '8f3c9a71d2e54b18c6093f4a7e2d1b85c940a3f6e1d82b74c5a90e3f1b6d0815',
  holderName: 'LUCAS GONÇALVES SILVEIRA',
  holderCpf: '702.794.941-57',
  holderRole: 'Médico',
  holderInstitution: 'Centro Universitário de Anápolis (UNIFAN)',
  title:
    'Campanha Educativa de Incentivo à Imunização de Grupos Prioritários: Entrega de Folhetos Comunitários sobre Influenza e Atualização da Caderneta',
  modalityFront:
    'Campanha Educativa, de Vacinação, Coleta de Dados Populacionais e Atividade Comunitária',
  curriculumFramingLine1:
    'Item 08 - Atividades de Extensão: Campanhas educativas, de vacinação,',
  curriculumFramingLine2:
    'coleta de dados populacionais e atividades comunitárias',
  period: '12 a 15 de maio de 2025',
  totalHoursNumeric: '10h',
  totalHoursText: '10 (dez) horas',
  issueLocationAndDate: 'Goiânia - GO, 23 de maio de 2025.',
  issueDateShort: '23/05/2025',
  verificationBaseUrl: 'https://extensao-saude-influenza.vercel.app/',
  frontBodyParagraph1:
    'participou de forma efetiva da Atividade de Extensão intitulada "Campanha Educativa de Incentivo à Imunização de Grupos Prioritários: Entrega de Folhetos Comunitários sobre Influenza e Atualização da Caderneta", desenvolvida na modalidade de Campanha Educativa, de Vacinação, Coleta de Dados Populacionais e Atividade Comunitária, realizada no período de 12 a 15 de maio de 2025, contabilizando carga horária total de 10 (dez) horas.',
  frontBodyParagraph2:
    'No âmbito desta ação extensionista, o profissional atuou na elaboração e distribuição gratuita de folhetos comunitários sobre os benefícios da vacinação anual contra a Influenza em idosos, gestantes e doentes crônicos, aplicação de enquete digital para coleta de dados populacionais sobre adesão vacinal, comunicação científica para combate a fake news e orientação sobre atualização da caderneta nos canais oficiais do SUS.',
  axes: [
    {
      id: 'Eixo I',
      titleLine1: 'Eixo I — Curadoria Científica e Elaboração de Folheto',
      titleLine2: 'Comunitário sobre Influenza e Caderneta',
      subtitle: 'Editoração Preventiva em Imunizações e Saúde Coletiva',
      descriptionLine1:
        'Revisão das diretrizes do PNI/Ministério da Saúde e SBIm e produção didática do Folheto Comunitário Ilustrado "Vacina contra a',
      descriptionLine2:
        'Gripe (Influenza): Proteção de Grupos Prioritários, Prevenção de SRAG e Guia de Atualização da Caderneta".',
      hours: '02h 30min',
    },
    {
      id: 'Eixo II',
      titleLine1: 'Eixo II — Coleta de Dados Populacionais via Enquete',
      titleLine2: 'e Quiz Digital sobre Adesão Vacinal',
      subtitle: 'Pesquisa-Ação e Levantamento Epidemiológico Comunitário',
      descriptionLine1:
        'Estruturação e aplicação de Quiz e Enquete Digital Interativa aberta à comunidade (n = 486 participantes) para coleta de dados',
      descriptionLine2:
        'populacionais sobre situação vacinal autorreferida, percepção de risco em grupos prioritários e hesitação vacinal.',
      hours: '03h 00min',
    },
    {
      id: 'Eixo III',
      titleLine1: 'Eixo III — Conscientização Vacinal no SUS e Combate',
      titleLine2: 'à Desinformação (Fake News)',
      subtitle: 'Infodemiologia e Educação em Imunobiológicos no PNI',
      descriptionLine1:
        'Comunicação científica em página virtual de saúde desmistificando boatos sobre a vacina inativada da Influenza, esclarecendo a',
      descriptionLine2:
        'atualização anual das cepas virais (H1N1, H3N2 e linhagem B), segurança em gestantes e prevenção de hospitalizações.',
      hours: '02h 30min',
    },
    {
      id: 'Eixo IV',
      titleLine1: 'Eixo IV — Ação Comunitária de Atualização da Caderneta',
      titleLine2: 'e Divulgação dos Canais Oficiais do SUS',
      subtitle: 'Cidadania em Saúde Pública e Rede de Atenção Primária',
      descriptionLine1:
        'Entrega comunitária física e digital do folheto explicativo aos participantes e orientação prática sobre conferência da Caderneta de',
      descriptionLine2:
        'Vacinação, acesso ao portal Meu SUS Digital, busca de Salas de Vacina nas UBS e atendimento via Disque Saúde 136.',
      hours: '02h 00min',
    },
  ],
  issuer1: {
    name: 'EDITORA MENTE E SAÚDE',
    cnpj: '51.372.335/0001-71',
    department: 'Conselho Editorial e Extensão Científica',
    signerName: 'BÁRBARA LIMA DOS SANTOS',
    signerRole: 'Editora-Chefe e Coordenadora de Extensão Editorial',
  },
  issuer2: {
    name: 'CENTRO PROFISSIONALIZANTE MARIA DALVA DE ARAÚJO',
    cnpj: '51.269.112/0001-83',
    signerName: 'JAMES ARAÚJO DE SANTANA',
    signerRole: 'Coordenador de Extensão e Projetos Educativos',
  },
};

export interface PriorityGroupProfile {
  id: string;
  label: string;
  ageOrCriteria: string;
  clinicalRisk: string;
  vaccineRecommendation: string;
  ComplicationReduction: string;
  requiredDocs: string[];
  simultaneousVaccines: string[];
  editorialHighlight: string;
}

export const PRIORITY_GROUPS_DATA: PriorityGroupProfile[] = [
  {
    id: 'idosos',
    label: 'Idosos (60 anos ou mais)',
    ageOrCriteria: 'População com idade ≥ 60 anos (Prioridade Primária PNI)',
    clinicalRisk:
      'Maior vulnerabilidade à imunossenescência, descompensação cardiovascular, pneumonia bacteriana secundária e Síndrome Respiratória Aguda Grave (SRAG).',
    vaccineRecommendation:
      'Dose única anual da Vacina Influenza Trivalente (SUS/PNI) antes do pico sazonal de outono/inverno.',
    ComplicationReduction:
      'Redução de até 60% nas hospitalizações por pneumonia e 48% na mortalidade por complicações cardiorrespiratórias associadas ao vírus Influenza.',
    requiredDocs: [
      'Documento oficial com foto e CPF ou Cartão Nacional de Saúde (CNS)',
      'Caderneta de Vacinação do Idoso (física ou no app Meu SUS Digital)',
    ],
    simultaneousVaccines: [
      'Dupla Adulto (dT - Difteria e Tétano) a cada 10 anos',
      'Hepatite B (esquema de 3 doses se não vacinado)',
      'Reforço COVID-19 (conforme calendário semestral/anual PNI)',
      'Pneumocócica 23-valente (para acamados/institucionalizados via CRIE/SUS)',
    ],
    editorialHighlight:
      'No folheto comunitário distribuído na campanha, os idosos recebem o cartão-lembrete em fonte ampliada para conferência conjunta de Influenza, Tétano (dT) e COVID-19 na mesma visita à UBS.',
  },
  {
    id: 'gestantes',
    label: 'Gestantes e Puérperas',
    ageOrCriteria: 'Qualquer idade gestacional e puérperas até 45 dias pós-parto',
    clinicalRisk:
      'Alterações fisiológicas cardiopulmonares e imunológicas da gestação elevam o risco de formas graves de H1N1/H3N2 e parto prematuro.',
    vaccineRecommendation:
      '1 dose anual em qualquer trimestre da gestação (vacina de vírus inativado e fragmentado, 100% segura para o binômio materno-fetal).',
    ComplicationReduction:
      'Transfere anticorpos IgG via transplacentária e pelo leite materno, protegendo o recém-nascido nos primeiros 6 meses de vida (quando ainda não pode receber a vacina).',
    requiredDocs: [
      'Caderneta da Gestante ou comprovante de pré-natal / certidão de nascimento (puérperas)',
      'CPF ou Cartão SUS (CNS)',
    ],
    simultaneousVaccines: [
      'dTpa (Tríplice Bacteriana Acelular - Coqueluche, Difteria e Tétano) a partir da 20ª semana',
      'Hepatite B (caso esquema incompleto)',
      'COVID-19 (uma dose a cada gestação)',
    ],
    editorialHighlight:
      'A campanha desmistifica o receio materno e destaca o efeito "Casulo Imunológico": vacinar a mãe protege o bebê até que ele complete 6 meses.',
  },
  {
    id: 'cronicos',
    label: 'Doentes Crônicos e Comorbidades',
    ageOrCriteria: 'Diabetes Mellitus, Cardiopatias, Pneumopatias, Nefropatias e Imunossupressão',
    clinicalRisk:
      'Infecções pelo vírus Influenza desencadeiam estado pró-inflamatório sistêmico, cetoacidose diabética, infarto agudo do miocárdio e exacerbação de DPOC/asma.',
    vaccineRecommendation:
      'Dose anual obrigatória mediante apresentação de receita, laudo médico ou cadastro prévio no programa HiperDia / Atenção Primária da UBS.',
    ComplicationReduction:
      'Redução de 54% nas internações em UTI por descompensação de doença de base durante os meses de circulação viral intensa.',
    requiredDocs: [
      'Prescrição médica, relatório clínico, receita de medicação de uso contínuo ou cadastro na UBS',
      'Documento com CPF e Caderneta de Vacinação',
    ],
    simultaneousVaccines: [
      'Pneumocócica 13 e 23-valente (via Centros de Referência para Imunobiológicos Especiais - CRIE)',
      'Dupla Adulto (dT) e Hepatite B',
      'Febre Amarela (salvo imunossupressão grave)',
    ],
    editorialHighlight:
      'Para pacientes diabéticos e hipertensos, o folheto explica que a vacina da gripe atua como verdadeira proteção endotelial e cardiovascular.',
  },
  {
    id: 'criancas',
    label: 'Crianças (6 meses a < 6 anos)',
    ageOrCriteria: '6 meses a 5 anos, 11 meses e 29 dias',
    clinicalRisk:
      'Imaturidade imunológica, alta taxa de transmissão em creches/escolas e elevado risco de bronquiolite, otite média aguda e pneumonia viral/bacteriana.',
    vaccineRecommendation:
      'Primovacinação (primeira vez na vida): 2 doses com intervalo de 30 dias. Crianças já vacinadas em anos anteriores: 1 dose anual.',
    ComplicationReduction:
      'Diminuição de 74% nas admissões em unidades de terapia intensiva pediátrica por insuficiência respiratória aguda.',
    requiredDocs: [
      'Caderneta da Criança (essencial para conferência integral do PNI)',
      'CPF ou Cartão SUS da criança',
    ],
    simultaneousVaccines: [
      'Pentavalente, VIP (Poliomielite), Pneumocócica 10-valente e Meningocócica C',
      'Tríplice Viral (Sarampo, Caxumba e Rubéola) e Febre Amarela',
    ],
    editorialHighlight:
      'O guia orienta pais e responsáveis sobre a regra das 2 doses na primeira vacinação infantil contra a gripe, evitando esquemas incompletos.',
  },
  {
    id: 'trabalhadores',
    label: 'Trabalhadores da Saúde e Educação',
    ageOrCriteria: 'Médicos, enfermeiros, técnicos, ACS, recepcionistas e professores',
    clinicalRisk:
      'Exposição ocupacional diária a aerossóis e gotículas respiratórias, com risco de transmissão cruzada para pacientes vulneráveis e alunos.',
    vaccineRecommendation:
      'Dose única anual para manutenção da barreira sanitária em serviços de saúde e instituições de ensino.',
    ComplicationReduction:
      'Reduz o absenteísmo laboral em até 43% e interrompe cadeias de transmissão nosocomial e escolar.',
    requiredDocs: [
      'Carteira de conselho profissional (CRM, COREN, etc.), contracheque ou declaração de vínculo funcional',
      'CPF e Caderneta de Vacinação do Adulto',
    ],
    simultaneousVaccines: [
      'Hepatite B (3 doses + confirmação de soroconversão Anti-HBs)',
      'Tríplice Viral (SCR) e Varicela',
      'dT / dTpa para profissionais que atuam em neonatologia e obstetrícia',
    ],
    editorialHighlight:
      'Incentivo direto à biossegurança comunitária: profissionais com caderneta em dia são multiplicadores de confiança vacinal.',
  },
];

export interface LeafletPage {
  pageNumber: number;
  tag: string;
  title: string;
  subtitle: string;
  keyPoints: {
    heading: string;
    body: string;
    metric?: string;
  }[];
  footerCallout: string;
}

export const COMMUNITY_LEAFLET_PAGES: LeafletPage[] = [
  {
    pageNumber: 1,
    tag: 'CAPA & ALERTA EPIDEMIOLÓGICO',
    title: 'Gripe (Influenza) Não é Resfriado Comum: Por Que Vacinar Todos os Anos?',
    subtitle:
      'Folheto Educativo Comunitário · Programa Interinstitucional de Extensão em Saúde',
    keyPoints: [
      {
        heading: 'Mutação Viral Contínua e Atualização da Vacina',
        body: 'Os vírus Influenza A (H1N1 e H3N2) e Influenza B sofrem variações genéticas constantes. Por isso, a composição da vacina fornecida gratuitamente pelo SUS é atualizada anualmente segundo vigilância da OMS.',
        metric: '3 Cepas Atualizadas / Ano',
      },
      {
        heading: 'Prevenção de Pneumonia e Internações (SRAG)',
        body: 'Nos grupos prioritários, a gripe pode evoluir rapidamente para Síndrome Respiratória Aguda Grave (SRAG) e descompensar doenças cardíacas, renais e diabetes.',
        metric: '-60% Internações Graves',
      },
      {
        heading: 'Janela de Imunogenicidade',
        body: 'O organismo leva de 14 a 21 dias após a aplicação para atingir níveis máximos de anticorpos protetores. Vacinar no início da campanha garante proteção antes das frentes frias.',
        metric: '14 a 21 Dias p/ Pico Imune',
      },
    ],
    footerCallout:
      'Material de distribuição gratuita — Proibida a comercialização. Consulte sempre a Unidade Básica de Saúde (UBS) mais próxima.',
  },
  {
    pageNumber: 2,
    tag: 'PÁGINA INTERNA ESQUERDA · GRUPOS PRIORITÁRIOS PNI',
    title: 'Quem Deve Receber a Vacina Gratuita nas Salas de Vacina do SUS?',
    subtitle: 'Verifique se você ou seus familiares integram a lista prioritária do Ministério da Saúde',
    keyPoints: [
      {
        heading: 'Idosos (60+) e Crianças (6 meses a < 6 anos)',
        body: 'Extremos etários concentram mais de 70% das hospitalizações por complicações respiratórias da Influenza. Crianças vacinadas pela 1ª vez precisam retornar em 30 dias para a 2ª dose.',
        metric: 'Prioridade Máxima PNI',
      },
      {
        heading: 'Gestantes, Puérperas e Pessoas com Comorbidades',
        body: 'Gestantes em qualquer mês de gravidez, mães até 45 dias pós-parto e portadores de hipertensão com comorbidade, diabetes, asma, DPOC, cardiopatias ou imunossupressão.',
        metric: 'Proteção Materno-Fetal',
      },
      {
        heading: 'Trabalhadores Estratégicos e Populações Vulneráveis',
        body: 'Trabalhadores da saúde, professores, povos indígenas, quilombolas, pessoas com deficiência permanente, caminhoneiros e forças de segurança e salvamento.',
        metric: 'Barreira Comunitária',
      },
    ],
    footerCallout:
      'Dica Prática: Leve um documento com CPF e, se tiver doença crônica, apresente sua receita médica ou comprovante do HiperDia.',
  },
  {
    pageNumber: 3,
    tag: 'PÁGINA INTERNA DIREITA · COMBATE A FAKE NEWS',
    title: 'Mitos e Verdades: A Ciência Responde às Dúvidas da Comunidade',
    subtitle: 'Informação verificada pelo Conselho Editorial para combater boatos nas redes sociais',
    keyPoints: [
      {
        heading: 'MITO: "Tomei a vacina da gripe e fiquei gripado por causa dela"',
        body: 'VERDADE CIENTÍFICA: A vacina do SUS é produzida com vírus INATIVADOS (mortos e fragmentados). É biologicamente impossível que ela cause gripe. Sintomas leves pós-vacina decorrem da ativação normal do sistema imune ou de resfriados já incubados.',
        metric: 'Vírus 100% Inativado',
      },
      {
        heading: 'MITO: "Gestantes não podem tomar vacina da gripe no 1º trimestre"',
        body: 'VERDADE CIENTÍFICA: A vacina é recomendada e segura em qualquer idade gestacional, protegendo a gestante contra formas graves e transferindo anticorpos para o bebê.',
        metric: 'Segura nos 3 Trimestres',
      },
      {
        heading: 'VERDADE: "Posso tomar a vacina da Gripe no mesmo dia que outras vacinas"',
        body: 'A vacina contra Influenza pode ser administrada simultaneamente com a vacina da COVID-19, Dupla Adulto (dT) e demais imunizantes do Calendário Nacional.',
        metric: 'Coadministração Liberada',
      },
    ],
    footerCallout:
      'Não compartilhe correntes sem fonte médica oficial. Em caso de dúvida, consulte o portal gov.br/saude ou ligue 136.',
  },
  {
    pageNumber: 4,
    tag: 'VERSO DO FOLHETO · ATUALIZAÇÃO DA CADERNETA & MEU SUS DIGITAL',
    title: 'Passo a Passo para Atualizar sua Caderneta de Vacinação',
    subtitle: 'A campanha da gripe é o momento ideal para colocar todas as vacinas da família em dia',
    keyPoints: [
      {
        heading: '1. Checklist da Caderneta do Adulto e do Idoso',
        body: 'Ao comparecer à Sala de Vacina para receber a dose contra Influenza, solicite ao profissional de enfermagem que avalie sua situação para Dupla Adulto (Tétano/Difteria), Hepatite B e Febre Amarela.',
        metric: 'Revisão Multivacinação',
      },
      {
        heading: '2. Como Consultar pelo Aplicativo Meu SUS Digital',
        body: 'Baixe gratuitamente o app "Meu SUS Digital" (antigo Conecte SUS), acesse com sua conta Gov.br e toque em "Vacinas" para visualizar o histórico registrado na Rede Nacional de Dados em Saúde (RNDS).',
        metric: 'Caderneta Digital Oficial',
      },
      {
        heading: '3. O Que Fazer se Você Perdeu o Cartão de Papel?',
        body: 'Compareça à UBS onde costumava se vacinar para resgate no espelho do sistema SI-PNI / e-SUS APS. A ausência do cartão físico NÃO impede a vacinação contra a Influenza!',
        metric: 'Acesso Garantido no SUS',
      },
    ],
    footerCallout:
      'Canais Oficiais: App Meu SUS Digital · Disque Saúde 136 · Unidades Básicas de Saúde (UBS) da sua região.',
  },
];

export interface QuizQuestion {
  id: number;
  statement: string;
  correctAnswer: 'MITO' | 'VERDADE';
  clinicalExplanation: string;
  communitySurveyPercentCorrect: number;
  communityCommonDoubt: string;
  referenceSource: string;
}

export const POPULATION_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    statement:
      'A vacina contra a gripe (Influenza) do SUS contém vírus vivos enfraquecidos e, por isso, pode causar um quadro leve de gripe alguns dias após a aplicação.',
    correctAnswer: 'MITO',
    clinicalExplanation:
      'A vacina Influenza distribuída pelo PNI/SUS é composta por vírus inativados (mortos e fracionados). Ela não possui capacidade de replicação viral no organismo humano. Eventual febre baixa ou dor local nas primeiras 24–48h reflete apenas a resposta imunológica protetora.',
    communitySurveyPercentCorrect: 64,
    communityCommonDoubt:
      'Na coleta populacional (n = 486), 36% dos entrevistados ainda acreditavam que a vacina podia "dar gripe", sendo a principal causa de hesitação vacinal em idosos.',
    referenceSource: 'Nota Técnica PNI / Ministério da Saúde & SBIm',
  },
  {
    id: 2,
    statement:
      'Mesmo quem tomou a vacina da gripe no ano passado precisa se vacinar novamente na campanha atual para manter a proteção.',
    correctAnswer: 'VERDADE',
    clinicalExplanation:
      'Duas razões científicas exigem a dose anual: (1) os títulos de anticorpos declinam progressivamente após 6 a 12 meses; e (2) os vírus Influenza sofrem mutações antigênicas (drift), exigindo atualização anual das cepas H1N1, H3N2 e linhagem B.',
    communitySurveyPercentCorrect: 88,
    communityCommonDoubt:
      '88% dos participantes reconheceram a necessidade da dose anual, mas 29% desconheciam que a fórmula da vacina muda todos os anos.',
    referenceSource: 'Organização Mundial da Saúde (OMS) / Instituto Butantan',
  },
  {
    id: 3,
    statement:
      'Cidadãos que perderam a Caderneta de Vacinação física (em papel) são impedidos de receber a vacina contra a Influenza nas Unidades Básicas de Saúde.',
    correctAnswer: 'MITO',
    clinicalExplanation:
      'Nenhuma pessoa do grupo prioritário pode deixar de ser vacinada por extravio do comprovante em papel. Basta apresentar documento com CPF ou Cartão SUS (CNS); a dose é registrada eletronicamente no e-SUS APS / RNDS e um novo comprovante é emitido.',
    communitySurveyPercentCorrect: 71,
    communityCommonDoubt:
      '29% dos respondentes relataram adiar a ida ao posto por não encontrarem o cartão antigo de papel em casa.',
    referenceSource: 'Manual de Normas e Procedimentos para Vacinação — MS',
  },
  {
    id: 4,
    statement:
      'A vacina contra a Influenza pode ser administrada no mesmo dia (coadministração) que outras vacinas do Calendário Nacional, como Dupla Adulto (dT), Hepatite B e COVID-19.',
    correctAnswer: 'VERDADE',
    clinicalExplanation:
      'Não há necessidade de intervalo mínimo entre a vacina da gripe e as demais vacinas do Calendário Nacional do Adulto, Idoso ou Gestante. A oportunidade deve ser aproveitada para atualizar toda a caderneta em uma única visita à UBS.',
    communitySurveyPercentCorrect: 76,
    communityCommonDoubt:
      'Quase 1 em cada 4 participantes achava obrigatório aguardar 15 a 30 dias entre a vacina da gripe e outros imunizantes.',
    referenceSource: 'Programa Nacional de Imunizações (PNI / MS)',
  },
  {
    id: 5,
    statement:
      'Nas gestantes vacinadas durante o pré-natal, os anticorpos contra a Influenza atravessam a placenta e protegem o bebê nos primeiros meses após o nascimento.',
    correctAnswer: 'VERDADE',
    clinicalExplanation:
      'A imunização materna transfere anticorpos IgG via placentária e IgA pelo colostro/leite materno, conferindo proteção passiva fundamental ao lactente menor de 6 meses (faixa etária que ainda não pode receber diretamente a vacina).',
    communitySurveyPercentCorrect: 81,
    communityCommonDoubt:
      'Após a leitura do folheto educativo, a intenção de vacinação entre gestantes e familiares subiu para 96,4% na enquete comunitária.',
    referenceSource: 'Federação Brasileira das Associações de Ginecologia e Obstetrícia (FEBRASGO)',
  },
];

export interface BookletRecordItem {
  vaccineName: string;
  targetDisease: string;
  doseScheme: string;
  outdatedStatus: {
    label: string;
    lastDate: string;
    batch: string;
    unit: string;
    alertNote: string;
  };
  updatedStatus: {
    label: string;
    lastDate: string;
    batch: string;
    unit: string;
    validNote: string;
  };
}

export const BOOKLET_SIMULATOR_ITEMS: BookletRecordItem[] = [
  {
    vaccineName: 'Influenza Sazonal (Trivalente — Fragmentada e Inativada)',
    targetDisease: 'Gripe Sazonal (Cepas A/H1N1, A/H3N2 e Linhagem B) e SRAG',
    doseScheme: 'Dose Única Anual (Campanha Outono/Inverno)',
    outdatedStatus: {
      label: 'PENDENTE CAMPANHA 2025',
      lastDate: '18/04/2023 (Há 2 anos)',
      batch: '230048-IB',
      unit: 'UBS Parque Amazônia - Goiânia/GO',
      alertNote:
        'Atenção: Sem registro da dose de 2024/2025. Imunidade reduzida frente às novas cepas circulantes.',
    },
    updatedStatus: {
      label: 'EM DIA · IMUNIZADO 2025',
      lastDate: '14/05/2025 (Campanha Atual)',
      batch: '250119-BUT',
      unit: 'Sala de Vacina UBS Setor Sul - Goiânia/GO',
      validNote:
        'Registro sincronizado na RNDS / Meu SUS Digital. Proteção ativa para a sazonalidade 2025.',
    },
  },
  {
    vaccineName: 'Dupla Adulto (dT — Difteria e Tétano)',
    targetDisease: 'Tétano Acidental e Difteria',
    doseScheme: 'Esquema de 3 doses + Reforço a cada 10 anos',
    outdatedStatus: {
      label: 'REFORÇO VENCIDO (> 10 ANOS)',
      lastDate: '10/08/2013',
      batch: '130912-FIOCRUZ',
      unit: 'Cais Campinas - Goiânia/GO',
      alertNote:
        'Último reforço aplicado há mais de 10 anos. Aproveite a ida para a vacina da gripe para atualizar a dT.',
    },
    updatedStatus: {
      label: 'ATUALIZADA NA MESMA VISITA',
      lastDate: '14/05/2025 (Reforço Decenal)',
      batch: '250084-FUNED',
      unit: 'Sala de Vacina UBS Setor Sul - Goiânia/GO',
      validNote:
        'Coadministrada junto à vacina Influenza. Próximo reforço programado somente para 05/2035.',
    },
  },
  {
    vaccineName: 'Hepatite B Recombinante',
    targetDisease: 'Infecção pelo Vírus da Hepatite B (HBV)',
    doseScheme: 'Esquema Completo: 3 Doses (0, 1 e 6 meses)',
    outdatedStatus: {
      label: 'ESQUEMA INCOMPLETO (2/3 DOSES)',
      lastDate: '22/11/2019 (2ª Dose)',
      batch: '190441-BUT',
      unit: 'UBS Jardim América - Goiânia/GO',
      alertNote:
        'Falta a 3ª dose para consolidar a soroconversão definitiva. Não é necessário reiniciar o esquema.',
    },
    updatedStatus: {
      label: 'ESQUEMA COMPLETO (3/3 DOSES)',
      lastDate: '14/05/2025 (3ª Dose Completada)',
      batch: '250302-BUT',
      unit: 'Sala de Vacina UBS Setor Sul - Goiânia/GO',
      validNote:
        'Esquema de 3 doses concluído com sucesso durante a ação de atualização da caderneta.',
    },
  },
  {
    vaccineName: 'Febre Amarela (Atenuada)',
    targetDisease: 'Febre Amarela Silvestre e Urbana',
    doseScheme: 'Dose Única ao longo da vida (conforme diretriz PNI/MS)',
    outdatedStatus: {
      label: 'COMPROVANTE FÍSICO EXTRAVIADO',
      lastDate: 'Sem anotação no cartão novo',
      batch: 'Consultando SI-PNI...',
      unit: 'Pendente de transcrição',
      alertNote:
        'Comum em adultos: dose tomada na infância/juventude mas não transcrita para a nova caderneta.',
    },
    updatedStatus: {
      label: 'RESGATADO NO MEU SUS DIGITAL',
      lastDate: '09/02/2018 (Dose Única PNI)',
      batch: '180211-BIOMANG',
      unit: 'Transcrição Oficial RNDS / SI-PNI',
      validNote:
        'Histórico eletrônico recuperado no sistema do SUS e averbado na caderneta atualizada.',
    },
  },
];
