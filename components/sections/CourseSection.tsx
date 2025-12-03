'use client'; // Required for client-side components in Next.js 13+

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import CourseCard from "../CourseCard";

type Vendor = {
  id: number;
  ownername: string;
  email: string;
  company_name: string;
  bio?: string | null;
  website?: string | null;
  phone?: string | null;
  address?: string | null;
  logo?: string | null;
  driver?: string | null; // varchar(20)
  password: string;
  verification_status?: 'pending' | 'approved' | 'rejected';
  created_at?: string;  // ISO datetime string
  updated_at?: string;  // ISO datetime string
};

type thumbnail = {
  id: number;
  mediable_type: string;
  mediable_id: number;
  file_path: string;
  file_type: string;
  storage_type: string;
  created_at: string;
}

type question = {
  id: number;
  quiz_id: number;
  question_text: string;
  question_type: string;
  marks: number;
  options: string;
  correct_answer: string;
  created_at: string;
  updated_at: string;
}

export type quiz = {
  id: number;
  lesson_id: number;
  title: string;
  description: string;
  total_marks: number;
  passing_marks: number;
  duration_minutes: number;
  status: string;
  created_at: string;
  updated_at: string;
  questions?: question[];
}

type file = {
  id: number;
  mediable_type: string;
  mediable_id: number;
  file_path: string;
  file_type: string;
  storage_type: string;
  created_at: string;
}

type lession = {
  id: number;
  course_id: number;
  title: string;
  description: string;
  content: string;
  lesson_type: string;
  video_file_path: string;
  video_storage_type: string;
  live_start_time: string;
  live_end_time: string;
  position: number;
  created_at: string;
  updated_at: string;
  quiz?: quiz;
  files: file[];
}

type category = {
  id: number;
  name: string;
  slug: string;
  status: number;
  created_at: string;
  updated_at: string;
}




// Define the Course type based on your DB schema
export type Course = {
  id: number;
  vendor_id: number;
  vendor?: Vendor;
  title: string;
  slug: string;
  description?: string | null;
  course_overview?: string | null;
  category_id?: number | null;
  category?: category;
  thumbnail?: thumbnail;
  driver?: string | null;
  price?: number;
  discount?: number;
  course_type?: 'recorded' | 'live' | 'hybrid';
  start_date?: string | null;
  end_date?: string | null;
  enrollment_close_date?: string | null;
  streaming_server?: 'internal' | 'external';
  status?: 'draft' | 'pending' | 'published' | 'rejected';
  total_hour: number;
  rating: number;
  total_rating: number;
  created_at?: string;
  updated_at?: string;
  lessions?: lession[];
  introVideoUrl?: string;
  total_students?: number;
};

interface PaginationInfo {
  currentPage: number;
  lastPage: number;
  nextPageUrl: string | null;
  perPage: number;
  prevPageUrl: string | null;
  total: number;
}


export default function CourseSection() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    lastPage: 1,
    nextPageUrl: null,
    perPage: 10,
    prevPageUrl: null,
    total: 0,
  });

  useEffect(() => {

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/courses`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCourses(data.data);
        setLoading(false);
        setPagination(data.pagination);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);

      });
  }, []);

  const handlePagination = (url: string | null) => {
    if (!url) return;

    setLoading(true);

    // Pass the backend pagination URL to your Next.js API
    fetch(`/api/courses?page_url=${encodeURIComponent(url)}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setCourses(data.data);
        setPagination(data.pagination);
      })
      .finally(() => setLoading(false));
  };


  if (loading) {
    return <p className="text-center py-12">Loading courses...</p>;
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {courses?.length ?? 0} courses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            disabled={!pagination?.prevPageUrl}
            onClick={() => handlePagination(pagination.prevPageUrl)}
          >
            Previous
          </Button>

          <Button variant="default">
            {pagination?.currentPage}
          </Button>

          <Button
            variant="outline"
            disabled={!pagination?.nextPageUrl}
            onClick={() => handlePagination(pagination.nextPageUrl)}
          >
            Next
          </Button>

        </div>
      </div>
    </section>
  );
}
