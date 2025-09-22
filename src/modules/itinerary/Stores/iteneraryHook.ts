import { useContext } from "react"
import { ItineraryContext } from "../Pages/iteneraryContext"

export function useItinerary() {
  const context = useContext(ItineraryContext)
  if (context === undefined) {
    throw new Error("useItinerary must be used within an ItineraryProvider")
  }
  return context
}