export type TabType = 'dashboard' | 'websites' | 'chatbot-settings' | 'install-widget' | 'analytics';

export type AppRole = 'client' | 'admin';

export type AdminTabType = 'sales-licenses' | 'bot-fleet' | 'pricing-promos' | 'payment-gateways';

export type ThemeColor = 'indigo' | 'blue' | 'emerald' | 'orange' | 'pink';

export type ChatPosition = 'Bottom Right' | 'Bottom Left';

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export interface ChatbotConfig {
  name: string;
  welcomeMessage: string;
  suggestedQuestions: string[];
  themeColor: ThemeColor;
  chatPosition: ChatPosition;
  avatarIcon: string;
  leadCaptureEnabled: boolean;
  systemPrompt: string;
  temperature: number;
}

export interface CrawledWebsite {
  id: string;
  url: string;
  title: string;
  status: 'indexed' | 'indexing' | 'failed';
  pagesCrawled: number;
  contentChunks: number;
  lastIndexed: string;
  size: string;
  sampleSnippets: string[];
}

export interface AnalyticsMetric {
  totalConversations: number;
  totalMessages: number;
  resolutionRate: number;
  avgResponseTime: string;
  leadsCollected: number;
  satisfactionRate: number;
}

export interface BotLicense {
  isPurchased: boolean;
  licenseKey: string;
  plan: 'starter' | 'pro' | 'agency';
  buyerName: string;
  buyerEmail: string;
  targetDomain: string;
  amountPaid: number;
  purchaseDate: string;
  paymentMethod: 'card' | 'jazzcash' | 'easypaisa' | 'paypal';
}

export interface ConversationLog {
  id: string;
  user: string;
  startedAt: string;
  messagesCount: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  resolved: boolean;
  topics: string[];
  snippet: string;
  history: ChatMessage[];
}

export interface AdminSaleRecord {
  id: string;
  clientName: string;
  clientEmail: string;
  domain: string;
  licenseKey: string;
  plan: 'starter' | 'pro' | 'agency';
  price: number;
  paymentMethod: 'card' | 'jazzcash' | 'easypaisa' | 'paypal';
  status: 'active' | 'suspended' | 'refunded';
  createdAt: string;
  totalChatsServed: number;
}

export interface PromoCode {
  id: string;
  code: string;
  discountPercent: number;
  usesCount: number;
  maxUses: number;
  active: boolean;
}

export interface PaymentGatewayConfig {
  jazzcash: {
    enabled: boolean;
    merchantId: string;
    mobileNumber: string;
  };
  easypaisa: {
    enabled: boolean;
    storeId: string;
    mobileNumber: string;
  };
  stripe: {
    enabled: boolean;
    publishableKey: string;
  };
  paypal: {
    enabled: boolean;
    email: string;
  };
}
