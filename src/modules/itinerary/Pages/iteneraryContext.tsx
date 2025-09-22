import { createContext } from "react"
import type { ItineraryContextType } from "../Stores/Types"

export const ItineraryContext = createContext<ItineraryContextType | undefined>(undefined)