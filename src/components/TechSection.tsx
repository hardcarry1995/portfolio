"use client";

import React, { useMemo } from "react";
// import { AnimatePresence, motion, usePresence } from "framer-motion";
import Image from "next/image";

const Tab = ({
  name,
  active,
  onClick,
}: {
  name: string;
  active: boolean;
  onClick: (e: any) => void;
}) => {
  return (
    <div
      className="px-6 py-3 cursor-pointer md:px-8 md:py-4 trans hover:bg-slate-400/10"
      style={{
        backgroundColor: active ? "var(--bg-hover)" : "",
      }}
      onClick={onClick}
    >
      {name}
    </div>
  );
};

// const transition = { type: "spring", stiffness: 500, damping: 50, mass: 1 };

const variants = {
  in: { scaleY: 1, opacity: 1 },
  out: { scaleY: 0, opacity: 0, zIndex: -1 },
  tapped: { scale: 0.98, opacity: 0.5, transition: { duration: 0.1 } },
};

function TagCircle({ tag }: { tag: Tag }) {
  // const [isPresent, safeToRemove] = usePresence();
  return (
    <div
      className="flex flex-col items-center hover:bg-[var(--bg-hover)] w-28 h-28 rounded-full trans bg-slate-400/10"
      // layout={true}
      // initial="out"
      // style={{
      //   position: isPresent ? "static" : "absolute",
      // }}
      // animate={isPresent ? "in" : "out"}
      // whileTap="tapped"
      // variants={variants}
      // onAnimationComplete={() => !isPresent && safeToRemove()}
      // transition={transition}
    >
      <div className="relative flex-none translate-y-1.5 -translate-x-0 fcenter h-3/5">
        <Image
          src={"/icons/" + (tag.iconFileName || tag.slug + ".svg")}
          alt={tag.name}
          width={36 * (tag.iconScale || 1)}
          height={36 * (tag.iconScale || 1)}
        />
      </div>
      <div className="text-sm text-center">{tag.name}</div>
    </div>
  );
}

export function TechSection({ data }: { data: Tag[] }) {
  const [tabs, tabsData] = useMemo(() => {
    let tabs: Category[] = [];
    const slugSet = new Set<string>();
    data.forEach((tag) => {
      tag.categories.forEach((category) => {
        if (slugSet.has(category.slug)) return;
        slugSet.add(category.slug);
        tabs.push(category);
      });
    });
    const tabsData: Record<string, Tag[]> = {};
    for (const tab of tabs) {
      tabsData[tab.slug] = data.filter((tag) =>
        tag.categories.map((c) => c.slug).includes(tab.slug)
      );
    }
    tabs = [{ title: "All", slug: "all" }, ...tabs];
    tabsData["all"] = data;
    return [tabs, tabsData];
  }, [data]);
  const [activeTab, setActiveTab] = React.useState({
    i: 0,
    slug: tabs[0].slug,
  });

  return (
    <div className="flex flex-col items-center w-full space-y-4 md:space-y-8">
      <div className="flex flex-wrap justify-center">
        {tabs.map((tab, i) => (
          <Tab
            key={i}
            name={tab.title}
            active={i === activeTab.i}
            onClick={(e: any) => {
              setActiveTab(() => ({
                i,
                slug: tab.slug,
              }));
            }}
          />
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-3 md:gap-6 max-w-[80%]">
        {tabsData[activeTab.slug].map((tag, i) => (
          <TagCircle tag={tag} key={i} />
        ))}
      </div>
    </div>
  );
}
