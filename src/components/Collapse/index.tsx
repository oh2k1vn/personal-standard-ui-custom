import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ICollapseProps {
    children: React.ReactNode;
}

export interface ICollapse {
    open: () => void;
    close: () => void;
}

const Collapse = React.forwardRef<ICollapse, ICollapseProps>(({ children }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [height, setHeight] = useState<number | 'auto'>(open ? 'auto' : 0);

    React.useImperativeHandle(
        ref,
        () => {
            return {
                open() {
                    setOpen(true);
                },
                close() {
                    setOpen(false);
                },
            };
        },
        []
    );

    const getHeight = () => {
        if (open) {
            const contentHeight = document.getElementById('collapseContent')?.scrollHeight;
            if (contentHeight) {
                setHeight(contentHeight);
            }
        } else {
            setHeight(0);
        }
    };

    React.useEffect(() => {
        getHeight();
    }, [open]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    id="collapseContent"
                    className="overflow-hidden"
                    style={{ overflow: 'hidden', height }}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 100 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}>
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
})
export default Collapse