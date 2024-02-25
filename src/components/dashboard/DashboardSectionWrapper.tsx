import { cn } from "@/lib/utils";
import { he } from "date-fns/locale";

type Props = {
  children: React.ReactNode;
  width?: string;
  title: string;
  height?: string;
};

const DashboardSectionWrapper = ({ children, width, title, height }: Props) => {
  return (
    <section
      className={cn(
        "rounded-lg border-2 border-slate-200 bg-white p-2",
        width ? width : "w-full",
        height ? height : "h-full",
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
