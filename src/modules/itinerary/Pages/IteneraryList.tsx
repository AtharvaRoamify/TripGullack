import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { useItinerary } from "../Stores/iteneraryHook"

import { 
  Plus, 
  MapPin, 
  Calendar, 
  Users, 
  Clock, 
  Eye,
  Edit,
  Trash2,
  Globe,
  Lock
} from "lucide-react"
import type { Itinerary } from "../Stores/Types"
import { ItineraryPreviewModal } from "./iteneraryPriview"

export function ItineraryDashboard({ onCreateNew, onEditItinerary }:any) {
  const { itineraries, deleteItinerary } = useItinerary()
  const [selectedItinerary, setSelectedItinerary] = useState<string | null>(null)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
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

  const getHotelCategoryColor = (category: string) => {
    const colors = {
      budget: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      'mid-range': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      luxury: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    }
    return colors[category as keyof typeof colors] || colors.budget
  }

  const handleDeleteItinerary = (id: string) => {
    if (confirm('Are you sure you want to delete this itinerary?')) {
      deleteItinerary(id)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Itineraries</h1>
              <p className="text-muted-foreground">
                Manage your travel plans and create new adventures
              </p>
            </div>
            <Button size="lg" onClick={() => onCreateNew?.() || console.log('Navigate to create page')}>
              <Plus className="mr-2 h-5 w-5" />
              Create New Itinerary
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Itineraries</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{itineraries.length}</div>
              <p className="text-xs text-muted-foreground">
                Your travel plans
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Destinations</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(itineraries.map((it:any) => it.destination)).size}
              </div>
              <p className="text-xs text-muted-foreground">
                Unique places
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Days</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {itineraries.reduce((sum:any, it:any) => sum + it.duration, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Days planned
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Itineraries Grid */}
        {itineraries.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">No itineraries yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start planning your first trip and create memorable experiences
                  </p>
                  <Button onClick={() => onCreateNew?.() || console.log('Navigate to create page')}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Itinerary
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {itineraries.map((itinerary:Itinerary) => (
              <Card 
                key={itinerary.id} 
                className={`hover:shadow-md transition-shadow cursor-pointer ${
                  selectedItinerary === itinerary.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedItinerary(itinerary.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1 line-clamp-2">
                        {itinerary.title}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {itinerary.destination}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-1">
                      {itinerary.isPublic ? (
                        <Globe className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Trip Details */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {itinerary.duration} days
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {itinerary.travelers} travelers
                    </span>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2">
                    <Badge 
                      variant="secondary" 
                      className={getTravelTypeColor(itinerary.travelType)}
                    >
                      {itinerary.travelType}
                    </Badge>
                    <Badge 
                      variant="secondary"
                      className={getHotelCategoryColor(itinerary.hotelCategory)}
                    >
                      {itinerary.hotelCategory}
                    </Badge>
                  </div>

                  {/* Author & Date */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={itinerary.author.avatar} />
                        <AvatarFallback className="text-xs">
                          {itinerary.author.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">
                        {itinerary.author.name}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(itinerary.createdAt)}
                    </span>
                  </div>

                  {/* Activities Summary */}
                  <div className="text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {itinerary.days.reduce((sum:any, day:any) => sum + day.activities.length, 0)} activities planned
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <ItineraryPreviewModal 
                      itinerary={itinerary}
                      trigger={
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="mr-1 h-3 w-3" />
                          View
                        </Button>
                      }
                    />
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (onEditItinerary) {
                          onEditItinerary(itinerary)
                        } else {
                          console.log('Edit itinerary:', itinerary.id)
                        }
                      }}
                    >
                      <Edit className="mr-1 h-3 w-3" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteItinerary(itinerary.id)
                      }}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        {itineraries.length > 0 && (
          <div className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Manage your itineraries and explore new destinations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-auto p-4" onClick={() => console.log('Navigate to create page')}>
                    <div className="flex flex-col items-center gap-2">
                      <Plus className="h-6 w-6" />
                      <div className="text-center">
                        <div className="font-medium">Create New</div>
                        <div className="text-xs text-muted-foreground">Start planning</div>
                      </div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4">
                    <div className="flex flex-col items-center gap-2">
                      <Globe className="h-6 w-6" />
                      <div className="text-center">
                        <div className="font-medium">Explore</div>
                        <div className="text-xs text-muted-foreground">Find inspiration</div>
                      </div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4">
                    <div className="flex flex-col items-center gap-2">
                      <Users className="h-6 w-6" />
                      <div className="text-center">
                        <div className="font-medium">Share</div>
                        <div className="text-xs text-muted-foreground">With friends</div>
                      </div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}