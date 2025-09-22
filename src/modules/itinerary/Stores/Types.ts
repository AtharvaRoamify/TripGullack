export interface Activity {
  id: string;
  type:
    | "sightseeing"
    | "dining"
    | "entertainment"
    | "shopping"
    | "transport"
    | "accommodation"
    | "custom";
  title: string;
  time: string;
  duration: number; // in hours
  cost: number;
  location: string;
  description: string;
  coverImage?: File;
}

export interface Day {
  id: string;
  date: string;
  destination: string;
  image?: File;
  activities: Activity[];
}

export interface Itinerary {
  id: string;
  title: string;
  destination: string;
  duration: number;
  travelers: number;
  travelType: "solo" | "couple" | "family" | "group" | "business";
  hotelCategory: "budget" | "mid-range" | "luxury";
  days: Day[];
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
  isPublic: boolean;
  coverImage?: File | null;
}

export interface ItineraryContextType {
  itineraries: Itinerary[];
  currentItinerary: Itinerary | null;
  setCurrentItinerary: (itinerary: Itinerary | null) => void;
  createItinerary: (
    itinerary: Omit<Itinerary, "id" | "createdAt" | "author">
  ) => void;
  updateItinerary: (id: string, updates: Partial<Itinerary>) => void;
  deleteItinerary: (id: string) => void;
  addActivity: (dayId: string, activity: Activity) => void;
  updateActivity: (
    dayId: string,
    activityId: string,
    updates: Partial<Activity>
  ) => void;
  deleteActivity: (dayId: string, activityId: string) => void;
}
