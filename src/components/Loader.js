import React from "react";
import { motion } from 'framer-motion';
import { loaderVariants } from "../animations/loaderVariants";





function Loader() {
    return (
        <motion.div
                   className="loader"
                 
                   >
                 
                   <motion.div 
                      variants={loaderVariants}
                      animate='animation'
                   className="ball"></motion.div>

                   </motion.div>
    )
}

export default Loader
