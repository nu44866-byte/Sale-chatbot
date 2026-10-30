import { ChatbotConfig, CrawledWebsite, AnalyticsMetric, ConversationLog, ThemeColor } from '../types.ts';

export const initialChatbotConfig: ChatbotConfig = {
  name: 'Sitewise Assistant',
  welcomeMessage: "Hi! I'm Sitewise Assistant. Ask me anything about this website.",
  suggestedQuestions: [
    'What services do you offer?',
    'How can I get started?',
    'Do you have a pricing page?',
  ],
  themeColor: 'indigo',
  chatPosition: 'Bottom Right',
  avatarIcon: 'message-square',
  leadCaptureEnabled: true,
  systemPrompt: 'You are Sitewise Assistant, an intelligent customer support agent representing the website. Provide friendly, accurate, and concise answers based strictly on the indexed content.',
  temperature: 0.3,
};

export const initialWebsites: CrawledWebsite[] = [
  {
    id: 'site-1',
    url: 'https://www.example.com',
    title: 'AcmeCorp - Modern Solutions for Your Business',
    status: 'indexed',
    pagesCrawled: 1,
    contentChunks: 42,
    lastIndexed: 'Just now',
    size: '148 KB',
    sampleSnippets: [
      'AcmeCorp provides custom web development, scalable cloud solutions, and enterprise AI integrations.',
      'Our team specializes in full-stack modernization, microservices architecture, and dedicated client engineering.',
      'Get started by scheduling an intro consultation or explore our flexible monthly retainers.',
      'All enterprise projects include guaranteed SLAs, SOC2 compliance, and 24/7 dedicated engineering support.',
    ],
  },
  {
    id: 'site-2',
    url: 'https://docs.acmecorp.io',
    title: 'Acme Developer Documentation & API',
    status: 'indexed',
    pagesCrawled: 14,
    contentChunks: 218,
    lastIndexed: '2 days ago',
    size: '890 KB',
    sampleSnippets: [
      'SDK setup guides for Node.js, Python, and Go.',
      'Authentication via API Bearer tokens with rate limiting rules.',
    ],
  },
  {
    id: 'site-3',
    url: 'https://blog.acmecorp.io',
    title: 'AcmeCorp Engineering & Product Insights',
    status: 'indexed',
    pagesCrawled: 8,
    contentChunks: 96,
    lastIndexed: '5 days ago',
    size: '420 KB',
    sampleSnippets: [
      'How we scaled vector search across 10M documents in production.',
      'Design systems that scale with engineering teams.',
    ],
  },
];

export const initialAnalytics: AnalyticsMetric = {
  totalConversations: 1428,
  totalMessages: 6842,
  resolutionRate: 94.2,
  avgResponseTime: '420ms',
  leadsCollected: 264,
  satisfactionRate: 98.4,
};

