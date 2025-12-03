"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { CategoryType } from "../Admin/Category/CategoryList";
import { ChevronDownIcon } from "lucide-react";
import ImageUploader from "@/components/ImageUploader";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import LessonForm, { Lesson } from "./lession";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

export default function CourseForm() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [type, setType] = useState(""); // recorded or live
  const [streamType, setStreamType] = useState(""); // external or internal
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [overview, setOverview] = useState<string>("");

  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    discount: "",
    description: "",
    introVideoUrl: "",
    total_hours: "",
    externalUrl: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/vendor/categories`);
        if (res.ok) {
          const data = await res.json();
          setCategories(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Step 1 — Build the payload JSON
      const payload = {
        ...formData,
        course_type: type,
        streaming_server: type === "live" ? streamType : null,
        enrollmentCloseDate: date ? date.toISOString() : null,
        course_overview: overview,
        lessons: lessons.map((lesson) => ({
          title: lesson.title,
          description: lesson.description,
          quiz: lesson.quiz || [],
          videoName: lesson.videoFile ? lesson.videoFile.name : null,
        })),
      };


      // return;

      // Step 2 — Construct FormData for files + JSON
      const form = new FormData();
      form.append("payload", JSON.stringify(payload));

      // ✅ Add thumbnail file
      if (thumbnail) {
        form.append("thumbnail", thumbnail);
      }

      // ✅ Add lesson videos
      lessons.forEach((lesson, index) => {
        if (lesson.videoFile) {
          form.append(`lessonVideo_${index}`, lesson.videoFile);
        }
      });

      // Step 3 — POST to backend
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/vendor/course`, {
        method: "POST",
        body: form,
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const result = await res.json();
      console.log("✅ Course uploaded successfully:", result);

      toast.success("Course uploaded successfully!");

      router.push('/vendor/courses');

    } catch (error) {
      console.error("❌ Upload failed:", error);
      toast.error("❌ Upload failed. Check console for details.");
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-12 gap-4">
        {/* Left Panel - Course Info */}
        <Card className="col-span-12 lg:col-span-7 md:col-span-12">
          <CardHeader>
            <CardTitle>Add New Course</CardTitle>
            <CardDescription>Enter your course information below</CardDescription>
          </CardHeader>

          <CardContent>
            <FieldGroup>
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="title">Title</FieldLabel>
                  <Input
                    id="title"
                    placeholder="Course title"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="category">Category</FieldLabel>
                  <Select
                    value={formData.category}
                    onValueChange={(val) => setFormData({ ...formData, category: val })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        {categories.map((c) => (
                          <SelectItem key={c.id} value={String(c.id)}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel htmlFor="price">Price</FieldLabel>
                  <Input
                    type="number"
                    step={0.01}
                    placeholder="Course price"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="discount">Discount <sub>(Optional)</sub></FieldLabel>
                  <Input
                    type="number"
                    step={0.01}
                    placeholder="Course discount"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="course_type">Course Type</FieldLabel>
                  <Select
                    value={type}
                    onValueChange={(val) => {
                      setType(val);
                      setStreamType(""); // reset streaming type
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recorded">Recorded</SelectItem>
                      <SelectItem value="live">Live</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel htmlFor="total_hours"> Total Course Hour </FieldLabel>
                  <Input
                    type="number"
                    step={1}
                    placeholder="Course total hours"
                    value={formData.total_hours}
                    min={1}
                    onChange={(e) => setFormData({ ...formData, total_hours: e.target.value })}
                  />
                </Field>

                {/* Live options */}
                {type === "live" && (
                  <>
                    <Field>
                      <FieldLabel>Enrollment Last Date</FieldLabel>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-48 justify-between font-normal">
                            {date ? date.toLocaleDateString() : "Select date"}
                            <ChevronDownIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            onSelect={(d) => { setDate(d); setOpen(false); }}
                          />
                        </PopoverContent>
                      </Popover>
                    </Field>

                    <Field>
                      <FieldLabel>Streaming Type</FieldLabel>
                      <Select value={streamType} onValueChange={setStreamType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select streaming type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="external">External</SelectItem>
                          <SelectItem value="internal">Internal</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>

                    {streamType === "external" && (
                      <Field>
                        <Input
                          placeholder="Enter external streaming URL"
                          value={formData.externalUrl}
                          onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
                        />
                       
                      </Field>
                    )}
                  </>
                )}
              </div>

              <Field className="mt-4">
                <FieldLabel>Description</FieldLabel>
                <Textarea
                  placeholder="Enter course description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </Field>
              <Field className="mt-4">
                <FieldLabel>Course Overview</FieldLabel>
                <ReactQuill
                  value={overview}
                  onChange={setOverview}
                  theme="snow"
                  style={{height: "200px",display: "block"}}
                />    
              </Field>

              <Field className="mt-8">
                <FieldLabel>Course Intro Video URL (Optional)</FieldLabel>
                <Input
                  placeholder="Intro video URL"
                  value={formData.introVideoUrl}
                  onChange={(e) => setFormData({ ...formData, introVideoUrl: e.target.value })}
                />
              </Field>

              <Field>
                <FieldLabel>Thumbnail</FieldLabel>
                <ImageUploader onChange={(file) => setThumbnail(file)} />
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>

        {/* Right Panel - Lesson Builder */}
        <Card className="col-span-12 lg:col-span-5 md:col-span-12 flex flex-col">
          <LessonForm onLessonsChange={setLessons} type={type} />
        </Card>
      </div>

      <div className="flex justify-end mt-6">
        <Button type="submit" size="lg">
          Submit Course
        </Button>
      </div>
    </form>
  );
}
