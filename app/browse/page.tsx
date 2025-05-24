import Link from "next/link"
import { Filter, Search, SortAsc, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function BrowsePage() {
  // This would come from your database in a real application
  const comics = Array(20)
    .fill(0)
    .map((_, i) => ({
      id: i + 1,
      title: `Comic Title ${i + 1}`,
      cover: `/placeholder.svg?height=400&width=300&text=Comic ${i + 1}`,
      author: `Author ${(i % 5) + 1}`,
      tags: [
        ["Adventure", "Fantasy", "Action"][i % 3],
        ["Sci-Fi", "Mystery", "Horror"][i % 3],
        ["Comedy", "Romance", "Drama"][i % 3],
      ],
      pages: 20 + (i % 15),
      publishedAt: `May ${i + 1}, 2023`,
      background: [
        "bg-gradient-to-r from-purple-500 to-blue-500",
        "bg-gradient-to-r from-blue-600 to-indigo-800",
        "bg-gradient-to-r from-red-500 to-orange-500",
        "bg-gradient-to-r from-emerald-500 to-teal-700",
        "bg-gradient-to-r from-pink-500 to-purple-700",
      ][i % 5],
    }))

  const genres = [
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
              <Link href="/browse" className="hover:text-purple-400 transition font-bold text-purple-400">
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
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Browse Comics</h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <div className="bg-gray-900 rounded-xl p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Filters</h3>
                <Button variant="ghost" size="sm">
                  Reset
                </Button>
              </div>

              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder="Search comics..." className="pl-10 bg-gray-800 border-gray-700" />
                </div>
              </div>

              <Accordion type="multiple" className="w-full">
                <AccordionItem value="genres">
                  <AccordionTrigger className="text-lg font-medium">
                    <div className="flex items-center">
                      <Tag className="mr-2 h-4 w-4" /> Genres
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {genres.map((genre) => (
                        <Badge key={genre} variant="outline" className="cursor-pointer hover:bg-gray-700">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="status">
                  <AccordionTrigger className="text-lg font-medium">
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" /> Status
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="completed"
                          className="mr-2 rounded text-purple-500 focus:ring-purple-500"
                        />
                        <label htmlFor="completed">Completed</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="ongoing"
                          className="mr-2 rounded text-purple-500 focus:ring-purple-500"
                        />
                        <label htmlFor="ongoing">Ongoing</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="hiatus"
                          className="mr-2 rounded text-purple-500 focus:ring-purple-500"
                        />
                        <label htmlFor="hiatus">On Hiatus</label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="year">
                  <AccordionTrigger className="text-lg font-medium">
                    <div className="flex items-center">
                      <SortAsc className="mr-2 h-4 w-4" /> Release Year
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 mt-2">
                      <Select>
                        <SelectTrigger className="w-full bg-gray-800 border-gray-700">
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2023">2023</SelectItem>
                          <SelectItem value="2022">2022</SelectItem>
                          <SelectItem value="2021">2021</SelectItem>
                          <SelectItem value="2020">2020</SelectItem>
                          <SelectItem value="older">2019 & Older</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-6">
                <Button className="w-full">Apply Filters</Button>
              </div>
            </div>
          </div>

          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-gray-400">
                Showing <span className="font-medium text-white">1-20</span> of{" "}
                <span className="font-medium text-white">156</span> comics
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-sm">Sort by:</span>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="az">A-Z</SelectItem>
                    <SelectItem value="za">Z-A</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {comics.map((comic) => (
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
                        <span>{comic.publishedAt}</span>
                        <span>{comic.pages} pages</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <nav className="flex items-center space-x-2">
                <Button variant="outline" size="icon" disabled>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Button>
                <Button variant="default" size="icon" className="bg-purple-600 hover:bg-purple-700">
                  1
                </Button>
                <Button variant="outline" size="icon">
                  2
                </Button>
                <Button variant="outline" size="icon">
                  3
                </Button>
                <Button variant="outline" size="icon">
                  4
                </Button>
                <Button variant="outline" size="icon">
                  5
                </Button>
                <Button variant="outline" size="icon">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </nav>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© 2023 Comic Vault. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
