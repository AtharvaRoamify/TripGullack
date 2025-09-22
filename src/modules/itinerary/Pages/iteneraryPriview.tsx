import { useState } from "react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { 
  MapPin, 
  Calendar, 
  Clock, 
  DollarSign,
  Eye,
  X
} from "lucide-react"
import type { Day } from "../Stores/Types"

interface ItineraryPreviewModalProps {
  itinerary: {
    title: string
    destination: string
    duration: number
    travelers: number
    travelType: 'solo' | 'couple' | 'family' | 'group' | 'business'
    hotelCategory: 'budget' | 'mid-range' | 'luxury'
    days: Day[]
  }
  trigger?: React.ReactNode
}

export function ItineraryPreviewModal({ itinerary, trigger }: ItineraryPreviewModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Date TBD'
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getTotalCost = () => {
    return itinerary.days.reduce((total, day) => 
      total + day.activities.reduce((dayTotal, activity) => dayTotal + activity.cost, 0), 0
    )
  }

  const getTravelTypeColor = (type: string) => {
    const colors = {
      solo: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      couple: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
      family: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      group: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      business: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
    return colors[type as keyof typeof colors] || colors.solo
  }

  const defaultTrigger = (
    <Button variant="outline" className="flex-1" onClick={() => setIsOpen(true)}>
      <Eye className="mr-2 h-4 w-4" />
      Preview
    </Button>
  )

  if (!isOpen) {
    return trigger ? (
      <div onClick={() => setIsOpen(true)}>
        {trigger}
      </div>
    ) : defaultTrigger
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">{itinerary.title || 'Untitled Itinerary'}</h2>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Trip Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Trip Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Destination</p>
                  <p className="font-medium">{itinerary.destination || 'Not specified'}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">{itinerary.duration} days</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Travelers</p>
                  <p className="font-medium">{itinerary.travelers} people</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Estimated Total Cost</p>
                  <p className="font-medium text-lg">${getTotalCost()}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Badge className={getTravelTypeColor(itinerary.travelType)}>
                  {itinerary.travelType}
                </Badge>
                <Badge variant="outline">
                  {itinerary.hotelCategory} hotels
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Daily Itinerary */}
          <div className="space-y-4">
            {itinerary.days.map((day, index) => (
              <Card key={day.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Day {index + 1}
                    {day.date && <span className="text-base font-normal text-muted-foreground">- {formatDate(day.date)}</span>}
                  </CardTitle>
                  {day.destination && (
                    <p className="text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {day.destination}
                    </p>
                  )}
                </CardHeader>
                <CardContent>
                  {day.activities.length === 0 ? (
                    <p className="text-muted-foreground italic">No activities planned for this day</p>
                  ) : (
                    <div className="space-y-4">
                      {day.activities
                        .sort((a, b) => a.time.localeCompare(b.time))
                        .map((activity) => (
                        <div key={activity.id} className="border-l-2 border-primary pl-4 relative">
                          <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full"></div>
                          <div className="space-y-2">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-semibold">{activity.title}</h4>
                                  <Badge variant="secondary" className="text-xs">
                                    {activity.type}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {activity.time} ({activity.duration}h)
                                  </span>
                                  {activity.location && (
                                    <span className="flex items-center gap-1">
                                      <MapPin className="h-3 w-3" />
                                      {activity.location}
                                    </span>
                                  )}
                                  <span className="flex items-center gap-1">
                                    <DollarSign className="h-3 w-3" />
                                    ${activity.cost}
                                  </span>
                                </div>
                                {activity.description && (
                                  <p className="text-sm text-muted-foreground">
                                    {activity.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Day summary */}
                      <div className="pt-4 border-t">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {day.activities.length} activities
                          </span>
                          <span className="font-medium">
                            Day total: ${day.activities.reduce((sum, act) => sum + act.cost, 0)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Trip Summary */}
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle>Trip Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{itinerary.duration}</p>
                  <p className="text-sm text-muted-foreground">Days</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">
                    {itinerary.days.reduce((sum, day) => sum + day.activities.length, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Activities</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">${getTotalCost()}</p>
                  <p className="text-sm text-muted-foreground">Total Cost</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}