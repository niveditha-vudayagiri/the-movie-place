import { Movie } from "./movie";
import { User } from "./user";

export class UserReview {
    id:number;
    movie: Movie;
    user: User;
    reviewTitle: string;
    reviewDescription: string;
    rating: number;
    date: string;
    likesCount: number;
    dislikeCount:number;
    imageUrls: string[];
}