import type { StackScreenPropsGeneric } from "@src/@types/navigation";
import { TopicView } from "../TopicView";

export type TopicScreenProps = undefined;

export default function TopicScreen({
  route: { params },
}: StackScreenPropsGeneric<"Topic">) {
  return <TopicView {...(params ?? {})} />;
}