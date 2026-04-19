import { Feature } from "@/types/feature";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, paragraph, status } = feature;
  const isReady = status === "ready";

  return (
    <div className="w-full">
      <div className="wow fadeInUp" data-wow-delay=".15s">
        <div
          className={`mb-10 flex h-[70px] w-[70px] items-center justify-center rounded-md text-primary ${
            isReady
              ? "bg-primary/20 shadow-[0_0_24px_rgba(59,130,246,0.35)] ring-1 ring-primary/40"
              : "bg-primary bg-opacity-10"
          }`}
        >
          {icon}
        </div>
        <span
          className={`mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
            isReady
              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
              : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
          }`}
        >
          {isReady ? "Available now" : "Upcoming"}
        </span>
        <h3 className="mb-5 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
          {title}
        </h3>
        <p className="pr-[10px] text-base font-medium leading-relaxed text-body-color">
          {paragraph}
        </p>
      </div>
    </div>
  );
};

export default SingleFeature;
