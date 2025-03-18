"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

// Define the content for each step
const steps = [
  {
    id: 1,
    title: "Initiate Your Bill",
    description:
      "Start by creating a payment request in your StarPay merchant account. Simply enter the amount and generate a unique payment reference.",
    image: "/images/step1-screen.png",
    fallbackImage:
      "/iphone15.png",
  },
  {
    id: 2,
    title: "Choose Payment Options",
    description:
      "Select from multiple payment methods including USSD, OTP, QR Code, or payment links via SMS or email to best suit your customer's preference.",
    image: "/images/step2-screen.png",
    fallbackImage:
      "/iphone15.png",
  },
  {
    id: 3,
    title: "Receive Your Payment",
    description:
      "Your customer completes the payment using their preferred method. The transaction is processed securely through StarPay's platform.",
    image: "/images/step3-screen.png",
    fallbackImage:
      "/iphone15.png",
  },
  {
    id: 4,
    title: "Enter Your Customer Info",
    description:
      "Capture essential customer details for your records and to enhance future transactions. All data is securely stored in compliance with privacy regulations.",
    image: "/images/step4-screen.png",
    fallbackImage:
      "/iphone15.png",
  },
  {
    id: 5,
    title: "Wait for Seconds",
    description:
      "The payment is processed instantly. Within seconds, you'll receive confirmation that the funds have been transferred to your account.",
    image: "/images/step5-screen.png",
    fallbackImage:
      "/iphone15.png",
  },
]

