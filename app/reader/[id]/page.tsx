"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, List, Maximize2, Minimize2, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function ComicReaderPage({ params }: { params: { id: string } }) {
  const [currentPage, setCurrentPage] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(100)
  const [viewMode, setViewMode] = useState<"single" | "double">("single")

  // This would come from your database in a real application
  const comic = {
    id: Number.parseInt(params.id),
    title: "The Adventure Begins",
    pages: 24,
    pageImages: Array(24)
      .fill(0)
      .map((_, i) => `/placeholder.svg?height=800&width=600&text=Page ${i + 1}`),
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  const goToNextPage = () => {
    if (currentPage < comic.pages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 0 && pageNumber < comic.pages) {
      setCurrentPage(pageNumber)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <header className="bg-gray-900 py-3 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href={`/comics/${params.id}`} className="mr-4 hover:text-purple-400">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-xl font-bold truncate">{comic.title}</h1>
          </div>

          <div className="flex items-center space-x-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <List className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Pages</SheetTitle>
                </SheetHeader>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {comic.pageImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToPage(index)}
                      className={`relative aspect-[3/4] rounded overflow-hidden border-2 ${
                        currentPage === index ? "border-purple-500" : "border-transparent"
                      }`}
                    >
                      <img
                        src={`/placeholder.svg?height=150&width=100&text=Page ${index + 1}`}
                        alt={`Page ${index + 1} thumbnail`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-center text-xs py-1">
                        {index + 1}
                      </div>
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="p-2">
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Zoom: {zoomLevel}%</p>
                    <Slider
                      value={[zoomLevel]}
                      min={50}
                      max={200}
                      step={10}
                      onValueChange={(value) => setZoomLevel(value[0])}
                      className="w-full"
                    />
                  </div>
                  <div className="mb-2">
                    <p className="text-sm font-medium mb-2">View Mode</p>
                    <div className="flex space-x-2">
                      <Button
                        variant={viewMode === "single" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("single")}
                        className="flex-1"
                      >
                        Single
                      </Button>
                      <Button
                        variant={viewMode === "double" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("double")}
                        className="flex-1"
                      >
                        Double
                      </Button>
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
              {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col bg-black">
        <div className="flex-1 flex items-center justify-center relative">
          {/* Left page navigation */}
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 0}
            className="absolute left-0 top-0 bottom-0 w-1/5 flex items-center justify-start pl-4 opacity-0 hover:opacity-100 transition-opacity disabled:opacity-0"
            aria-label="Previous page"
          >
            <div className="bg-black/50 rounded-full p-3">
              <ChevronLeft className="h-8 w-8" />
            </div>
          </button>

          {/* Comic page display */}
          <div
            className="h-full flex items-center justify-center p-4"
            style={{ maxWidth: "100vw", maxHeight: "100vh" }}
          >
            {viewMode === "single" ? (
              <img
                src={comic.pageImages[currentPage] || "/placeholder.svg"}
                alt={`${comic.title} - Page ${currentPage + 1}`}
                className="max-h-full object-contain transition-transform"
                style={{ transform: `scale(${zoomLevel / 100})` }}
              />
            ) : (
              <div className="flex">
                {currentPage > 0 && (
                  <img
                    src={comic.pageImages[currentPage - 1] || "/placeholder.svg"}
                    alt={`${comic.title} - Page ${currentPage}`}
                    className="max-h-full object-contain mr-2 transition-transform"
                    style={{ transform: `scale(${zoomLevel / 100})` }}
                  />
                )}
                <img
                  src={comic.pageImages[currentPage] || "/placeholder.svg"}
                  alt={`${comic.title} - Page ${currentPage + 1}`}
                  className="max-h-full object-contain transition-transform"
                  style={{ transform: `scale(${zoomLevel / 100})` }}
                />
              </div>
            )}
          </div>

          {/* Right page navigation */}
          <button
            onClick={goToNextPage}
            disabled={currentPage === comic.pages - 1}
            className="absolute right-0 top-0 bottom-0 w-1/5 flex items-center justify-end pr-4 opacity-0 hover:opacity-100 transition-opacity disabled:opacity-0"
            aria-label="Next page"
          >
            <div className="bg-black/50 rounded-full p-3">
              <ChevronRight className="h-8 w-8" />
            </div>
          </button>
        </div>

        <div className="bg-gray-900 py-2 px-4 flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPrevPage}
            disabled={currentPage === 0}
            className="flex items-center"
          >
            <ArrowLeft className="mr-1 h-4 w-4" /> Previous
          </Button>

          <div className="text-center">
            <span className="text-sm">
              Page {currentPage + 1} of {comic.pages}
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={goToNextPage}
            disabled={currentPage === comic.pages - 1}
            className="flex items-center"
          >
            Next <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  )
}
