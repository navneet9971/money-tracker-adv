import React from 'react';
import { PacmanLoader } from 'react-spinners';
import { AuroraBackground } from "@/components/ui/auroraBackground";
import { motion } from "framer-motion";

const Spinner: React.FC = () => {
  return (
    <AuroraBackground className="bg-black">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >

      <PacmanLoader color="#000000" speedMultiplier={1} />
    </motion.div>
    </AuroraBackground>
  );
};

export default Spinner;
