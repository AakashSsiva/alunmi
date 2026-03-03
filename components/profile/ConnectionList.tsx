import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Alumni } from '@/services/connection.service';
import { Link } from 'react-router-dom';

interface ConnectionListProps {
    connections: any[];
    currentUserId?: number;
}

export const ConnectionList = ({ connections, currentUserId }: ConnectionListProps) => {
    if (connections.length === 0) {
        return (
            <Card>
                <CardContent className="pt-6 text-center py-12">
                    <p className="text-muted-foreground">No connections yet</p>
                </CardContent>
            </Card>
        );
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {connections.map((conn) => {
                // Find the other person in the connection
                const otherPerson = conn.senderId === currentUserId ? conn.receiver : conn.sender;

                return (
                    <motion.div key={conn.id} variants={itemVariants}>
                        <Card className="hover:shadow-lg transition-shadow h-full">
                            <CardContent className="pt-6 h-full flex flex-col">
                                <div className="flex flex-col items-center text-center flex-1">
                                    <img
                                        src={otherPerson.profileImage || 'https://via.placeholder.com/80'}
                                        alt={otherPerson.name}
                                        className="w-20 h-20 rounded-full object-cover mb-3"
                                    />
                                    <h3 className="font-bold text-lg">{otherPerson.name}</h3>
                                    <Badge className="mt-2" variant="secondary">
                                        Class of {otherPerson.graduationYear || 'N/A'}
                                    </Badge>
                                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                        {otherPerson.bio || 'No bio'}
                                    </p>

                                    <div className="mt-auto pt-4 w-full space-y-2">
                                        <Button asChild className="w-full" variant="outline">
                                            <Link to={`/profile/${otherPerson.id}`}>View Profile</Link>
                                        </Button>
                                        <Button asChild className="w-full" variant="ghost">
                                            <Link to={`/messages?user=${otherPerson.id}`}>Send Message</Link>
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )
            })}
        </div>
    );
};
