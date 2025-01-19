import { motion, AnimatePresence } from "framer-motion"

interface SuccessPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function SuccessPopup({ isOpen, onClose }: SuccessPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-md p-6 bg-black rounded-2xl border border-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)] transition-all duration-500 hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.8)]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-2xl font-bold text-white">
                Application Submitted Successfully!
              </h2>
              <span role="img" aria-label="celebration" className="text-2xl animate-bounce">
                🎉
              </span>
            </div>

            <div className="space-y-4 text-gray-300">
              <p className="text-lg">
                We're excited to review your application for Innovix Solutions. ✨
              </p>
              <p className="text-lg">
                Thank you for applying to Innovix Solutions. We've received your
                application and will review it shortly. 📝
              </p>
              <p className="text-lg text-center">
                You will receive a confirmation email soon with further details. 📧
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

