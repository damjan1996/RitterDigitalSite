'use client';

import { motion } from 'framer-motion';
import { Briefcase, MapPin, ArrowRight, Search, Filter, Clock } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

// Refined color palette - consistent with other components
const colors = {
  primary: '#1A2027', // Darker primary for better contrast
  secondary: '#3D5A73', // Richer secondary color
  accent: '#FF7A35', // Warmer accent for better visibility
  background: '#F8F9FC', // Lighter background for better contrast
  secondaryAccent: '#2A3F56', // Deeper secondary accent
};

interface Job {
  id: string;
  title: string;
  location: string;
  type: string; // full-time, part-time, etc.
  department: string;
  postedAt: string;
}

interface JobListingsProps {
  jobs: Job[];
  className?: string;
  onSelectJob?: (jobId: string) => void;
}

export const JobListings: React.FC<JobListingsProps> = ({ jobs = [], className, onSelectJob }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedType, setSelectedType] = useState('');

  // Get unique departments and job types for filters
  const departments = [...new Set(jobs.map(job => job.department))];
  const jobTypes = [...new Set(jobs.map(job => job.type))];

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === '' || job.department === selectedDepartment;
    const matchesType = selectedType === '' || job.type === selectedType;

    return matchesSearch && matchesDepartment && matchesType;
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className={cn('relative overflow-hidden py-16', className)}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 h-full w-full">
        <motion.div
          className="absolute left-0 top-0 h-full w-1/3"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 70% 100%, 0 100%)',
            backgroundColor: colors.background,
            opacity: 0.7,
          }}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.7 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        />

        <motion.div
          className="absolute left-[10%] top-[15%] h-24 w-24 rounded-full"
          style={{ backgroundColor: `${colors.accent}10` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        />

        <motion.div
          className="absolute bottom-[15%] right-[8%] h-32 w-32 rounded-full"
          style={{ backgroundColor: `${colors.secondaryAccent}10` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        {/* Search and filters */}
        <motion.div
          className="mb-8 space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3D5A73]" />
              <Input
                placeholder="Suche nach Stellenbezeichnung oder Ort..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="border-[#E5E7EB] pl-10 focus:border-[#FF7A35] focus:ring-[#FF7A35]/20"
              />
            </div>

            <div className="flex gap-2">
              <div className="w-full md:w-48">
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="border-[#E5E7EB] focus:border-[#FF7A35] focus:ring-[#FF7A35]/20">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-[#3D5A73]" />
                      <SelectValue placeholder="Abteilung" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Abteilungen</SelectItem>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full md:w-48">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="border-[#E5E7EB] focus:border-[#FF7A35] focus:ring-[#FF7A35]/20">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[#3D5A73]" />
                      <SelectValue placeholder="Anstellungsart" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Arten</SelectItem>
                    {jobTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Job listings */}
        <motion.div
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <motion.div
                key={job.id}
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                  transition: { duration: 0.3 },
                }}
              >
                <Card className="overflow-hidden border border-[#E5E7EB] transition-all duration-300 hover:border-[#1A2027]/20 hover:shadow-lg">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row md:items-center">
                      <div className="flex-1 p-6">
                        <h3 className="mb-2 text-xl font-medium text-[#1A2027]">{job.title}</h3>

                        <div className="mb-4 flex flex-wrap gap-4">
                          <div className="flex items-center gap-2 text-sm text-[#3D5A73]">
                            <MapPin className="h-4 w-4 text-[#FF7A35]" />
                            {job.location}
                          </div>

                          <div className="flex items-center gap-2 text-sm text-[#3D5A73]">
                            <Briefcase className="h-4 w-4 text-[#3D5A73]" />
                            {job.type}
                          </div>

                          <div className="flex items-center gap-2 text-sm text-[#3D5A73]">
                            <Clock className="h-4 w-4 text-[#FF7A35]" />
                            {job.postedAt}
                          </div>
                        </div>

                        <div className="inline-block rounded-full bg-[#F8F9FC] px-3 py-1 text-xs font-medium text-[#3D5A73]">
                          {job.department}
                        </div>
                      </div>

                      <div className="border-t border-[#E5E7EB] p-4 md:border-l md:border-t-0">
                        {onSelectJob ? (
                          <Button
                            onClick={() => onSelectJob(job.id)}
                            className="group relative overflow-hidden rounded-md bg-[#1A2027] px-6 py-2 font-medium text-white transition-all duration-300 hover:bg-[#2A3F56]"
                          >
                            <span className="relative z-10 flex items-center gap-2">
                              Details
                              <motion.div className="transition-transform duration-300 group-hover:translate-x-1">
                                <ArrowRight className="h-4 w-4" />
                              </motion.div>
                            </span>
                            <motion.div
                              className="absolute bottom-0 left-0 h-1 w-full bg-[#FF7A35]"
                              initial={{ scaleX: 0 }}
                              whileHover={{ scaleX: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          </Button>
                        ) : (
                          <Link href={`/karriere/${job.id}`} className="group">
                            <Button className="relative overflow-hidden rounded-md bg-[#1A2027] px-6 py-2 font-medium text-white transition-all duration-300 hover:bg-[#2A3F56]">
                              <span className="relative z-10 flex items-center gap-2">
                                Details
                                <motion.div className="transition-transform duration-300 group-hover:translate-x-1">
                                  <ArrowRight className="h-4 w-4" />
                                </motion.div>
                              </span>
                              <motion.div
                                className="absolute bottom-0 left-0 h-1 w-full bg-[#FF7A35]"
                                initial={{ scaleX: 0 }}
                                whileHover={{ scaleX: 1 }}
                                transition={{ duration: 0.3 }}
                              />
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.div
              className="rounded-lg border border-[#E5E7EB] bg-white p-8 text-center"
              variants={itemVariants}
            >
              <h3 className="mb-2 text-xl font-medium text-[#1A2027]">
                Keine Stellen gefunden
                <span className="text-[#FF7A35]">.</span>
              </h3>
              <p className="text-[#3D5A73]">
                Bitte versuchen Sie es mit anderen Suchkriterien oder schauen Sie später wieder
                vorbei.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default JobListings;