export const initialConversations: ConversationLog[] = [
  {
    id: 'conv-101',
    user: 'Visitor #4829 (San Francisco, CA)',
    startedAt: '12 minutes ago',
    messagesCount: 4,
    sentiment: 'positive',
    resolved: true,
    topics: ['Services', 'AI Integration'],
    snippet: 'Interested in your enterprise AI integration and migration timeline.',
    history: [
      { id: '1', sender: 'bot', text: "Hi! I'm Sitewise Assistant. Ask me anything about this website.", time: '10:14 AM' },
      { id: '2', sender: 'user', text: 'What services do you offer?', time: '10:14 AM' },
      { id: '3', sender: 'bot', text: 'AcmeCorp offers three primary services:\n1. Web Development: Custom responsive websites and high-performance web applications.\n2. Cloud Solutions: Scalable, secure multi-region cloud infrastructure.\n3. AI Integration: Custom chatbot builders, vector embeddings, and workflow automation.', time: '10:15 AM' },
      { id: '4', sender: 'user', text: 'Can we schedule a demo call?', time: '10:16 AM' },
      { id: '5', sender: 'bot', text: 'Certainly! You can click "Get Started" on the homepage or reach our sales team at sales@acmecorp.com to lock in a discovery slot.', time: '10:16 AM' },
    ],
  },
  {
    id: 'conv-102',
    user: 'Visitor #4828 (London, UK)',
    startedAt: '43 minutes ago',
    messagesCount: 3,
    sentiment: 'positive',
    resolved: true,
    topics: ['Pricing', 'Retainers'],
    snippet: 'Do you offer custom pricing for early-stage startups?',
    history: [
      { id: '1', sender: 'bot', text: "Hi! I'm Sitewise Assistant. Ask me anything about this website.", time: '9:45 AM' },
      { id: '2', sender: 'user', text: 'Do you have a pricing page?', time: '9:45 AM' },
      { id: '3', sender: 'bot', text: 'Yes, our pricing packages start from $2,500/mo for growing startups, up to custom enterprise tiers with dedicated SLAs. Would you like me to share our service breakdown?', time: '9:46 AM' },
    ],
  },
  {
    id: 'conv-103',
    user: 'Visitor #4827 (Berlin, DE)',
    startedAt: '2 hours ago',
    messagesCount: 2,
    sentiment: 'neutral',
    resolved: true,
    topics: ['Onboarding', 'Getting Started'],
    snippet: 'How can I get started with your web development team?',
    history: [
      { id: '1', sender: 'bot', text: "Hi! I'm Sitewise Assistant. Ask me anything about this website.", time: '8:20 AM' },
      { id: '2', sender: 'user', text: 'How can I get started?', time: '8:20 AM' },
      { id: '3', sender: 'bot', text: 'Getting started is straightforward: click "Get Started" on the top right or schedule a 15-minute scoping call with our lead architect.', time: '8:21 AM' },
    ],
  },
];

export const themeColorMap: Record<ThemeColor, {
  name: string;
  primary: string;
  primaryHover: string;
  lightBg: string;
  border: string;
  text: string;
  gradient: string;
  hex: string;
}> = {
  indigo: {
    name: 'Purple / Indigo',
    primary: 'bg-[#5b50e6]',
    primaryHover: 'hover:bg-[#4d42d4]',
    lightBg: 'bg-[#5b50e6]/10',
    border: 'border-[#5b50e6]',
    text: 'text-[#5b50e6]',
    gradient: 'from-[#5b50e6] to-[#7c6ff6]',
    hex: '#5b50e6',
  },
  blue: {
    name: 'Sky Blue',
    primary: 'bg-[#0284c7]',
    primaryHover: 'hover:bg-[#0369a1]',
    lightBg: 'bg-[#0284c7]/10',
    border: 'border-[#0284c7]',
    text: 'text-[#0284c7]',
    gradient: 'from-[#0284c7] to-[#38bdf8]',
    hex: '#0284c7',
  },
  emerald: {
    name: 'Emerald Green',
    primary: 'bg-[#10b981]',
    primaryHover: 'hover:bg-[#059669]',
    lightBg: 'bg-[#10b981]/10',
    border: 'border-[#10b981]',
    text: 'text-[#10b981]',
    gradient: 'from-[#10b981] to-[#34d399]',
    hex: '#10b981',
  },
  orange: {
    name: 'Amber Orange',
    primary: 'bg-[#f97316]',
    primaryHover: 'hover:bg-[#ea580c]',
    lightBg: 'bg-[#f97316]/10',
    border: 'border-[#f97316]',
    text: 'text-[#f97316]',
    gradient: 'from-[#f97316] to-[#fb923c]',
    hex: '#f97316',
  },
  pink: {
    name: 'Rose Pink',
    primary: 'bg-[#ec4899]',
    primaryHover: 'hover:bg-[#db2777]',
    lightBg: 'bg-[#ec4899]/10',
    border: 'border-[#ec4899]',
    text: 'text-[#ec4899]',
    gradient: 'from-[#ec4899] to-[#f472b6]',
    hex: '#ec4899',
  },
};

