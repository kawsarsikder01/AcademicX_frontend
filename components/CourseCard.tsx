import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Clock } from "lucide-react";
import { Course } from "./sections/CourseSection";
import { calculateDiscountedPrice, getFile } from "@/lib/utils";
import Image from "next/image";



const CourseCard = (course: Course) => {
  return (
    <Link href={`/course/${course.slug}`}>
      <Card className="h-full py-0 overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
        <div className="relative w-full aspect-video overflow-hidden">
          <Image
            src={getFile(course.thumbnail?.file_path || "") || ""}
            alt={course.title}
            fill // makes the image fill the parent container
            style={{ objectFit: "cover" }} // ensures cover behavior
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized
          />

          <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
            {course.category?.name}
          </Badge>
        </div>
        <CardContent className="p-4 pt-0 pb-0">
          <h3 className="font-semibold text-lg   line-clamp-2 text-foreground group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">{course.vendor?.ownername}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{course.total_students}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{course.total_hour} h</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-foreground">{course.rating}</span>
              <span className="text-muted-foreground text-sm">({course.total_rating})</span>
            </div>
          </div>

        </CardContent>
        <CardFooter className="p-4 mt-0 pt-0">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-foreground">${calculateDiscountedPrice(Number(course.price), Number(course.discount))}</span>
            {(course?.discount ?? 0) > 0 && (
              <span className="text-lg text-muted-foreground line-through">
                ${course.price}
              </span>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CourseCard;
