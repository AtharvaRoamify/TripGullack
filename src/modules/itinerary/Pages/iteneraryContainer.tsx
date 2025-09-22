import { useState } from "react"
import { ItineraryDashboard } from "./IteneraryList"
import { ItineraryCreatorPage } from "./ItineraryCreatorPage"
import type { Itinerary } from "../Stores/Types"

export function ItineraryContainer() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'create' | 'edit'>('dashboard')
  const [editingItinerary, setEditingItinerary] = useState<Itinerary | null>(null)

  const handleCreateNew = () => {
    setEditingItinerary(null)
    setCurrentView('create')
  }

  const handleEditItinerary = (itinerary: Itinerary) => {
    setEditingItinerary(itinerary)
    setCurrentView('edit')
  }

  const handleBackToDashboard = () => {
    setEditingItinerary(null)
    setCurrentView('dashboard')
  }

  const handleSaveComplete = () => {
    // Show a success message or redirect
    setCurrentView('dashboard')
    setEditingItinerary(null)
  }

  return (
    <>
      {currentView === 'dashboard' && (
        <ItineraryDashboard
          onCreateNew={handleCreateNew}
          onEditItinerary={handleEditItinerary}
        />
      )}
      
      {(currentView === 'create' || currentView === 'edit') && (
        <ItineraryCreatorPage
          editItinerary={editingItinerary || undefined}
          onBack={handleBackToDashboard}
          onSave={handleSaveComplete}
        />
      )}
    </>
  )
}