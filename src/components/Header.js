import React from "react";
import { motion } from "framer-motion";
import { fadeInDown } from "../animations/fadeUpIn";

const Header = ({ books, loading }) => {
  const bookCount = books.length;
  return (
    <motion.div variants={fadeInDown} initial="initial" animate="animate">
      <div className="list-books">
        <div className="list-books-title">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            MyReads
          </motion.h1>
          {/* Dont show book count until books are  loaded from API */}
          {loading ? (
            ""
          ) : (
            <motion.h3
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              Current Book Shelf : {bookCount}
            </motion.h3>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
