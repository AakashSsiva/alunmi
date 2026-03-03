import { apiFetch } from '@/lib/utils';

export interface OverviewStats {
    totalAlumni: number;
    activeUsers: number;
    pendingPosts: number;
    approvedPosts: number;
}

export interface GrowthData {
    month: string;
    count: number;
}

export interface PostStats {
    growth: GrowthData[];
    distribution: { status: string; count: number }[];
}

export interface ConnectionStats {
    growth: GrowthData[];
    distribution: { status: string; count: number }[];
}

export interface MessageStats {
    date: string;
    count: number;
}

export const analyticsService = {
    getOverview: (): Promise<OverviewStats> =>
        apiFetch('/api/admin/analytics/overview'),

    getUserGrowth: (): Promise<GrowthData[]> =>
        apiFetch('/api/admin/analytics/users'),

    getPostStats: (): Promise<PostStats> =>
        apiFetch('/api/admin/analytics/posts'),

    getConnectionStats: (): Promise<ConnectionStats> =>
        apiFetch('/api/admin/analytics/connections'),

    getMessageStats: (): Promise<MessageStats[]> =>
        apiFetch('/api/admin/analytics/messages'),
};
