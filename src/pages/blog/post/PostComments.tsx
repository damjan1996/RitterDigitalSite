// src/pages/blog/post/PostComments.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { AlertCircle, MessageSquare, ThumbsUp, User } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

// Validierungsschema für Kommentare
const commentSchema = z.object({
    name: z.string().min(2, 'Name muss mindestens 2 Zeichen lang sein'),
    email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein'),
    comment: z.string().min(10, 'Kommentar muss mindestens 10 Zeichen lang sein'),
    privacy: z.literal(true, {
        errorMap: () => ({ message: 'Bitte stimmen Sie den Datenschutzbestimmungen zu' }),
    }),
});

type CommentFormValues = z.infer<typeof commentSchema>;

interface Comment {
    id: number;
    name: string;
    comment: string;
    date: string;
    replies?: Comment[];
    isAdmin?: boolean;
}

interface PostCommentsProps {
    postId: number;
    comments?: Comment[];
    className?: string;
}

export const PostComments: React.FC<PostCommentsProps> = ({
                                                              postId,
                                                              comments = [],
                                                              className
                                                          }) => {
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [localComments, setLocalComments] = useState<Comment[]>(comments);

    const form = useForm<CommentFormValues>({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            name: '',
            email: '',
            comment: '',
            privacy: false,
        },
    });

    const onSubmit = async (data: CommentFormValues) => {
        setSubmitting(true);
        setError(null);

        try {
            // In einer realen Implementierung würde hier ein API-Aufruf erfolgen
            // Beispiel: await fetch('/api/comments', { method: 'POST', body: JSON.stringify({ ...data, postId }) })

            // Simulierte API-Verzögerung
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Kommentar der lokalen Liste hinzufügen für sofortiges Feedback
            const newComment: Comment = {
                id: Date.now(), // Temporäre ID
                name: data.name,
                comment: data.comment,
                date: new Date().toISOString(),
            };

            setLocalComments([...localComments, newComment]);
            setSuccess(true);
            form.reset();

            // Erfolgsmeldung nach 3 Sekunden ausblenden
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError('Beim Absenden des Kommentars ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.');
            console.error('Comment submission error:', err);
        } finally {
            setSubmitting(false);
        }
    };

    // Rekursive Funktion zum Rendern von Kommentaren und deren Antworten
    const renderComment = (comment: Comment, depth = 0) => {
        return (
            <div
                key={comment.id}
                className={cn(
                    "border-l-2 pl-4 py-2",
                    comment.isAdmin ? "border-accent" : "border-gray-200",
                    depth > 0 && "ml-6"
                )}
            >
                <div className="flex items-start gap-3">
                    <div className="bg-gray-100 rounded-full p-2 text-gray-500 mt-1">
                        <User className="h-5 w-5" />
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <h4 className={cn(
                                "font-medium",
                                comment.isAdmin && "text-accent"
                            )}>
                                {comment.name}
                                {comment.isAdmin && <span className="ml-2 text-xs bg-accent text-white px-2 py-0.5 rounded">Admin</span>}
                            </h4>
                            <span className="text-sm text-tertiary">•</span>
                            <span className="text-sm text-tertiary">{formatDate(comment.date)}</span>
                        </div>

                        <div className="mt-1 text-secondary">
                            {comment.comment}
                        </div>

                        <div className="mt-2 flex items-center gap-4">
                            <button className="text-xs text-tertiary hover:text-accent flex items-center gap-1">
                                <ThumbsUp className="h-3 w-3" />
                                <span>Gefällt mir</span>
                            </button>

                            <button className="text-xs text-tertiary hover:text-accent flex items-center gap-1">
                                <MessageSquare className="h-3 w-3" />
                                <span>Antworten</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Rekursiv Antworten rendern */}
                {comment.replies?.map(reply => renderComment(reply, depth + 1))}
            </div>
        );
    };

    return (
        <div className={className}>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        <span>Kommentare ({localComments.length})</span>
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    {/* Kommentarliste */}
                    {localComments.length > 0 ? (
                        <div className="space-y-6 mb-8">
                            {localComments.map(comment => renderComment(comment))}
                        </div>
                    ) : (
                        <div className="text-center py-6 text-secondary">
                            <p>Noch keine Kommentare. Hinterlassen Sie den ersten Kommentar!</p>
                        </div>
                    )}

                    {/* Kommentarformular */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                        <h3 className="text-lg font-semibold mb-4">Kommentar schreiben</h3>

                        {/* Erfolgsmeldung */}
                        {success && (
                            <div className="bg-green-50 border border-green-200 text-green-700 rounded-md p-4 mb-4 flex items-start gap-2">
                                <div className="mt-0.5">
                                    <AlertCircle className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-medium">Ihr Kommentar wurde erfolgreich abgesendet!</p>
                                    <p className="text-sm">Er wird nach Prüfung veröffentlicht.</p>
                                </div>
                            </div>
                        )}

                        {/* Fehlermeldung */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 rounded-md p-4 mb-4 flex items-start gap-2">
                                <div className="mt-0.5">
                                    <AlertCircle className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-medium">Fehler</p>
                                    <p className="text-sm">{error}</p>
                                </div>
                            </div>
                        )}

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name *</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Ihr Name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>E-Mail *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="ihre-email@beispiel.de"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                                <p className="text-xs text-tertiary mt-1">
                                                    Ihre E-Mail wird nicht veröffentlicht.
                                                </p>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="comment"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Kommentar *</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Ihr Kommentar..."
                                                    rows={5}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="privacy"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>
                                                    Ich stimme der Verarbeitung meiner Daten gemäß der{' '}
                                                    <a href="/datenschutz" className="text-accent hover:underline">
                                                        Datenschutzerklärung
                                                    </a>{' '}
                                                    zu. *
                                                </FormLabel>
                                                <FormMessage />
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    variant="accent"
                                    isLoading={submitting}
                                    loadingText="Wird abgesendet..."
                                >
                                    Kommentar absenden
                                </Button>
                            </form>
                        </Form>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default PostComments;