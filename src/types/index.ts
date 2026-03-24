export type Language = 'ru' | 'en';
export type ThemeMode = 'dark' | 'light' | 'system';

export type EventStatus = 'live' | 'upcoming' | 'ended';
export type EventCategory = 'sports' | 'music' | 'esports' | 'show' | 'creator';
export type SupportAmount = number;
export type MomentIntensity = 'low' | 'medium' | 'high';
export type LiveMomentType =
  | 'knockdown'
  | 'heavy_strike'
  | 'takedown'
  | 'submission_attempt'
  | 'round_end'
  | 'support_surge';

export interface EventParticipant {
  id: string;
  name: string;
  nameRu: string;
  shortName: string;
  shortNameRu: string;
  teamLabel: string;
  teamLabelRu: string;
  supportTotal: number;
  supporters: number;
}

export interface EventRecord {
  id: string;
  slug: string;
  title: string;
  titleRu: string;
  headline: string;
  headlineRu: string;
  category: EventCategory;
  categoryLabel: string;
  categoryLabelRu: string;
  venue: string;
  venueRu: string;
  startsAt: string;
  status: EventStatus;
  stageLabel?: string;
  stageLabelRu?: string;
  timerLabel?: string;
  participants: EventParticipant[];
}

export interface LiveMoment {
  id: string;
  type: LiveMomentType;
  participant?: string;
  participantRu?: string;
  label: string;
  labelRu: string;
  intensity: MomentIntensity;
  reactionCount: number;
  createdAt: string;
}

export interface LiveActivityItem {
  id: string;
  type: 'support' | 'big_support' | 'leader_change' | 'moment';
  label: string;
  labelRu: string;
  amount?: number;
  createdAt: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  nameRu: string;
  points: number;
  streak: number;
}

export interface RoomPreview {
  id: string;
  name: string;
  nameRu: string;
  members: number;
  eventTitle: string;
  eventTitleRu: string;
}

export interface UserProfile {
  id: string;
  displayName: string;
  displayNameRu: string;
  xp: number;
  points: number;
  streak: number;
  selectedParticipantId: string;
  selectedParticipant: string;
  selectedParticipantRu: string;
  totalSupport: number;
  currentRank: number;
  walletBalance: number;
  currentLiveEventId: string;
  lastSupportAmount: SupportAmount;
}

export interface ProfileSupportHistoryItem {
  id: string;
  eventTitle: string;
  eventTitleRu: string;
  participant: string;
  participantRu: string;
  amount: number;
  createdAt: string;
}

export interface SportEventParticipant {
  id: string;
  name: string;
  nameRu: string;
  country?: string;
  logoSrc?: string;
  photoSrc?: string;
}

export interface SportEventRecord {
  id: string;
  sportId: string;
  title: string;
  titleRu: string;
  detailPath?: string;
  startsAt: string;
  endsAt: string;
  displayDateEn?: string;
  displayDateRu?: string;
  displayTimeEn?: string;
  displayTimeRu?: string;
  participants: SportEventParticipant[];
}

export interface AppMockData {
  featuredEvent: EventRecord;
  events: EventRecord[];
  moments: LiveMoment[];
  liveActivity: LiveActivityItem[];
  leaderboard: LeaderboardEntry[];
  rooms: RoomPreview[];
  profile: UserProfile;
  profileSupportHistory: ProfileSupportHistoryItem[];
  supportAmounts: SupportAmount[];
}
