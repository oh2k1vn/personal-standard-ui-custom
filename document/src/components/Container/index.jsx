import React from "react";
import LoadingScreen from "../LoadingScreen";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { routeVariants } from "../../utils/animation";
import PropTypes from "prop-types";
import Header from "../Header";

const Docs = React.lazy(() => import("../../pages/Docs"));
const BottomSheet = React.lazy(() => import("../../pages/BottomSheet"));
const Button = React.lazy(() => import("../../pages/Button"));
const CheckBox = React.lazy(() => import("../../pages/CheckBox"));
const Dialog = React.lazy(() => import("../../pages/Dialog"));
const Input = React.lazy(() => import("../../pages/Input"));
const Slider = React.lazy(() => import("../../pages/Slider"));
const Toggle = React.lazy(() => import("../../pages/Toggle"));
const CheckInternet = React.lazy(() => import("../../pages/CheckInternet"));
const Carousel = React.lazy(() => import("../../pages/Carousel"));

const Container = () => {
  const location = useLocation();
  return (
    <LocationProvider>
      <motion.div
        className="flex-1"
        variants={routeVariants}
        initial="initial"
        animate="final"
      >
        <Header
          title={
            location.pathname.replace("/", "")
              ? location.pathname.replace("/", "")
              : "Document"
          }
        />
        <React.Suspense fallback={LoadingScreen}>
          <Routes location={location} key={location.key}>
            <Route index element={<Docs />} />
            <Route path="/bottomSheet" element={<BottomSheet />} />
            <Route path="/button" element={<Button />} />
            <Route path="/carousel" element={<Carousel />} />
            <Route path="/checkBox" element={<CheckBox />} />
            <Route path="/checkInternet" element={<CheckInternet />} />
            <Route path="/dialog" element={<Dialog />} />
            <Route path="/input" element={<Input />} />
            <Route path="/slider" element={<Slider />} />
            <Route path="/toggle" element={<Toggle />} />
          </Routes>
        </React.Suspense>
      </motion.div>
    </LocationProvider>
  );
};
export default Container;

function LocationProvider({ children }) {
  return <AnimatePresence>{children}</AnimatePresence>;
}

LocationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
