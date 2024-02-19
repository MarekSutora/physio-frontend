import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  width?: string;
  title: string;
};

const DashboardSectionWrapper = ({ children, width, title }: Props) => {
  return (
    <section
      className={cn(
        "h-fit border-slate-200 bg-white p-2 md:rounded-lg md:border-2",
        width ? width : "w-full",
      )}
    >
      <h1 className="text-md mb-2 border-b-2 border-slate-200 pb-1 text-center font-medium">
        {title}
      </h1>
      {children}
    </section>
  );
};

export default DashboardSectionWrapper;
