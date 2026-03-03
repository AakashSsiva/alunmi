import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, Loader2 } from 'lucide-react';
import { ConnectionRequest, connectionService } from '@/services/connection.service';
import { useState } from 'react';
import { toast } from 'sonner';

interface PendingRequestsProps {
    requests: ConnectionRequest[];
    onActionComplete: () => void;
}

export const PendingRequests = ({ requests, onActionComplete }: PendingRequestsProps) => {
    const [processingId, setProcessingId] = useState<number | null>(null);

    const handleAction = async (requestId: number, action: 'accept' | 'reject') => {
        try {
            setProcessingId(requestId);
            if (action === 'accept') {
                await connectionService.acceptRequest(requestId);
                toast.success('Connection request accepted!');
            } else {
                await connectionService.rejectRequest(requestId);
                toast.success('Connection request rejected');
            }
            onActionComplete();
        } catch (error: any) {
            console.error(`Error ${action}ing request:`, error);
            toast.error(error.message || `Failed to ${action} request`);
        } finally {
            setProcessingId(null);
        }
    };

    if (requests.length === 0) {
        return (
            <Card>
                <CardContent className="pt-6 text-center py-12">
                    <p className="text-muted-foreground">No pending requests</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            {requests.map((req) => (
                <Card key={req.id}>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 flex-1">
                                <img
                                    src={req.sender.profileImage || 'https://via.placeholder.com/60'}
                                    alt={req.sender.name}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="font-bold">{req.sender.name}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Class of {req.sender.graduationYear || 'N/A'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={() => handleAction(req.id, 'accept')}
                                    disabled={processingId === req.id}
                                >
                                    {processingId === req.id ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Check className="h-4 w-4" />
                                    )}
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleAction(req.id, 'reject')}
                                    disabled={processingId === req.id}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};
