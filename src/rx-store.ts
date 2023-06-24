import { Subject } from "rxjs";
import { BlockDTO } from "./store";

export const ObservableBlockMap = new Map<string, Subject<BlockDTO>>();

export const createObservableBlock = (block: BlockDTO) => {
  const cache = ObservableBlockMap.get(block.id);
  if (cache) {
    return cache;
  }

  const subject = new Subject<BlockDTO>();
  ObservableBlockMap.set(block.id, subject);

  return subject;
};

export function selectData(id: string) {
  return ObservableBlockMap.get(id);
}
