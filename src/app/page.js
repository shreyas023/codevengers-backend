"use client";

import { motion } from "framer-motion";

export default function ComingSoon() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <motion.h1
        className="text-5xl font-bold"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        Coming Soon...
      </motion.h1>
    </div>
  );
}
