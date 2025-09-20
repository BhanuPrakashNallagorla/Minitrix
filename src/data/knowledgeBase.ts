// Knowledge base extracted from Minitrix website content
export interface KnowledgeChunk {
  id: string;
  content: string;
  category: string;
  keywords: string[];
}

export const knowledgeBase: KnowledgeChunk[] = [
  {
    id: "company-overview",
    content: "Minitrix specializes in building custom, on-premise Small Language Models (SLMs) that deliver unparalleled accuracy, speed, and security, fine-tuned on your unique enterprise data. We transform AI from a recurring expense into a strategic competitive advantage.",
    category: "about",
    keywords: ["minitrix", "company", "small language models", "slm", "custom ai", "enterprise"]
  },
  {
    id: "slm-vs-llm",
    content: "Small Language Models (SLMs) are specialized, efficient AI models that deliver 90-98% accuracy on specialized tasks versus 60-70% from generic LLMs. SLMs provide 80% lower operational costs, 3x faster response times, and complete data privacy through on-premise deployment.",
    category: "technology",
    keywords: ["slm", "llm", "small language models", "accuracy", "performance", "cost savings"]
  },
  {
    id: "services-overview",
    content: "We offer custom SLM development, industry-specific model training, scalable on-premise architecture deployment, custom training pipelines, and integration-ready APIs & SDKs. Our models are built for healthcare, financial services, and legal tech industries.",
    category: "services",
    keywords: ["services", "custom development", "training", "deployment", "apis", "healthcare", "finance", "legal"]
  },
  {
    id: "key-benefits",
    content: "Our SLMs provide: 60-80% reduction in AI operational expenses, complete data sovereignty with on-premise deployment, 3x faster inference times, 90-98% accuracy on specialized tasks, zero usage fees after deployment, and seamless migration from LLM providers in 48 hours.",
    category: "benefits",
    keywords: ["cost savings", "data privacy", "performance", "accuracy", "migration", "benefits"]
  },
  {
    id: "healthcare-solutions",
    content: "HIPAA-compliant models for clinical decision support, medical record analysis, and patient communication. Our healthcare SLMs understand medical terminology, drug interactions, and treatment protocols while maintaining the highest security standards for patient data.",
    category: "industries",
    keywords: ["healthcare", "hipaa", "clinical", "medical", "patient data", "compliance"]
  },
  {
    id: "financial-services",
    content: "Regulatory-compliant models for risk assessment, fraud detection, and customer service. Our financial SLMs are trained on market data, regulatory requirements, and industry best practices to deliver accurate, compliant results for mission-critical applications.",
    category: "industries",
    keywords: ["finance", "risk assessment", "fraud detection", "regulatory", "compliance", "banking"]
  },
  {
    id: "legal-tech",
    content: "Specialized models for contract analysis, legal research, and document review. Our legal SLMs understand complex legal language, precedents, and jurisdictional differences to accelerate legal workflows while maintaining attorney-client privilege.",
    category: "industries",
    keywords: ["legal", "contract analysis", "legal research", "document review", "attorney-client privilege"]
  },
  {
    id: "process-overview",
    content: "Our process includes: 1) Discovery & Data Strategy - analyzing use cases and compliance requirements, 2) Model Development & Fine-Tuning using proprietary data, 3) Secure Deployment & Integration on chosen infrastructure, 4) Ongoing Support & Optimization with continuous monitoring and updates.",
    category: "process",
    keywords: ["process", "development", "deployment", "support", "methodology"]
  },
  {
    id: "pricing-model",
    content: "We focus on Total Cost of Ownership (TCO) rather than upfront costs. Our models eliminate expensive API calls and reduce infrastructure costs by 80% compared to LLM subscriptions. Each project receives a custom quote based on specific requirements and expected ROI.",
    category: "pricing",
    keywords: ["pricing", "tco", "total cost of ownership", "custom quote", "roi", "cost reduction"]
  },
  {
    id: "client-testimonials",
    content: "Sarah Chen, CTO at TechFlow Dynamics: 'Minitrix transformed our AI strategy completely. We reduced operational costs by 75% while maintaining quality results.' Michael Rodriguez, Head of AI at SecureData Corp: 'The customization and data security is unmatched. Complete control over sensitive data with enterprise-grade performance.'",
    category: "testimonials",
    keywords: ["testimonials", "client success", "cost reduction", "data security", "performance"]
  },
  {
    id: "competitive-advantages",
    content: "Unlike generic LLM APIs that create unpredictable, exponentially growing expenses, our SLMs provide: predictable costs, superior accuracy on specialized tasks, complete data control, no vendor lock-in, and the ability to customize for specific business needs.",
    category: "advantages",
    keywords: ["competitive advantage", "predictable costs", "data control", "customization", "vendor lock-in"]
  }
];

