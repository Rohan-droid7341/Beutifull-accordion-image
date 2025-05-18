"use client";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; // ShadCN Accordion
import NextImage from "next/image";
import { Progress as ShadCNProgress } from "@/components/ui/progress"; // ShadCN Progress
import { useEffect, useState, useRef } from "react";

// Import your images
import image1Src from "@/public/1.jpg";
import image2Src from "@/public/2.jpg"; // Ensure you have 2.jpg
import image3Src from "@/public/3.jpg"; // Ensure you have 3.jpg

const DURATION_PER_ITEM = 5000; // 5 seconds in milliseconds
const PROGRESS_ANIMATION_DURATION_MS = 4800; // Visual animation duration

// Updated data to include progress bar color classes
const accordionItemsData = [
  {
    id: "item-1",
    image: image1Src,
    progressKey: "item1",
    title: "Real-time Data Feeds",
    content: "Access reliable, decentralized oracles for up-to-date market data across various assets, essential for DeFi and other on-chain applications.",
    progressColorClass: "progress-bar-sky", // Tailwind: sky-500
  },
  {
    id: "item-2",
    image: image2Src,
    progressKey: "item2",
    title: "Verifiable Randomness",
    content: "Utilize provably fair and tamper-proof random number generation for gaming, NFTs, and any application requiring unbiased randomness.",
    progressColorClass: "progress-bar-emerald", // Tailwind: emerald-500
  },
  {
    id: "item-3",
    image: image3Src,
    progressKey: "item3",
    title: "Cross-Chain Connectivity",
    content: "Enable seamless communication and asset transfer between different blockchains, fostering an interoperable Web3 ecosystem.",
    progressColorClass: "progress-bar-fuchsia", // Tailwind: fuchsia-500
  },
];