export const initialSalesRecords: import('../types.ts').AdminSaleRecord[] = [
  {
    id: 'sale-901',
    clientName: 'Tariq Mehmood',
    clientEmail: 'tariq@karachitech.pk',
    domain: 'https://karachitech.pk',
    licenseKey: 'SW-PRO-8910-KHI-2026',
    plan: 'pro',
    price: 49,
    paymentMethod: 'jazzcash',
    status: 'active',
    createdAt: 'Today, 2:15 PM',
    totalChatsServed: 842,
  },
  {
    id: 'sale-902',
    clientName: 'Dr. Sarah Bilal',
    clientEmail: 'sarah@moderndental.com',
    domain: 'https://moderndental.com',
    licenseKey: 'SW-PRO-4821-LHR-2026',
    plan: 'pro',
    price: 49,
    paymentMethod: 'easypaisa',
    status: 'active',
    createdAt: 'Yesterday',
    totalChatsServed: 1240,
  },
  {
    id: 'sale-903',
    clientName: 'Marcus Sterling',
    clientEmail: 'marcus@apexdigital.co.uk',
    domain: 'https://apexdigital.co.uk',
    licenseKey: 'SW-AGENCY-9921-LDN-2026',
    plan: 'agency',
    price: 99,
    paymentMethod: 'card',
    status: 'active',
    createdAt: '3 days ago',
    totalChatsServed: 4320,
  },
  {
    id: 'sale-904',
    clientName: 'Hamza Farooq',
    clientEmail: 'hamza@lahorerealestate.pk',
    domain: 'https://lahorerealestate.pk',
    licenseKey: 'SW-STARTER-1290-LHR-2026',
    plan: 'starter',
    price: 29,
    paymentMethod: 'jazzcash',
    status: 'active',
    createdAt: '5 days ago',
    totalChatsServed: 310,
  },
  {
    id: 'sale-905',
    clientName: 'Rashid Al-Maktoum',
    clientEmail: 'rashid@dubailuxurytours.ae',
    domain: 'https://dubailuxurytours.ae',
    licenseKey: 'SW-PRO-7731-DXB-2026',
    plan: 'pro',
    price: 49,
    paymentMethod: 'paypal',
    status: 'active',
    createdAt: '6 days ago',
    totalChatsServed: 2180,
  },
  {
    id: 'sale-906',
    clientName: 'Elena Rostova',
    clientEmail: 'elena@nordicstyle.se',
    domain: 'https://nordicstyle.se',
    licenseKey: 'SW-STARTER-3310-STO-2026',
    plan: 'starter',
    price: 29,
    paymentMethod: 'card',
    status: 'suspended',
    createdAt: '12 days ago',
    totalChatsServed: 180,
  },
];

export const initialPromoCodes: import('../types.ts').PromoCode[] = [
  {
    id: 'promo-1',
    code: 'SITEWISE50',
    discountPercent: 50,
    usesCount: 42,
    maxUses: 100,
    active: true,
  },
  {
    id: 'promo-2',
    code: 'LAUNCH20',
    discountPercent: 20,
    usesCount: 18,
    maxUses: 50,
    active: true,
  },
  {
    id: 'promo-3',
    code: 'RAMADAN30',
    discountPercent: 30,
    usesCount: 8,
    maxUses: 200,
    active: true,
  },
];

export const initialPaymentGateways: import('../types.ts').PaymentGatewayConfig = {
  jazzcash: {
    enabled: true,
    merchantId: 'MC-894218',
    mobileNumber: '0300-8842109',
  },
  easypaisa: {
    enabled: true,
    storeId: 'EP-44219',
    mobileNumber: '0345-9921400',
  },
  stripe: {
    enabled: true,
    publishableKey: 'pk_live_51M08927492817491',
  },
  paypal: {
    enabled: true,
    email: 'payments@sitewise.ai',
  },
};
