import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { linkMenuVariants } from "../utils/animation";
import { cn } from "../utils/cn";
import { DATA_MENU } from "../utils/data";

const Sidebar = () => {
  const pathName = useLocation();

  return (
    <>
      <div
        className={cn(
          "shadow-lg h-screen border-r border-gray-200 transition-all duration-300 transform-cpu w-52"
        )}
      >
        {/* Logo Or Title */}
        <div className="text-3xl font-semibold font-serif px-2 text-center border-b border-gray-300 py-4 mb-6">
          Personal standard ui custom
        </div>

        {/* Sidebar link */}
        <AnimatePresence mode="popLayout">
          <div className="flex flex-col gap-1">
            {DATA_MENU.map((item, index) => (
              <motion.div
                initial="initial"
                animate="final"
                variants={linkMenuVariants}
                key={index}
                viewport={{
                  once: true,
                }}
              >
                <Link
                  to={item.link}
                  className={cn(
                    "w-full block py-2.5 px-4 hover:bg-blue-300 hover:scale-105 hover:text-blue-900 hover:rounded-r transition-all duration-300 font-semibold text-gray-600",
                    {
                      "bg-blue-300 text-blue-900":
                        pathName.pathname == item.link,
                    }
                  )}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </>
  );
};
export default Sidebar;
