import type { ServiceStatus } from '@/types';

export type EvidenceKind = 'photo' | 'screenshot' | 'document' | 'audio' | 'note';

export type EvidenceItem = {
  id: string;
  kind: EvidenceKind;
  createdAt: string;
  title: string;
};

export interface EvidenceStorage {
  list(): Promise<EvidenceItem[]>;
  add(item: EvidenceItem): Promise<void>;
  remove(id: string): Promise<void>;
}

export const EVIDENCE_STORAGE_STATUS: ServiceStatus = 'not-implemented';
export const EVIDENCE_BACKUP_STATUS: ServiceStatus = 'planned';

export const EVIDENCE_KINDS: EvidenceKind[] = [
  'photo',
  'screenshot',
  'document',
  'audio',
  'note',
];
