'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { AlertCircle, MessageSquare, ThumbsUp, User } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

// Validierungsschema für Kommentare
const commentSchema = z.object({
  name: z.string().min(2, 'Name muss mindestens 2 Zeichen lang sein'),
  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein'),
  comment: z.string().min(10, 'Kommentar muss mindestens 10 Zeichen lang sein'),
  privacy: z.boolean().refine(val => val, {
    message: 'Bitte stimmen Sie den Datenschutzbestimmungen zu',
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

export const PostComments: React.FC<PostCommentsProps> = ({ comments = [], className }) => {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [localComments, setLocalComments] = useState<Comment[]>(comments);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

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
      setError(
        'Beim Absenden des Kommentars ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.'
      );
      console.error('Comment submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Rekursive Funktion zum Rendern von Kommentaren und deren Antworten
  const renderComment = (comment: Comment, depth = 0) => {
    return (
      <motion.div
        key={comment.id}
        className={cn(
          'border-l-2 py-2 pl-4',
          comment.isAdmin ? 'border-[#FF7A35]' : 'border-gray-200',
          depth > 0 && 'ml-6'
        )}
        variants={itemVariants}
        whileHover={{ x: 3, transition: { duration: 0.2 } }}
      >
        <div className="flex items-start gap-3">
          <motion.div
            className={cn(
              'mt-1 rounded-full p-2',
              comment.isAdmin ? 'bg-[#FF7A35]/10 text-[#FF7A35]' : 'bg-gray-100 text-gray-500'
            )}
            whileHover={{ scale: 1.1 }}
          >
            <User className="h-5 w-5" />
          </motion.div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className={cn('font-medium', comment.isAdmin && 'text-[#FF7A35]')}>
                {comment.name}
                {comment.isAdmin && (
                  <span className="ml-2 rounded bg-[#FF7A35] px-2 py-0.5 text-xs text-white">
                    Admin
                  </span>
                )}
              </h4>
              <span className="text-sm text-[#3D5A73]">•</span>
              <span className="text-sm text-[#3D5A73]">{formatDate(comment.date)}</span>
            </div>

            <div className="mt-1 text-[#3D5A73]">{comment.comment}</div>

            <div className="mt-2 flex items-center gap-4">
              <motion.button
                className="flex items-center gap-1 text-xs text-[#3D5A73] hover:text-[#FF7A35]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ThumbsUp className="h-3 w-3" />
                <span>Gefällt mir</span>
              </motion.button>

              <motion.button
                className="flex items-center gap-1 text-xs text-[#3D5A73] hover:text-[#FF7A35]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageSquare className="h-3 w-3" />
                <span>Antworten</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Rekursiv Antworten rendern */}
        {comment.replies?.map(reply => renderComment(reply, depth + 1))}
      </motion.div>
    );
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <Card className="overflow-hidden border-none shadow-md">
        <CardHeader className="border-b border-gray-100 bg-[#F8F9FC] pb-3">
          <CardTitle className="flex items-center gap-2 text-lg font-medium text-[#1A2027]">
            <MessageSquare className="h-5 w-5" />
            <span>
              Kommentare ({localComments.length})<span className="text-[#FF7A35]">.</span>
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          {/* Kommentarliste */}
          {localComments.length > 0 ? (
            <motion.div
              className="mb-8 space-y-6"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {localComments.map(comment => renderComment(comment))}
            </motion.div>
          ) : (
            <div className="py-6 text-center text-[#3D5A73]">
              <p>Noch keine Kommentare. Hinterlassen Sie den ersten Kommentar!</p>
            </div>
          )}

          {/* Kommentarformular */}
          <div className="mt-6 border-t border-gray-100 pt-6">
            <h3 className="mb-4 text-lg font-medium text-[#1A2027]">
              Kommentar schreiben
              <span className="text-[#FF7A35]">.</span>
            </h3>

            {/* Erfolgsmeldung */}
            {success && (
              <motion.div
                className="mb-4 flex items-start gap-2 rounded-md border border-green-200 bg-green-50 p-4 text-green-700"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mt-0.5">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Ihr Kommentar wurde erfolgreich abgesendet!</p>
                  <p className="text-sm">Er wird nach Prüfung veröffentlicht.</p>
                </div>
              </motion.div>
            )}

            {/* Fehlermeldung */}
            {error && (
              <motion.div
                className="mb-4 flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-4 text-red-700"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mt-0.5">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Fehler</p>
                  <p className="text-sm">{error}</p>
                </div>
              </motion.div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#1A2027]">Name *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ihr Name"
                            {...field}
                            className="border-gray-200 focus:border-[#FF7A35] focus:ring-[#FF7A35]/20"
                          />
                        </FormControl>
                        <FormMessage className="text-[#FF7A35]" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#1A2027]">E-Mail *</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="ihre-email@beispiel.de"
                            {...field}
                            className="border-gray-200 focus:border-[#FF7A35] focus:ring-[#FF7A35]/20"
                          />
                        </FormControl>
                        <FormMessage className="text-[#FF7A35]" />
                        <p className="mt-1 text-xs text-[#3D5A73]">
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
                      <FormLabel className="text-[#1A2027]">Kommentar *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Ihr Kommentar..."
                          rows={5}
                          {...field}
                          className="border-gray-200 focus:border-[#FF7A35] focus:ring-[#FF7A35]/20"
                        />
                      </FormControl>
                      <FormMessage className="text-[#FF7A35]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="privacy"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={e => field.onChange(e.target.checked)}
                          className="h-4 w-4 rounded border-gray-300 text-[#FF7A35] focus:ring-[#FF7A35]/20"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-[#3D5A73]">
                          Ich stimme der Verarbeitung meiner Daten gemäß der{' '}
                          <Link href="/datenschutz" className="text-[#FF7A35] hover:underline">
                            Datenschutzerklärung
                          </Link>{' '}
                          zu. *
                        </FormLabel>
                        <FormMessage className="text-[#FF7A35]" />
                      </div>
                    </FormItem>
                  )}
                />

                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    variant="default"
                    disabled={submitting}
                    className="bg-[#1A2027] text-white hover:bg-[#2A3F56]"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {submitting ? 'Wird abgesendet...' : 'Kommentar absenden'}
                    </span>
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 w-full bg-[#FF7A35]"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </motion.div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PostComments;
