import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus, Check, Users, Loader2 } from 'lucide-react';
import { connectionService } from '@/services/connection.service';
import { toast } from 'sonner';

interface ConnectButtonProps {
    recipientId: number;
    initialStatus?: 'CONNECTED' | 'PENDING' | 'REJECTED' | 'NONE';
    onStatusChange?: (newStatus: string) => void;
    className?: string;
}

export const ConnectButton = ({
    recipientId,
    initialStatus = 'NONE',
    onStatusChange,
    className
}: ConnectButtonProps) => {
    const [status, setStatus] = useState(initialStatus);
    const [loading, setLoading] = useState(false);

    const handleConnect = async () => {
        try {
            setLoading(true);
            await connectionService.sendRequest(recipientId);
            setStatus('PENDING');
            onStatusChange?.('PENDING');
            toast.success('Connection request sent!');
        } catch (error: any) {
            console.error('Error sending connection request:', error);
            toast.error(error.message || 'Failed to send request');
        } finally {
            setLoading(false);
        }
    };

    if (status === 'CONNECTED') {
        return (
            <Button disabled className={className} variant="secondary">
                <Check className="h-4 w-4 mr-2" /> Connected
            </Button>
        );
    }

    if (status === 'PENDING') {
        return (
            <Button disabled className={className} variant="outline">
                <Users className="h-4 w-4 mr-2" /> Request Sent
            </Button>
        );
    }

    return (
        <Button
            onClick={handleConnect}
            disabled={loading}
            className={className}
        >
            {loading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
                <UserPlus className="h-4 w-4 mr-2" />
            )}
            Connect
        </Button>
    );
};
