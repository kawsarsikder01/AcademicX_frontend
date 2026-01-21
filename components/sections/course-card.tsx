import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Clock } from "lucide-react";

interface CourseCardProps {
  id: string;
  image: string;
  title: string;
  instructor: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  students: number;
  duration: string;
  category: string;
}

const CourseCard = ({
  id,
  image,
  title,
  instructor,
  price,
  originalPrice,
  rating,
  reviews,
  students,
  duration,
  category,
}: CourseCardProps) => {
  return (
    <Link href={`/course/${id}`}>
      <Card className="h-full py-0 overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
            {category}
          </Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">{instructor}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{students.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 mb-3">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-foreground">{rating}</span>
            <span className="text-muted-foreground text-sm">({reviews})</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-foreground">${price}</span>
            {originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                ${originalPrice}
              </span>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CourseCard;
