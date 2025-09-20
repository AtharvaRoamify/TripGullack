import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { useItinerary } from "../modules/itinerary/Pages/ItineraryProvider"
import { 
  Search, 
  MapPin, 
  Users, 
  Calendar,
  Eye,
  Heart,
  Share2,
  Grid,
  List
} from "lucide-react"

export function ExplorePage() {
  const { itineraries } = useItinerary()
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filterType, setFilterType] = useState<string>("all")

  const filteredItineraries = itineraries.filter(itinerary => {
    const matchesSearch = itinerary.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         itinerary.destination.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || itinerary.travelType === filterType
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Explore Itineraries</h1>
          <p className="text-muted-foreground">
            Discover amazing travel plans created by fellow travelers
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search itineraries by destination or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filterType === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("all")}
            >
              All
            </Button>
            <Button
              variant={filterType === "solo" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("solo")}
            >
              Solo
            </Button>
            <Button
              variant={filterType === "couple" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("couple")}
            >
              Couple
            </Button>
            <Button
              variant={filterType === "family" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("family")}
            >
              Family
            </Button>
            <Button
              variant={filterType === "group" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("group")}
            >
              Group
            </Button>
          </div>
        </div>

        {/* Itineraries Grid/List */}
        <div className={
          viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }>
          {filteredItineraries.map((itinerary) => (
            <Card key={itinerary.id} className="hover:shadow-lg transition-shadow group">
              <div className="relative">
                <img
                  src={`https://images.unsplash.com/photo-1558862107-d49ef2a04d72?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D `}
                  alt={itinerary.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button size="icon" variant="secondary" className="h-8 w-8">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="h-8 w-8">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-background/80">
                    {itinerary.duration} days
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-1">{itinerary.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {itinerary.destination}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-3">
                  {/* Author */}
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={itinerary.author.avatar} />
                      <AvatarFallback className="text-xs">
                        {itinerary.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      by {itinerary.author.name}
                    </span>
                  </div>

                  {/* Trip Details */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {itinerary.travelers} traveler{itinerary.travelers > 1 ? 's' : ''}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {itinerary.duration} days
                    </div>
                  </div>

                  {/* Activities Preview */}
                  <div className="text-sm text-muted-foreground">
                    {itinerary.days[0]?.activities.length || 0} activities planned
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="mr-2 h-3 w-3" />
                      View Details
                    </Button>
                    <Button size="sm" className="flex-1">
                      Use as Template
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItineraries.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium">No itineraries found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