export default function RequestMoneySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const [hasCompletedSequence, setHasCompletedSequence] = useState(false)
  const [isScrollLocked, setIsScrollLocked] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down")
  const lastScrollY = useRef(0)
  const wheelEventCount = useRef(0)
  const wheelThreshold = 3 // Number of wheel events needed to change step

  // Track when the section title comes into view
  const titleEntry = useIntersectionObserver(titleRef, {
    threshold: 0.5,
    rootMargin: "0px",
  })

  // Track when the entire section is in view
  const sectionEntry = useIntersectionObserver(sectionRef, {
    threshold: 0.8, // Higher threshold to ensure most of the section is visible
    rootMargin: "0px",
  })

  // Detect scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection("down")
      } else {
        setScrollDirection("up")
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle section visibility and set initial active step based on scroll direction
  useEffect(() => {
    if (!sectionRef.current) return

    // Check if title is in view (for starting the sequence)
    const isTitleVisible = titleEntry?.isIntersecting

    // Check if section is fully in view (for locking)
    const isSectionVisible = sectionEntry?.isIntersecting

    setIsInView(!!isSectionVisible)

    if (isSectionVisible && !hasCompletedSequence) {
      setIsScrollLocked(true)
      document.body.style.overflow = "hidden"

      // Set initial active step based on scroll direction
      if (scrollDirection === "down") {
        setActiveStep(0) // First step when scrolling down to the section
      } else {
        setActiveStep(steps.length - 1) // Last step when scrolling up to the section
      }
    } else {
      setIsScrollLocked(false)
      document.body.style.overflow = ""

      // Reset sequence completion when scrolling away
      if (!isTitleVisible && !isSectionVisible) {
        setHasCompletedSequence(false)
      }
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [titleEntry?.isIntersecting, sectionEntry?.isIntersecting, hasCompletedSequence, scrollDirection, steps.length])

  // Handle wheel events to progress through steps
  useEffect(() => {
    if (!isScrollLocked) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      // Accumulate wheel events to create a smoother experience
      if (e.deltaY > 0) {
        // Scrolling down
        wheelEventCount.current += 1
        if (wheelEventCount.current >= wheelThreshold) {
          wheelEventCount.current = 0
          setActiveStep((prev) => {
            const nextStep = Math.min(prev + 1, steps.length - 1)
            if (nextStep === steps.length - 1 && prev === steps.length - 1) {
              // User has viewed all steps and is trying to scroll down more
              setHasCompletedSequence(true)
              return prev
            }
            return nextStep
          })
        }
      } else if (e.deltaY < 0) {
        // Scrolling up
        wheelEventCount.current -= 1
        if (wheelEventCount.current <= -wheelThreshold) {
          wheelEventCount.current = 0
          setActiveStep((prev) => {
            const nextStep = Math.max(prev - 1, 0)
            if (nextStep === 0 && prev === 0) {
              // User has viewed all steps and is trying to scroll up more
              setHasCompletedSequence(true)
              return prev
            }
            return nextStep
          })
        }
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      window.removeEventListener("wheel", handleWheel)
    }
  }, [isScrollLocked, steps.length])

  // Handle touch events for mobile
  useEffect(() => {
    if (!isScrollLocked) return

    let touchStartY = 0
    let touchMoveCount = 0
    const touchThreshold = 30 // Pixels to swipe before changing step

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
      touchMoveCount = 0
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      const touchY = e.touches[0].clientY
      const diff = touchStartY - touchY
      touchMoveCount += Math.abs(diff)

      if (diff > 0 && touchMoveCount > touchThreshold) {
        // Swiping up (scrolling down)
        touchMoveCount = 0
        setActiveStep((prev) => {
          const nextStep = Math.min(prev + 1, steps.length - 1)
          if (nextStep === steps.length - 1 && prev === steps.length - 1) {
            setHasCompletedSequence(true)
            return prev
          }
          return nextStep
        })
      } else if (diff < 0 && touchMoveCount > touchThreshold) {
        // Swiping down (scrolling up)
        touchMoveCount = 0
        setActiveStep((prev) => {
          const nextStep = Math.max(prev - 1, 0)
          if (nextStep === 0 && prev === 0) {
            setHasCompletedSequence(true)
            return prev
          }
          return nextStep
        })
      }

      touchStartY = touchY
    }

    window.addEventListener("touchstart", handleTouchStart)
    window.addEventListener("touchmove", handleTouchMove, { passive: false })

    return () => {
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [isScrollLocked, steps.length])

  // Handle keyboard navigation
  useEffect(() => {
    if (!isScrollLocked) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        setActiveStep((prev) => {
          const nextStep = Math.min(prev + 1, steps.length - 1)
          if (nextStep === steps.length - 1 && prev === steps.length - 1) {
            setHasCompletedSequence(true)
            return prev
          }
          return nextStep
        })
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        setActiveStep((prev) => {
          const nextStep = Math.max(prev - 1, 0)
          if (nextStep === 0 && prev === 0) {
            setHasCompletedSequence(true)
            return prev
          }
          return nextStep
        })
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isScrollLocked, steps.length])

  return (
    <section ref={sectionRef} className="min-h-screen bg-gray-100 py-20 relative" id="request-money-section">
      <div className="container mx-auto px-4">
        <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16">
          EASY WAY TO REQUEST & RECEIVE MONEY
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left side - Steps */}
          <div className="md:col-span-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className="mb-8 py-4 border-b border-gray-200"
                animate={{
                  opacity: index === activeStep ? 1 : 0.5,
                  scale: index === activeStep ? 1.05 : 1,
                  x: index === activeStep ? 10 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <h3
                  className={`flex items-baseline ${
                    index === activeStep ? "text-2xl font-bold text-gray-900" : "text-xl font-medium text-gray-600"
                  }`}
                >
                  <span className="mr-3 text-emerald-600 font-bold">{String(step.id).padStart(2, "0")}.</span>
                  {step.title}
                </h3>
              </motion.div>
            ))}
          </div>

          {/* Center - Phone */}
          <div className="md:col-span-4 flex justify-center">
            <div className="relative w-64 md:w-72">
              {/* Phone frame */}
              <div className="relative z-10">
                <Image
                  src="/iphone15.png"
                  alt="Phone"
                  width={300}
                  height={600}
                  className="w-full h-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src =
                      "/iphone15.png"
                  }}
                />
              </div>

              {/* Phone screen content - hidden since we're using the full phone image */}
              <div className="absolute top-[12%] left-[8%] right-[8%] bottom-[12%] z-0 overflow-hidden rounded-3xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full relative"
                  >
                    {/* This is hidden because we're using the full phone image */}
                    <div className="opacity-0">
                      <Image
                        src={steps[activeStep].fallbackImage || "/placeholder.svg"}
                        alt={steps[activeStep].title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Stone base */}
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-full">
                <Image
                  src="/bg.png"
                  alt="Stone Base"
                  width={400}
                  height={100}
                  className="w-full h-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src =
                      "/bg.png"
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right side - Description */}
          <div className="md:col-span-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold text-emerald-600 mb-4">
                  {activeStep === 0 ? "Fast way to Request Payment" : steps[activeStep].title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{steps[activeStep].description}</p>
                {activeStep === 0 && (
                  <p className="mt-4 text-gray-600 leading-relaxed">
                    StarPay makes payment requests quick and easy. Merchants can select from various secure options: Pay
                    by USSD for offline customers, Pay by OTP for security, Pay by Reference for repeat transactions, QR
                    Code Payments for contactless transactions, and Pay by Link to share payment links via SMS or email.
                    With additional flexible methods, StarPay ensures a seamless experience for both merchants and
                    customers.
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Visual indicator for scrolling - Fixed HTML validation error */}
      {isInView && !hasCompletedSequence && (
        <motion.div
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <div className="text-sm text-gray-800 flex items-center">
            <span>{scrollDirection === "down" ? "Scroll down" : "Scroll up"} to explore</span>
            <motion.span
              animate={{
                y: scrollDirection === "down" ? [0, 5, 0] : [0, -5, 0],
              }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
              className="ml-2 inline-block"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transform: scrollDirection === "up" ? "rotate(180deg)" : "none",
                }}
              >
                <path d="M8 12L2 6L3.4 4.6L8 9.2L12.6 4.6L14 6L8 12Z" fill="currentColor" />
              </svg>
            </motion.span>
          </div>
        </motion.div>
      )}

      {/* Progress indicator */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
        {isInView && !hasCompletedSequence && (
          <div className="flex flex-col gap-3">
            {steps.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 rounded-full ${index === activeStep ? "bg-emerald-500 w-3 h-3" : "bg-gray-300"}`}
                animate={{
                  scale: index === activeStep ? 1.2 : 1,
                  backgroundColor: index === activeStep ? "#10b981" : "#d1d5db",
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