export default function Page() {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [progressValues, setProgressValues] = useState<{ [key: string]: number }>(() => {
    const initialProgress: { [key: string]: number } = {};
    accordionItemsData.forEach(item => initialProgress[item.progressKey] = 0);
    return initialProgress;
  });
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);

  const timersRef = useRef<{ sequence?: NodeJS.Timeout; animation?: NodeJS.Timeout }>({});

  useEffect(() => {
    clearTimeout(timersRef.current.sequence);
    clearTimeout(timersRef.current.animation);

    if (currentSequenceIndex >= accordionItemsData.length) {
      // Optional: Loop back
      // setCurrentSequenceIndex(0);
      // if (currentSequenceIndex !==0) { // Prevent reset on initial load if looping from end
      //   setProgressValues(prev => {
      //     const nextProgress: { [key: string]: number } = {};
      //     accordionItemsData.forEach(item => nextProgress[item.progressKey] = 0);
      //     return nextProgress;
      //   });
      // }
      return;
    }

    const currentItem = accordionItemsData[currentSequenceIndex];
    setActiveItem(currentItem.id);

    setProgressValues(prev => {
      const nextProgress = { ...prev }; // Start from previous state if you want to keep other bars filled
      // For this effect, let's ensure all bars are reset conceptually, but only animate current.
      // To ensure the visual effect, only reset the one about to start or all if desired.
      accordionItemsData.forEach(itemData => {
         // Only reset if not looping and keeping previous filled. 
         // For the auto-sequence where only one is "filling", this logic might be simpler:
        if (itemData.progressKey !== currentItem.progressKey) {
             nextProgress[itemData.progressKey] = 0; // Or 100 if you want completed ones to stay full
        }
      });
      nextProgress[currentItem.progressKey] = 0; // Explicitly set current to 0 before animating
      return nextProgress;
    });

    timersRef.current.animation = setTimeout(() => {
      setProgressValues(prev => ({
        ...prev,
        [currentItem.progressKey]: 100,
      }));
    }, 50);

    timersRef.current.sequence = setTimeout(() => {
      setCurrentSequenceIndex(prevIndex => prevIndex + 1);
    }, DURATION_PER_ITEM);

    return () => {
      clearTimeout(timersRef.current.sequence);
      clearTimeout(timersRef.current.animation);
    };
  }, [currentSequenceIndex]);

  const currentImageToDisplay = accordionItemsData[currentSequenceIndex % accordionItemsData.length]?.image || image1Src;

  return (
    <>
      {/* Global styles for progress bar animation and custom colors */}
      <style jsx global>{`
        /* Base transition for all progress bar indicators */
        .themed-progress-bar > div { /* Targets the ShadCN Indicator (direct child) */
          transition-property: transform; /* ShadCN Indicator animates transform */
          transition-timing-function: linear !important;
          transition-duration: ${PROGRESS_ANIMATION_DURATION_MS}ms !important;
        }

        /* Specific colors for each progress bar indicator */
        .progress-bar-sky > div {
          background-color: #0ea5e9 !important; /* Tailwind sky-500 */
        }
        .progress-bar-emerald > div {
          background-color: #10b981 !important; /* Tailwind emerald-500 */
        }
        .progress-bar-fuchsia > div {
          background-color: #d946ef !important; /* Tailwind fuchsia-500 */
        }

        /* Accordion styles for dark theme */
        .dark-accordion .accordion-item-override { /* Custom class for AccordionItem */
          border-color: #334155; /* slate-700 */
        }
        .dark-accordion .accordion-trigger-override { /* Custom class for AccordionTrigger */
          color: #cbd5e1; /* slate-300 */
        }
        .dark-accordion .accordion-trigger-override:hover {
          color: #f1f5f9; /* slate-100 */
        }
        .dark-accordion .accordion-trigger-override[data-state="open"] {
          color: #f1f5f9; /* slate-100 */
        }
        .dark-accordion .accordion-content-override { /* Custom class for AccordionContent */
          color: #94a3b8; /* slate-400 */
        }
      `}</style>

      <main className="flex min-h-screen flex-col p-6 bg-slate-900 text-slate-100">
        <div className="mt-4 flex grow flex-col gap-8 md:flex-row">
          {/* Left Panel */}
          <div className="flex flex-col justify-center gap-8 rounded-lg bg-slate-800/50 p-6 md:w-2/5 md:px-12 md:py-10 shadow-xl ring-1 ring-white/10">
            <div>
                <p className="text-sm font-medium text-sky-400 uppercase tracking-wider mb-2">BUILT TO INNOVATE</p>
                <h1 className="text-4xl font-bold leading-tight text-slate-50 md:text-5xl">
                    Next-Gen Web3 Infrastructure
                </h1>
            </div>
            <p className="text-lg text-slate-300 md:leading-relaxed">
              Explore how our platform powers decentralized applications with cutting-edge features.
            </p>

            <Accordion
              type="single"
              collapsible
              value={activeItem || ""}
              className="w-full dark-accordion" // Added class for specific styling
              onValueChange={setActiveItem}
            >
              {accordionItemsData.map((item) => (
                <AccordionItem value={item.id} key={item.id} className="accordion-item-override border-b last:border-b-0">
                  <ShadCNProgress
                    value={progressValues[item.progressKey] || 0}
                    // Apply themed-progress-bar for common transition and specific color class
                    className={`mb-2 h-1.5 themed-progress-bar ${item.progressColorClass}`}
                  />
                  <AccordionTrigger className="accordion-trigger-override text-lg py-4 hover:no-underline">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="accordion-content-override pb-4 text-base">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            
          </div>

          {/* Right Panel - Image */}
          <div className="flex items-center justify-center p-6 md:w-3/5 md:px-16 md:py-12">
            {currentImageToDisplay && (
              <NextImage
                src={currentImageToDisplay}
                alt={`Visual for ${accordionItemsData.find(i => i.id === activeItem)?.title || 'current feature'}`}
                width={600} // Increased size slightly
                height={450}
                className="rounded-lg shadow-2xl object-cover" // Added styling to image
                priority={currentSequenceIndex === 0}
                key={currentImageToDisplay.src}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
}