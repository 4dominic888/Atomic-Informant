import Link from "next/link"
import { ArrowRight, Clock, Star, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  // This would come from your database in a real application
  const recentComics = [
    {
      id: 1,
      title: "The Adventure Begins",
      cover: "/placeholder.svg?height=400&width=300",
      author: "Jane Doe",
      tags: ["Adventure", "Fantasy"],
      pages: 24,
      publishedAt: "2023-05-15",
      background: "bg-gradient-to-r from-purple-500 to-blue-500",
    },
    {
      id: 2,
      title: "City of Shadows",
      cover: "/placeholder.svg?height=400&width=300",
      author: "John Smith",
      tags: ["Mystery", "Noir"],
      pages: 32,
      publishedAt: "2023-05-10",
      background: "bg-gradient-to-r from-gray-800 to-gray-900",
    },
    {
      id: 3,
      title: "Stellar Odyssey",
      cover: "/placeholder.svg?height=400&width=300",
      author: "Alex Chen",
      tags: ["Sci-Fi", "Space"],
      pages: 28,
      publishedAt: "2023-05-05",
      background: "bg-gradient-to-r from-blue-600 to-indigo-800",
    },
    {
      id: 4,
      title: "Heroes of Tomorrow",
      cover: "/placeholder.svg?height=400&width=300",
      author: "Maria Garcia",
      tags: ["Superhero", "Action"],
      pages: 30,
      publishedAt: "2023-04-28",
      background: "bg-gradient-to-r from-red-500 to-orange-500",
    },
    {
      id: 5,
      title: "Mystic Realms",
      cover: "/placeholder.svg?height=400&width=300",
      author: "David Kim",
      tags: ["Fantasy", "Magic"],
      pages: 26,
      publishedAt: "2023-04-20",
      background: "bg-gradient-to-r from-emerald-500 to-teal-700",
    },
    {
      id: 6,
      title: "Cybernetic Dreams",
      cover: "/placeholder.svg?height=400&width=300",
      author: "Sarah Johnson",
      tags: ["Cyberpunk", "Dystopian"],
      pages: 34,
      publishedAt: "2023-04-15",
      background: "bg-gradient-to-r from-pink-500 to-purple-700",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="bg-gray-900 py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Comic Vault</h1>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="hover:text-purple-400 transition">
                Home
              </Link>
              <Link href="/browse" className="hover:text-purple-400 transition">
                Browse
              </Link>
              <Link href="/popular" className="hover:text-purple-400 transition">
                Popular
              </Link>
              <Link href="/new" className="hover:text-purple-400 transition">
                New Releases
              </Link>
            </nav>
            <Button variant="outline" className="text-white border-purple-500 hover:bg-purple-500">
              Sign In
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recently Added</h2>
            <Button variant="link" className="text-purple-400 flex items-center">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {recentComics.map((comic) => (
              <Link href={`/comics/${comic.id}`} key={comic.id} className="group">
                <div
                  className={`rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105 ${comic.background}`}
                >
                  <div className="p-3 h-full flex flex-col">
                    <div className="relative aspect-[3/4] mb-3 overflow-hidden rounded">
                      <img
                        src={comic.cover || "/placeholder.svg"}
                        alt={comic.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-bold text-lg mb-1 line-clamp-1">{comic.title}</h3>
                    <p className="text-sm text-gray-300 mb-2">by {comic.author}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {comic.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-auto flex justify-between text-xs text-gray-300">
                      <span className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" /> {comic.publishedAt}
                      </span>
                      <span>{comic.pages} pages</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Popular Comics</h2>
            <Button variant="link" className="text-purple-400 flex items-center">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {recentComics
              .slice(3)
              .concat(recentComics.slice(0, 3))
              .map((comic) => (
                <Link href={`/comics/${comic.id}`} key={comic.id} className="group">
                  <div
                    className={`rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105 ${comic.background}`}
                  >
                    <div className="p-3 h-full flex flex-col">
                      <div className="relative aspect-[3/4] mb-3 overflow-hidden rounded">
                        <img
                          src={comic.cover || "/placeholder.svg"}
                          alt={comic.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-yellow-500 text-black rounded-full p-1">
                          <Star className="h-4 w-4 fill-current" />
                        </div>
                      </div>
                      <h3 className="font-bold text-lg mb-1 line-clamp-1">{comic.title}</h3>
                      <p className="text-sm text-gray-300 mb-2">by {comic.author}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {comic.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-auto flex justify-between text-xs text-gray-300">
                        <span className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" /> {comic.publishedAt}
                        </span>
                        <span>{comic.pages} pages</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="bg-gradient-to-r from-purple-800 to-blue-700 rounded-xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h2 className="text-3xl font-bold mb-4">Discover New Comics Every Week</h2>
                <p className="text-gray-200 mb-6">Get notified when new comics are added to our collection.</p>
                <Button className="bg-white text-purple-800 hover:bg-gray-200">Subscribe Now</Button>
              </div>
              <img
                src="/placeholder.svg?height=200&width=300"
                alt="Comic subscription"
                className="rounded-lg w-full max-w-sm"
              />
            </div>
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Browse by Genre</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              "Adventure",
              "Fantasy",
              "Sci-Fi",
              "Horror",
              "Comedy",
              "Romance",
              "Superhero",
              "Mystery",
              "Historical",
              "Slice of Life",
              "Action",
              "Drama",
            ].map((genre) => (
              <Link
                href={`/genre/${genre.toLowerCase()}`}
                key={genre}
                className="bg-gray-800 rounded-lg p-4 text-center hover:bg-gray-700 transition"
              >
                <Tag className="h-6 w-6 mx-auto mb-2" />
                <span>{genre}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Comic Vault</h3>
              <p className="text-gray-400">Your ultimate destination for digital comics.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Explore</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/browse" className="hover:text-white">
                    Browse Comics
                  </Link>
                </li>
                <li>
                  <Link href="/new" className="hover:text-white">
                    New Releases
                  </Link>
                </li>
                <li>
                  <Link href="/popular" className="hover:text-white">
                    Popular
                  </Link>
                </li>
                <li>
                  <Link href="/genres" className="hover:text-white">
                    Genres
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Account</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/login" className="hover:text-white">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:text-white">
                    Register
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="hover:text-white">
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link href="/favorites" className="hover:text-white">
                    My Favorites
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>© 2023 Comic Vault. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