// Simple keyword matching for RAG retrieval
export function retrieveRelevantChunks(query: string, maxChunks: number = 3): KnowledgeChunk[] {
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(' ').filter(word => word.length > 2);
  
  const scoredChunks = knowledgeBase.map(chunk => {
    let score = 0;
    
    // Score based on keyword matches
    chunk.keywords.forEach(keyword => {
      if (queryWords.some(word => keyword.includes(word) || word.includes(keyword))) {
        score += 2;
      }
    });
    
    // Score based on content matches
    queryWords.forEach(word => {
      if (chunk.content.toLowerCase().includes(word)) {
        score += 1;
      }
    });
    
    return { chunk, score };
  });
  
  return scoredChunks
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxChunks)
    .map(item => item.chunk);
}

// Generate response based on retrieved chunks
export function generateResponse(query: string, relevantChunks: KnowledgeChunk[]): string {
  if (relevantChunks.length === 0) {
    return "That's a great question that would be best answered by one of our AI strategists. Would you like me to connect you with someone from our team?";
  }
  
  // Combine relevant information for potential future use
  // const context = relevantChunks.map(chunk => chunk.content).join(' ');
  
  // Simple response generation based on query type
  const queryLower = query.toLowerCase();
  
  if (queryLower.includes('what is') && queryLower.includes('slm')) {
    return "Small Language Models (SLMs) are specialized, efficient AI models that we build custom for your business. Unlike generic LLMs, our SLMs deliver 90-98% accuracy on your specific tasks while reducing costs by 80% and providing 3x faster response times. They're deployed on your infrastructure for complete data privacy.";
  }
  
  if (queryLower.includes('service') || queryLower.includes('offer')) {
    return "We offer comprehensive SLM solutions including custom model development, industry-specific training, on-premise deployment, and ongoing support. Our services span healthcare (HIPAA-compliant), financial services (regulatory-compliant), and legal tech sectors. Each solution is tailored to your specific use cases and compliance requirements.";
  }
  
  if (queryLower.includes('cost') || queryLower.includes('price') || queryLower.includes('pricing')) {
    return "We focus on Total Cost of Ownership (TCO) rather than upfront costs. Our SLMs eliminate expensive API calls and reduce operational costs by 60-80% compared to LLM subscriptions. Each project receives a custom quote based on your specific requirements and expected ROI. Would you like to discuss your specific needs?";
  }
  
  if (queryLower.includes('process') || queryLower.includes('how') && queryLower.includes('work')) {
    return "Our process has 4 key phases: 1) Discovery & Data Strategy - we analyze your use cases and requirements, 2) Model Development & Fine-Tuning using your data, 3) Secure Deployment & Integration on your infrastructure, 4) Ongoing Support & Optimization. The entire process typically takes 4-8 weeks depending on complexity.";
  }
  
  if (queryLower.includes('industry') || queryLower.includes('healthcare') || queryLower.includes('finance') || queryLower.includes('legal')) {
    return "We specialize in three key industries: Healthcare (HIPAA-compliant models for clinical decisions), Financial Services (regulatory-compliant for risk assessment and fraud detection), and Legal Tech (contract analysis and document review). Each solution maintains industry-specific compliance and security standards.";
  }
  
  // Default response using first relevant chunk
  return relevantChunks[0].content + " Would you like to know more about any specific aspect?";
}
