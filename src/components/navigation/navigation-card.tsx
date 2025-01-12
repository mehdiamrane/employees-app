import { Link } from "@/components/link";
import { LucideIcon } from "lucide-react";

interface NavigationCardProps {
  title: string;
  description: string;
  url: string;
  icon: LucideIcon;
}

export function NavigationCard({ title, description, url, icon: Icon }: NavigationCardProps) {
  return (
    <Link href={url} className="group block">
      <div className="bg-card text-card-foreground rounded-lg border shadow-sm p-6 h-full flex flex-col gap-4 hover:border-primary/50 transition-colors">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-primary/10 text-primary">
            <Icon className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <p className="text-muted-foreground">{description}</p>
        <div className="mt-auto pt-4">
          <span className="text-sm text-primary">View {title} →</span>
        </div>
      </div>
    </Link>
  );
}
