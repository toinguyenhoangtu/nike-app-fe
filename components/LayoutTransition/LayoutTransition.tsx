'use client'
import React, { useEffect, useRef } from "react"
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from "framer-motion"


const LayoutTransition = ({
    children
}: {
    children: React.ReactNode
}) => {

    const pathname = usePathname();

    const lastPageRef = useRef<HTMLCollection | null>(null);
    const currentPageRef = useRef<HTMLDivElement>(null);
    const exitAnimationDivRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!currentPageRef.current) return;
        if (!lastPageRef.current)
            lastPageRef.current = currentPageRef.current.children;

        exitAnimationDivRef.current?.appendChild(
            lastPageRef.current![0].cloneNode(true)
        );
        lastPageRef.current = currentPageRef.current.children;
    }, [pathname]);

    return (
        <AnimatePresence initial={false}>
            <div className="md:py-10">
                <motion.div
                    key={pathname + "exit-animation"}
                    style={{
                        position: "absolute",
                    }}
                    initial={{ x: 0 }}
                    animate={{
                        x: "-100%",
                        opacity: 0,
                    }}
                    transition={{
                        type: "easeInOut",
                        duration: 0.4,
                    }}
                >
                    <div ref={exitAnimationDivRef} />
                </motion.div>

                <motion.div
                    key={pathname}
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    transition={{ type: "easeInOut", duration: 0.4 }}
                >
                    <div ref={currentPageRef}>{children}</div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default LayoutTransition