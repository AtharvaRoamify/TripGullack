import { Button } from "../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Input } from "../components/ui/input"
import { 
  ArrowRight, 
  MapPin, 
  Clock, 
  Users, 
  Star,
  Globe,
  Shield,
  Heart,
  Search,
  ChevronRight
} from "lucide-react"

export function LandingPage() {
  return (
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6">
              New: AI-Powered Trip Planning
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Discover Your Next
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {" "}Adventure
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              Plan unforgettable journeys with our comprehensive travel platform. 
              From exotic destinations to local gems, we make every trip extraordinary.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search destinations, activities, or experiences..."
                  className="w-full pl-12 pr-4 py-6 text-lg h-14"
                />
                <Button size="lg" className="absolute right-2 top-2 h-10">
                  Search
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>1M+ Travelers</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>195 Countries</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                <span>4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Why Choose TripGullack?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide everything you need for the perfect travel experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Global Destinations</CardTitle>
                <CardDescription>
                  Access to thousands of destinations worldwide with detailed guides and recommendations
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Safe & Secure</CardTitle>
                <CardDescription>
                  Your safety is our priority with verified accommodations and 24/7 support
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Real-time Updates</CardTitle>
                <CardDescription>
                  Stay informed with live updates on weather, flights, and local conditions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Community Driven</CardTitle>
                <CardDescription>
                  Connect with fellow travelers and share experiences from around the world
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Personalized Experience</CardTitle>
                <CardDescription>
                  Get customized recommendations based on your preferences and travel history
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Premium Quality</CardTitle>
                <CardDescription>
                  Curated experiences and premium services for discerning travelers
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section id="destinations" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Popular Destinations
            </h2>
            <p className="text-xl text-muted-foreground">
              Discover the world's most beautiful places
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="relative h-64 bg-gradient-to-br from-blue-400 to-blue-600">
                <img 
                  src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2038&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Santorini, Greece"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute top-4 left-4">
                  <Badge className="bg-background/80 text-foreground">3 Days</Badge>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white">
                    <MapPin className="h-4 w-4" />
                    <span className="font-medium">Santorini, Greece</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Weekend Getaway to Santorini
                </h3>
                <p className="text-muted-foreground mb-4">
                  Experience the stunning sunsets and white-washed buildings of this iconic Greek island.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">$1,299</span>
                  <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground">
                    Explore
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="relative h-64 bg-gradient-to-br from-green-400 to-green-600">
                <img 
                  src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop" 
                  alt="Kyoto, Japan"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute top-4 left-4">
                  <Badge className="bg-background/80 text-foreground">5 Days</Badge>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white">
                    <MapPin className="h-4 w-4" />
                    <span className="font-medium">Kyoto, Japan</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Cultural Journey to Kyoto
                </h3>
                <p className="text-muted-foreground mb-4">
                  Immerse yourself in traditional Japanese culture and beautiful cherry blossoms.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">$2,199</span>
                  <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground">
                    Explore
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
               {/* {This section has to be dynamic, replace with fetched data} */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="relative h-64 bg-gradient-to-br from-purple-400 to-purple-600">
                <img 
                  src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop" 
                  alt="Reykjavik, Iceland"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute top-4 left-4">
                  <Badge className="bg-background/80 text-foreground">4 Days</Badge>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white">
                    <MapPin className="h-4 w-4" />
                    <span className="font-medium">Reykjavik, Iceland</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Northern Lights Adventure
                </h3>
                <p className="text-muted-foreground mb-4">
                  Witness the Northern Lights and explore Iceland's dramatic landscapes.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">$1,899</span>
                  <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground">
                    Explore
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of travelers who trust TripGullack for their dream trips
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="bg-background border-t py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">TG</span>
                </div>
                <span className="text-2xl font-bold">TripGullack</span>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md">
                Making travel dreams come true with personalized experiences, 
                verified accommodations, and 24/7 support.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#home" className="text-muted-foreground hover:text-foreground transition-colors">Home</a></li>
                <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#destinations" className="text-muted-foreground hover:text-foreground transition-colors">Destinations</a></li>
                <li><a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-12 pt-8 text-center">
            <p className="text-muted-foreground">
              © 2024 TripGullack. All rights reserved. Made with ❤️ for travelers worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}