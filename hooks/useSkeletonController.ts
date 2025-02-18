import { useContext } from "react";
import { ISkeletonController } from "@/types/skeleton";
import { SkeletonContext } from "@/providers/SkeletonProvider";

export default function (): ISkeletonController {
  const skeletonContext = useContext(SkeletonContext);
  if (!skeletonContext) {
    throw new Error("SkeletonContext is null");
  }
  return skeletonContext;
}
