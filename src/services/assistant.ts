import type { ServiceStatus } from '@/types';

export const ASSISTANT_STATUS: ServiceStatus = 'not-connected';

export type AssistantMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
};

export function createMessage(role: AssistantMessage['role'], text: string): AssistantMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    text,
  };
}
