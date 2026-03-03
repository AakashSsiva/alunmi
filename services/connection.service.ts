import { apiFetch } from '@/lib/utils';

export interface Alumni {
    id: number;
    name: string;
    email: string;
    profileImage: string;
    graduationYear?: number;
    bio?: string;
    connectionStatus?: 'CONNECTED' | 'PENDING' | 'REJECTED' | 'NONE';
}

export interface ConnectionRequest {
    id: number;
    senderId: number;
    sender: {
        id: number;
        name: string;
        email: string;
        profileImage: string;
        graduationYear?: number;
    };
    createdAt: string;
}

class ConnectionService {
    async sendRequest(recipientId: number) {
        return await apiFetch('/api/connections/request', {
            method: 'POST',
            body: JSON.stringify({ recipientId }),
        });
    }

    async acceptRequest(requestId: number) {
        return await apiFetch(`/api/connections/accept/${requestId}`, {
            method: 'POST',
        });
    }

    async rejectRequest(requestId: number) {
        return await apiFetch(`/api/connections/reject/${requestId}`, {
            method: 'POST',
        });
    }

    async getConnections(): Promise<any[]> {
        return await apiFetch('/api/connections');
    }

    async getPendingRequests(): Promise<ConnectionRequest[]> {
        return await apiFetch('/api/connections/pending');
    }

    async removeConnection(id: number) {
        return await apiFetch(`/api/connections/${id}`, {
            method: 'DELETE',
        });
    }
}

export const connectionService = new ConnectionService();
