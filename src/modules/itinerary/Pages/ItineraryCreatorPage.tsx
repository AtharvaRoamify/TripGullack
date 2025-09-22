import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Textarea } from "../../../components/ui/textarea" 
import { Badge } from "../../../components/ui/badge"
import { useItinerary } from "../Stores/iteneraryHook"
import { ItineraryPreviewModal } from "./iteneraryPriview"
import { 
  Plus, 
  MapPin, 
  Clock, 
  DollarSign, 
  Trash2,
  Save,
  Eye,
  ChevronDown,
  ChevronUp,
  ArrowLeft
} from "lucide-react"
import type { Activity, Day, Itinerary } from "../Stores/Types"

interface ItineraryCreatorPageProps {
  editItinerary?: Itinerary
  onBack?: () => void
  onSave?: () => void
}

export function ItineraryCreatorPage({ editItinerary, onBack, onSave }: ItineraryCreatorPageProps) {
  const { createItinerary, updateItinerary } = useItinerary()
  const [currentStep, setCurrentStep] = useState<'overview' | 'planning'>('overview')
  const [expandedDay, setExpandedDay] = useState<string | null>(null)
  
  // Overview form state
  const [overview, setOverview] = useState({
    title: '',
    destination: '',
    duration: 1,
    travelers: 1,
    travelType: 'solo' as 'solo' | 'couple' | 'family' | 'group' | 'business',
    hotelCategory: 'budget' as 'budget' | 'mid-range' | 'luxury'
  })

  // Days state
  const [days, setDays] = useState<Day[]>([])

  // Activity form state
  const [activityForm, setActivityForm] = useState<Partial<Activity>>({
    type: 'sightseeing',
    title: '',
    time: '',
    duration: 1,
    cost: 0,
    location: '',
    description: ''
  })

  // Load existing itinerary for editing
  useEffect(() => {
    if (editItinerary) {
      setOverview({
        title: editItinerary.title,
        destination: editItinerary.destination,
        duration: editItinerary.duration,
        travelers: editItinerary.travelers,
        travelType: editItinerary.travelType,
        hotelCategory: editItinerary.hotelCategory
      })
      setDays(editItinerary.days)
      setCurrentStep('planning') // Skip to planning if editing
    }
  }, [editItinerary])

  const handleOverviewSubmit = () => {
    // Create initial days array if not editing
    if (!editItinerary) {
      const initialDays: Day[] = Array.from({ length: overview.duration }, (_, index) => ({
        id: `day-${index + 1}`,
        date: '',
        destination: '',
        activities: []
      }))
      setDays(initialDays)
    }
    setCurrentStep('planning')
  }

  const handleAddActivity = (dayId: string) => {
    if (!activityForm.title || !activityForm.time) return

    const newActivity: Activity = {
      id: `activity-${Date.now()}`,
      type: activityForm.type as Activity['type'],
      title: activityForm.title,
      time: activityForm.time,
      duration: activityForm.duration || 1,
      cost: activityForm.cost || 0,
      location: activityForm.location || '',
      description: activityForm.description || ''
    }

    setDays(prev => prev.map(day => 
      day.id === dayId 
        ? { ...day, activities: [...day.activities, newActivity] }
        : day
    ))

    // Reset form
    setActivityForm({
      type: 'sightseeing',
      title: '',
      time: '',
      duration: 1,
      cost: 0,
      location: '',
      description: ''
    })
  }

  const handleRemoveActivity = (dayId: string, activityId: string) => {
    setDays(prev => prev.map(day => 
      day.id === dayId 
        ? { ...day, activities: day.activities.filter(act => act.id !== activityId) }
        : day
    ))
  }

  const handleSaveItinerary = () => {
    const itinerary = {
      ...overview,
      days,
      author: {
        id: 'current-user',
        name: 'Current User',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
      },
      isPublic: true
    }
    
    if (editItinerary) {
      updateItinerary(editItinerary.id, itinerary)
    } else {
      createItinerary(itinerary)
    }
    
    onSave?.()
  }

  // Create preview data
  const previewItinerary = {
    ...overview,
    days
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            {onBack && (
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {editItinerary ? 'Edit Itinerary' : 'Create Your Itinerary'}
              </h1>
              <p className="text-muted-foreground">
                {editItinerary ? 'Update your travel plan' : 'Plan your perfect trip step by step'}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${currentStep === 'overview' ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'overview' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                1
              </div>
              <span className="font-medium">Overview</span>
            </div>
            <div className="flex-1 h-px bg-border"></div>
            <div className={`flex items-center space-x-2 ${currentStep === 'planning' ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'planning' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                2
              </div>
              <span className="font-medium">Day Planning</span>
            </div>
          </div>
        </div>

        {currentStep === 'overview' && (
          <Card>
            <CardHeader>
              <CardTitle>Itinerary Overview</CardTitle>
              <CardDescription>
                Start by providing the basic details of your trip
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Trip Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Summer Trip to Paris"
                    value={overview.title}
                    onChange={(e) => setOverview(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    placeholder="e.g., Paris, France"
                    value={overview.destination}
                    onChange={(e) => setOverview(prev => ({ ...prev, destination: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (days)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    placeholder="e.g., 7"
                    value={overview.duration}
                    onChange={(e) => setOverview(prev => ({ ...prev, duration: parseInt(e.target.value) || 1 }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="travelers">Travelers</Label>
                  <Input
                    id="travelers"
                    type="number"
                    min="1"
                    placeholder="e.g., 2"
                    value={overview.travelers}
                    onChange={(e) => setOverview(prev => ({ ...prev, travelers: parseInt(e.target.value) || 1 }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="travelType">Travel Type</Label>
                  <Select value={overview.travelType} onValueChange={(value: any) => setOverview(prev => ({ ...prev, travelType: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solo">Solo</SelectItem>
                      <SelectItem value="couple">Couple</SelectItem>
                      <SelectItem value="family">Family</SelectItem>
                      <SelectItem value="group">Group</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hotelCategory">Hotel Category</Label>
                  <Select value={overview.hotelCategory} onValueChange={(value: any) => setOverview(prev => ({ ...prev, hotelCategory: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="budget">Budget</SelectItem>
                      <SelectItem value="mid-range">Mid-range</SelectItem>
                      <SelectItem value="luxury">Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleOverviewSubmit} className="w-full">
                Continue to Day Planning
              </Button>
            </CardContent>
          </Card>
        )}

        {currentStep === 'planning' && (
          <div className="space-y-6">
            {/* Back to Overview Button */}
            <div className="flex justify-between items-center">
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep('overview')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Overview
              </Button>
              
              {/* Preview Button */}
              <ItineraryPreviewModal 
                itinerary={previewItinerary}
                trigger={
                  <Button variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview Itinerary
                  </Button>
                }
              />
            </div>

            {days.map((day, index) => (
              <Card key={day.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        Day {index + 1}
                        <Badge variant="outline">{day.activities.length} activities</Badge>
                      </CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setExpandedDay(expandedDay === day.id ? null : day.id)}
                    >
                      {expandedDay === day.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardHeader>
                
                {expandedDay === day.id && (
                  <CardContent className="space-y-6">
                    {/* Day Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`date-${day.id}`}>Date</Label>
                        <Input
                          id={`date-${day.id}`}
                          type="date"
                          value={day.date}
                          onChange={(e) => setDays(prev => prev.map(d => 
                            d.id === day.id ? { ...d, date: e.target.value } : d
                          ))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`destination-${day.id}`}>Destination</Label>
                        <Input
                          id={`destination-${day.id}`}
                          placeholder="e.g., Eiffel Tower District"
                          value={day.destination}
                          onChange={(e) => setDays(prev => prev.map(d => 
                            d.id === day.id ? { ...d, destination: e.target.value } : d
                          ))}
                        />
                      </div>
                    </div>

                    {/* Activities List */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Activities</h4>
                      {day.activities.map((activity) => (
                        <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h5 className="font-medium">{activity.title}</h5>
                              <Badge variant="secondary">{activity.type}</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {activity.time}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {activity.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3" />
                                ${activity.cost}
                              </span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveActivity(day.id, activity.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    {/* Add Activity Form */}
                    <Card className="bg-muted/50">
                      <CardHeader>
                        <CardTitle className="text-lg">Add Activity</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Activity Type</Label>
                            <Select value={activityForm.type} onValueChange={(value: any) => setActivityForm(prev => ({ ...prev, type: value }))}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="sightseeing">Sightseeing</SelectItem>
                                <SelectItem value="dining">Dining</SelectItem>
                                <SelectItem value="entertainment">Entertainment</SelectItem>
                                <SelectItem value="shopping">Shopping</SelectItem>
                                <SelectItem value="transport">Transport</SelectItem>
                                <SelectItem value="accommodation">Accommodation</SelectItem>
                                <SelectItem value="custom">Custom</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Title</Label>
                            <Input
                              placeholder="e.g., Dinner at Le Procope"
                              value={activityForm.title}
                              onChange={(e) => setActivityForm(prev => ({ ...prev, title: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Time</Label>
                            <Input
                              type="time"
                              value={activityForm.time}
                              onChange={(e) => setActivityForm(prev => ({ ...prev, time: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Duration (hours)</Label>
                            <Input
                              type="number"
                              min="0.5"
                              step="0.5"
                              placeholder="e.g., 2"
                              value={activityForm.duration}
                              onChange={(e) => setActivityForm(prev => ({ ...prev, duration: parseFloat(e.target.value) || 1 }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Cost ($)</Label>
                            <Input
                              type="number"
                              min="0"
                              placeholder="e.g., 150"
                              value={activityForm.cost}
                              onChange={(e) => setActivityForm(prev => ({ ...prev, cost: parseFloat(e.target.value) || 0 }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Location</Label>
                            <Input
                              placeholder="e.g., Le Procope"
                              value={activityForm.location}
                              onChange={(e) => setActivityForm(prev => ({ ...prev, location: e.target.value }))}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Textarea
                            placeholder="e.g., Oldest cafe in Paris"
                            value={activityForm.description}
                            onChange={(e) => setActivityForm(prev => ({ ...prev, description: e.target.value }))}
                          />
                        </div>
                        <Button 
                          onClick={() => handleAddActivity(day.id)}
                          className="w-full"
                          disabled={!activityForm.title || !activityForm.time}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Activity
                        </Button>
                      </CardContent>
                    </Card>
                  </CardContent>
                )}
              </Card>
            ))}

            {/* Save Itinerary */}
            <div className="flex gap-4">
              <Button onClick={handleSaveItinerary} className="flex-1">
                <Save className="mr-2 h-4 w-4" />
                {editItinerary ? 'Update Itinerary' : 'Save Itinerary'}
              </Button>
              <ItineraryPreviewModal 
                itinerary={previewItinerary}
                trigger={
                  <Button variant="outline" className="flex-1">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}