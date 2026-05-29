import { cn } from "@/lib/utils";

interface OrnamentProps {
  src?: string;
  svg?: string;
  className?: string;
  width?: number;
  height?: number;
  children?: React.ReactNode;
}

export default function Ornament({
  src,
  svg,
  className,
  width: w,
  height: h,
  children,
}: OrnamentProps) {
  if (src) {
    return (
      <img
        src={src}
        alt="ornament"
        className={cn("inline-block", className)}
        width={w}
        height={h}
      />
    );
  }

  if (svg) {
    return (
      <div
        className={cn("inline-block", className)}
        style={{ width: w, height: h }}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    );
  }

  if (children) {
    return <>{children}</>;
  }

  return null;
}
