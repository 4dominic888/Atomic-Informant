import Link from "next/link"
import { ArrowLeft, BookOpen, Calendar, Clock, Download, Heart, Share2, Tag, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ComicDetailPage({ params }: { params: { id: string } }) {
  // This would come from your database in a real application
  const comic = {
    id: Number.parseInt(params.id),
    title: "The Adventure Begins",
    cover: "/placeholder.svg?height=600&width=400",
    author: "Jane Doe",
    artist: "Mike Johnson",
    publisher: "Cosmic Comics",
    tags: ["Adventure", "Fantasy", "Action"],
    pages: 24,
    publishedAt: "May 15, 2023",
    description:
      "Follow the journey of young hero Alex as they embark on an epic adventure to save their world from an ancient evil. This first issue sets the stage for an unforgettable saga filled with magic, mystery, and mayhem.",
    background: "bg-gradient-to-r from-purple-500 to-blue-500",
    rating: 4.8,
    pageImages: Array(24)
      .fill(0)
      .map((_, i) => `/placeholder.svg?height=800&width=600&text=Page ${i + 1}`),
  }

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
        <Link href="/" className="inline-flex items-center text-purple-400 mb-6 hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>

        <div className={`rounded-xl p-8 mb-8 ${comic.background}`}>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 lg:w-1/4 mb-6 md:mb-0 md:mr-8">
              <img src={comic.cover || "/placeholder.svg"} alt={comic.title} className="w-full rounded-lg shadow-lg" />
            </div>
            <div className="md:w-2/3 lg:w-3/4">
              <h1 className="text-4xl font-bold mb-2">{comic.title}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                {comic.tags.map((tag) => (
                  <Badge key={tag} className="bg-white/20 hover:bg-white/30">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <div className="flex items-center text-gray-300 mb-1">
                    <User className="mr-2 h-4 w-4" /> Author
                  </div>
                  <div>{comic.author}</div>
                </div>
                <div>
                  <div className="flex items-center text-gray-300 mb-1">
                    <User className="mr-2 h-4 w-4" /> Artist
                  </div>
                  <div>{comic.artist}</div>
                </div>
                <div>
                  <div className="flex items-center text-gray-300 mb-1">
                    <Calendar className="mr-2 h-4 w-4" /> Published
                  </div>
                  <div>{comic.publishedAt}</div>
                </div>
                <div>
                  <div className="flex items-center text-gray-300 mb-1">
                    <BookOpen className="mr-2 h-4 w-4" /> Pages
                  </div>
                  <div>{comic.pages} pages</div>
                </div>
              </div>

              <p className="text-lg mb-6">{comic.description}</p>

              <div className="flex flex-wrap gap-3">
                <Button className="bg-purple-600 hover:bg-purple-700">Read Now</Button>
                <Button variant="outline" className="border-white">
                  <Heart className="mr-2 h-4 w-4" /> Add to Favorites
                </Button>
                <Button variant="outline" className="border-white">
                  <Download className="mr-2 h-4 w-4" /> Download
                </Button>
                <Button variant="outline" className="border-white">
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="reader" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="reader">Comic Reader</TabsTrigger>
            <TabsTrigger value="details">Details & Info</TabsTrigger>
          </TabsList>
          <TabsContent value="reader" className="mt-6">
            <div className="bg-gray-900 rounded-xl p-4 md:p-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Comic Reader</h2>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    Previous Page
                  </Button>
                  <span className="px-3">Page 1 of {comic.pages}</span>
                  <Button variant="outline" size="sm">
                    Next Page
                  </Button>
                </div>
              </div>

              <div className="bg-black rounded-lg overflow-hidden max-w-4xl mx-auto">
                <img
                  src={comic.pageImages[0] || "/placeholder.svg"}
                  alt={`${comic.title} - Page 1`}
                  className="w-full h-auto"
                />
              </div>

              <div className="mt-6 flex justify-center">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    First
                  </Button>
                  <Button variant="outline" size="sm">
                    Previous
                  </Button>
                  <div className="flex overflow-x-auto space-x-1 px-2 py-1 bg-gray-800 rounded-md max-w-md">
                    {comic.pageImages.map((_, index) => (
                      <Button
                        key={index}
                        variant={index === 0 ? "default" : "ghost"}
                        size="sm"
                        className="min-w-[40px]"
                      >
                        {index + 1}
                      </Button>
                    ))}
                  </div>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                  <Button variant="outline" size="sm">
                    Last
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="details" className="mt-6">
            <div className="bg-gray-900 rounded-xl p-8">
              <h2 className="text-xl font-bold mb-4">Comic Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Publication Info</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between">
                      <span className="text-gray-400">Title:</span>
                      <span>{comic.title}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-400">Author:</span>
                      <span>{comic.author}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-400">Artist:</span>
                      <span>{comic.artist}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-400">Publisher:</span>
                      <span>{comic.publisher}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-400">Release Date:</span>
                      <span>{comic.publishedAt}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-400">Pages:</span>
                      <span>{comic.pages}</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Tags & Categories</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {comic.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-sm">
                        <Tag className="mr-1 h-3 w-3" /> {tag}
                      </Badge>
                    ))}
                  </div>

                  <h3 className="text-lg font-semibold mb-3 mt-6">Rating & Reviews</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center mr-2">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(comic.rating) ? "text-yellow-400" : "text-gray-600"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                    </div>
                    <span className="text-lg font-bold">{comic.rating}</span>
                    <span className="text-gray-400 ml-2">(42 reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Similar Comics</h2>
            <Button variant="link" className="text-purple-400">
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <Link href={`/comics/${i + 2}`} key={i} className="group">
                  <div
                    className={`rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105 bg-gradient-to-r ${
                      i % 4 === 0
                        ? "from-blue-600 to-indigo-800"
                        : i % 4 === 1
                          ? "from-red-500 to-orange-500"
                          : i % 4 === 2
                            ? "from-emerald-500 to-teal-700"
                            : "from-pink-500 to-purple-700"
                    }`}
                  >
                    <div className="p-3 h-full flex flex-col">
                      <div className="relative aspect-[3/4] mb-3 overflow-hidden rounded">
                        <img
                          src={`/placeholder.svg?height=400&width=300&text=Comic ${i + 2}`}
                          alt={`Similar Comic ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-bold text-lg mb-1 line-clamp-1">Similar Comic {i + 1}</h3>
                      <p className="text-sm text-gray-300 mb-2">by Author {i + 1}</p>
                      <div className="mt-auto flex justify-between text-xs text-gray-300">
                        <span className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" /> 2023
                        </span>
                        <span>24 pages</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© 2023 Comic Vault. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
