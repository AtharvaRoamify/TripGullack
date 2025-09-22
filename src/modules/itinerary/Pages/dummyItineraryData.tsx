import { useState } from "react"
import type { Itinerary, Activity, ItineraryContextType } from "../Stores/Types"
import { ItineraryContext } from "./iteneraryContext"

// Mock data
const mockItineraries: Itinerary[] = [
  {
    id: "1",
    title: "Weekend Getaway to Paris",
    destination: "Paris, France",
    duration: 3,
    travelers: 2,
    travelType: "couple",
    hotelCategory: "mid-range",
    days: [
      {
        id: "day1",
        date: "2024-03-15",
        destination: "Eiffel Tower District",
        activities: [
          {
            id: "act1",
            type: "sightseeing",
            title: "Eiffel Tower Visit",
            time: "10:00 AM",
            duration: 2,
            cost: 25,
            location: "Eiffel Tower",
            description: "Visit the iconic Eiffel Tower and enjoy the view from the top"
          },
          {
            id: "act2",
            type: "dining",
            title: "Lunch at Le Jules Verne",
            time: "1:00 PM",
            duration: 1,
            cost: 120,
            location: "Le Jules Verne",
            description: "Fine dining with a view of Paris"
          }
        ]
      }
    ],
    author: {
      id: "user1",
      name: "Sarah Miller",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face"
    },
    createdAt: "2024-03-01",
    isPublic: true
  },
  {
    id: "2",
    title: "Cultural Journey to Kyoto",
    destination: "Kyoto, Japan",
    duration: 5,
    travelers: 1,
    travelType: "solo",
    hotelCategory: "budget",
    days: [
      {
        id: "day1",
        date: "2024-04-10",
        destination: "Temple District",
        activities: [
          {
            id: "act1",
            type: "sightseeing",
            title: "Kiyomizu-dera Temple",
            time: "9:00 AM",
            duration: 2,
            cost: 15,
            location: "Kiyomizu-dera Temple",
            description: "Visit the famous wooden temple with panoramic city views"
          }
        ]
      }
    ],
    author: {
      id: "user2",
      name: "James Davis",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
    },
    createdAt: "2024-03-15",
    isPublic: true
  }
]

export function ItineraryProvider({ children }: { children: React.ReactNode }) {
  const [itineraries] = useState<Itinerary[]>(mockItineraries)
  const [currentItinerary, setCurrentItinerary] = useState<Itinerary | null>(null)

  const createItinerary = (itineraryData: Omit<Itinerary, 'id' | 'createdAt' | 'author'>) => {
    // In a real app, this would make an API call
    console.log("Creating itinerary:", itineraryData)
  }

  const updateItinerary = (id: string, updates: Partial<Itinerary>) => {
    // In a real app, this would make an API call
    console.log("Updating itinerary:", id, updates)
  }

  const deleteItinerary = (id: string) => {
    // In a real app, this would make an API call
    console.log("Deleting itinerary:", id)
  }

  const addActivity = (dayId: string, activity: Activity) => {
    // In a real app, this would make an API call
    console.log("Adding activity to day:", dayId, activity)
  }

  const updateActivity = (dayId: string, activityId: string, updates: Partial<Activity>) => {
    // In a real app, this would make an API call
    console.log("Updating activity:", dayId, activityId, updates)
  }

  const deleteActivity = (dayId: string, activityId: string) => {
    // In a real app, this would make an API call
    console.log("Deleting activity:", dayId, activityId)
  }

  const value: ItineraryContextType = {
    itineraries,
    currentItinerary,
    setCurrentItinerary,
    createItinerary,
    updateItinerary,
    deleteItinerary,
    addActivity,
    updateActivity,
    deleteActivity
  }

  return (
    <ItineraryContext.Provider value={value}>
      {children}
    </ItineraryContext.Provider>
  )
}